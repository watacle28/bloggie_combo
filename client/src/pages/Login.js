import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import styled from 'styled-components';
import { login } from '../redux/actions/auth';
import { Link } from 'react-router-dom';
import { CustomButton } from '../components/CustomButtom';

export const StyledForm = styled.form`
  width: 80vw;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
  position:fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  @media screen and (min-width: 700px){
      width: 100%;
      margin: auto;
      position: absolute;
      top: 30%;
  }
 
  h2{
      color: #e24727;
      margin-bottom: 2rem;
      text-transform: uppercase;
      font-weight: 400;
  }
  label{
      /* display: block; */
      margin: 0;
      margin-bottom: .5rem;
      opacity: .6;
      color: white;
  }
  input{ 
      width: 100%;
      background-color: transparent;
      padding: .3rem 1rem;
      color: white;
      margin-bottom: 1rem;
      border: 1px solid #e24727;
      border-radius: 200px;
      transition: all .5s ease-in-out;
      @media screen and (min-width: 576px){
          width:60%;
      };
      :focus{
          outline: none;
          transform: scale(1.02);
      }
  }
  button{
     width: 100%;
      @media screen and (min-width: 576px){
          width:60%;
      };

    }
  a{
      color: white
  }
  small{
      color: #222;
      margin-right: 1rem;
  }
  .forgotPwd{
      margin-top: 1rem;
  }
`

export const Login = (props) => {
    
    const [loginData, setLoginData] = useState({email:'', password:''})
    const dispatch = useDispatch();
    const errors = useSelector(state => state.auth.errors)
    const prevPage = useSelector(state=>state.ui.url)

      const handleChange = (e)=>{
            setLoginData({
                ...loginData,[e.target.name]: e.target.value
            })
      }

     const handleSubmit =  (e)=>{
         e.preventDefault();
         const url = prevPage ? prevPage : '/'
        dispatch(login(loginData,props.history, url))
        console.log(errors);
     }
  
    return (
    
            <StyledForm autoComplete='off' onSubmit={handleSubmit} noValidate >
                <h2>Login</h2>
                <label htmlFor="email">Email</label>
                <input autoFocus type="email" id='email' name='email' placeholder='email ' value={loginData.email} onChange={handleChange}/>
                <label htmlFor="password">Password</label>
                <input  type="password" id='password' name='password' placeholder='password' value={loginData.password} onChange={handleChange}/>
                <CustomButton secondary type='submit'>Log In</CustomButton>
                <small>New here? <span style={{marginLeft:'5px'}}><Link to='/register'>Create an account</Link></span></small>
                <div className="forgotPwd">
                <Link to='/forgotPassword'>Forgot Password?</Link>
                </div>
            </StyledForm>
    
    )
}
