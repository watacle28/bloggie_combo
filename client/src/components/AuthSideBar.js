import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import Avatar from 'react-avatar';
import { FaFacebook, FaInstagram, FaLinkedinIn, FaSignOutAlt, FaTwitter } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '../redux/actions/auth';
import { getSingleBlogger } from '../redux/actions/user';
import { CustomButton } from './CustomButtom';



const StyledSideBar = styled(motion.section)`
        height:auto;
     width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
     padding: 0 1rem;
    
`
const UserInfo = styled(motion.div)`
   width: 100%;
   display: flex;
    justify-content: center;
    padding: 1rem;
    background: rgba(255,255,255,0.1);
    border-radius: 20px;
    border-left: 3px solid var(--primary-color);
    
    box-shadow: 1px 3px 3px rgba(255,255,255,0.1);
    .avatar{
       flex:1;
    }
    .links{
        flex: 2;
        display: flex;
        flex-direction: column;
        margin-left: 2rem;
        h6{
            color: var(--primary-color);
        }
        a{
            text-decoration: none;
            color: white;
            margin-right: 1rem;
        }
        div{
            color: rgba(255,255,255,0.2);
            span{
                color : white;
                background: var(--primary-color);
                mix-blend-mode: screen;
                border-radius: 200px;
                padding: .2rem .6rem;
                font-weight:bold;
               
            }
        }
    }
    `

export const AuthSideBar = ({user}) => {
const dispatch = useDispatch()
    const links = [
        {icon: <FaFacebook/>, href: 'https://facebook.com'},
        {icon: <FaTwitter/>, href: ' https://twitter.com'},
        {icon: <FaLinkedinIn/>, href: ' https://linkedin.com'},
        {icon: <FaInstagram/>, href: ' https://instagram.com'},

    ]
    useEffect(() => {
       dispatch(getSingleBlogger(user._id))
       
    }, [user])
    return (
        <StyledSideBar>
          <UserInfo>
          <Link to={`/author/${user._id}`}><Avatar className='avatar' size='100' round src={user && user.avatar} name={user && user.email}/></Link>
           
            <div className='links'>
           <Link to={`/author/${user._id}`}> <h6>{user && user.fullname}</h6></Link>
            <p>{user && user.role}</p>
                <ul>
    {links.map((link,i)=> (<a key={i} href={`${link.href}/cwangayi`} target='_blank' rel="noopener noreferrer">{link.icon}</a>))}
                </ul>
    <div> <span>{user && user.posts.length}</span>{user&& user.posts.length === 1 ? 'Post' : 'Posts'}</div>
            </div>
          </UserInfo>  
         
        <CustomButton><Link to='/editor'>Add new Post</Link></CustomButton>
        <div>
           <Link to='#' onClick={()=>dispatch(logout())}> <FaSignOutAlt/>Sign Out</Link>
        </div>
        </StyledSideBar>
    )
}
