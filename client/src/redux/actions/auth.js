import {REGISTER_FAILURE,REGISTER_SUCCESS,LOGIN_SUCCESS,LOGOUT,LOADING, LOGIN_FAILURE,SET_ERRORS, USER_LOADED,ISAUTH, PROFILE_UPDATE_SUCCESS, PROFILE_UPDATE_FAILURE} from '../types';
import axios from 'axios';
import {toast} from 'react-toastify'
import {setAuthToken} from '../../utils/setAtuthToken'

 const config = {
        headers : {
            "Content-type": "application/json"
        }
    }
axios.defaults.baseURL = 'http://192.168.1.7:5002/api'

    

export const login = (body,history,url) => async dispatch =>{
    
     try {
        const res= await axios.post('/auth/login',body,config);
       console.log({res});
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.user
        })
        localStorage.setItem('token',res.data.token);
         dispatch({type: ISAUTH})
         return history.push(url)
      
     

    } catch (error) {
         localStorage.removeItem('token')
         delete axios.defaults.headers.common['auth-token']
         let err = error.response.data.errors 
            err.map(err => toast(err,{type:'error'}))
        dispatch({
            type: LOGIN_FAILURE,
            payload: error.response.data.errors
        })
       
      
    }
}
export const register = (body,history,url) => async dispatch =>{

    try {
         const res = await axios.post('/auth/register',body,config);
         dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data.newUser
        })
        
        localStorage.setItem('token',res.data.token);
     
       dispatch({type: ISAUTH})
       return history.push(url)

    } catch (error) {
        let err = error.response.data.errors 
        err.map(err => toast(err,{type:'error'}))
      
        dispatch({
            type: REGISTER_FAILURE,
            payload: error.response.data.errors
        })
        
        delete axios.defaults.headers.common['auth-token']
        localStorage.removeItem('token')
    }
}

export const  loadUserData = () => async dispatch =>{
        const token = localStorage.getItem('token')
       
        try {
            setAuthToken(token)
            const userData = await axios.get('/user/me');
            
            dispatch({type: ISAUTH})
            dispatch({
                type: USER_LOADED,
                payload: userData.data.user
        })
            
        } catch (error) {
            dispatch({
                type: SET_ERRORS,
                payload: error.response.data
            })
        }
    }

    export const logout = ()=> dispatch =>{
        
          
        dispatch({type: LOGOUT})
        
        delete axios.defaults.headers.common['auth-token']
        localStorage.removeItem('token')
       

    }

    export const updateProfile = (data,history,id) => async dispatch =>{
        const token = localStorage.getItem('token')
       
      
        try {
            setAuthToken(token)
            const userData = await axios.put('/user/me', data)
            
            dispatch({
                type: PROFILE_UPDATE_SUCCESS,
                payload: userData.data.user
        })
          history.push(`/author/${id}`)
            
        } catch (error) {
            dispatch({
                type: PROFILE_UPDATE_FAILURE,
                payload: error.response?.data
            })
        }
    }

    //SEND RESET PASSWORD LINK
    