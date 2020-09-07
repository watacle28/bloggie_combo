import React,{useState,useRef,useLayoutEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Avatar from 'react-avatar'
import styled from 'styled-components';
import {NavLink,Link,useLocation, matchPath} from 'react-router-dom';
import {useOnClickOutside} from './handleOutsideClick'
import {Burger} from './Burger'

import Logo from './logo.svg'
import { CLEAR_POST } from '../../redux/types';
import { getSingleBlogger } from '../../redux/actions/user';
import { FaHome } from 'react-icons/fa';
import { logout } from '../../redux/actions/auth';
  
const publicLinks = [
    {to:'/', label: 'Home'},
    // {to:'/blogs' ,label: 'Blogs'},
    {to:'/authors', label: 'Authors'},
    {to:'/contact', label: 'Contact'},
    {to: '/login' , label: 'Login'},
    {to: '/register', label: 'Register'},
   
]
 const authLinks = [
 
  {to:'/', label: <FaHome/>},
  {to:'/authors', label: 'Authors'},
  // {to:'/blogs' ,label: 'Blogs'},
  {to: '/editor', label: 'Add Post'},
  {to:'/contact', label: 'Contact'},
  {to: '', label: 'LogOut'},
 ]

const StyledHeadr = styled.div`
 display: flex;
  flex-direction: column;
  justify-content: center;
  background: #000000;
  opacity:.9;
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: fixed;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  z-index: 10;
  width: 100%;
  transform: ${({open})=> open ? 'translateX(0)' : 'translateX(-100%)'}  ;
  .active{
    color : #e24727
  }
 @media screen and (min-width: 577px){
      flex-direction: row;
      justify-content:space-between;
      align-items: center;
      height: 4vh;
      transform: translateX(0);
      max-width: 1200px;
 
  }
  @media screen and (min-width: 1201px){
      margin-left: calc((100vw - 1200px)/2)
  }
button{
  background: transparent;
  border: none;
  :focus{
    outline: none;
  }

}

  a{
    font-size: 1rem;
    text-transform: uppercase;
    padding: 1rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: white;
    
    text-decoration: none;
    transition: color 0.3s linear;
     .active{
       color:#e24727
     } 
      text-align: center;
    &:hover{
      color: #e24727;
    }
   
    @media screen and (min-width: 577px) {
        font-size: 1rem;
       letter-spacing: 2px;
    }
  }

`
const MobileHead = styled.div` 
   display:flex;
   position: fixed;
   align-items: center;
   z-index:11;
   width: 100%;
   margin: auto;
   padding: 2rem auto;
   justify-content: space-around;
   transition: all .6s ease-in-out;
   background: ${props => props.scrolled ? '#000000' : null};
   top: 0;
   height: 10vh;
   img{
     width: 30px;
     color: black;
   }
   @media screen and (min-width: 577px) {
     display: none
   }
 
`




export const Headr = (props) => {
  const location = useLocation()

   const [scrollStatus, setScrollStatus] = useState(false)
    const auth = useSelector(state=> state.auth)
    const loading = useSelector(state=>state.auth.loading)
    const dispatch = useDispatch()
    const [open , setOpen] = useState(false);
    const node = useRef();
    useOnClickOutside(node,()=>setOpen(false))
    const handleClick =(link) =>{
      if(link.label === 'LogOut'){
        dispatch(logout())
      }
      if(link.label === 'Add Post'){
        dispatch({type: CLEAR_POST})
      }
      else{
        return
      }
    }
    useLayoutEffect(() => {
      const onscroll = () =>{
        if(window.scrollY > 0){
            setScrollStatus(true)
        } 
       else setScrollStatus(false)
      }
      
      
      window.addEventListener('scroll', onscroll)
      return () => {
        window.removeEventListener('scroll', onscroll)
      };
    }, [])
    return (
        <div >
       <MobileHead scrolled ={scrollStatus}>
       <Burger open={open} setOpen={setOpen}/>
{!auth.loading && auth.authenticated && auth.userData && <Link  to={`/author/${auth.userData._id}`}><Avatar src={auth.userData.avatar} name={auth.userData.username } textSizeRatio={2} size={40}  round={true}/></Link>}

      <Link to='/'> <img src={Logo} alt="logo"/></Link>
       </MobileHead>
        <StyledHeadr ref ={node} open = {open}>
    {auth.authenticated ? authLinks.map((link,index)=><Link className={location.pathname === link.to ? 'active': ''}  onClick={()=>handleClick(link)} key={index} to={link.to}>
                  
                 
                    {link.label}</Link>):
                  publicLinks.map((link,index)=><Link className={location.pathname === link.to ? 'active' :''} key={index} to={link.to}>{link.label}</Link>)}
        </StyledHeadr>
        </div>
    )
}
