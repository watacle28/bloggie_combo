import React,{useState, useEffect} from 'react';
import styled from 'styled-components'
import { ResourceForm } from './ResourceForm';
import {useSelector,useDispatch}  from 'react-redux';
import { ResourcesTabs } from './ResourcesTabs';
import { FaTwitter, FaNewspaper, FaChalkboardTeacher, FaLaptopCode } from 'react-icons/fa';
import { CoursesTab } from './CoursesTab';
import { TwitterTab } from './TwitterTab';
import {ChannelsTab} from './ChannelsTab'
const StyledResources = styled.section`

    width: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
 ` 
export const Resources = () => {
    const [tabClicks, setTabClicks] = useState({coursesTab: 0, twitterTab:0, resourcesTab: 0, channelTab:0 })
    const isLoggedIn = useSelector(state => state.auth?.authenticated)
 
    return (
        <StyledResources>
           <h3>External Resources</h3>
         {!isLoggedIn ?   <p>Below is a categorized list of links to learning resources shared by some of our  users</p>:
           <p>Below is a categorized list of links to learning resources shared by some of our  users ,feel free to add to the list</p>}

           <ResourcesTabs >
               <div title ='suggested courses' label= {<FaChalkboardTeacher/>} id={1}><CoursesTab clicks={tabClicks} setClicks={setTabClicks} /></div>
               <div title = 'who to follow' label={<FaTwitter/>} id={2}><TwitterTab clicks={tabClicks} setClicks={setTabClicks}  /></div>
               <div title='video/website/articles' label= {<FaNewspaper/>} id={3}><ResourceForm clicks={tabClicks} setClicks={setTabClicks}  /></div>
               <div title='Channels to watch' label={<FaLaptopCode/> } id={4}><ChannelsTab clicks={tabClicks} setClicks={setTabClicks} /></div>
           </ResourcesTabs>
       
         
        </StyledResources>
    )
}
