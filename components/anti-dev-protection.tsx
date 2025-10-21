"use client"

import { useEffect } from "react"
import { initializeAntiDevProtection } from "@/lib/anti-dev"

export function AntiDevProtection() {
  useEffect(() => {
    initializeAntiDevProtection()
  }, [])

  return null
}
