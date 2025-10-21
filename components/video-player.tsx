"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, AlertCircle } from "lucide-react"
import DigitalClock from "./digital-clock"

interface VideoPlayerProps {
  url: string
  type: "dash" | "m3u8"
}

export default function VideoPlayer({ url, type }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showControls, setShowControls] = useState(true)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    if (isFullscreen) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
  }

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    setError(null)
    setIsLoading(true)

    if (type === "dash") {
      loadDashPlayer(video, url)
    } else if (type === "m3u8") {
      loadHlsPlayer(video, url)
    }
  }, [url, type])

  const loadDashPlayer = async (video: HTMLVideoElement, url: string) => {
    try {
      const script = document.createElement("script")
      script.src = "https://cdn.dashjs.org/latest/dash.all.min.js"
      script.onload = () => {
        try {
          const dashjs = (window as any).dashjs
          if (dashjs) {
            const player = dashjs.MediaPlayer().create()

            player.on(dashjs.MediaPlayer.events.ERROR, (event: any) => {
              console.log("[v0] DASH Error:", event.error?.message)
              if (event.error?.message?.includes("DRM") || event.error?.message?.includes("KeySystem")) {
                setError("This stream is DRM protected and cannot be played in this environment")
              } else if (event.error?.message?.includes("MANIFEST")) {
                setError("Stream format not supported or invalid URL")
              } else {
                setError("Failed to load stream. Try another channel.")
              }
              setIsLoading(false)
            })

            player.initialize(video, url, true)
            setIsLoading(false)
          }
        } catch (err) {
          console.log("[v0] DASH initialization error:", err)
          setError("Failed to initialize DASH player")
          setIsLoading(false)
        }
      }
      script.onerror = () => {
        setError("Failed to load DASH player library")
        setIsLoading(false)
      }
      document.head.appendChild(script)
    } catch (error) {
      console.log("[v0] DASH loading error:", error)
      setError("Error loading DASH player")
      setIsLoading(false)
    }
  }

  const loadHlsPlayer = async (video: HTMLVideoElement, url: string) => {
    try {
      const script = document.createElement("script")
      script.src = "https://cdn.jsdelivr.net/npm/hls.js@latest"
      script.onload = () => {
        try {
          const Hls = (window as any).Hls
          if (Hls && Hls.isSupported()) {
            const hls = new Hls({
              enableWorker: true,
            })

            hls.on(Hls.Events.ERROR, (event: any, data: any) => {
              console.log("[v0] HLS Error:", data)
              if (data.type === "networkError") {
                setError("Network error. Check the stream URL or try another channel.")
              } else if (data.type === "mediaError") {
                setError("Media error. This stream may not be compatible.")
              } else if (data.details?.includes("DRM") || data.details?.includes("KeySystem")) {
                setError("This stream is DRM protected and cannot be played in this environment")
              } else {
                setError("Failed to load stream. Try another channel.")
              }
              setIsLoading(false)
            })

            hls.loadSource(url)
            hls.attachMedia(video)
            setIsLoading(false)
          } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = url
            setIsLoading(false)
          } else {
            setError("HLS playback not supported in this browser")
            setIsLoading(false)
          }
        } catch (err) {
          console.log("[v0] HLS initialization error:", err)
          setError("Failed to initialize HLS player")
          setIsLoading(false)
        }
      }
      script.onerror = () => {
        setError("Failed to load HLS player library")
        setIsLoading(false)
      }
      document.head.appendChild(script)
    } catch (error) {
      console.log("[v0] HLS loading error:", error)
      setError("Error loading HLS player")
      setIsLoading(false)
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        videoRef.current.requestFullscreen?.()
      } else {
        document.exitFullscreen?.()
      }
      setIsFullscreen(!isFullscreen)
    }
  }

  return (
    <div className="relative w-full h-full bg-black group" onMouseMove={handleMouseMove}>
      <video
        ref={videoRef}
        className="w-full h-full"
        controls={false}
        crossOrigin="anonymous"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={(e) => {
          console.log("[v0] Video element error:", e)
          setError("Failed to play stream. Try another channel.")
          setIsLoading(false)
        }}
      />

      <DigitalClock />

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            <p className="text-sm text-primary">Loading stream...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <div className="flex flex-col items-center gap-3 text-center px-4">
            <AlertCircle className="w-12 h-12 text-red-500" />
            <p className="text-sm text-foreground">{error}</p>
            <p className="text-xs text-muted-foreground">Try selecting a different channel from the list</p>
          </div>
        </div>
      )}

      {/* Custom Controls - Always visible in fullscreen, hover-based outside fullscreen */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 transition-opacity duration-200 ${
          isFullscreen ? (showControls ? "opacity-100" : "opacity-0") : "opacity-0 group-hover:opacity-100"
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="p-2 hover:bg-primary/30 rounded-lg transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-primary" />
              ) : (
                <Play className="w-5 h-5 text-primary fill-primary" />
              )}
            </button>

            <button
              onClick={toggleMute}
              className="p-2 hover:bg-primary/30 rounded-lg transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-primary" /> : <Volume2 className="w-5 h-5 text-primary" />}
            </button>
          </div>

          <button
            onClick={toggleFullscreen}
            className="p-2 hover:bg-primary/30 rounded-lg transition-colors ml-auto"
            aria-label="Fullscreen"
          >
            <Maximize className="w-5 h-5 text-primary" />
          </button>
        </div>
      </div>
    </div>
  )
}
