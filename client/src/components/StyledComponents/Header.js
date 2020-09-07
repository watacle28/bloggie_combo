import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.h2`
   text-transform: uppercase;
    color: white;
    font-weight: 900;
    margin-bottom: 3rem;
    span{
      color: var(--primary-color);
    }
`

export const Header = ({children}) => {
    return (
        <StyledHeader>
            {children}
        </StyledHeader>
    )
}
