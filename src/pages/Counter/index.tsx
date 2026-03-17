'use client';


import useCounter from '@/hooks/useCounter';

const CounterPage = () => {
  const {handleDecrement, handleIncrement ,  handleReset ,  count} =  useCounter(0)
   

  return (
    <div>
           <h1 className='font-bold text-2xl items-center justify-center my-4 flex'>Counter app useing custom  hook</h1>
           <div className='flex m-auto justify-between w-[100px] items-center mb-2'>
                <button className='bg-blue-600 p-1 px-3 text-white cursor-pointer rounded ' onClick={handleIncrement}>+</button>
                <h2>{count}</h2>
                <button className='bg-blue-600 py-1 px-3 rounded text-white cursor-pointer' onClick={handleDecrement}>-</button>
           </div>
           <button className='capitalize bg-gray-500 py-2 cursor-pointer text-white px-4 rounded m-auto flex' onClick={handleReset}>reset</button>
    </div>
  )
}

export default CounterPage