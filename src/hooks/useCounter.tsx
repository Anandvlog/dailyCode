import React, { useState } from 'react'

const useCounter = (initialValue = 0) => {
     
    const [count , setCount] = useState(initialValue)

    const handleIncrement = () => {
            setCount( count + 1 )
        }

         const handleDecrement = () =>{
        setCount((prev) =>  Math.max(0, prev - 1 ))
    }

    const handleReset = () =>{
        setCount(0)
    }

  return {
    count,
    handleReset,
    handleDecrement,
    handleIncrement
  }
}

export default useCounter