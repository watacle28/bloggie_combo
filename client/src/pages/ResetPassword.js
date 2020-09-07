import React,{useState,useEffect} from 'react';
import {useHistory,useLocation, Link} from 'react-router-dom'
import { StyledContainer,Success } from './ForgotPassword'
import logo from '../Layout/Headr/logo.svg'
import Axios from 'axios';
import { Spinner } from '../components/Loader';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { CustomButton } from '../components/CustomButtom';


export const ResetPassword = (props) => {
    
    const location = useLocation()
    const [data, setData] = useState({password:'', confirmPassword:''})
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState({error:'', success:''})
    const resetToken = location && location.search && location.search.split('?resetToken=')[1];
   
        const handleChange = (e)=>{
            const {name,value} = e.target;
            setData({...data,[name]: value })
        }
        const resetPassword = async(e)=>{
            e.preventDefault();
            setResult({error:'',success:''}) 
            const isAtLeast6 = (/^[A-Za-z0-9_]\w{5,}$/.test(data.password))
            if(!isAtLeast6){
                return  setResult({...result, error:'Password must be at least 6 characters'})
            }
            if(data.password !== data.confirmPassword){
                return setResult({...result, error:'Passwords do not match'})
            }
            setLoading(true)
            try {
                const response = await Axios.post('http://localhost:5002/api/public/resetPassword',{resetToken,password: data.password})
                setResult({...result,success: response.data?.msg})
            } catch (err) {
                setResult({...result,error: err && err.response && err.response.data})
            }
            setLoading(false)
        }
        useEffect(() => {
            if(!resetToken){
               props.history.push('/')
            }
            return () => {
            setData({password:'', confirmPassword:''})
            }
        }, [resetToken])
        return (
            <StyledContainer>
            <form onSubmit={resetPassword} autoComplete='off'>
            <div><img src={logo} alt='Dev Blogger'/></div>
            {result && result.success ? 
            <Success>
                <p> {result.success}</p>
                <p><IoMdCheckmarkCircleOutline/></p>
                <CustomButton><Link to={'/login'}>Login</Link></CustomButton>
            </Success>
                :
            <fieldset>
            <h2 style={{textAlign: 'center'}}>Enter A New Password </h2>
            <input autoFocus type="password" name="password" value={data.password} onChange={handleChange} placeholder='New Password'/>
            <input  type="password" name="confirmPassword" value={data.confirmPassword} onChange={handleChange} placeholder='Confirm New Password'/>
            {loading && <Spinner/>}
            <button type='submit'>{loading ? `Sending...` : `Reset Password`}</button>

            {result && result.error && <p className='error'>{result.error}</p>}
            </fieldset>
            }
            </form>
            </StyledContainer>
        )
    }
