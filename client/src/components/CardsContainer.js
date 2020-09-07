import React ,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import styled from 'styled-components';
import {Card} from './Card';
import { getAllPosts, getPostByTag } from '../redux/actions/posts';
import { useState } from 'react';
import { Pagination } from './Pagination';
import { Spinner } from './Loader';
import { Header } from './StyledComponents/Header';



export const Container = styled.div`

position: relative;
height: auto;
width: 100%;
padding: 1rem;
scroll-behavior: smooth;
/* margin: -100px auto 0 auto; */
box-shadow: 0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12),0 8px 10px -5px rgba(0,0,0,.2);
border-radius: 20px;
display: flex;
align-items: center;
flex-direction: column;
max-width: 500px;

@media screen and (min-width: 700px){
    margin:0 auto;
    max-width: 700px;
}
.get_all, h3{
    text-transform: capitalize;
    background: #222222;
    padding: .2rem .5rem;
    border-radius: 200px;
    
}
.all_posts{
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    .line{
        width: 2rem;
        height: 5px;
        background: #222222;
        border-radius: 200px;

    }
}
`
const NoPosts = styled.div`
    width: 100%;
    background: #222222;
   display: flex;
   align-items: center;
   justify-content: center;
    height: 200px;
    margin-top: 2rem;
    border-radius: 10px;
    font-size: 3rem;
    font-weight: bolder;
    padding: auto 1rem;
`
const CardsContainer = ({tag}) => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(3)
    const allposts = useSelector(state=>state.posts.posts?.blogs)
     const totalPages = useSelector(state=>state.posts.posts?.totalPages)
    let loadingPosts = useSelector(state => state.posts.loading)
  
    useEffect(() => {
       if(tag){
         dispatch(getPostByTag(tag))
       }
      else{
        dispatch(getAllPosts(page,limit))
      }
    }, [tag,page,allposts?.length,limit])

    return (
        <Container > 
          
           <div className="all_posts">
               
               <Header>{tag ? `${allposts?.length} ${tag} posts`: 'All Posts'}</Header>
              
           </div>  
           {loadingPosts && <Spinner/>}
          {!loadingPosts && !tag && allposts &&  <Pagination page={page} setPage={setPage} totalPages={totalPages} loading={loadingPosts}/>}
            {tag &&  <Link to='/'><p className="get_all">All Posts</p></Link>}
           
            {!loadingPosts && allposts && allposts.length === 0 ? <NoPosts>no posts found with tag : {tag}</NoPosts> :!loadingPosts && allposts && allposts.map((post,i) => (<Card key={post._id} post={post} />))}
            {!loadingPosts && !tag && allposts &&  <Pagination page={page} setPage={setPage} totalPages={totalPages}/>}
        </Container>
    )
}
export default CardsContainer;