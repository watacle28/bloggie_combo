import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux';

export const AuthRoute = ({component: Component, ...rest}) => {
    const isLoggedIn = useSelector((state)=>(state.auth.authenticated))
    return (
        <Route {...rest} 
        render={props => isLoggedIn ? <Redirect to="/"/> : <Component {...props}/> }
        />
    )
}

export const CanEditRoute = ({component: Component, ...rest}) => {
    const isLoggedIn = useSelector((state)=>(state.auth.authenticated))
    const currentUserPosts = useSelector(state => state.auth.userData ? state.auth.userData.posts : [])
    const CurrentUserPostsIds = currentUserPosts.map(post => post._id)

    return (
        <Route {...rest} 
        render={props => (isLoggedIn && CurrentUserPostsIds.includes(props.match.params.id) ) ? <Component {...props}/> : <Redirect to={`/post/${props.match.params.id}`}/>  }
        />
    )
}

export const PrivateRoute = ({component: Component, ...rest}) => {
    const isLoggedIn = useSelector((state)=>(state.auth.authenticated))
    return (
        <Route {...rest} 
        render={props => !isLoggedIn ? <Redirect to="/login"/> : <Component {...props}/> }
        /> 
    )
}


export const ProfileRoute = ({component: Component, ...rest}) => {
    const loggedInUser = useSelector((state)=>(state.auth.userData && state.auth.userData._id))
    console.log({loggedInUser});

    //check if current logged in user owns the profile they wanna edit

    return (
        <Route {...rest} 
        render={props => (loggedInUser == props.match.params.id ) ? <Component {...props}/> : <Redirect to='/'/>  }
        />
    )
}
