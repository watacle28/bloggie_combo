import React,{useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components'
import { Modal } from './modal';
import { Form, StyledResourceForm } from './ResourceForm';
import { FaPlusCircle } from 'react-icons/fa';
import { CustomButton } from './CustomButtom';
import { getAllTwitAccs, deleteTwitAcc, addTwitAcc, editTwitAcc } from '../redux/actions/resources';
import { Loader } from '../pages/SinglePost';
import {TwitterAcc} from './TwitterAcc'
import { useComp } from '../customHooks';
import { AuthComponent } from './AuthComponent';


export const TwitterTab = ({clicks,setClicks,open,handleOpen}) => {
  
  const dispatch = useDispatch()
  const twitAccs = useSelector(state=> state.twitter)

 const {openModal,
        setOpenModal,
        handleChange,
        handleEdit,
        saveChanges,
        add,
        editMode,
        reset,
        values } = useComp(()=>dispatch(editTwitAcc(values,editMode.id)), ()=>dispatch(addTwitAcc(values)))
 
 useEffect(() => {
    if(clicks 
        && clicks.twitterTab === 0){
        dispatch(getAllTwitAccs())
        setClicks({...clicks,twitterTab : 1})
    }

 }, [])

    return (
        <StyledResourceForm>
            <h5>Who to follow on twitter</h5>
            <Modal reset={reset} open={openModal} setOpen={setOpenModal}>
            <Form autoComplete='off' onSubmit={editMode.state === true ? saveChanges : add}>
                <h5>Enter a Twitter handle</h5>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" value={values.username || ''} onChange={handleChange} placeholder='@watacle28'/>
                <CustomButton type="submit">Save</CustomButton>
            </Form>
            </Modal>
           <AuthComponent>
           <button title='add twitter acc' id='add_btn' onClick={()=>setOpenModal(true)}><FaPlusCircle/></button>
           </AuthComponent>
            <>
                {twitAccs.loading ? <Loader/> : twitAccs.twitterAccs.map(acc =>
                 <TwitterAcc key={acc._id} acc={acc} onEdit ={() =>handleEdit(acc)} onDelete={() => dispatch(deleteTwitAcc(acc._id))}/>)

              }
            </>
        </StyledResourceForm>
    )
}
