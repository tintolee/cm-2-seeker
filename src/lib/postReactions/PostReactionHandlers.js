import * as profileActions from '../../features/profile/_redux/actions';
import * as postsActions from  '../../features/posts/_redux/actions';
import * as opportunityActions from  '../../features/opportunities/_redux/actions';
import * as collaborationActions from  '../../features/collaborations/_redux/actions';
import * as discoverActions from '../../features/discover/_redux/actions';

/*
 * Function for extracting number of likes and first liker details
 */
export function getLikeDetails(item, seekerId){
    let likes = item?.likes?.items, lc = likes?.length;
  const seekerLiked = likes?.find(i => i.seeker.id == seekerId);

  let likesDescription = "", firstLikerImage = null;
  if(lc > 0){
    let firstLiker = likes[lc - 1].seeker;
    let othersText = lc > 1 ? ` and ${lc - 1} others` : "";
    likesDescription = `Liked by ${firstLiker.firstName}${othersText}`;
    
    if(firstLiker.profilePic){
     firstLikerImage = firstLiker.profilePic;
    }
  }
    let ret = {
        seekerHasLiked: !!seekerLiked,
          likesCount: lc,
          description: likesDescription,
          img: firstLikerImage
        };
        
    return ret;
}

export function likeResourceHandler(dt){
   console.log("isLiked: ",dt?.isLiked);
    let resource = null, resourceActionType = !dt.isLiked ? "like" : "unlike", resourceId = null;
    let selector = null;
    let payload = {
      postType: dt.postType,
      type: resourceActionType,
      seekerId: dt.seekerId,
    };
    switch(dt.postType){
      case "collaboration":
      case "discover-collaboration":
        selector = i => i.collaborationId == dt.collaborationId && i.seeker.id == dt.seekerId;
        payload.collaborationId = dt.collaborationId;
      break;

      case "opportunity":
      case "discover-opportunity":
        selector = i => i.opportunityId == dt.opportunityId && i.seeker.id == dt.seekerId;
        payload.opportunityId = dt.opportunityId;
      break;

      case "connections":
      case "discover-connection":
        selector = i => i.postId == dt.postId && i.seeker.id == dt.seekerId;
        payload.postId = dt.postId;
      break;

      case "post":
        case "discover-post":
        case "provider-post":
        selector = i => i.postId == dt.postId && i.seeker.id == dt.seekerId;
        payload.postId = dt.postId;
      break;
    }
    resource = dt?.items?.find(selector);
    payload.resourceId = resource?.id;
    handlePostReaction(dt.dispatch,payload,dt.navigation);
}

function getAllData(dispatch,params, navigation){
  /*
  return dispatch(discoverActions.fetchContents())
    .then(() => dispatch(discoverActions.fetchOpportunities()))
    .then(() => dispatch(discoverActions.fetchCollaborations()))
    .then(() => dispatch(discoverActions.fetchConnectionPosts(params.seekerId)))
    .then(() => dispatch(discoverActions.fetchDiscover()))
    .then(() => {
      navigation.navigate('CollaborationDetail', {
        collaborationId: params.collaborationId,
        forceUpdate: new Date().toLocaleString()
      })
    })
    .catch(e => {
      console.log("refresh error: ",e);
    });
    */
   if(params.collaborationId && params.postType == "collaboration"){
    return dispatch(discoverActions.fetchCollaborations())
    .then(() => dispatch(discoverActions.fetchDiscover()))
    .then(() => {
      console.log("navigating..");
      //navigation.pop();
      navigation.push('CollaborationDetail', {
        collaborationId: params.collaborationId,
        forceUpdate: new Date().toLocaleString(),
        reload: true
      })
    })
    .catch(e => {
      console.log("collaboration refresh error: ",e);
    });
  }

  else if(params.opportunityId && params.postType == "opportunity"){
    return dispatch(discoverActions.fetchOpportunities())
    .then(() => dispatch(discoverActions.fetchDiscover()))
    .then(() => {
      console.log("navigating..");
      //navigation.pop();
      navigation.push('OpportunityDetail', {
        opportunityId: params.opportunityId,
        forceUpdate: new Date().toLocaleString(),
        reload: true
      })
    })
    .catch(e => {
      console.log("opportunity refresh error: ",e);
    });
  }
}

/*
 * Function for liking and 
 * unliking post content
 */
export function handlePostReaction(dispatch,params,navigation){
    console.log("params: ",params);
    let input = {}, action = null;
    let resourceUpdated = {
        seekerId: params.seekerId,
      resourceId: params.resourceId
    },
    postType =  null;
   
    switch(params.postType){
        case "post":
            resourceUpdated.postId = params.postId;
            action = params.type == "like" ? profileActions.likeResource: profileActions.unlikeResource; 
        break;
        case "discover-post":
            resourceUpdated.postId = params.postId;
            action = params.type == "like" ? discoverActions.likeResource: discoverActions.unlikeResource; 
        break;
        case "provider-post":
            resourceUpdated.postId = params.postId;
            action = params.type == "like" ? discoverActions.likeResource: discoverActions.unlikeResource; 
        break;
        case "discover-connection":
            resourceUpdated.postId = params.postId;
            action = params.type == "like" ? discoverActions.likeResource: discoverActions.unlikeResource; 
        break;
        case "collaborations":
            resourceUpdated.collaborationId = params.collaborationId;
            action = params.type == "like" ? collaborationActions.likeResource: collaborationActions.unlikeResource; 
        break;
        case "content":
            resourceUpdated.contentId = params.contentId;
            action = params.type == "like" ? postsActions.likeResource: postsActions.unlikeResource; 
        break;
        /*case "opportunity":

            resourceUpdated.opportunityId = params.opportunityId;
            action = params.type == "like" ? opportunityActions.likeResource: opportunityActions.unlikeResource; 
        break;
        */
        case "collaboration":
          resourceUpdated.collaborationId = params.collaborationId;
          action = params.type == "like" ? collaborationActions.likeResource: collaborationActions.unlikeResource; 
      break;
      case "collaboration":
        case "discover-collaboration":
            resourceUpdated.collaborationId = params.collaborationId;
            action = params.type == "like" ? discoverActions.likeResource: discoverActions.unlikeResource; 
        break;
        case "opportunity":
        case "discover-opportunity":
            resourceUpdated.opportunityId = params.opportunityId;
            action = params.type == "like" ? discoverActions.likeResource: discoverActions.unlikeResource; 
        break;
        case "discover-content":
            resourceUpdated.opportunityId = params.postId;
            action = params.type == "like" ? discoverActions.likeResource: discoverActions.unlikeResource; 
        break;
        default:
            resourceUpdated.postId = params.postId;
            action = params.type == "like" ? profileActions.likeResource: profileActions.unlikeResource; 

    }
    
    let payload = {
        resourceUpdated: resourceUpdated,
        postType: params.postType
    };
    console.log("params: ",params);
    console.log("payload: ",payload);
    dispatch(action(payload));
    getAllData(dispatch,params,navigation);
    

   /*navigation.navigate('CollaborationDetail', {
      collaborationId: params.collaborationId,
      forceUpdate: new Date().toLocaleString()
    });
    */

    
}