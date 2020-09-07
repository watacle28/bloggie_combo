import { GET_ALL_TWITACCS, ADD_TWITACC, EDIT_TWITACC, DELETE_TWITACC, UPVOTE, UPVOTE_TWITACC } from "../types"

const initialState = {
    twitterAccs:[],
    loading:true
}

export const twitterAccReducer = (state=initialState , {type, payload}) =>{
    switch (type) {
        case GET_ALL_TWITACCS:
          return {
              ...state, twitterAccs:[ ...payload], loading: false
          }
    
        case ADD_TWITACC:
          return {
                ...state, twitterAccs: [...state.twitterAccs, payload], loading: false
          }
        case UPVOTE_TWITACC :
            //get index of item to upvote
            const index = state.twitterAccs.findIndex(twitAcc => twitAcc._id === payload._id)
            state.twitterAccs[index] = payload
            return{
                ...state, twitterAccs: [...state.twitterAccs], loading: false
        }
        case EDIT_TWITACC:
            //get index of item to edit
            const i = state.twitterAccs.findIndex(acc => acc._id === payload._id)
            //assign new value to the item using the index
            state.twitterAccs[i] = payload
            return {
                ...state, twitterAccs: [...state.twitterAccs], loading: false
            }
        case DELETE_TWITACC: 
            return {
                ...state, twitterAccs:[...state.twitterAccs.filter(acc => acc._id !== payload)]
            }
        default :
           return state
    }
}