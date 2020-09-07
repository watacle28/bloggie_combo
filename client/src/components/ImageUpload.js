import React,{useEffect,useState} from 'react';
import styled from 'styled-components';
import { FaCamera } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Container = styled(motion.div)`
      border-radius: 50%;
      width: 8rem;
      height: 8rem;
      border: 1px solid #161a23;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      label{
        position: absolute;
        cursor: pointer;
        svg{
          width: 3rem;
          height: 3rem;
          color:#e24727;
          transition: all .5s ease-out;
          &:hover{
            transform: scale(1.5)
          }
        }
      }
  img{
    width: 100%;
    height: 100%
  }
`

export const ImageUpload =({image,handleChange})=> {
 
  


  return (
    <Container align="center">
      <div> {image.preview && <img style={{opacity:'0.5'}} src={ image.preview }  alt='preview'/>}</div>
      <label title='choose an image' htmlFor="upload-button">
         <FaCamera />
      </label>
      <input autoFocus type="file" id="upload-button" style={{ display: 'none' }} onChange={handleChange}/>
      

    </Container>
  )
}
