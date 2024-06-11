import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { LOGIN } from '../Service/Api_Handler'
import { useDispatch } from 'react-redux'
import { setAuthToken } from '../Service/Redux/StoreSlice'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loginInfo, setLoginInfo] = useState({
        email : '',
        password : ''
    })

    const onChangeHandler = (e) => {
        setLoginInfo({...loginInfo, [e.target.name] : e.target.value})
    }

    const onSubmitHandler = async(e) => {
        e.preventDefault()
        if(loginInfo.email === '' || loginInfo.password === '') return toast.warn("Please enter the filed.")
        const response = await LOGIN(loginInfo)
        console.log(response)
        if(!response.status) return toast.warn(response.message)
        localStorage.setItem('authToken', response.authToken)
        dispatch(setAuthToken(response.authToken))
        toast.success(response.message)
        navigate('/')
    }

    
  return (
    <div className='login container-fluid'>
        <div className='login-card'>
            <h2 className='title'>Login</h2>
            <form onSubmit={e => onSubmitHandler(e)}>
                <div className='email'>
                    <input type='email' placeholder='Email' name='email' onChange={e => onChangeHandler(e)} autoComplete={'username'}/>
                </div>
                <div className="password">
                    <input type='password' placeholder='Pass****' name='password' onChange={e => onChangeHandler(e)} autoComplete={'current-password'}/>
                </div>
                {/* <div className="forgot-password">
                    <Link to={'/'}>Forgot Password</Link>
                </div> */}
                <div className="login-button center-btn">
                    <button type='submit'>Login</button>
                </div>
                <div className='have-an-account mt-3 text-center'>
                    <Link to={'/account/auth/register'} className='text-light'>if you don't have an account ?</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
