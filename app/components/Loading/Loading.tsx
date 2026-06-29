"use client";
import { LoadingProps } from '@/app/types'
import { useEffect, useState } from 'react'

// Animated dots for loading feedback
const Loading = ({ text }: LoadingProps) => {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const timerId = setInterval(() => {
            setDots(prev => prev.length < 3 ? prev + '.' : '' );
        }, 500)
        return () => clearInterval(timerId);
    }, [])

  return (
    <p>
      {text} {dots}
    </p>
  )
}

export default Loading
