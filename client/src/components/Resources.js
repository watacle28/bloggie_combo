import React,{useState, useEffect} from 'react';
import styled from 'styled-components'
import { ResourceForm } from './ResourceForm';

import { ResourcesTabs } from './ResourcesTabs';
import { Loader } from '../pages/SinglePost';
import { FaTwitter, FaNewspaper, FaChalkboardTeacher, FaLaptopCode } from 'react-icons/fa';
import { CoursesTab } from './CoursesTab';
import { TwitterTab } from './TwitterTab';
import {ChannelsTab} from './ChannelsTab'
const StyledResources = styled.section`

    width: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
 ` 
export const Resources = () => {
    const [tabClicks, setTabClicks] = useState({coursesTab: 0, twitterTab:0, resourcesTab: 0, channelTab:0 })
 
    return (
        <StyledResources>
           <h3>External Resources</h3>
           <ResourcesTabs >
               <div title ='suggested courses' label= {<FaChalkboardTeacher/>} id={1}><CoursesTab clicks={tabClicks} setClicks={setTabClicks} /></div>
               <div title = 'who to follow' label={<FaTwitter/>} id={2}><TwitterTab clicks={tabClicks} setClicks={setTabClicks}  /></div>
               <div title='video/website/articles' label= {<FaNewspaper/>} id={3}><ResourceForm clicks={tabClicks} setClicks={setTabClicks}  /></div>
               <div title='Channels to watch' label={<FaLaptopCode/> } id={4}><ChannelsTab clicks={tabClicks} setClicks={setTabClicks} /></div>
             
              
           </ResourcesTabs>
       
         
        </StyledResources>
    )
}
