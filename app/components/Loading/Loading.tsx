"use client";
import { LoadingProps } from '@/app/types'
import { useEffect, useState } from 'react'

// Full-screen loading overlay
const Loading = ({ text }: LoadingProps) => {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const timerId = setInterval(() => {
            setDots(prev => prev.length < 3 ? prev + '.' : '' );
        }, 500)
        return () => clearInterval(timerId);
    }, [])

    return (
        <div className="fixed inset-0 bg-[#181817] flex items-center justify-center z-50">
            <p className="text-xl text-[#e5e5e1]">
                {text}{dots}
            </p>
        </div>
    )
}

export default Loading
