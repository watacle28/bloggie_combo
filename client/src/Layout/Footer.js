import React from 'react';
import styled from 'styled-components';
import logo from './Headr/logo.svg'

const StyledFoot = styled.div`
width: 100%;
padding-top: 1rem;
height: min-content;
background: #000000;
position: fixed;
bottom: 0;
left:0;
z-index: 10;
display: flex;
color: white;
flex-direction: column;
align-items: center;
font-size: x-small;
justify-content: center;
`

const Copyright = styled.div`
display: flex;
img{
    width:1rem;
    margin-right: 1rem;
}
 p{
    margin:0;
 }
`
const Contact = styled.ul`
list-style: none;
color: rgba(255,255,255,.2);
display: flex;
justify-content: space-between;
/* a{
 
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    :hover{
        border-bottom: #e24727 !important;
    }
}; */
li{margin: .5rem}
`
const contactLinks = [
    {name: 'Facebook',
    link: 'https://www.facebook.com/cwangayi'},
    {name: 'Twitter',
    link: 'https://www.twitter.com/watacle28'},
    {name: 'LinkedIn',
    link: 'https://www.linkedin.com/cwangayi'},
    {name: 'Instagram',
    link: 'https://www.instagram.com/cleopatros'},
    
]

export const Footer = () => {
    return (
        <StyledFoot>
        <Copyright>
            <p> <img src={logo} alt="logo"/> Dev_Blogger <span> © {new Date().getFullYear()} 
                </span></p>
         </Copyright>
            <Contact>
    {contactLinks.map((contact,i)=><li key={i}><a href={contact.link}>{contact.name}</a></li>)}
            </Contact>    
       
        </StyledFoot>
    )
}
