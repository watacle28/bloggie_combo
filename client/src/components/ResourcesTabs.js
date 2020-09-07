import React,{useState} from 'react';
import styled from 'styled-components'

const StyledTabs = styled.div`
    width: 100%;
    height: max-content;
   
    ol{ 
        width:100%;
        display: flex;
        justify-content: space-between;
        align-items:center; 
        /* border: 1px solid rgba(255,255,255,0.1); */
        border-radius: 200px;
        box-shadow: 1px 2px 10px 1px rgba(255,255,255,0.1);
        padding: .5rem;
        .tab{ 
          
            text-align: center;
            color:  rgba(255,255,255,0.5);
            cursor: pointer;
            margin: auto .1rem;
            width: 100%;
            &:hover:not([class='tab active']){
             color: white;
            position: relative;
            
            }
        }
        .active{
            color:black;
            font-weight:700;
            background: #e24727;
            padding: .1rem .5rem ;
            border-radius: 200px;
            box-shadow:1px 2px 5px 1px #e24727,1px 2px 10px 1px #e24727;
            
        }
    }
   `

export const ResourcesTabs = ({children}) => {
    const [activeTab, setActiveTab] = useState(3);
    return (
        <StyledTabs>
           <ol>
    {children.map(child => <li title={child.props.title} key={child.props.id} className ={activeTab === child.props.id ? 'tab active' : 'tab'} onClick ={()=>setActiveTab(child.props.id)}>{child.props.label}</li> )}
           </ol>
           <div>
     {children.map(child => child.props.id === activeTab && child.props.children)}
           </div>
        </StyledTabs>
    )
}
