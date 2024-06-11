import React, { useEffect, useRef, useState } from 'react'
import Sendmessage from './Sendmessage'
import Recievemessage from './Recievemessage'
import { useDispatch, useSelector } from 'react-redux'
import { SEND_MESSAGE, SEND_MESSAGE_WITH_CONTENT } from '../../Service/Api_Handler'
import { addChatsToStore, removeLastChat } from '../../Service/Redux/StoreSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Nav from '../Nav'

const Chatarea = () => {
  const authToken = useSelector((state) => state.authToken.token)
  const chats = useSelector((state) => state.chats.chats)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const content = useSelector((state) => state.content.content)
  const chatSectionRef = useRef(null)

  const scrollToBottom = () => {
    if (chatSectionRef.current) {
      setTimeout(() => {
        chatSectionRef.current.scrollTop = chatSectionRef.current.scrollHeight;
      }, 100)
    }
  };

  const [prompt, setPrompt] = useState({
    prompt : '',
    isSender : true
  })

  const onChangeHandler = (e) => {
    setPrompt({...prompt, [e.target.name] : e.target.value})
  }

  const sendMessageHandler = async(e) => {
    e.preventDefault()
    if(prompt.prompt === '') return toast.warn("Empty Prompt.")
    dispatch(addChatsToStore(prompt))
    dispatch(addChatsToStore({isSender : false, message : "Analyzing..."}))
    scrollToBottom()
    setPrompt({...prompt, prompt : ''})
    // const response = await SEND_MESSAGE(prompt, authToken)
    const response = await SEND_MESSAGE_WITH_CONTENT(content, prompt.prompt, authToken)
    if(!response.status) {
      setTimeout(() => {
        navigate('/')
      }, 1000)
      return toast.warn("Please provide content.")
    }
    // console.log(response)
    dispatch(removeLastChat())
    dispatch(addChatsToStore(response))
    scrollToBottom()
  }
 
  useEffect(() => {
    if(content === ''){
      toast.warn("Please select file.")
      setTimeout(() => {
        navigate('/')
      }, 1000)
    }
  })



  return (
    <div className='chat-area container-fluid'>
      <Nav />
      <div className=' chats'>
        <div className='chat-section' ref={chatSectionRef}>
          {
            chats && chats.length > 0 && chats.map((item, idx) => {
              return item.isSender ? <Sendmessage key={idx} data={item} /> : <Recievemessage key={idx} data={item} />
            })
          }
        </div>
        <div className='message-box'>
          <form onSubmit={e => sendMessageHandler(e)}>
            <input type='text' name='prompt' value={prompt.prompt} placeholder='Your message.' onChange={e => onChangeHandler(e)}/>
            <button>Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Chatarea
