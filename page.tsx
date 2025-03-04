"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function YouTubePlayer() {
  const [url, setUrl] = useState("")
  const [videoId, setVideoId] = useState("")
  const [error, setError] = useState("")

  const extractVideoId = (url: string) => {
    // Handle different YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/
    const match = url.match(regExp)

    if (match && match[2].length === 11) {
      return match[2]
    } else {
      return null
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!url.trim()) {
      setError("Please enter a YouTube URL")
      return
    }

    const id = extractVideoId(url)
    if (id) {
      setVideoId(id)
      setError("")
    } else {
      setError("Invalid YouTube URL. Please enter a valid YouTube link.")
      setVideoId("")
    }
  }

  return (
    <div className="container mx-auto max-w-3xl py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">YouTube Video Player</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Paste YouTube URL here (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">Play</Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </form>

      {videoId && (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </CardContent>
        </Card>
      )}

      {!videoId && (
        <div className="text-center text-muted-foreground p-10 border border-dashed rounded-lg">
          Enter a YouTube URL above to play the video here
        </div>
      )}
    </div>
  )
}

