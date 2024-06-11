import React, {useRef, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { REGISTER } from '../Service/Api_Handler'
import { useFormik } from 'formik'
import {registrationSchema} from './Schemas/Validition.js'

const Registration = () => {
    const navigate = useNavigate()
    
    const initialValue = {
        name : '',
        email : '',
        mobileNumber : '',
        password : '',
        confirm_password : ""
    }

    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues : initialValue,
        validationSchema : registrationSchema,
        onSubmit : (value) => {
            onClickSubmitHandler(value)
        }
    })
    

    const onClickSubmitHandler = async(registerInfo) => {
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
            <form onSubmit={handleSubmit}>
                <div className='name'>
                    <input type='text' value={values.name} name='name' placeholder='Name' onChange={handleChange} onBlur={handleBlur}/>
                    {errors.name && touched.name && <p className='error'>{errors.name}</p>}
                </div>
                <div className='email'>
                    <input type='email' value={values.email} placeholder='Email' name='email' onChange={handleChange} onBlur={handleBlur} autoComplete='username'/>
                    {errors.email && touched.email && <p className='error'>{errors.email}</p>}
                </div>
                <div className='mobile'>
                    <input type='number' value={values.mobileNumber} placeholder='Mobile Number' name='mobileNumber' onChange={handleChange} onBlur={handleBlur}/>
                    {errors.mobileNumber && touched.mobileNumber && <p className='error'>{errors.mobileNumber}</p>}
                </div>
                <div className="password">
                    <input type='password' value={values.password} placeholder='Pass****' name='password' onChange={handleChange} onBlur={handleBlur} autoComplete={'new-password'}/>
                    {errors.password && touched.password && <p className='error'>{errors.password}</p>}
                </div>
                <div className="password">
                    <input type='password' value={values.confirm_password} placeholder='Confirm Pass****' name='confirm_password' onChange={handleChange} onBlur={handleBlur} autoComplete={'new-password'}/>
                    {errors.confirm_password && touched.confirm_password && <p className='error'>{errors.confirm_password}</p>}
                </div>
                {/* <div className="forgot-password">
                    <Link to={'/'}>Forgot Password</Link>
                </div> */}
                <div className="login-button center-btn">
                    <button type='submit' disabled={Object.keys(errors) != ""}>Login</button>
                </div>
                <div className='have-an-account mt-3 text-center'>
                    <Link to={'/account/auth/login'} className='text-light'>Aleady have an account ?</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Registration
