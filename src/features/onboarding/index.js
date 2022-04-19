import React from 'react'
import { StyleSheet, Text, View, Image, StatusBar, Platform } from 'react-native'

import Onboarding from 'react-native-onboarding-swiper';
import { Button } from '../../components/form';
import {palette, theme} from '../../components/Theme';


export default function index({stateHandler}) {

    const eachPage = (image,title,desc,onPress)=>{
        return (
            {
                backgroundColor: '#fff',
                image:     <Image source={image} style={{width: "100%", height: "100%"}} resizeMode={"cover"} />,
                title:     <Text style={styles.title}>{title}</Text>,
                subtitle:  <View>
                                <View style={{paddingVertical: "5%",marginHorizontal: "10%"}}>
                                    <Text style={styles.desc}>{desc}</Text>
                                </View>
                                <View style={{marginHorizontal: "3%"}}>
                                    <Button title="Get Started" onPress={stateHandler}/>
                                </View>
                            </View>,
            }
        )
    }

    const [activeOnBoarding, setActiveOnBoarding] = React.useState(0);

    return (
        <>
        <StatusBar translucent backgroundColor ={"transparent"} />
        <Onboarding
            // pageIndexCallback = {0}
            pageIndexCallback = {(index)=> setActiveOnBoarding(index)}
            allowFontScaling = {true}
            onDone  = {stateHandler}
            skipToPage = {0}
            showSkip = {activeOnBoarding != 0}
            // onSkip  = {(e)=>console.log(e)}
            skipLabel = "Prev"
            ski
            bottomBarColor  = {palette.orangebg}
            containerStyles = {{ justifyContent: 'flex-start'}}
            imageContainerStyles = {{
                paddingBottom: "7%",
                paddingTop: 0,
                height: Platform.OS == "ios"? "62%" :"65%"
            }}
            DotComponent = {({selected})=>{
                return <View style={[styles.dot,{backgroundColor: selected? palette.orange: palette.lightGray}]} />
            }}
            pages={[
                eachPage(require('../../assets/onboarding1.png'), "Collaborate with peers", "Reach out lorem ipsum dolor sit consectectur ipsum.",()=>{}),
                eachPage(require('../../assets/onboarding2.png'), "Find opportunities" ,"Anywhere, anytime. Lorem ipsum dolor sit consectectur dolor.",()=>{}),
                eachPage(require('../../assets/onboarding3.png'), "Build your route map ", "Create lorem ipsum dolor sit consectectur ipsum aesug lorem ipsum dolor sit.",()=>{}),
                
            ]}
        />
        </>
    )
}

const styles = StyleSheet.create({
    title:{
        ...theme.typography.titleRouteMap,
        textAlign: 'center',
        marginHorizontal: "25%"
        // color: color
    },
    desc: {
        ...theme.typography.title6,
        textAlign: 'center',
        color: theme.colors.formFieldTitle
    },
    dot: {
        height: 12,
        width:  12,
        borderRadius: 100,
        marginHorizontal: 3
    }
})
