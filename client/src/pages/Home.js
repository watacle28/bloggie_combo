import React, {Suspense, lazy} from 'react';
import styled from 'styled-components';

import { Spinner } from '../components/Loader';
import { useEffect } from 'react';
import { getPostByTag } from '../redux/actions/posts';
import { useDispatch } from 'react-redux';

const CardsContainer = lazy(()=> import('../components/CardsContainer'))
const Hero = lazy(()=>import('../components/Hero'))
const Hom = styled.div`
  width: 100%;

`
export const Home = ({match:{params:{tag}}}) => {
    return (
      <Hom>
      
       <Suspense fallback = {<Spinner/>}>
           <Hero/>
           <CardsContainer tag={tag}/>
          
       </Suspense>
      
      </Hom>
    )
}
