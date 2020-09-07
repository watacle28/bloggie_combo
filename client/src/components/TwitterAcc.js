import React from 'react';
import styled from 'styled-components'
import { FaRegEdit, FaRegTrashAlt, FaThumbsUp } from 'react-icons/fa';
import {StyledResource} from './Resource'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { upVoteTwitAcc } from '../redux/actions/resources';

export const TwitterAcc = ({acc,onEdit,onDelete}) => {
    const dispatch = useDispatch()
    const loggedInUser = useSelector(state => state.auth.userData);
    const isLoggedIn = useSelector(state => state.auth.authenticated);
   const hasVoted = acc.upvotes.find(id => id === loggedInUser?._id)
 
    return (
        <StyledResource>
            <div className='info'><h5><a href={`https://twitter.com/${acc.username}`} target='_blank' noreferer>{acc.username}</a></h5> 
            <div className='user-actions'>
            {loggedInUser?.username === acc.addedBy &&
             <>
              <button onClick={onEdit}><FaRegEdit/></button>
              <button onClick={onDelete}><FaRegTrashAlt/></button>
             </>  }
             {
                 isLoggedIn && loggedInUser?.username !== acc.addedBy &&
                 
                      <span data-count ={acc.upvotes.length}>
                          <button onClick={()=>dispatch(upVoteTwitAcc(acc._id))}>
                            <FaThumbsUp className={hasVoted ? 'upvoted': null}/>
                          </button>
                      </span>
                     
             }
            </div>
            </div>
           <div className="meta">
           <div >shared by <span ><Link to={`/author/${acc.addedBy}`}>@{acc.addedBy}</Link></span></div>
           </div>
        </StyledResource>
    )
}
