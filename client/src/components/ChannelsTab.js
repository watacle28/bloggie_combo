import React,{useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Modal } from './modal';
import { Form, StyledResourceForm } from './ResourceForm';
import { FaPlusCircle } from 'react-icons/fa';
import { CustomButton } from './CustomButtom';
import { useComp } from '../customHooks';
import { addChannel, editChannel, getAllChannels, deleteChannel } from '../redux/actions/resources';
import { Spinner } from './Loader';
import {Channel} from './Channel'
import { AuthComponent } from './AuthComponent';

export const ChannelsTab = ({clicks,setClicks}) => {
    const channels = useSelector(state => state.channels)
    const platforms = ['Youtube', 'Twitch']
    const dispatch = useDispatch()
  

  const {
        setOpenModal,
        handleChange,
        handleEdit,
        saveChanges,
        add, 
        editMode,
        values,
        openModal,
        reset,
        } = useComp(()=>dispatch(editChannel(values, editMode.id)),()=>dispatch(addChannel(values)))

        useEffect(() => {
           if(clicks.channelTab === 0)
           {
               dispatch(getAllChannels())
               setClicks({...clicks, channelTab: 1})
           }
         
        }, [dispatch, channels.length])

    return (
        <StyledResourceForm>
            <h5>Channels to watch</h5>
            <AuthComponent>
            <button title='add a channel' id='add_btn' onClick={()=>setOpenModal(true)}><FaPlusCircle/></button>
            </AuthComponent>
            <Modal reset={reset} open={openModal} setOpen={setOpenModal}>
            <Form autoComplete='off' onSubmit={editMode.state === true ? saveChanges : add}>
                <h5>Enter Channel details</h5>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={values.name || ''} onChange={handleChange} placeholder='WebDevSimplified'/>
                <label htmlFor="link">Link</label>
                <input type="text" id="link" name="link" value={values.link || ''} onChange={handleChange} placeholder='https://www.youtube.com/watch?v=SC5ROke_WMc'/>
                Select a platform for the channel
                {platforms.map((chl,i) =><div className='radioLabel' key={i}>
                
                <input type="radio" name="platform" value={chl || 'none'} id={chl} checked ={values.platform === chl} onChange={handleChange} />
                <label htmlFor={chl}>{chl}</label>
                
                </div>)}
                <CustomButton type="submit">Save</CustomButton>
            </Form>
            </Modal>
            <div className="resource_container">
                
                {channels.loading ? <Spinner/> : channels.channels.map(src =>
                 <Channel key={src._id} channel ={src} onDelete ={()=> dispatch(deleteChannel(src._id))} onEdit ={() =>handleEdit(src)}/>)
                }  
              
               </div>
        </StyledResourceForm>
    )
}

