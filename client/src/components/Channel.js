import React from 'react';
import styled from 'styled-components'
import { FaRegEdit, FaRegTrashAlt, FaLongArrowAltUp, FaThumbsUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { StyledResource } from './Resource';
import { useSelector, useDispatch } from 'react-redux';
import { upVoteChannel } from '../redux/actions/resources';


export const Channel = ({channel,onDelete,onEdit}) => {
    const dispatch = useDispatch()
    const loggedInUser = useSelector(state => state.auth.userData);
    const isLoggedIn = useSelector(state => state.auth.authenticated);
   const hasVoted = channel.upvotes.find(id => id === loggedInUser?._id)
 
    return (
       <div>{channel &&
        <StyledResource>
          
              <div className="info">
              <h5><a href={channel.link} rel='noreferer' target='_blank'>{channel.name}</a></h5>
              
              <div className='user-actions'>
                  {loggedInUser?.username === channel.addedBy &&
             <>
              <button onClick={onEdit}><FaRegEdit/></button>
              <button onClick={onDelete}><FaRegTrashAlt/></button>
             </>  }
             {
                 isLoggedIn && loggedInUser?.username !== channel.addedBy &&
                 
                      <span data-count ={channel.upvotes.length}>
                          <button onClick={()=>dispatch(upVoteChannel(channel._id))}>
                            <FaThumbsUp className={hasVoted ? 'upvoted': null}/>
                          </button>
                      </span>
                     
             }
             

              </div>
             
              </div>
             
              <div className="meta">
              <div>Shared by <span><Link to={`/author/${channel.addedBy}`}>@{channel.addedBy}</Link></span></div>
              <div className="tag">{channel.platform}</div>
              </div>
        </StyledResource>
       }</div>
    )
}
