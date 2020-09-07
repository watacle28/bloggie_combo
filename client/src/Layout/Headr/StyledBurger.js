import styled from 'styled-components';
export const StyledBurger = styled.button`
 
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 11;
 @media screen and (min-width : 577px) {
    transform: translateX(-200%) 
 }
  &:focus {
    outline: none;
  }
 

  div {
    width: 2rem;
    height: 0.25rem;
    background: #e24727;
    border-radius: 10px;
    transition: all 0.5s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    :nth-child(2) {
      opacity: ${({ open }) => open ? '0' : '1'};
      transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
   &:hover {
      transform: scale(1.1);
    }
`;