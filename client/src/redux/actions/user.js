import axios from 'axios';
import { GET_BLOGGERS, GET_SINGLE_BLOGGER, SET_ERRORS } from '../types';

axios.defaults.baseURL = 'http://localhost:5002/api'

export const getAllBloggers = () => async dispatch=>{
    try {
        const res = await axios.get('/public/bloggers')
        
        dispatch({type: GET_BLOGGERS, payload: res.data.users})


    } catch (error) {
        console.log({error});
    }
}

export const getSingleBlogger = (userId) =>async dispatch =>{
    try {
        const res = await axios.get(`/public/blogger/${userId}`)
        console.log({res});
        dispatch({type: GET_SINGLE_BLOGGER, payload: res.data.blogger})
    } catch (error) {
        dispatch({type : SET_ERRORS, payload : error.response})
        console.log({error});
    }
}

