import React, {useRef, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { REGISTER } from '../Service/Api_Handler'

const RegistrationOld = () => {
    const navigate = useNavigate()
    const [registerInfo, setRegisterInfo] = useState({
        name : '',
        email : '',
        mobileNumber : '',
        password : ''
    })
    const [confirmPassword, setConfirmPassword] = useState('')

    const onChangeHandler = (e) => {
        if(e.target.name == "rePassword") return setConfirmPassword(e.target.value);
        setRegisterInfo({...registerInfo, [e.target.name] : e.target.value})
    }

    const refPass = useRef();
    const onClickSubmitHandler = async(e) => {
        e.preventDefault()
        if(registerInfo.mobileNumber.length !== 10) return toast.warn("Invalid Mobile Number.")
        if(registerInfo.name === '' || registerInfo.name.length <= 4) return toast.warn('Name more then 4 charactor')
        if(registerInfo.password !== confirmPassword){
            toast.warn("Password missmatch.")
            refPass.current.classList.add('input-error')
            return;
        }
        refPass.current.classList.remove('input-error')
        const response = await REGISTER(registerInfo)
        console.log(response)
        if(!response.status) return toast.warn(response.message)
        console.log(response)
        toast.success(response.message)
        localStorage.setItem('authToken', response.authToken)
        navigate('/account/auth/login')
    }

    
  return (
    <div className='login container-fluid'>
        <div className='login-card'>
            <h2 className='title'>Registration</h2>
            <form onSubmit={e => onClickSubmitHandler(e)}>
                <div className='name'>
                    <input type='text' name='name' placeholder='Name' onChange={e => onChangeHandler(e)}/>
                </div>
                <div className='email'>
                    <input type='email' placeholder='Email' name='email' onChange={e => onChangeHandler(e)}/>
                </div>
                <div className='mobile'>
                    <input type='number' placeholder='Mobile Number' name='mobileNumber' onChange={e => onChangeHandler(e)}/>
                </div>
                <div className="password">
                    <input type='password' placeholder='Pass****' name='password' onChange={e => onChangeHandler(e)}/>
                </div>
                <div className="password">
                    <input ref={refPass} type='password' placeholder='Confirm Pass****' name='rePassword' onChange={e => onChangeHandler(e)}/>
                </div>
                {/* <div className="forgot-password">
                    <Link to={'/'}>Forgot Password</Link>
                </div> */}
                <div className="login-button center-btn">
                    <button type='submit'>Login</button>
                </div>
                <div className='have-an-account mt-3 text-center'>
                    <Link to={'/account/auth/login'} className='text-light'>Aleady have an account ?</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default RegistrationOld
