import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css'
import Login from './Components/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Registration from './Components/Registration';
import Uploadfile from './Components/Uploadfile';
import Loding from './Components/Loding';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { setAuthToken } from './Service/Redux/StoreSlice';
import Chatarea from './Components/Chats/Chatarea';

function App() {
  const isLoading = useSelector((state) => state.isLoading.loading)
  const authToken = useSelector((state) => state.authToken.token)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onCheckLocalStorate = (tokenFromLocal) => {
    
  }

  useEffect(() => {
    const tokenFromLocal = localStorage.getItem('authToken')
    if(!tokenFromLocal) return navigate('/account/auth/login')
    dispatch(setAuthToken(tokenFromLocal))
  }, [])
  return (
    <>
      {isLoading && <Loding />}
      <ToastContainer />
        <Routes>
          <Route path='/' element={<Uploadfile />}/>
          <Route path='/account/auth/login' element={<Login />}/>
          <Route path='/account/auth/register' element={<Registration />}/>
          <Route path='/chats' element={<Chatarea />}/>
        </Routes>
    </>
  )
}

export default App
