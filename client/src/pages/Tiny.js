import React from 'react';
import styled from 'styled-components'
import { Editor } from '@tinymce/tinymce-react';
import Axios from 'axios';
const key = process.env.REACT_APP_TINY_CLOUD_KEY;


const Container = styled.div`
    height: min-content;
    width: 100%;
    display: flex;
    justify-content: center;
   .tox-dialog{
      align-self: center;
    }
    .tox-statusbar__branding{
        display: none;
    }
    .tox-tinymce {
        border: none;
        border-radius:10px;

    }
    /* .tox .tox-toolbar, .tox .tox-toolbar__overflow, .tox .tox-toolbar__primary{
        background-color: #000000;
    } */
    
`

export const Tiny = ({value,handleEditorChange}) => {
   
  
    return (
    
            
     <Container>
          <Editor 
        apiKey = {key}
        initialValue="<p>screw it lets do it</p>"
        init={{
           skin: 'oxide-dark',
           content_css: 'dark', 
          height: 400,
          menubar: false,
          codesample_languages: [
            { text: 'HTML/XML', value: 'markup' },
            { text: 'JavaScript', value: 'javascript' },
            { text: 'CSS', value: 'css' },
            { text: 'PHP', value: 'php' },
            { text: 'Ruby', value: 'ruby' },
            { text: 'Python', value: 'python' },
            { text: 'Java', value: 'java' },
            { text: 'C', value: 'c' },
            { text: 'C#', value: 'csharp' },
            { text: 'C++', value: 'cpp' }
          ],
          // plugins: [
          //   'advlist autolink lists link image charmap print preview anchor',
          //   'searchreplace visualblocks code fullscreen',
          //   'insertdatetime media table paste code help wordcount','codesample', 'image emoticons'
          // ],
          plugins: ['print preview paste importcss searchreplace autolink autosave save', 
          'directionality code visualblocks visualchars fullscreen image link media template', 
          'codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist',
          'lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons'],
          mobile: {
            toolbar_mode: 'sliding',
            menubar: 'file edit view insert format tools table help',
          plugins: 'print preview paste casechange importcss searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker textpattern noneditable help formatpainter pageembed charmap mentions quickbars linkchecker emoticons advtable'
          },
          menubar: 'file edit view insert format tools table help',
          // toolbar:
          //   'undo redo | image emoticons media | formatselect | bold italic backcolor | \
          //   alignleft aligncenter alignright alignjustify | \
          //   bullist numlist outdent indent | removeformat | help | code codesample',
          toolbar: 'undo redo | bold italic underline image emoticons codesample preview | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons |  save print | insertfile image media template link anchor | ltr rtl',
          toolbar_mode: 'sliding',
         
         images_upload_handler: async (blobInfo,success,failure)=>{
            let data = new FormData();
            data.append('avatar', blobInfo.blob(),blobInfo.filename())
            const res = await Axios.post('http://localhost:5002/api/public/upload',data)
            console.log({res});
           success(`${res.data}`)
         },
        image_uploadtab : 'true',
        file_picker_types : 'image',
         }}
        value = {value}
         onEditorChange = {handleEditorChange}
      />
     </Container>
     
    )
 
     
 }


