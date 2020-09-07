import { GET_BLOGGERS, GET_SINGLE_BLOGGER } from "../types";

const initialState = {
    bloggers: [],
    currentBlogger: null,
    loading: true,
    errors: []

}

export const bloggerReducer = (state = initialState, {type,payload})=>{
    switch (type) {
       case GET_BLOGGERS :
           return {
               ...state, bloggers: payload, currentBlogger:null,loading: false, errors: null 
           }
        case GET_SINGLE_BLOGGER:
            return{
                ...state, loading: false, errors: [], currentBlogger: payload
            }
        default:
            return state
    }
}