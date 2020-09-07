import React,  { useState } from 'react';
import styled from 'styled-components';
import logo from '../Layout/Headr/logo.svg'
import { Link } from 'react-router-dom';
import {IoMdCheckmarkCircleOutline} from 'react-icons/io'
import Axios from 'axios';
import { Spinner } from '../components/Loader';

export const StyledContainer = styled.div`
    width: 100%;
    display:flex;
    flex-direction: column;
    align-items: center;
    padding:2rem;
    @media screen and (max-width: 576px){
        padding: .2rem;
       
    }
   form{
     position: relative;
    box-shadow: var(--box-shadow);
    border-radius: 20px;
    padding: 2rem;
    width: 100%;
    @media screen and (max-width: 576px){
        padding: 0;
        box-shadow: none;
    }
   }
   fieldset{
    &[disabled]{
        opacity: 0.3;
    }
   }
   input,button{
       display: block;
       width: 100%;
       border: none;
       background: #222;
       padding: .2rem 1rem;
       color: #fff;
       margin-bottom: 1rem;
   }
   button{
       position: relative;
       margin-top: 1rem;
       background: var(--primary-color);
       transition: all .5s ease-in-out;
       font-weight: bolder;
     
       letter-spacing: 2px;
       &:hover{
           background: #222;
           color: var(--primary-color);
       }
       &:disabled{
           opacity:.3;
       }
   }

.error{
    color: var(--primary-color)
}
`
const Logo = styled.div`
     
     text-align: center;
     margin-bottom: 2rem;
     width: 100%;
     display: flex;
     justify-content: center;
     img{
         width: 3rem;
         height: 3rem;
     }
 
`
export const Success = styled.div`
    width: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 2rem;
    text-transform: capitalize;
    svg{
        color: var(--primary-color);
        font-size: 4rem;
    }
`

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState({error:'', success:''})
    const handleChange = (e)=>{
        setEmail(e.target.value)
    }
    const sendLink = async (e)=>{  
        e.preventDefault()
        setResult({error:'',success:''}) 
        setLoading(true)
        const isValidEmail = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) //thanks to https://www.w3resource.com/javascript/form/email-validation.php
       if(!isValidEmail){
           setLoading(false)
           return setResult({...result, error:'You have entered an invalid email address'})
       }
       
     try {
        const response = await Axios.post('http://192.168.1.7:5002/api/public/forgotPassword',{email})
        setResult({...result,success: response.data.message})
        setEmail('')
     } catch (err) {
         setResult({...result,error: err && err.response && err.response.data});
     }
     
       setLoading(false)
    } 
   
    return (
        <StyledContainer>
        
       <form onSubmit={sendLink} noValidate autoComplete='off'>
           <Logo><img src={logo} alt='Dev Blogger'/></Logo>
       {result && result.success ? 
       <Success>
          <p> {result.success}</p>
          <p><IoMdCheckmarkCircleOutline/></p>
       </Success>:
       <fieldset disabled={loading} aria-busy={loading}>
       <p>Enter your Email Address and we will send you a link to reset your password</p>
       <input autoFocus type="email" name="email" value={email} onChange={handleChange} placeholder='Email Address'/>
       {loading && <Spinner/>}
       <button type='submit'>{loading ? `Sending...` : `Send Link`}</button>
     {result && result.error && <p className='error'>{result.error}</p>}
      </fieldset>
       }
       </form>

      

        </StyledContainer>
    )
}
