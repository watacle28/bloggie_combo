import React,{useState} from 'react';
import styled from 'styled-components';
import { FaTimesCircle } from 'react-icons/fa';

const StyledModal = styled.div`
    width: 100%;
    height: max-content;
    position : absolute;
    z-index: 500;
    box-shadow:2px 2px 5px 1px rgba(255,255,255,.1);
    left:0;
    bottom: 0;
    right: 0;
    background: #222222;
    padding: 4rem;
    opacity: ${props => props.open === false ? '0' : '1'};
    transition: all .5s ease-out;
    pointer-events: ${props => props.open ===false? 'none' : null};
    .x{
        position: absolute;
        top: .5rem;
        right:.5rem;
        font-size: 2rem;
        transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);
        &:hover{
            color: #e24727;
        }
    }
   
`

export const Modal = (props) => {
    const {children,open,setOpen,reset} = props
  const handleClose =()=>{
      setOpen(false)
      reset()
  }
    return (
        <StyledModal open={open}>
            <button className='x' onClick={handleClose}><FaTimesCircle/></button>
          
           {children} 
        </StyledModal>
    )
}
