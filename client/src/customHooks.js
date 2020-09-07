import {useState, useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { getAllCourses } from './redux/actions/resources';


 export const useComp = (editDispatcher,addDispatcher) =>{
   
    const [values,setValues] = useState({})
    const [openModal,setOpenModal] = useState(false)
    const [editMode, setEditMode] = useState({state: false, id: null})
    
    const reset = ()=>{
        setValues({})

    }
 
    const handleChange = (e)=>{
      setValues({...values, [e.target.name]:e.target.value })
    
    }
    const handleEdit = (src)=>{
         setOpenModal(true)
       
          setValues({...values,...src})
          setEditMode({...editMode, state:true, id: src._id})

    }

    const saveChanges = (e)=>{
       e.preventDefault()
       editDispatcher() 
       reset()
       setOpenModal(false)
    }
    const add = (e)=>{
      e.preventDefault();
      console.log({values});
       addDispatcher()
      reset();
      setOpenModal(false)
    }
    return {
        openModal,
        setOpenModal,
        handleChange,
        handleEdit,
        saveChanges,
        add, 
        editMode,
        setEditMode,
        values,
        reset
       
    }
}