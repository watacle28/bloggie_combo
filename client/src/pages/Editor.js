import React,{useEffect,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { createPost, getSinglePost, editPost } from '../redux/actions/posts';
import { CustomButton } from '../components/CustomButtom';
import { Tiny } from './Tiny';
import { StyledContainer } from './ForgotPassword';
import { Header } from '../components/StyledComponents/Header';
import { Spinner } from '../components/Loader';



export const Editor = (props) => {
  const postData = useSelector(state=> state.posts.currentPost)

   
    const dispatch = useDispatch();
     const [image, setImage] = useState({preview: '', raw: ''})
  
    const [data, setData] = useState({title : '', tags:''})
    const [tinyData, setTinyData] = useState('get typing')

    let loading = useSelector(state=> state.posts.loading)
   
     
    const handleEditorChange = (value) =>{
      setTinyData(value)
    }
    // const handleImage = (e) => {
     
    //      setImage({...image,
    //     preview: URL.createObjectURL(e.target.files[0]),
    //     raw: e.target.files[0]
    //   })
    //   console.log({preview: image.preview});
       
    // }
    
    const handleDataChange = (e)=>{
      setData({
          ...data,[e.target.name]: e.target.value
      })
  
    }
    //post id
      const id = props.match.params.id

      //func to reset fields after submit

      const handleReset = ()=>{
        setData({...data, title: '',tags:''})
        setTinyData('')
       

      }

    const handlePublish = async (e) => {
        e.preventDefault()
    
      let formdata = {};
      formdata.tags = data.tags;
      formdata.title = data.title;
      formdata.body = tinyData
     
      if(id){
        dispatch(editPost(formdata,id,props.history))
          handleReset()
          return;
      } 
      
      dispatch(createPost(formdata,props.history))
      
       handleReset()
    loading = true;
      } 
      
      useEffect(() => {    
      
      dispatch(getSinglePost(id))
      
    }, [])

    useEffect(() => {
     handleReset()
      if(postData) {
     setData({...data, title:postData.title, tags: postData.tags})
    
     setTinyData(postData.body)
      }
     
    }, [postData])


    return (
       
       <StyledContainer>
        <form autoComplete='off' onSubmit={handlePublish}>
        
          <Header><span>Add</span> a post</Header>
          <fieldset disabled={loading} aria-busy={loading}>
          <label htmlFor="title">Title</label>
          {!loading && <input type="text" placeholder='title of your post' autoFocus value={data.title} onChange = {handleDataChange} id="title" name="title"/>}
          <label htmlFor="tags">Tags</label>
          <input type="text" placeholder='add tags separated with commas' value ={data.tags} id="tags"  onChange = {handleDataChange}  name="tags"/>
          {/* <ImageUpload image={image} handleChange={handleImage} /> */}
          <Tiny id='Tiny' value={tinyData}  handleEditorChange={handleEditorChange}/>
         { loading && <Spinner/>}
         <button disabled ={data.title === '' || data.tags === '' ||
            tinyData === '' ? true : false} 
          type='submit' >Publish</button>
          </fieldset>
          </form>


          

       </StyledContainer>
     
    )
}
