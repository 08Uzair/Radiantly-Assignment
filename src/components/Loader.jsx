import React from 'react'
import logo from '../assets/logo.png'
const Loader = () => {
  return (
    <>
        <div className='w-full h-[100vh] bg-[black] flex item-center justify-center'>
<img className='loader' src={logo}/>
        </div>
    </>
  )
}

export default Loader