import React from 'react'
import loading from '../assets/images/loading.gif'

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
    <img src={loading} alt="Loading..." />
  </div>
  )
}

export default Loading