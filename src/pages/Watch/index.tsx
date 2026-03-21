'use client'
import React, { useState, useEffect, useRef } from 'react'

const StartStopWatch = () => {
    const [progress, setProgress] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const handleStart = () => {
        if (!isRunning && progress < 100) {
            setIsRunning(true);
        }
    };

    const handleStop = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setProgress(0);
    };

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        setIsRunning(false);
                        if (intervalRef.current) clearInterval(intervalRef.current);
                        return 100;
                    }
                    return prev + 1; // Increment progress
                });
            }, 100); // 100ms interval for each 1%
        } else if (!isRunning && intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isRunning]);

    return (
        <div className='flex flex-col gap-2 items-center justify-center p-4'>
            <div className='text-2xl font-bold mb-4'>StartStopWatch</div>
            <progress max={100} value={progress} className='w-[200px] h-4 mb-4' />
            <div className='flex gap-2'>
                <button
                    onClick={handleStart}
                    disabled={isRunning || progress >= 100}
                    className='bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50'
                >
                    Start
                </button>
                <button
                    onClick={handleStop}
                    disabled={!isRunning}
                    className='bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50'
                >
                    Stop
                </button>
                <button
                    onClick={handleReset}
                    className='bg-blue-500 text-white px-4 py-2 rounded'
                >
                    Reset
                </button>
            </div>
        </div>
    )
}

export default StartStopWatch