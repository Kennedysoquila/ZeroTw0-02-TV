"use client"

import { useState, useEffect } from "react"
import { Zap, AlertCircle } from "lucide-react"
import VideoPlayer from "@/components/video-player"
import ChannelList from "@/components/channel-list"
import SearchBar from "@/components/search-bar"
import { channels } from "@/lib/channels"

export default function Home() {
  const [selectedChannel, setSelectedChannel] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredChannels, setFilteredChannels] = useState(channels)

  useEffect(() => {
    const filtered = channels.filter((channel) => channel.name.toLowerCase().includes(searchQuery.toLowerCase()))
    setFilteredChannels(filtered.length > 0 ? filtered : channels)
    setSelectedChannel(0)
  }, [searchQuery])

  const currentChannel = filteredChannels[selectedChannel] || channels[0]

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-card to-card/80 border-b border-primary/20 backdrop-blur-sm">
        <div className="max-w-full mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg shadow-primary/50">
              <Zap className="w-6 h-6 text-primary-foreground fill-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ZeroTw0-02 TV
              </h1>
              <p className="text-sm font-bold text-primary uppercase tracking-widest">For PHCorner Only</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-4 p-4 lg:p-6 max-w-full">
        {/* Video Player Section - Left Side */}
        <div className="flex-1 min-w-0">
          <div className="bg-card rounded-xl overflow-hidden border border-primary/20 shadow-2xl">
            <div className="aspect-video bg-black relative">
              <VideoPlayer url={currentChannel.url} type={currentChannel.type} />
            </div>
            <div className="p-4 bg-gradient-to-r from-secondary to-secondary/80 border-t border-primary/20">
              <h2 className="text-xl font-bold text-foreground">{currentChannel.name}</h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-semibold">
                  {currentChannel.type.toUpperCase()}
                </span>
                <span className="text-xs text-muted-foreground">{currentChannel.group}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Channel List Sidebar - Right Side */}
        <div className="w-full lg:flex-1 flex flex-col gap-4 h-[calc(100vh-60px)] lg:h-[calc(100vh-80px)]">
          <div className="sticky top-20 z-40 bg-background">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          {/* Channel List */}
          <div className="flex-1 min-h-0">
            <div className="bg-card rounded-xl border border-primary/20 overflow-hidden shadow-xl h-full flex flex-col">
              <div className="px-4 py-3 bg-gradient-to-r from-primary/10 to-accent/10 border-b border-primary/20">
                <h3 className="text-sm font-bold text-primary uppercase tracking-wider">Channels</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {filteredChannels.length} of {channels.length} channels
                </p>
              </div>
              <div className="overflow-y-auto flex-1">
                <ChannelList
                  channels={filteredChannels}
                  selectedIndex={selectedChannel}
                  onSelectChannel={setSelectedChannel}
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-destructive/20 to-destructive/10 border border-destructive/50 rounded-lg p-3 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-destructive uppercase tracking-wider">Warning</p>
              <p className="text-xs text-destructive/80 mt-1">DO NOT SELL THIS SITE</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
