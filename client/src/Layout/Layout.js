import React from 'react';
import {useSelector} from 'react-redux'

import {Footer} from './Footer'
import styled from 'styled-components';
import { Headr } from './Headr/Headr';
import { AuthSideBar } from '../components/AuthSideBar';
import { GuestSideBar } from '../components/GuestSideBar';
import { Resources } from '../components/Resources';


const StyledLayout= styled.div`
width: 100vw;
height: min-content;
position: relative; 
display: flex;
 justify-content: center;

 margin: auto;
 margin-top: 10vh;
 margin-bottom: 5vh;
 

  .sidebar{
      position: relative;
    display: none;
    @media screen and (min-width: 700px) {
            padding: 2rem 0 ;
            display:flex;
            flex-direction:column;
            justify-content:center;
            max-width: 500px;
            height: min-content;
            border: 1px solid rgba(255,255,255,0.1);
            
        }
    }
    .children{
        padding: 2rem 0 ;
        position: relative;
        width: 100%;
        border: 1px solid rgba(255,255,255,0.1);
        @media screen and (min-width: 700px) {
         width: 58%;
         max-width: 700px;
         display: flex;
         justify-content: center;
            
            
        }
    }

`

export const Layout = (props) => {
  const isLoggedIn = useSelector(state => state.auth.authenticated)
  const user = useSelector(state => state.auth.userData)
  console.log({user});
    return (
        <StyledLayout>
        <Headr />
      
        <div className="sidebar"> 
        {isLoggedIn ? <AuthSideBar user={user}/>: <GuestSideBar/>} 
        <Resources/>
        </div>
        <div className="children">{props.children}</div>
    
         <Footer />  
            
        </StyledLayout>
    )
}
