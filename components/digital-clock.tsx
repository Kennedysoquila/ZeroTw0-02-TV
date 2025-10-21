"use client"

import { useEffect, useState } from "react"

export default function DigitalClock() {
  const [time, setTime] = useState<string>("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, "0")
      const minutes = String(now.getMinutes()).padStart(2, "0")
      const seconds = String(now.getSeconds()).padStart(2, "0")
      setTime(`${hours}:${minutes}:${seconds}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!time) return null

  return (
    <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary/30">
      <div className="font-mono text-lg font-bold text-primary">{time}</div>
    </div>
  )
}
