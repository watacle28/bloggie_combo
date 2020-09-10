import Aos from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import { createBrowserHistory } from 'history';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Spinner } from './components/Loader';
import { Layout } from './Layout/Layout';
import { FourOFour } from './pages/404';
import { Author } from './pages/Author';
import { Authors } from './pages/Authors';
import { Contact } from './pages/Contact';
import { Editor } from './pages/Editor';
import { EditProfile } from './pages/EditProfile';
import { ForgotPassword } from './pages/ForgotPassword';
//component import
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ResetPassword } from './pages/ResetPassword';
import { SinglePost } from './pages/SinglePost';
import { loadUserData } from './redux/actions/auth';
//custom routes
import { AuthRoute, CanEditRoute, PrivateRoute, ProfileRoute } from './utils/myRoutes';




function App() {
  const dispatch = useDispatch()
  const history = createBrowserHistory()
  const loading = useSelector(state => state.auth.loading)

  useEffect(() => {
    Aos.init({
      duration: 1000
    })
    axios.defaults.baseURL = '/api'
    dispatch(loadUserData())
  
  }, [dispatch])
  return ( <Router history={history}>
  
  {loading  ? <Spinner/>  : ( <Layout>
    
        
        <Switch>
          <Route exact path='/' component={Home}/> 
          <Route exact path='/posts/:tag' component={Home}/>
          <AuthRoute exact path='/login' component={Login}/>
          <AuthRoute exact path='/register' component={Register}/>
          <AuthRoute exact path='/forgotPassword' component={ForgotPassword}/>
          <AuthRoute exact path='/resetPassword' component={ResetPassword}/>
          <PrivateRoute exact path='/editor' component={Editor}/>
          <CanEditRoute exact path='/edit/:id' component={Editor}/>
          <ProfileRoute exact path ='/profile/:id' component ={EditProfile}/>
          <Route exact path='/contact' component={Contact}/>
          <Route exact path='/authors' component={Authors}/>
          <Route exact path ='/author/:id' component ={Author}/>
          <Route exact path ='/post/:id' component = {SinglePost}/>
          <Route component={FourOFour}/>
       
        </Switch>
   
 </Layout>)}

    </Router>
  );
}

export default App;
