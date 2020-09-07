import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux'
import { addResource, getAllResources, deleteResource, editResource } from '../redux/actions/resources';
import { Link } from 'react-router-dom';
import { FaRegTrashAlt, FaRegEdit, FaPlusCircle } from 'react-icons/fa';
import {CustomButton} from './CustomButtom'
import { Modal } from './modal';
import { Resource } from './Resource';
import { Spinner } from './Loader';
import { useComp } from '../customHooks';
import { AuthComponent } from './AuthComponent';
export const StyledResourceForm = styled.div`
    width:100%;
    transition: all 1s ease;
    position: relative;
     .resource_container{
         width: 100%;
     }
    input{
      background: transparent;
      color: white;
      border: 1px solid rgba(255,255,255,.5);
      appearance: none;
      border-radius: 200px;
    }
    button:not([type='submit']){
      background: transparent;
      color: white;
      border: none;
      margin: auto 1rem;
      &:focus{
          outline: none;
      }
    }   
    #add_btn{
        display:flex;
        align-items:center;
        justify-content:center;
        font-size: 2rem;
        box-shadow: 1px 2px 5px rgba(255,255,255,.2);
        width: 2rem;
        height:2rem;
        border-radius: 50%;
        margin-top: 2rem;
        transition: all .5s ease-in;
        
        &:hover{
            color: #e24727;
        }
    }   
`
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    h5{
      border-bottom: 1px solid #e24727;
      margin-bottom: 2rem;
      text-transform: uppercase;
      text-align: center;
     
      border-radius: 200px;
      box-shadow: 1px 2px 5px 3px rgba(0,0,0,.2);
      padding: .2rem .5rem;
    }
    label{
      text-align: center;
    }
    input[type='text'], input[type='url'], input[type='number'] {
        margin-bottom: 1rem;
        padding: .2rem 1rem;
        -moz-appearance: textfield;
        &:focus{
            border: solid 1px #e24727;
            outline:none;
        }
    }
    input[type=number]::-webkit-inner-spin-button,
    input [type=number]::-webkit-outer-spin-button{
      -webkit-appearance: none;
      margin: 0
    }
   
    input[type='radio'] {
        display:none;   
    };
    input[type='radio'] + label{
      padding: .3rem 1rem;
      margin-bottom: .5rem;
      border-radius: 3px;
      border-left: 2px solid rgba(0,0,0,.2);
      transition: all .5s ease-in-out;
      cursor: pointer;
      &:hover{
        border-left: 2px solid #e24727;
      };
     
    }
  
  input[type='radio']:checked + label {
         color:#e24727;
         
      }
   
`
export const ResourceForm = ({clicks, setClicks}) => {
    const types = ['Other','Video','Article','Website']
    const dispatch = useDispatch() 
    const srcs = useSelector(state => state.resources)
    //custom hook
    const { openModal,
            setOpenModal,
            handleChange,
            handleEdit,
            saveChanges,
            add,
            editMode,
            reset,
            values   
    
          } = useComp(()=>dispatch(editResource(values,editMode.id)), ()=>dispatch(addResource(values)))
    
  
    useEffect(() => {
     
     if(clicks.resourcesTab === 0){   
     dispatch(getAllResources())
     setClicks({...clicks, resourcesTab: 1})
     }
    }, [srcs.length])
    
    return (
        <StyledResourceForm>
           <AuthComponent>
           <button title='add new resource' id='add_btn' onClick={()=>setOpenModal(true)}><FaPlusCircle/></button>
           </AuthComponent>
            
            <Modal reset = {reset} editing ={editMode} saveChanges={saveChanges} setOpen={setOpenModal} open={openModal}>
            <Form  autoComplete = 'off'  onSubmit={editMode.state === true ? saveChanges : add}>
              <h5>Enter Resource Details</h5>
            <label htmlFor="name">Name </label>
            <input autoFocus='true' type="text" name="name" id="name" value={values.name || ''} onChange={handleChange} placeholder='name of resource'/>
           <label htmlFor="link">Link </label>
           <input type="url" name="link" id="link" value={values.link || ''} onChange={handleChange} placeholder='link to resource' />
            <h6>Select a type for your resource </h6>
              {types.map((type,i) =><div className='radioLabel' key={i}>
                
                  <input type="radio" name="type" value={type || 'Other'} id={type} checked ={values.type === type } onChange={handleChange} />
                
                  <label htmlFor={type}>{type}</label>
              </div>)}
          
          <CustomButton  type="submit">save</CustomButton>
           </Form>
            </Modal>
           <div className="resource_container">
                
            {srcs.loading ? <Spinner/> : srcs.resources.map(src =>
             <Resource key={src._id} resource ={src} onDelete ={()=> dispatch(deleteResource(src._id))} onEdit ={() =>handleEdit(src)}/>)
            }  
          
           </div>
         
        </StyledResourceForm>
    )
}
