import React, { lazy, Suspense, useState } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { CustomButton } from '../components/CustomButtom';
import { Spinner } from '../components/Loader';
import { Resources } from '../components/Resources';


const CardsContainer = lazy(()=> import('../components/CardsContainer'))
const Hero = lazy(()=>import('../components/Hero'))
const Hom = styled.div`
  width: 100%;
  .switcher{
    margin: auto;
    text-transform:lowercase;
    font-weight:normal;
    margin-top: -2rem;
  @media screen and (min-width: 701px){
    
      display: none
    }
  }

`
export const Home = ({match:{params:{tag}}}) => {
  const [blog, setBlog] = useState(true)
    return (
      <Hom>
       <Helmet>
          <title>Home</title>
          <meta name="description" content="home page" />
         
        </Helmet>
       <Suspense fallback = {<Spinner/>}>
           <Hero/>
       
    <CustomButton className='switcher' onClick={()=>setBlog(!blog)}>{blog  ? 'View External Resources' : 'View Blog Posts'}</CustomButton>
           
           {blog ? <CardsContainer tag={tag}/>:<Resources/>}
           
           
       </Suspense>
      
      </Hom>
    )
}
