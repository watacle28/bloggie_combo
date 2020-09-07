import React,{useState, useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Modal } from './modal'
import { CustomButton } from './CustomButtom'
import { Form, StyledResourceForm } from './ResourceForm'
import { FaPlusCircle } from 'react-icons/fa'
import { getAllCourses, addCourse, deleteCourse, editCourse } from '../redux/actions/resources'
import { useComp } from '../customHooks'
import { Spinner } from './Loader'
import { Course } from './Course'
import { AuthComponent } from './AuthComponent'

export const CoursesTab = ({clicks,setClicks,open,handleOpen}) => {
    const courses = useSelector(state => state.courses)
  
    const dispatch = useDispatch() 
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

      } = useComp(()=>dispatch(editCourse(values,editMode.id)), ()=>dispatch(addCourse(values)))

 
    useEffect(() => {
       if(clicks.coursesTab === 0)
        {
        dispatch(getAllCourses())
        }
        setClicks({...clicks, coursesTab:1})
    }, [dispatch,courses.length])
    return (
        <StyledResourceForm>
            <h5>Suggested Courses</h5>
            <Modal reset={reset} open={openModal} setOpen={setOpenModal}>
               <Form autoComplete ='off' onSubmit = {editMode.state === true ? saveChanges : add}>
                <h5>Enter Course details</h5>
               <label htmlFor="name">Course Title</label>
                <input type="text" id="name" name="name" value={values.name || ''} onChange={handleChange}/>
                <label htmlFor="link">Link</label>
                <input type="text" id="link" name="link" value={values.link || ''}  onChange={handleChange} />
                <label htmlFor="duration">Course Duration (hrs)</label>
                <input type="number" id="duration" name="duration" value={values.duration || 0}  onChange={ handleChange}/>
                <label htmlFor="price">Price ($)</label>
                <input type='number' id="price" name="price" value={values.price || 0 }  onChange={ handleChange}/>
                <CustomButton type='submit'>Save</CustomButton>
               </Form>
              
            </Modal>
            List of courses
            <AuthComponent>
            <button title='add new course' id='add_btn' onClick={()=>setOpenModal(true)}><FaPlusCircle/></button>
            </AuthComponent>
            <div className="resource_container">
                
            {courses.loading ? <Spinner/> : courses.courses.map(src =>
             <Course key={src._id} course ={src} onDelete ={()=> dispatch(deleteCourse(src._id))} onEdit ={() =>handleEdit(src)}/>)
            }  
          
           </div>
        </StyledResourceForm>
    )
}
