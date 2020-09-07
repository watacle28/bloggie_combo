import React, {useEffect} from 'react';
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import styled from 'styled-components';
import Avatar from 'react-avatar';
import { getAllBloggers } from '../redux/actions/user';



const Container = styled.div`
text-transform: capitalize;

 @media screen and (min-width: 768px){
     width: 80%;
 }

`


const StyledHeading = styled.h4`
    display: flex;
    justify-content: center;
   
    text-transform:uppercase;
    letter-spacing: 5px;
    color: white;
    font-weight: 900;
   
  

`

export const StyledAuthors = styled.div`

width: 100%;
overflow: hidden;
border: 1px solid rgba(255,255,255,.05);
border-radius: 10px;
margin:2rem auto;
padding: 1rem 2rem;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
max-width: 500px;
.author-info{
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: space-evenly;
   p{
       color: rgba(255,255,255,.2)
   }
   
}
@media screen and (min-width: 400px){
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
}



.posts{
    display: flex;
   
    justify-content: space-between;
    align-items: center;

    .title{
        color: rgba(255,255,255,.2)
    }
}
h5{
    margin-top: 1rem;
}
.num{

    font-size: 2rem;
    font-weight: 700;
    margin-right: 1rem;
}

`

export const Authors = ({match}) => {
    const authors = useSelector(state => state.bloggers.bloggers)
    const loadingBloggers = useSelector(state => state.bloggers.loading)
    const dispatch = useDispatch()
    console.log({authors});
    useEffect(() => {
        dispatch(getAllBloggers())
    }, [dispatch])

    return (
        <Container>
            
        <StyledHeading>Authors</StyledHeading>
       {!loadingBloggers && authors.map(author => ( 
            
           
               <StyledAuthors data-aos ='flip-right'>
         <Link to={`/author/${author._id}`}> 
         <Avatar src={author.avatar} name ={author.username}textSizeRatio={2} size={100}  round={true}/>
           
         </Link>
       <div className="author-info">
       <Link to={`/author/${author._id}`}> <h5>@{author.username}</h5></Link>
         {author.role && <p>{author.role}</p>}
            {author.location && <p>Based in {author.location}</p>}
            <div className="posts">
           
       <div className="num">{author.posts.length}</div>
         <div className='title'>{author.posts.length === 1 ? 'Post' : 'Posts'}</div>
       </div>
            </div> 
            </StyledAuthors>
      


       ))} 
        </Container>
    )
}
