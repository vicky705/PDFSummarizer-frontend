import React from 'react'

const Sendmessage = ({data}) => {
  const getText = (text) => {
    return text.replace(/\n/g, '<br>')
  }
  return (
    <div className='send-message'>
        <p>{getText(data.prompt)}</p>
    </div>
  )
}

export default Sendmessage
