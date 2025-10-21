"use client"

import { useRef, useEffect } from "react"
import { Play } from "lucide-react"

interface Channel {
  id: number
  name: string
  url: string
  type: string
}

interface ChannelListProps {
  channels: Channel[]
  selectedIndex: number
  onSelectChannel: (index: number) => void
}

export default function ChannelList({ channels, selectedIndex, onSelectChannel }: ChannelListProps) {
  const selectedChannelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (selectedChannelRef.current) {
      selectedChannelRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      })
    }
  }, [selectedIndex])

  return (
    <div className="flex flex-col gap-2 p-3">
      {channels.map((channel, index) => (
        <button
          key={channel.id}
          ref={index === selectedIndex ? selectedChannelRef : null}
          onClick={() => onSelectChannel(index)}
          className={`w-full px-2 py-2 rounded-lg font-medium transition-all text-left group relative overflow-hidden ${
            index === selectedIndex
              ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/50"
              : "bg-secondary/50 text-foreground hover:bg-secondary border border-transparent hover:border-primary/50"
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              {index === selectedIndex && <Play className="w-3 h-3 flex-shrink-0 fill-current" />}
              <span className="truncate text-xs">{channel.name}</span>
            </div>
            <span
              className={`text-xs font-bold flex-shrink-0 px-2 py-1 rounded ${
                index === selectedIndex ? "bg-primary-foreground/20" : "bg-primary/20 text-primary"
              }`}
            >
              {channel.type.toUpperCase()}
            </span>
          </div>
        </button>
      ))}
    </div>
  )
}
