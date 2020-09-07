import {
    GET_ALL_POSTS,
    UNLIKE_POST,
    GET_SINGLE_POST,
    POST_NOT_FOUND,
    PUBLISH_SUCCESS,
    ADD_COMMENT,
    LOADING,
    GET_COMMENTS,
    EDIT_SUCCESS,
    REMOVE_POST,
    LIKE_POST,
    EDIT_COMMENT,
    REMOVE_COMMENT,
    LIKE_COMMENT,
    UNLIKE_COMMENT,
    GET_POST_BY_TAG,
    SET_ERRORS
} from '../types';
import axios from 'axios';
import {
    toast
} from 'react-toastify'

import {
    setAuthToken
} from '../../utils/setAtuthToken';
import {
    loadUserData
} from './auth';

axios.defaults.baseURL = 'http://192.168.1.7:5002/api'


export const getAllPosts = (page,limit) => async dispatch => {
    try {
        dispatch({
            type: LOADING
        })
        const res = await axios.get(`/public/blogs?page=${page}&limit=${limit}`)
        const posts = res.data
        
        dispatch({
            type: GET_ALL_POSTS,
            payload: posts
        })
    } catch (error) {
        // dispatch({type: POST_NOT_FOUND})
    }
}

export const getPostByTag = (tag) => async dispatch => {
    try {
        const res = await axios.get(`/public/blogs/${tag}`)
        const posts = res.data

        dispatch({
            type: GET_POST_BY_TAG,
            payload: posts
        })
    } catch (error) {
         dispatch({type: POST_NOT_FOUND})
    }
}


export const getSinglePost = (id) => async dispatch => {
    try {
        dispatch({
            type: LOADING
        })
        const res = await axios.get(`public/blog/${id}`)
        const payload = res.data.blog
        dispatch({
            type: GET_SINGLE_POST,
            payload
        })
        dispatch({
            type: GET_COMMENTS,
            payload: payload.comments
        })

    } catch (error) {
        dispatch({
            type: POST_NOT_FOUND,
            payload: error
        })
    }
}

export const createPost = (post, history) => async dispatch => {
    try {

        const token = localStorage.getItem('token')
        setAuthToken(token)
        const res = await axios.post('/blog/create', post)

        dispatch({
            type: PUBLISH_SUCCESS,
            payload: res.data.newPost
        })
        history.push(`/post/${res.data.newPost._id}`)

    } catch (error) {
        console.log(error)
    }
}

export const editPost = (data, id, history) => async dispatch => {
    try {
        const token = localStorage.getItem('token')
        setAuthToken(token)
        const res = await axios.put(`blog/edit/${id}`, data)
       console.log({res});
        dispatch({
            type: LOADING
        })
        
        dispatch({
            type: EDIT_SUCCESS,
            payload: res.data.editedPost
        })
        history.push(`/post/${id}`)

    } catch (error) {
        console.log(error);
    }
}
export const deletePost = (id, history) => async dispatch => {
    try {
        const token = localStorage.getItem('token')
        setAuthToken(token)
        const res = await axios.delete(`blog/post/${id}`)
        toast(res.data.msg, {
            type: 'success'
        })
      
        dispatch({
            type: REMOVE_POST,
            payload: id
        })
        history.push(`/`)

    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id, userId) => async dispatch => {

    try {
        const token = localStorage.getItem('token')
        setAuthToken(token)
        const res = await axios.post(`blog/like/${id}`)

        dispatch({
            type: LIKE_POST,
            payload: res.data.user
        })
    } catch (error) {
        console.log(error);
    }
}

export const unlikePost = (id, userId) => async dispatch => {
    try {
        const token = localStorage.getItem('token')
        setAuthToken(token)
        const res = await axios.delete(`blog/like/${id}`)
        dispatch({
            type: UNLIKE_POST,
            payload: res.data.user
        })
    } catch (error) {
        console.log(error);
    }
}

export const addComment = (comment, id) => async dispatch => {
    try {
        const token = localStorage.getItem('token')
        setAuthToken(token)
        const res = await axios.post(`blog/comment/${id}`, {
            comment
        })

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })


    } catch (error) {
        console.log(error)
    }
}

export const editComment = (comment, id) => async dispatch => {
    try {
        const token = localStorage.getItem('token')
        setAuthToken(token)
        const res = await axios.put(`blog/comment/edit/${id}`, {
            comment
        })

        dispatch({
            type: EDIT_COMMENT,
            payload: res.data.commentToEdit
        })


    } catch (error) {
        console.log(error)
    }
}


export const likeComment = (commentId, userId) => async dispatch => {
    try {
        const token = localStorage.getItem('token')
        setAuthToken(token)
        const res = await axios.post(`blog/comment/like/${commentId}`)
        console.log({
            likes: res.data
        });
        const likes = res.data.likes
        dispatch({type: LIKE_COMMENT, payload: {commentId,likes}})
        //     dispatch({type:LIKE_COMMENT, payload: {commentId, userId}})
    } catch (error) {
        console.log({
            error
        });
    }


}

// export const unLikeComment = (commentId,userId)=> async dispatch =>{
//     try {
//         const token = localStorage.getItem('token')
//         setAuthToken(token)
//         await axios.delete(`blog/comment/${commentId}`)
//         dispatch({type: UNLIKE_COMMENT, payload: {commentId, userId}})
//     } catch (error) {
//         console.log({error});
//     }


// }


export const removeComment = (id) => async dispatch => {
    try {
        const token = localStorage.getItem('token')
        setAuthToken(token)
        await axios.delete(`blog/comment/${id}`)
        dispatch({
            type: REMOVE_COMMENT,
            payload: id
        })
    } catch (error) {
        console.log({
            error
        });
    }

}