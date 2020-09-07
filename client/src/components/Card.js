import React, {useLayoutEffect,useState,useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Link, useHistory} from 'react-router-dom';
import {motion} from 'framer-motion';
import styled from 'styled-components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import img from './bg.jpg';
import avatar from './clo.jpg';
import {} from 'react-icons';
import Ava from 'react-avatar';
import { FaEdit, FaTrash, FaRegComments, FaRegHeart } from 'react-icons/fa';
import { deletePost, getPostByTag } from '../redux/actions/posts';
import { CustomButton } from './CustomButtom';
import { Spinner } from './Loader';

const StyledCard = styled(motion.div)`
width: 100%;
overflow: hidden;
position: relative;
border-radius: 10px;
border: 1px solid rgba(255,255,255,0.05);
font-size: 80%;
transition: all 1s ease-in-out;
margin: .5rem auto;
padding-top: 2rem;
box-shadow: 0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12),0 8px 10px -5px rgba(0,0,0,.2);
@media screen and (min-width: 700px){
width: 80%;
}
.author{
  position: absolute;
  left: 2%;
  top: 5%;
  z-index:10;
  .name{
    margin-left: 1rem;
    border: 1px solid rgba(255,255,255,0.2);
    border-radius:200px;
    padding: .2rem 1rem;
    letter-spacing: 2px;
    text-transform: capitalize;
    opacity: .5;
  }
}
:last-child{
  margin-bottom: 1rem;
}
svg{
  margin-right: .5rem;
  width: 1rem;
  height: 1rem;
}
a{
  color: white;
  text-decoration: none;
}
img{
width: 100%;

box-shadow: 0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12),0 8px 10px -5px rgba(0,0,0,.2);
}

`
const PostData = styled(motion.div)`
display : flex;
justify-content: space-between;
align-items: center;
align-content: center;
margin-top: 1rem;
`
const CardContent = styled(motion.div)`
padding:1rem;
button{
  margin-left: 0;
}
.post_meta{
  margin-top: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .post_actions{
    display: flex;
    align-items: center;
    justify-content: space-between;
   svg{
     color: rgba(255,255,255,.2);
     transition: all .5s ease;
     &:hover{
       color: var(--primary-color);
     }
     } 
  }
}
`
export const Tags = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 1rem auto;
  position:relative;
  span{ 
   .active{
     border: 1px solid var(--primary-color)
   }
  
    background: #222222;
    border-radius: 200px;
    cursor: pointer;
    padding: .1rem .5rem;
    margin-right: .5rem;
  }
`

const Heading = styled(motion.h6)`

text-transform: uppercase;
margin-bottom: 1rem;
font-weight: bold;
display: flex;
align-items: center;
justify-content: space-between;
.date{
  opacity: .1;
  text-transform: lowercase;
  color:  rgba(255,255,255,0.8);
  font-weight: normal;
}
.data{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
`

const parentVariants = {
  closed: { opacity: 0, x: "-100%" },
  open: { opacity: 1, x: 0 ,
    transition: {
      when: "beforeChildren",
    staggerChildren : 1
    }
 
}
}
const childrenVariants = {
  open: {opacity: 1,  x: 0 ,
      transition:{
        staggerChildren: 1
      }
  },
  closed: { opacity: 0, x:'-100%' }
}
const grandChildren = {
  open:{opacity: 1},
  closed: {opacity:0}
}

export const Card = (props)=>{
 
  const dispatch = useDispatch()
  const history = useHistory()
   console.log(history);
  const userId = useSelector(state => state.auth.userData ? state.auth.userData._id : '')
  const postAuthor = props.post.author ? props.post.author._id : null
  dayjs.extend(relativeTime)
 if(props.post.author === undefined) {return "Unknown";}

    return (
      
        <StyledCard
        data-aos = "zoom-in"
     
         variants = {parentVariants}
         initial = 'closed'
         animate = 'open'
         
         >
     <Link to={`/post/${props.post._id}`}> <motion.img variants={childrenVariants} src={props.post.blogImage} alt=""/></Link>  <div className='author'> 
            <Link to = {`/author/${props.post.author && props.post.author._id}`}>
            <Ava src={props.post.author &&props.post.author.avatar} name ={props.post.author && props.post.author.username}textSizeRatio={2} size={40}  round={true}/>
            <span className='name'>{props.post.author ? props.post.author.username : 'Unknown'}</span>
            </Link>
            </div>
      <CardContent  variants={childrenVariants}>
     
          
      <Heading variants={grandChildren}>
        <Link to={`/post/${props.post._id}`}>{props.post.title}</Link>
       <div className='data'>
       <span className='date'>{dayjs(props.post.createdAt).fromNow()}</span>
        <PostData variants={grandChildren}>
         <span data-count ={props.post.comments.length}><FaRegComments   /> </span>
        <span data-count ={props.post.likes.length}><FaRegHeart /> </span>
        </PostData>
       </div>
       
       </Heading>
        <Tags className='hvr'>
        {props.post.tags && props.post.tags.map((tag,i)=> <span key={i}className={history.location.pathname === `/posts/${tag}` ? 'active' : null} onClick={() =>dispatch(getPostByTag(tag))}><Link to={`/posts/${tag}`}>{tag}</Link></span>)}
       </Tags>
       
        <motion.div variants={grandChildren} className='post_meta'>
      <Link to={`/post/${props.post._id}`}><CustomButton variants={childrenVariants} secondary>Read more</CustomButton></Link>
     {userId === postAuthor ? <>
      <div className="post_actions">
       <Link to={`/edit/${props.post._id}`}><FaEdit/></Link>
        <Link to='#' onClick={()=>dispatch(deletePost(props.post._id,history))}><FaTrash/></Link>
          
      </div>
     </>: null}
      </motion.div>
      </CardContent>  
     
        </StyledCard>
      
    )
}
