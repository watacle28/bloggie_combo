import React from 'react';
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { CustomButton } from '../components/CustomButtom';


const StyledDiv = styled.div`
    width: 80%;
    height: min-content;
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    transform: translate(-50%,-50%);
    h1{
        font-size: 10rem;
        font-weight: 900;
        color: white;
    }
    a{
        color: white;
        display: flex;
        justify-content: center;
    }
    `

export const FourOFour = () => {
    return (
        <StyledDiv>
            <h1>404</h1>
            <p>Sorry it seems you reached the end of internet</p>
            <Link to='/'><CustomButton>Go back to safety</CustomButton></Link>
        </StyledDiv>
    )
}
