import { ADD_CHANNEL, GET_ALL_CHANNELS, EDIT_CHANNEL, DELETE_CHANNEL, UPVOTE, UPVOTE_CHANNEL } from "../types";

const initialState = {
    channels:[],
    loading:true
}

export const channelReducer = (state=initialState , {type, payload}) =>{
    switch (type) {
        case GET_ALL_CHANNELS:
          return {
              ...state, channels:[...payload], loading: false
          }
    
        case ADD_CHANNEL:
          return {
                ...state, channels: [...state.channels, payload], loading: false
          }
        case UPVOTE_CHANNEL :
             //get index of item to upvote
             const index = state.channels.findIndex(channel => channel._id === payload._id)
             state.channels[index] = payload
            return{
                ...state, channels: [...state.channels], loading: false
            }
        case EDIT_CHANNEL:
            //get index of item to edit
            const i = state.channels.findIndex(channel => channel._id === payload._id)
            //assign new value to the item using the index
            state.channels[i] = payload
            return {
                ...state, channels: [...state.channels], loading: false
            }
        case DELETE_CHANNEL: 
            return {
                ...state, channels:[...state.channels.filter(channel => channel._id !== payload)]
            }
        default :
           return state
    }
}