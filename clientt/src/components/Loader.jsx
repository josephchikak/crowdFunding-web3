import React from 'react'

import { loader } from '../assets'

const Loader = () => {
  return (
    <div className='fixed inset-0 z-10 h-screen flex items-center justify-center bg-[rgba(0,0,0.7)] flex-col'>
        <img src={loader} alt="loader"  className='w-[100px] h-[100px] oject-contain'/>
        <p className="mt-[20px] font-epilogue text-white font-bold text-[20px] text-center">Your transaction is in progress <br/> Please wait...</p>
    </div>
  )
}

export default Loader