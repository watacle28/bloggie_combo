import React from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const Paginate = styled.div`
     width: max-content;
     display: flex;
     align-items: center;
     justify-content: space-between;
     margin:1rem auto;
     div{
         margin-right: .5rem;
         border-radius: 50%;
     }
     button{
         border:none;
         margin-right: .5rem;
         border-radius: 50%;
         background: var(--primary-color);
         padding: .5rem;
         transition: all .5s ease-in-out;
         &:hover{
            transform: scale(1.1)
         }
         &:disabled{
             background: #222;
         }
         svg{
            font-size:1.5rem;
            color: white;
         }
     }
   .pageNumber{
      width: 2.5rem;
       padding: .5rem;
       border: 1px solid var(--primary-color);
       text-align: center;
   }
`

export const Pagination = ({page,setPage,totalPages,}) => {
   
    return (
        <Paginate>
            <button disabled={page === 1} onClick={()=> setPage(page - 1)} className="arrow"><MdKeyboardArrowLeft/></button>
            <div className="pageNumber">{page}</div>
            <div className="slash">OF</div>
            <div className="availpages">{totalPages}</div>
            <button disabled={page === totalPages} onClick={()=> setPage(page + 1)} className="arrow"><MdKeyboardArrowRight/></button>
            
        </Paginate>
    )
}
