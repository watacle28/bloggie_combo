import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime' 
import { FaEdit , FaCalendarAlt, FaThumbsUp, FaHeart, FaTrash, FaRegClock, FaRegHeart}  from 'react-icons/fa'
import Avatar from 'react-avatar';
import me from './clo.jpg'
import { Link } from 'react-router-dom';


const StyledComment = styled.div`
    display: flex;
    margin: 0;
    width: 100%;

    background-color:#111111;
    border-radius: 10px;
    justify-content: center;
    padding: .5rem;
    align-items: center;
    margin-bottom: 1rem;
  
    a{
        text-decoration: none;
    }
    .comment_data{
        display: flex;
        width: 100%;
        flex-direction: column;
        justify-content: space-evenly;
        font-size: .7rem;
       
       .comment_head{
        .sb-avatar__text div span{
            border-radius: 50%;
            /* background: #e24727; */
         }
           display: flex;
           align-items: center;
           justify-content: space-between;
           padding-right: .2rem;
           margin-bottom: .5rem;
       } 
    }
    .comment_meta_info{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: auto;
        width: 90%;
        svg{
            margin-right: 3px;
            color: white;
        }
       .liked{
           color: #e24727
       }
        
    }
`

export const Comment = ({comment:{body,likes,postedOn,owner}, clickToEdit, handleDeleteComment, handleLikingComment}) => {
    const currentUser = useSelector(state => state.auth.userData ? state.auth.userData._id : null);
    const hasLiked = likes && likes.find(id => id == currentUser);
    

    dayjs.extend(relativeTime)
    return (
     
        <StyledComment>
         
            <div className="comment_data">  
                <div className="comment_head">
                <Link to={`/author/${owner._id}`}> <Avatar  name={owner.username } textSizeRatio ={2} size={40} round={true}/></Link>
               <div style={{color:'rgba(255,255,255,0.6)'}}>{dayjs(postedOn).fromNow()}  </div>  
                </div>
                <div className="comment_body" dangerouslySetInnerHTML={{__html: body}}/>
                    <section className="comment_meta_info"> 
                    <div> <button data-count={likes.length} to='#' onClick={handleLikingComment}>{'  '} <FaRegHeart className={hasLiked && hasLiked.length > 0 ? 'liked': null} /> </button></div>
                
                        {currentUser == owner._id ? <div>
                            <Link to='#' onClick={clickToEdit}><FaEdit/> {' '} </Link>
                            <span></span>
                            <Link to='#' onClick={handleDeleteComment}><FaTrash/></Link>
                            </div> : ''}
                        
                    </section>
                                
                    
            </div>
        
        </StyledComment>
        
        
    )
}
