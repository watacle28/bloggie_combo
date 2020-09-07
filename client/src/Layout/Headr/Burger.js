import React from 'react';
import {StyledBurger} from './StyledBurger';

export const Burger = ({open,setOpen}) => {
    return (
        <StyledBurger open ={open} onClick = {()=>setOpen(!open)} >
            <div></div>
            <div></div>
            <div></div>
            
        </StyledBurger>
    )
}
