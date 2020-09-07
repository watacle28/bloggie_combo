import axios from 'axios';
import { GET_ALL_RESOURCES, ADD_RESOURCE, EDIT_RESOURCE, DELETE_RESOURCE, GET_ALL_CHANNELS, ADD_CHANNEL, GET_ALL_TWITACCS, ADD_TWITACC, EDIT_TWITACC, DELETE_TWITACC, GET_ALL_COURSES, ADD_COURSE, EDIT_COURSE, DELETE_COURSE, SET_ERRORS, UPVOTE_RESOURCE, UPVOTE_CHANNEL, UPVOTE_TWITACC, UPVOTE_COURSE, EDIT_CHANNEL, DELETE_CHANNEL } from '../types';

import {
    toast
} from 'react-toastify'

import {
    setAuthToken
} from '../../utils/setAtuthToken';


axios.defaults.baseURL = 'http://192.168.1.7:5002/api'

//*****RESOURCE ACTIONS***************************************************************
export const getAllResources = () => async dispatch => {
    try {

        const res = await axios.get('/public/resources')
        const resources = res.data.resources

        dispatch({
            type: GET_ALL_RESOURCES,
            payload: resources
        })
    } catch (error) {
        // dispatch({type: POST_NOT_FOUND})
    }
}

export const addResource = (resource) => async dispatch =>{
        try {
            const token = localStorage.getItem('token')
            setAuthToken(token)
            const res = await axios.post('/external/resource',resource)
            const newResource = res.data.resource;

            dispatch({
                type: ADD_RESOURCE,
                payload: newResource
            })
        } catch (error) {
            console.log({error});
        }
}

export const editResource = (src, id) => async dispatch =>{
        try {
            const token = localStorage.getItem('token')
            setAuthToken(token)
            const res = await axios.put(`external/resource/${id}`, src);
            const edited = res.data.resource
            dispatch({type: EDIT_RESOURCE, payload: edited})
        } catch (error) {
            console.log({error});
        }
}

export const deleteResource = (id) => async dispatch =>{
    const token = localStorage.getItem('token')
    setAuthToken(token)
        try {
            const res = await axios.delete(`external/resource/${id}`);
            const msg = res.data.msg;
            dispatch({type:DELETE_RESOURCE, payload:id})
        } catch (error) {
            console.log({error});
        }
}

export const upVoteResource = (id) => async dispatch =>{
    const token = localStorage.getItem('token')
    setAuthToken(token)
    try {
        const res = await axios.post(`external/resource/upvote/${id}`)
        console.log({res})
        dispatch ({type: UPVOTE_RESOURCE, payload: res.data.response})

    } catch (err) {
        dispatch({type: SET_ERRORS, payload:err.response?.data})
    }
}

//*****CHANNEL ACTIONS***************************************************************

export const getAllChannels = () => async dispatch => {
    try {
        const res = await axios.get('/public/channels')
        const channels = res.data.channels

        dispatch({
            type: GET_ALL_CHANNELS,
            payload: channels
        })
    } catch (error) {
        // dispatch({type: POST_NOT_FOUND})
    }
}

export const addChannel = (channel) => async dispatch =>{
    const token = localStorage.getItem('token')
    setAuthToken(token)
        try {
            const res = await axios.post('/external/channel',channel)
            const newChannel = res.data.channel;

            dispatch({
                type: ADD_CHANNEL,
                payload: newChannel
            })
        } catch (error) {
            console.log({error});
        }
}

export const editChannel = (channel, id) => async dispatch =>{
    const token = localStorage.getItem('token')
    setAuthToken(token)
        try {
            const res = await axios.put(`external/channel/${id}`, channel);
            const edited = res.data.updatedChannel
            dispatch({type: EDIT_CHANNEL, payload: edited})
        } catch (error) {
            console.log({error});
        }
}

export const deleteChannel = (id) => async dispatch =>{
    const token = localStorage.getItem('token')
    setAuthToken(token)
        try {
            const res = await axios.delete(`external/channel/${id}`);
            const msg = res.data.msg;
            dispatch({type:DELETE_CHANNEL , payload:id})
        } catch (error) {
            console.log({error});
        }
}

