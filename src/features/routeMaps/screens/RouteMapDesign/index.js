import React, {useRef, useEffect, useState} from 'react';
import Svg, {Path, Line, Circle, Defs, Image,  G, Rect as RectSvg, ClipPath, Use, Text} from 'react-native-svg';
import {ActivityIndicator, Dimensions, View} from 'react-native';
import {Storage} from 'aws-amplify';
import { FilledPlusCircleFill } from '../../../../components/svg/icons';
import { theme } from '../../../../components/Theme';
import moment from 'moment';



export default function RouteMapDesign({tab,posts, postFeedOnPress,toggleAddPostModal}) {
  
  
  /**
   * State and Refs Declaration
   */

  const staticPath                      = useRef();
  const pathRefs                        = useRef({});
  const [callAgain, setCallAgain]       = useState(false);
  const {width}                         = Dimensions.get('window');
  const [updatedPosts, setUpdatedPosts] = useState({ isLoading: true, posts:[]});
  // const postsLength                     = posts.length;
  
  /**
   * Fetch Image from AWS STORAGE
   */
  const getImage = async ({key, bucket, region}) => {
    try {
      const imageURL = await Storage.get(key, {
        bucket: bucket,
        region: region,
      });
      return imageURL
    } catch (e) {
      console.log(e);
    }
  };


  useEffect(() => { 
    mergImageUrls()
  }, [])
  
  // console.log(posts)

  /**
   * Merg Image Urls To Posts
   */

  const mergImageUrls = async()=>{
    const _updatedPosts = []
    
    if(posts.length){
      for await (const _post of posts) {
        if(_post.photo && _post.photo[0]){
          const image = await getImage(_post.photo[0])
          if(image){
            _updatedPosts.push({
              image,
              ..._post
            })
          }else{
            _updatedPosts.push({..._post})
          }
        }else{
          _updatedPosts.push({..._post})
        }
      }

      let sortedPosts = _updatedPosts?.slice()?.sort(function(a, b) {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
      

      setUpdatedPosts({
        isLoading: false,
        posts:sortedPosts
      })
      
    }
  }

  


  
  /**
   * Calculate View Box 
   */
  const calculateViewbox = (length) => {
    if (length === 0) {
      return 40;
    } else if (length === 1) {
      return 100;
    } else {
      const dynamicLength = length - 1;
      if (dynamicLength % 3 === 0) {
        return 100 + (dynamicLength / 3) * 160;
      } else if (dynamicLength % 3 === 2) {
        return 100 + ((Math.floor(dynamicLength / 3) + 1) * 160 - 60);
      } else {
        return 100 + ((Math.floor(dynamicLength / 3) + 1) * 160 - 110);
      }
    }
  };
  
  /**
   * Calculate Transformation
   */

  const calculateTransform = (x) => {
    if (x < 5) {
      return 0;
    } else {
      const multiplier = Math.floor((x - 2) / 3);
      return multiplier * 160;
    }
  };


  /**
   * Init Call For Re Prient Images Properly
   */

  useEffect(() => {
    if (callAgain) {
      //
    } else {
      setTimeout(() => {
        setCallAgain(true);
        
      }, 100);
    }
  }, []);


  if(updatedPosts.isLoading){
    return (
      <View style={{flex: 1,alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator color = {'red'} />
      </View>
    )
  }

  
  
  /**
   * Constance Before Main Entry Point
   */
  console.log("-------")
  console.log(updatedPosts.posts.length)
  console.log("-------")

  const staticRoute = updatedPosts.posts.length? pathRefs?.current[updatedPosts.posts.length]: staticPath.current;
  const staticRouteLength = staticRoute?staticRoute.getTotalLength():0;
  // const staticRoute = staticPath?.current;
  // const staticRouteLength = staticRoute?.getTotalLength();
  const firstPoint  = staticRoute?.getPointAtLength(staticRouteLength);


  /**
   * Main Entry Poin
   */

  return (
    <View style={{flex: 1,alignSelf: 'center',}}>
      <Svg id="Layer_1" style={{ width: width, height: calculateViewbox(updatedPosts.posts.length) * 1.5}}>
        <G scale = {1.5}> 
          
        {/* Make A Path For Steps */}
        {
          updatedPosts.posts.map((post,index)=>{
            const  i = index +1
            return (i === 1)?
              <Path
                  ref={(ref) => (pathRefs.current[i] = ref)}
                  d="M50,20H170a30,30,0,0,1,30,30h0a30,30,0,0,1-30,30H157"
                  transform={`translate(0 ${calculateTransform(i)})`}
                  stroke="#fc9a49"
                  strokeWidth="3"
                />
            :((i - 1) % 3 === 0)?
              <Path
                  d="M108,180h62a30,30,0,0,1,30,30h0a30,30,0,0,1-30,30H157"
                  ref={(ref) => (pathRefs.current[i] = ref)}
                  transform={`translate(0 ${calculateTransform(i)})`}
                  stroke="#fc9a49"
                  strokeWidth="3"
                />
            :((i - 1) % 3 === 2)?
              
                <Path
                  d="M60,130v20a30,30,0,0,0,30,30h18"
                  ref={(ref) => (pathRefs.current[i] = ref)}
                  transform={`translate(0 ${calculateTransform(i)})`}
                  stroke="#fc9a49"
                  strokeWidth="3"
                />
              
              :
                <Path
                  d="M157,80H90a30,30,0,0,0-30,30v20"
                  ref={(ref) => (pathRefs.current[i] = ref)}
                  transform={`translate(0 ${calculateTransform(i)})`}
                  stroke="#fc9a49"
                  strokeWidth="3"
                />
          })
        }
        
        {/* Starting Static Line */}
        <Line
          ref={staticPath}
          className="cls-1"
          y1="20"
          x2="50"
          y2="20"
          stroke="#fc9a49"
          strokeWidth="3"
        />
        
        {/* Render Each Step With Image */}
        {
          updatedPosts.posts.map((post,i)=>{
            if (staticRoute && pathRefs) {

              const route       = i == 0? staticPath.current:pathRefs?.current[i];
              const routeLength = route?.getTotalLength();
              const point       = route?.getPointAtLength(routeLength);
              
              if (point && point.x) {
                return (post.type == "MILESTONE")?
                
                  <G 
                    x={point.x-18}
                    y={point.y-18}
                    height= {36}
                    width = {36}
                    transform={`translate(0 ${calculateTransform(i)})`}
                    onPress = {()=>{ if(post){ postFeedOnPress(post.id, post.seeker.firstName, post.seeker.lastName)}}}
                  >
                    <G
                      x={18}
                      y={18}
                    >
                      <Circle
                        fill={!post?.image? "#de5420":"white"}
                        r ={18}
                        stroke= {"#de5420"}
                        strokeWidth="2"
                        
                      />
                      <Circle
                        r ={18 }
                        stroke= {"#de5420"}
                        strokeWidth="2"   
                        fill={ !post?.image? "#de5420": `url(#image${i})`}
                      />
                      {
                        (post.type == "MILESTONE" && post?.milestone?.title)&&
                        <Text x="0" y="0" textAnchor="middle" stroke="#FFF" strokeWidth="1px" dy=".3em">{post?.milestone?.title[0]}</Text>
                      }
                    </G>
                    
                    {
                      post?.image?
                        <>
                          <Defs>
                            <RectSvg id="rect" 
                            width ={"36"}
                            height={"36"}
                            rx={18}/>
                            <ClipPath id="clip">
                              <Use href="#rect"/>
                            </ClipPath>
                          </Defs>
                          <Image  
                            href={post?.image} 
                            width ={"36"}
                            height={"36"}
                            clipPath="url(#clip)" preserveAspectRatio="xMidYMid slice"/>
                        </>
                        :<></>
                    }
                  </G>
                :
                  <G 
                    x={point.x-15}
                    y={point.y-15}
                    height= {"30"}
                    width = {"30"}
                    transform={`translate(0 ${calculateTransform(i)})`}
                    onPress = {()=>{ if(post){ postFeedOnPress(post.id, post.seeker.firstName, post.seeker.lastName)}}}
                  >
                    <G
                      x={15}
                      y={15}
                    >
                      <Circle
                        fill={  post.type == "BLOG"?"orange":"white"}
                        r ={15}
                        stroke= {"orange"}
                        strokeWidth="2"
                        
                      />
                      <Circle
                        r ={15}
                        stroke= {"orange"}
                        strokeWidth="2"   
                        fill={post.type == "BLOG"?"orange":`url(#image${i})`}
                      />
                      {
                        (post.type == "BLOG" && post?.blog?.blogTitle)&&
                        <Text x="0" y="0" textAnchor="middle" stroke="#FFF" strokeWidth="1px" dy=".3em">{post.blog.blogTitle[0]}</Text>
                      }
                    </G>
                    
                    {
                      post?.image?
                        <>
                          <Defs>
                            <RectSvg id="rect1" 
                            width ={"30"}
                            height={"30"}
                            rx={15}/>
                            <ClipPath id="clip2">
                              <Use href="#rect1"/>
                            </ClipPath>
                          </Defs>
                          <Image  
                            href={post?.image} 
                            width ={"30"}
                            height={"30"}
                            clipPath="url(#clip2)" preserveAspectRatio="xMidYMid slice"/>
                        </>
                        :<></>
                    }
                  </G>
              }
            }
          })
        }
        {
          updatedPosts.posts.map((post,i)=>{
            if (staticRoute && pathRefs) {

              const route       = i == 0? staticPath.current:pathRefs?.current[i];
              const routeLength = route?.getTotalLength();
              const point       = route?.getPointAtLength(routeLength);
              
              // onPress = {()=>{ if(post){ postFeedOnPress(post.id, post.seeker.firstName, post.seeker.lastName)}}}
              if (point && point.x) {
                const x = ((i+1) % 3 == 0) ? point.x + 35 : point.x
                const y = ((i+1) % 3 == 0) ? point.y + 3 : point.y + 30
                return(
                  <G x={x} y={y} transform={`translate(0 ${calculateTransform(i)})`}>
                    <Text
                      x={0}
                      y={0}
                      fontSize="8"
                      fontWeight = "300"
                      // fontFamily = {""}
                      stroke = {"#333"}
                      strokeWidth ={1}
                      dominantBaseline="middle"
                      textAnchor="middle"
                    >
                      {/* asda */}
                      {moment(post.createdAt).format("DD MMM")}
                    </Text>
                  </G>
                )
              }
            }
          })
        }

        
        {/* Extra Step Rendring */}
        {(staticRoute && pathRefs)?
          <G 
            x={firstPoint.x-15}
            y={firstPoint.y-15}
            height= "30"
            width = "30"
            onPress = {toggleAddPostModal}
            transform={`translate(0 ${calculateTransform(posts.length)})`}
          >
            <Circle
              fill="white"
              cx={15}
              cy={15}
              r={15}
              stroke="orange"
              strokeWidth="2"
            />
            <G
              x={5}
              y={5}
            >
              <FilledPlusCircleFill
                  width={20}
                  height={20}
                  color={theme.colors.primary}
                />
            </G>
          </G>:<></>
        }
        </G>
      </Svg>
    </View>
  );
}
