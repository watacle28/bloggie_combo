import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { FaFacebook, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaTwitter } from 'react-icons/fa';
import styled from 'styled-components';
import { CustomButton } from '../components/CustomButtom';
import pic from './bloggie_contact.jpg';

const StyledContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    .profile{
        width: 100%;
        margin-bottom: 2rem;
        display: flex;
        padding: 1rem;
        border: 1px solid rgba(255,255,255,.1);
        border-radius: 20px;
        box-shadow: var(--box-shadow);
        justify-content: space-between;
        @media screen and (max-width: 700px){
            flex-direction: column;
        }
        .image{
            width: 100%;
            height: min-content;
            flex: 1;
            margin-right: 2rem;
            /* border: 5px solid rgba(255,255,255,.1); */
            border-radius: 50%;
            padding: .5rem;
            background: rgba(255,255,255,.1);
            max-width:150px;
            img{
                width:100%;
                border-radius: 50%;
              
            }
        }
        .info{
            flex: 3;
            span{
                font-weight: 700;
                color: var(--primary-color)
            }
        }
        .loc{
            display: flex;
            align-items: center;
            width: 60%;
            box-shadow: var(--box-shadow);
            border-radius: 200px;
            padding: .2rem 1rem;
            margin-bottom: 1rem;
            svg{
                opacity: .2;
            }
        }
        .socio{
            width: 100%;
            display: flex;
            svg{
                margin-right: 1rem;
            }
            a{
               opacity: .2;
            }
            
        }
    }  
    h4{
            border-left: 5px solid var(--primary-color);
            padding-left: 2px;
            margin-bottom: 2rem;
        }
    .contact-form{
        display: flex;
        flex-direction: column;
      
       label{
           display: flex;
           justify-content: space-between;
           width: 100%;
       }
        input,textarea{
            background: transparent;
            box-shadow: inset 2px 2px 10px rgba(255,255,255,.1), inset -2px -2px 10px rgba(255,255,255,.2);
            border-radius: 200px;
            padding : .2rem 1rem;
            
             color: white;
             border: none;
             &:focus{
                 outline: none;
             }
        }
        textarea{
            padding-top: .5rem;
            border-radius: 10px;
        }
    }
    button{
        width: max-content;
        align-self: flex-end;
    }
    `

export const Contact = () => {
    const submitForm =  (ev)=> {
        ev.preventDefault();
        setLoading(true)
        const form = ev.target;
        const data = new FormData(form);
        const xhr = new XMLHttpRequest();
        xhr.open(form.method, form.action);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = () => {
          if (xhr.readyState !== XMLHttpRequest.DONE) return;
          if (xhr.status === 200) {
            setLoading(false)
            form.reset();
            setStatus("SUCCESS");
            
          } else {
            setLoading(false)
            setStatus("ERROR")

          }
        };
        xhr.send(data);
      }
  
    const [status, setStatus] = useState("")
    const [loading, setLoading] = useState(false)
    const Socio = [
        {icon: <FaFacebook/>, link: 'https://facebook.com/cwangayi'},
        {icon: <FaTwitter/>, link: 'https://twitter.com/watacle28'},
        {icon: <FaInstagram/>, link: 'https://instagram.com/cleopatros'},
        {icon: <FaLinkedinIn/>, link: 'https://linkedin.com/sirwatacle'}
    ]

   

  

    return (
        <StyledContainer>
             <Helmet>
          <title>Contact</title>
          <meta name="description" content="Contact Page" />
         
        </Helmet>
<h4>About Me</h4>
           <div className="profile">
             <div className="image">
                 <img src={pic} alt="Cleo Wangayi"/>
             </div>
             <div className="info">
                 
                 <p>Hi, My name is <span>Cleopas Tawanda Wangayi</span> and I am a self taught Javascript fullstack web developer</p>
                 <div className="loc">
                     <FaMapMarkerAlt/> <span>Cape Town, South Africa</span>
                 </div>
                 <ul className="socio">
                   {Socio.map((link,i)=>(
                       <li key={i}>
                           <a href={link.link} target='_blank'>{link.icon}</a>
                       </li>
                   ))}  
                 </ul>
             </div>
           </div>
           <h4>Send me a message</h4>
         
               <form  onSubmit = {submitForm} action = 'https://formspree.io/mbjzpwlp' method = 'POST' autoComplete= 'off' className="contact-form">
                    <label htmlFor="name">
                    <input type="text"  id="name" name="name" placeholder='Your Name' /> </label>
                    <label htmlFor="email">
                    <input type="email"   name="email" id="email" placeholder='email address'/></label>
                    <textarea  name="message" cols="30" rows="10" placeholder='Your message here'></textarea>
                    
                             
    {status === "SUCCESS" ? <p>Message submitted.We will be in touch. Thank You!</p> :<CustomButton disabled={loading} >{loading ? 'Submitting' : 'Submit'}</CustomButton>}
              {status === "ERROR" && <p>Ooops! There was an error.</p>}
               </form>
        
        </StyledContainer>
    )
}
