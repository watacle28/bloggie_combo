import React, { useState } from 'react';
import styled from 'styled-components';
import pic from './bloggie_contact.jpg'
import { FaLocationArrow, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapPin, FaMapMarker, FaMapMarkerAlt, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CustomButton } from '../components/CustomButtom';
import Axios from 'axios';

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
    const [data, setData] = useState({name:'',email:'',message:''})
    const Socio = [
        {icon: <FaFacebook/>, link: 'https://facebook.com/cwangayi'},
        {icon: <FaTwitter/>, link: 'https://twitter.com/watacle28'},
        {icon: <FaInstagram/>, link: 'https://instagram.com/cleopatros'},
        {icon: <FaLinkedinIn/>, link: 'https://linkedin.com/sirwatacle'}
    ]

    const handleDataInput = (e)=>{
        const {name,value} = e.target
        setData({...data, [name]: value})
    }

    const submitForm = async(e)=>{
        e.preventDefault();
    
        // await Axios.post("https://formspree.io/mbjzpwlp",data)
     
    }

    return (
        <StyledContainer>

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
         
               <form  onSubmit={submitForm}  autoComplete='off' className="contact-form">
                    <label htmlFor="name">
                    <input type="text" value={data.name} onChange={handleDataInput} id="name" name="name" placeholder='Your Name' /> </label>
                    <label htmlFor="email">
                    <input type="email" value={data.email} onChange={handleDataInput} name="email" id="email" placeholder='email address'/></label>
                    <textarea value={data.message} onChange={handleDataInput} name="message" cols="30" rows="10" placeholder='Your message here'></textarea>
                    <CustomButton>Send Message</CustomButton>

               </form>
        
        </StyledContainer>
    )
}
