import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux'
import {motion} from 'framer-motion'
import styled from 'styled-components';
import Avatar from 'react-avatar'
import pic from './clo.jpg'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaSignOutAlt, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CustomButton } from './CustomButtom';
import { logout } from '../redux/actions/auth';
import { getSingleBlogger } from '../redux/actions/user';



const StyledSideBar = styled(motion.section)`
   
     width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
            <Avatar className='avatar' size='100' round src={user && user.avatar} name={user && user.email}/>
            <div className='links'>
            <h6>{user && user.fullname}</h6>
            <p>{user && user.role}</p>
                <ul>
    {links.map((link,i)=> (<a href={`${link.href}/cwangayi`} target='_blank' noreferer>{link.icon}</a>))}
                </ul>
    <div> <span>{user && user.posts.length}</span>{user&& user.posts.length === 1 ? 'Post' : 'Posts'}</div>
            </div>
          </UserInfo>  
         
        <CustomButton><Link to='/editor'>Add new Post</Link></CustomButton>
        <div>
           <Link onClick={()=>dispatch(logout())}> <FaSignOutAlt/>Sign Out</Link>
        </div>
        </StyledSideBar>
    )
}
