import React,{} from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import { updatedCountries } from './countries';
const CustomSelect = styled(motion.div)`
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
         
    select{
        background: black;
        color: white;
        border: 1px solid #e24727;
        border-radius: 200px;
        padding: .5rem .5rem .5rem 1rem;
       appearance: none;
       background-image: url(https://image.flaticon.com/icons/svg/892/892498.svg);
       background-size: 50% 50%;
       background-repeat: no-repeat;
       background-position-x: right;
       background-position-y: center;
        &::-ms-expand{
            display: none
        }
      
     option{
         font-size: .75em;
         :hover{
             background: #e24727;
             font-size: 1em;
         }
     }
    }
    
    
    label{
        color: white;
    }
`

export const Location = ({value,handleLoc}) => {
   const countries = updatedCountries
   
    return (
        <CustomSelect>
           <label htmlFor="location">Location</label> 
           <select name="location" id="location" value={value} onChange={handleLoc}>
               {countries.map(country => <option value ={country}>{country}</option>)}
           </select>
        </CustomSelect>
    )
}
