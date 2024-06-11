import React, { useEffect } from 'react'
import Lottie from "lottie-react";
import animation from "../assets/Animations/loading.json";

const Loding = () => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
    }, [])
  return (
    <div className='loading'>
        <Lottie className='animation' animationData={animation} loop={true} />
    </div>
  )
}

export default Loding
