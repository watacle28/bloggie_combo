import React from 'react'

import styled from 'styled-components';
import bg from './dark_type.jpg'
import { CustomButton } from './CustomButtom';
import { Link } from 'react-router-dom';



const Jumbo = styled.div`
width: 100%;
/* height: 100vh; */
color: white;
/* background-image: url(${bg});
background-position: center;
background-repeat: no-repeat;
background-size: cover; */
position: relative;
margin: 0 auto;
text-align: center;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
z-index:2;
@media screen and (min-width: 700px){
    display: none;
}
p{
    
    color: white;
   

}

`
const Title = styled.div`
font-weight: bold;
text-transform: uppercase;
line-height: 3rem;
letter-spacing: 4px;
margin-bottom: 30vh;
display: flex;
flex-direction: column;
align-items: center;
button{
    width: 10rem;
    letter-spacing: .5rem;
    margin-bottom: 4rem;
    a{
        color: #e24727;
        text-decoration: none;
    }
}

`
const Hero = () => {
    return (
   <Jumbo>
   <Title>
    <h1> Web_dev?</h1>
   <CustomButton><Link to ='/register'>Join</Link></CustomButton> 
  <p>blogging space for web developers</p> 
  </Title>
   </Jumbo>
    )
}
export default Hero;