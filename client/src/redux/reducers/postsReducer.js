import {GET_ALL_POSTS, GET_SINGLE_POST, POST_NOT_FOUND, PUBLISH_SUCCESS, ADD_COMMENT, LOADING, EDIT_SUCCESS, CLEAR_POST, REMOVE_POST, LIKE_POST, UNLIKE_POST, GET_POST_BY_TAG} from '../types';

const initialState = {
    posts: {
      blogs:[]
    },
    errors: null,
    currentPost: null,
    loading: true
}


export const postsReducer = (state = initialState,{type,payload})=>{
    switch (type) {
        case LOADING:
            return {
                ...state, loading: true
            }
        case GET_ALL_POSTS:
            return{
                ...state,posts:payload,errors:null, loading: false
            }
        case GET_POST_BY_TAG:
            
            return{
                ...state,posts:payload,errors:null, loading: false
                }    
         case GET_SINGLE_POST:
             
             return {
              ...state,errors: null,loading: false, currentPost: payload
             } 
         case POST_NOT_FOUND:
             return{
                 ...state, errors: payload, loading: false, currentPost: null
             }
         case PUBLISH_SUCCESS:
         case EDIT_SUCCESS :
            console.log(state,payload)
             let currentPost = {...state.currentPost, ...payload}
             return {
                 ...state, errors: null, loading: false, currentPost
             } 
        case REMOVE_POST:
            return {
                ...state, loading: false, errors: null, posts:{...state.posts, blogs: [...state.posts.blogs.filter(post => post._id !== payload)]}
            }     
        case CLEAR_POST:
            return{
                ...state, currentPost: null, loading: false
            }
        case LIKE_POST:
            return{
                ...state, errors: null, loading: false, currentPost: {...state.currentPost, likes: [...state.currentPost.likes,payload]}
            }
        case UNLIKE_POST:
            return{
                ...state, errors: null, loading: false, currentPost: {...state.currentPost, likes: [...state.currentPost.likes.filter(like => like !== payload )]}

            }    
        default:
            return state;
    }
}