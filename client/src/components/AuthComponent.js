import React from 'react';
import {useSelector,useDispatch}  from 'react-redux';

export const AuthComponent = ({children}) => {
    const isLoggedIn = useSelector(state => state.auth?.authenticated)
    return (
        <div>
            {isLoggedIn && children}
        </div>
    )
}
