import React, { useState } from 'react'


const Recievemessage = ({data}) => {
  const getText = (text) => {
    return text.replace(/\n/g, '<br>')
  }
  function convertToBoldAndList(text) {
    let boldConvertedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    let listConvertedText = boldConvertedText.replace(/\*(.*?)\*/g, '<ul><li>$1</li></ul>');
    
    return listConvertedText;
}



  return (
    <div className='recieve-message'>
      <p dangerouslySetInnerHTML={{__html: convertToBoldAndList(getText(data.message))}}></p>
    </div>
  )
}

export default Recievemessage
