import React, { useEffect, useRef, useState } from 'react'
import { GETFILETOTEXT, INITIALIZE_CHAT } from '../Service/Api_Handler'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthToken, setChatsEmpty, setContent, setIsLoading } from '../Service/Redux/StoreSlice'
import { useNavigate } from 'react-router-dom'
import Nav from './Nav'


const Uploadfile = () => {
    const refFileInput = useRef() 
    const [file, setFile] = useState(null)
    const [fileUrl, setFileUrl] = useState(null)
    const [allowedFile, setAllowedFile] = useState(['pdf'])
    const dispatch = useDispatch()
    const authToken = useSelector((state) => state.authToken.token)
    const navigate = useNavigate()
    const dropRef = useRef(null);

    const onDragHandler = (e) => {
        e.preventDefault()
        console.log(e)
    }

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropRef.current.classList.add('drag-over');
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropRef.current.classList.remove('drag-over');
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropRef.current.classList.remove('drag-over');
        const file = Array.from(e.dataTransfer.files)[0];
        const fileArray = file.name.split('.')
        if(!allowedFile.includes(fileArray[fileArray.length-1])) return toast.warn('Invalid File Type.'); 
        setFile(file)
        const reader = new FileReader();
        reader.onloadend = () => {
            setFileUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    
    const onChangeFile = async(event) => {
        const file = event.target.files[0]
        const fileArray = file.name.split('.')
        if(!allowedFile.includes(fileArray[fileArray.length-1])) return toast.warn('Invalid File Type.'); 
        setFile(file)
        const reader = new FileReader();
        reader.onloadend = () => {
            setFileUrl(reader.result);
        };
        reader.readAsDataURL(file);
    }
    
    const summerizeHandler = async(e) => {
        dispatch(setIsLoading(true))
        if(!file) {
            toast.warn("Please select file.")
            dispatch(setIsLoading(false))
            return
        }
        const response = await GETFILETOTEXT(file)
        console.log(response)
        if(response.status){
            // const init = await INITIALIZE_CHAT(response.text.text, authToken)
            dispatch(setContent(response.text.text))
            toast.success("You can start chating.")
            navigate('/chats')
        }
        dispatch(setIsLoading(false))
    }

    useEffect(() => {
        dispatch(setChatsEmpty())
    }, [])
    
    useEffect(() => {
        const tokenFromLocal = localStorage.getItem('authToken')
        if(tokenFromLocal){
          dispatch(setAuthToken(tokenFromLocal))
        }
        else{
            navigate('/account/auth/login')
        }
      }, [])

    return (
        <>
            <Nav />
            {!file && <div className='upload-file container-fluid'>
                <div className='upload-container drop-zone'
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    ref={dropRef}
                >
                    <h2>Drag and Drop a file here</h2>
                    <button className="select-btn" onClick={e => refFileInput.current.click()}>Select Files</button>
                    <input type='file' className='d-none' ref={refFileInput} onChange={e => onChangeFile(e)} accept='.pdf'/>
                </div>
            </div>}
            {file && <div className='selected-file container-fluid'>
                <div className='left-div'>
                    <iframe className='pdf-viewer' src={fileUrl} frameborder="0"></iframe>
                </div>
                <div className='right-div'>
                    <button className='select-btn' onClick={e => summerizeHandler(e)}>Analyze</button>
                </div>
            </div>}
        </>
    )
}

export default Uploadfile
