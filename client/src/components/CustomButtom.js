import styled from 'styled-components';
import {motion} from 'framer-motion';

export const CustomButton = styled(motion.button)`
    padding: .25rem 1rem;
    position: relative;
    background: transparent;
    color: ${props => props.secondary ? '#e24727' : 'white'};
    border: 1px solid ${props => props.secondary ? 'white' : '#e24727'};
    border-radius: 200px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font-weight: 700;
    margin: 1rem;
    outline: none;
    transition: all .5s ease;
    z-index: 2;
    &:hover{
        border-color: ${props => props.secondary ? '#e24727': 'white'};
        color: ${props => props.secondary ? 'white' : '#e24727'};
        scale: 1.01;    
        };
    &:disabled{
    opacity: 0.2;
    pointer-events: none;
    }
     & :focus{
          outline: none;
  }
   
    `
