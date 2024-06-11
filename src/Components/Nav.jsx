import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Nav() {
    const navigate = useNavigate()
    const logoutHandler = () => {
        localStorage.removeItem('authToken');
        toast.success('Logout Successfully.')
        setTimeout(() => {
            navigate('/account/auth/login')
        }, 1000)
    }
  return (
    <div className='nav'>
        <p onClick={() => logoutHandler()}>Logout</p>
    </div>
  )
}

export default Nav
