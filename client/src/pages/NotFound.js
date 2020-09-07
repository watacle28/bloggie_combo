import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import oops from './oops.gif'

const StyledDiv = styled.div`
    width: 80%;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    transform: translate(-50%,-50%);
    a{
        color: white
    }
    `

export const NotFound = ({id, type}) => {
    return (
        <StyledDiv>
          <h3>{type} with id {id} not found</h3>  
          <h5><Link to='/'>Go To Home Page</Link></h5>
        </StyledDiv>
    )
}
