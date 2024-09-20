import React, {useEffect, useState} from 'react'

export default function DateFormat() {
const[date,setDate] = useState(new Date())

    useEffect(() => {
      const intervalId = setInterval(() => {
setDate(new Date())
      },1000)

      return () => clearInterval(intervalId)
    }, [])

    // const formatDate = (date)=>{
    //     return date.toLocaleDateString()
    // }
    // const formatTime = (date)=>{
    //     return date.toLocaleTimeString()
    // }
    const formatDate = (date)=>{
        return date.toLocaleDateString('en-US',{
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }
    const formatTime = (date)=>{
        return date.toLocaleTimeString('en-US',{
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        })
    }
  return (
    <div className='inline'> {formatDate(date)} <span>         at</span> {formatTime(date)}</div>
  )
}
