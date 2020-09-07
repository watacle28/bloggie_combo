import React,{useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify'

import {StyledForm} from './Login';
import { register } from '../redux/actions/auth';
import { Link } from 'react-router-dom';
import { CustomButton } from '../components/CustomButtom';


export const Register = ({history}) => {
const [registerData, setRegisterData] = useState({username:'',email:'',password:'',cpassword:''})
const dispatch = useDispatch();
 const errors = useSelector(state => state.auth.errors)
 const prevPage = useSelector(state=>state.ui.url)
 
   
    const handleChange = (e)=>{
        setRegisterData(
           { ...registerData,[e.target.name]: e.target.value}
        )
     
    }

    const handleSubmit = async e => {
        e.preventDefault();
       const{password,cpassword} = registerData;
       const url = prevPage ? prevPage : '/'
      if(password !== cpassword){
         return toast('passwords do not match',{type:'error'})
      }
      dispatch(register(registerData,history,url))
    
       
      };
 
    return (
        <StyledForm autoComplete='off' onSubmit={handleSubmit}  noValidate>
       
        <h2>Register</h2>
        <label htmlFor="username">Username</label>
        <input autoFocus type="text" id='username' name='username' onChange={handleChange}/> 
        <label htmlFor="email">Email</label>
        <input type="email" id='email' name='email' onChange={handleChange}/>
        <label htmlFor="password">Password</label>
        <input type="password" id='password' name='password' onChange={handleChange}/>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" id='confirmPassword' name='cpassword' onChange={handleChange}/>
        <CustomButton secondary type='submit'>Register</CustomButton>
        <small>Already have an account? <Link to='/login'>Sign In</Link></small>

    </StyledForm>

    )
}