export const upVoteChannel = (id) => async dispatch =>{
   
    const token = localStorage.getItem('token')
    setAuthToken(token)
    try {
        const res = await axios.post(`external/channel/upvote/${id}`)
        
        dispatch ({type: UPVOTE_CHANNEL, payload: res.data.response})

    } catch (error) {
        dispatch({type: SET_ERRORS, payload:error.response.data})
    }
}
//*************8*******TWITTER ACC ACTIONS***************************************************** */
export const getAllTwitAccs = () => async dispatch => {
    const token = localStorage.getItem('token')
    setAuthToken(token)
    try {
        const res = await axios.get('/public/twitters')
        const twitaccs = res.data.twitters
        console.log({twitaccs})
        dispatch({
            type: GET_ALL_TWITACCS,
            payload: twitaccs
        })
    } catch (error) {
        // dispatch({type: POST_NOT_FOUND})
    }
}

export const addTwitAcc = (twitacc) => async dispatch =>{
    const token = localStorage.getItem('token')
    setAuthToken(token)
    console.log({twitacc});
        try {
            const res = await axios.post('/external/twitacc',{username:twitacc.username})
            const newTwitAcc = res.data.twitacc;

            dispatch({
                type: ADD_TWITACC,
                payload: newTwitAcc
            })
        } catch (error) {
            console.log({error});
        }
}

export const editTwitAcc = (twitacc, id) => async dispatch =>{
    const token = localStorage.getItem('token')
    setAuthToken(token)
        try {
            const res = await axios.put(`external/twitacc/${id}`, twitacc);
            const edited = res.data.updatedAcc
            dispatch({type: EDIT_TWITACC, payload: edited})
        } catch (error) {
            console.log({error});
        }
}

export const deleteTwitAcc = (id) => async dispatch =>{
    const token = localStorage.getItem('token')
    setAuthToken(token)
        try {
            const res = await axios.delete(`external/twitacc/${id}`);
            const msg = res.data.msg;
            dispatch({type:DELETE_TWITACC, payload:id})
        } catch (error) {
            console.log({error});
        }
}

export const upVoteTwitAcc = (id) => async dispatch =>{
    const token = localStorage.getItem('token')
    setAuthToken(token)
    console.log(id)
    try {
        const res = await axios.post(`external/twitacc/upvote/${id}`)
        console.log(res.data.response)
        dispatch ({type: UPVOTE_TWITACC, payload: res.data.response})

    } catch (error) {
        dispatch({type: SET_ERRORS, payload:error.response?.data})
    }
}
/************************************COURSE ACTIONS*************************************** */

export const getAllCourses = () => async dispatch => {
    try {
        const res = await axios.get('/public/courses')
        const courses = res.data.courses

        dispatch({
            type: GET_ALL_COURSES,
            payload: courses
        })
    } catch (error) {
        // dispatch({type: POST_NOT_FOUND})
    }
}

export const addCourse = (course) => async dispatch =>{

    const token = localStorage.getItem('token')
  
    setAuthToken(token)
   
        try {
            const res = await axios.post('/external/course',course)
            const newCourse = res.data.course;

            dispatch({
                type: ADD_COURSE,
                payload: newCourse
            })
        } catch (error) {
            console.log({error});
        }
}

export const editCourse = (course, id) => async dispatch =>{
    const token = localStorage.getItem('token')
    setAuthToken(token)
        try {
            const res = await axios.put(`external/course/${id}`, course);
            const edited = res.data.updatedCourse
            dispatch({type: EDIT_COURSE, payload: edited})
        } catch (error) {
            console.log({error});
        }
}

export const deleteCourse = (id) => async dispatch =>{
    const token = localStorage.getItem('token')
    setAuthToken(token)
        try {
            const res = await axios.delete(`external/course/${id}`);
            const msg = res.data.msg;
            dispatch({type:DELETE_COURSE, payload:id})
        } catch (error) {
            console.log({error});
        }
}

export const upVoteCourse = (id) => async dispatch =>{
    const token = localStorage.getItem('token')
    setAuthToken(token)
    try {
        const res = await axios.post(`external/course/upvote/${id}`)
        dispatch ({type: UPVOTE_COURSE, payload: res.data.response})

    } catch (error) {
        dispatch({type: SET_ERRORS, payload:error.response.data})
    }
}