import React from 'react';
import styled from 'styled-components'
import { StyledResource } from './Resource';
import { Link } from 'react-router-dom';
import { FaRegEdit, FaRegTrashAlt, FaThumbsUp } from 'react-icons/fa';
import { upVoteCourse } from '../redux/actions/resources';
import { useSelector, useDispatch } from 'react-redux';

const Details = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  div{
    margin: auto 1rem 1rem;
    padding: .1rem .5rem;
     border-radius: 200px;
     box-shadow: 1px 2px 5px rgba(255,255,255,.1);
     /* width: 5rem; */
     text-align:center; 
     border-bottom: 2px solid #e24727;   
           
  }            
`
export const Course = ({course, onDelete,onEdit}) => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.auth.userData);
  const isLoggedIn = useSelector(state => state.auth.authenticated);
 const hasVoted = course.upvotes.find(id => id === loggedInUser?._id)

    return (
      <StyledResource>
              <div className="info">
              <h5><a href={course.link} rel='noreferer' target='_blank'>{course.name}</a></h5>
             
              <div className='user-actions'>
              {loggedInUser?.username === course.addedBy &&
             <>
              <button onClick={onEdit}><FaRegEdit/></button>
              <button onClick={onDelete}><FaRegTrashAlt/></button>
             </>  }
             {
                 isLoggedIn && loggedInUser?.username !== course.addedBy &&
                 
                      <span data-count ={course.upvotes.length}>
                          <button onClick={()=>dispatch(upVoteCourse(course._id))}>
                            <FaThumbsUp className={hasVoted ? 'upvoted': null}/>
                          </button>
                      </span>
                     
             }
              </div>
              </div>
              <Details className="details">
              <div className="tag">{`${course.duration} hrs`}</div>
              <div className="tag">{`$${course.price}`}</div>
              </Details>
              <div className="meta">
              <div>Shared by <span><Link to={`/author/${course.addedBy}`}>@{course.addedBy}</Link></span></div>
              
              </div>
      </StyledResource>
    )
}
