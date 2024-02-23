import React, { useEffect, useState } from 'react'

const Analisys = ({data}) => {
    const [cancelled , setCancelled] = useState(0)
    const [complete, setCompleted] = useState(0)
    useEffect(()=>{
        let count = data.reduce((total, data)=>{
            return total += data.deleted
        }, 0)
        setCancelled(count)
        let completecount = data.reduce((total, data)=>{
            return total += data.completed
        }, 0)
        setCompleted(completecount)
    }, [data])

  return (
    <div className='w-full h-1/2 mb-3 flex'>
        <div className='w-1/2 p-10 h-4/5 mb-3 mr-2 bg-[#0000004e] rounded-xl shadow-inner shadow-black flex justify-center items-center flex-col'>
            <h1 className='text-xl font-bold text-yellow-400'>Task Completed</h1>
            <h1 className='text-5xl font-black text-white'>{complete}</h1>
        </div>
        <div className='w-1/2 p-10 h-4/5 mb-3 ml-2 bg-[#0000004e] rounded-xl shadow-inner shadow-black flex justify-center items-center flex-col'>
            <h1 className='text-xl font-bold text-yellow-400'>Task Cancelled</h1>
            <h1 className='text-5xl font-black text-white'>{cancelled}</h1>
        </div>
    </div>
  )
}

export default Analisys