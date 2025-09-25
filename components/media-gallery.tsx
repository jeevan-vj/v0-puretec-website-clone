"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, X, Calendar, Award, Tv, Camera, ChevronLeft, ChevronRight } from "lucide-react"

interface MediaFile {
  id: string
  type: "image" | "video"
  url: string
  thumbnail: string
  caption?: string
}

interface MediaItem {
  id: string
  category: "events" | "achievements" | "media" | "tv"
  title: string
  description: string
  date: string
  tags: string[]
  files: MediaFile[]
}

const mediaItems: MediaItem[] = [
  {
    id: "1",
    category: "tv",
    title: "Featured on Morning Fitness Show",
    description: "Discussing the latest fitness trends and transformation techniques on Channel 7 Morning Show",
    date: "2024-01-15",
    tags: ["TV Interview", "Fitness Tips", "Media"],
    files: [
      {
        id: "1-1",
        type: "video",
        url: "https://example.com/tv-interview.mp4",
        thumbnail: "/fitness-trainer-on-tv-show-interview.jpg",
        caption: "Full interview segment",
      },
      {
        id: "1-2",
        type: "image",
        url: "/fitness-trainer-tv-studio-behind-scenes.jpg",
        thumbnail: "/fitness-trainer-tv-studio-behind-scenes.jpg",
        caption: "Behind the scenes at the studio",
      },
      {
        id: "1-3",
        type: "image",
        url: "/fitness-trainer-with-tv-host-handshake.jpg",
        thumbnail: "/fitness-trainer-with-tv-host-handshake.jpg",
        caption: "Meeting with the show host",
      },
    ],
  },
  {
    id: "2",
    category: "achievements",
    title: "Certified Personal Trainer of the Year",
    description:
      "Awarded by the National Fitness Association for outstanding client results and professional excellence",
    date: "2023-12-10",
    tags: ["Award", "Recognition", "Achievement"],
    files: [
      {
        id: "2-1",
        type: "image",
        url: "/fitness-trainer-award-certificate-ceremony.jpg",
        thumbnail: "/fitness-trainer-award-certificate-ceremony.jpg",
        caption: "Award ceremony moment",
      },
      {
        id: "2-2",
        type: "image",
        url: "/fitness-trainer-award-certificate-close-up.jpg",
        thumbnail: "/fitness-trainer-award-certificate-close-up.jpg",
        caption: "Certificate close-up",
      },
      {
        id: "2-3",
        type: "image",
        url: "/fitness-trainer-award-celebration-team.jpg",
        thumbnail: "/fitness-trainer-award-celebration-team.jpg",
        caption: "Celebrating with the team",
      },
      {
        id: "2-4",
        type: "image",
        url: "/fitness-trainer-award-trophy-display.jpg",
        thumbnail: "/fitness-trainer-award-trophy-display.jpg",
        caption: "Trophy display at gym",
      },
    ],
  },
  {
    id: "3",
    category: "events",
    title: "Fitness Expo 2024 Keynote",
    description:
      'Delivering a keynote presentation on "The Future of Personal Training" at the International Fitness Expo',
    date: "2024-02-20",
    tags: ["Speaking", "Conference", "Keynote"],
    files: [
      {
        id: "3-1",
        type: "video",
        url: "https://example.com/keynote.mp4",
        thumbnail: "/fitness-trainer-speaking-at-conference-keynote.jpg",
        caption: "Full keynote presentation",
      },
      {
        id: "3-2",
        type: "image",
        url: "/fitness-expo-audience-packed-auditorium.jpg",
        thumbnail: "/fitness-expo-audience-packed-auditorium.jpg",
        caption: "Packed auditorium",
      },
      {
        id: "3-3",
        type: "image",
        url: "/fitness-trainer-expo-booth-visitors.jpg",
        thumbnail: "/fitness-trainer-expo-booth-visitors.jpg",
        caption: "Meeting attendees at booth",
      },
    ],
  },
  {
    id: "4",
    category: "events",
    title: "Community Fitness Challenge",
    description: "Leading a 500-person outdoor fitness challenge in Central Park, raising funds for local charities",
    date: "2024-03-05",
    tags: ["Community", "Charity", "Group Training"],
    files: [
      {
        id: "4-1",
        type: "image",
        url: "/large-group-fitness-class-outdoor-park.jpg",
        thumbnail: "/large-group-fitness-class-outdoor-park.jpg",
        caption: "500 participants in action",
      },
      {
        id: "4-2",
        type: "video",
        url: "https://example.com/charity-workout.mp4",
        thumbnail: "/fitness-challenge-warm-up-session.jpg",
        caption: "Warm-up session highlights",
      },
      {
        id: "4-3",
        type: "image",
        url: "/charity-fitness-event-donation-check.jpg",
        thumbnail: "/charity-fitness-event-donation-check.jpg",
        caption: "Presenting donation check",
      },
      {
        id: "4-4",
        type: "image",
        url: "/community-fitness-challenge-group-photo.jpg",
        thumbnail: "/community-fitness-challenge-group-photo.jpg",
        caption: "Group photo with all participants",
      },
      {
        id: "4-5",
        type: "image",
        url: "/fitness-challenge-setup-early-morning.jpg",
        thumbnail: "/fitness-challenge-setup-early-morning.jpg",
        caption: "Early morning setup",
      },
    ],
  },
  {
    id: "5",
    category: "media",
    title: "Transformation Success Stories",
    description:
      "Documentary feature showcasing incredible client transformations and the science behind effective training",
    date: "2024-01-30",
    tags: ["Documentary", "Transformations", "Success Stories"],
    files: [
      {
        id: "5-1",
        type: "video",
        url: "https://example.com/transformations.mp4",
        thumbnail: "/before-after-fitness-transformation-documentary.jpg",
        caption: "Full documentary feature",
      },
      {
        id: "5-2",
        type: "image",
        url: "/documentary-filming-client-interview.jpg",
        thumbnail: "/documentary-filming-client-interview.jpg",
        caption: "Filming client interviews",
      },
      {
        id: "5-3",
        type: "image",
        url: "/transformation-before-after-collage.jpg",
        thumbnail: "/transformation-before-after-collage.jpg",
        caption: "Before and after collage",
      },
    ],
  },
  {
    id: "6",
    category: "achievements",
    title: "Published Fitness Research",
    description:
      'Co-authored research paper on "High-Intensity Interval Training Effectiveness" published in Sports Medicine Journal',
    date: "2023-11-15",
    tags: ["Research", "Publication", "Science"],
    files: [
      {
        id: "6-1",
        type: "image",
        url: "/fitness-research-paper-publication-journal.jpg",
        thumbnail: "/fitness-research-paper-publication-journal.jpg",
        caption: "Published research paper",
      },
      {
        id: "6-2",
        type: "image",
        url: "/research-lab-fitness-testing-equipment.jpg",
        thumbnail: "/research-lab-fitness-testing-equipment.jpg",
        caption: "Research lab equipment",
      },
      {
        id: "6-3",
        type: "image",
        url: "/fitness-research-data-analysis-charts.jpg",
        thumbnail: "/fitness-research-data-analysis-charts.jpg",
        caption: "Data analysis and charts",
      },
    ],
  },
]

const categories = [
  { id: "all", label: "All Media", icon: Camera },
  { id: "events", label: "Events", icon: Calendar },
  { id: "achievements", label: "Achievements", icon: Award },
  { id: "media", label: "Media Coverage", icon: Camera },
  { id: "tv", label: "TV & Podcasts", icon: Tv },
]

export default function MediaGallery() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [currentFileIndex, setCurrentFileIndex] = useState(0)

  const filteredItems =
    selectedCategory === "all" ? mediaItems : mediaItems.filter((item) => item.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "events":
        return "bg-blue-500"
      case "achievements":
        return "bg-yellow-500"
      case "media":
        return "bg-green-500"
      case "tv":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const openModal = (item: MediaItem) => {
    setSelectedItem(item)
    setCurrentFileIndex(0)
  }

  const nextFile = () => {
    if (selectedItem && currentFileIndex < selectedItem.files.length - 1) {
      setCurrentFileIndex(currentFileIndex + 1)
    }
  }

  const prevFile = () => {
    if (currentFileIndex > 0) {
      setCurrentFileIndex(currentFileIndex - 1)
    }
  }

  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Media & Achievements</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Showcasing our journey through events, achievements, media coverage, and the incredible transformations
            we've helped create
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? "bg-yellow-500 text-black hover:bg-yellow-600"
                    : "border-gray-600 text-gray-300 hover:bg-gray-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </Button>
            )
          })}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group cursor-pointer bg-slate-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
              onClick={() => openModal(item)}
            >
              <div className="relative">
                {/* Main image */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={item.files[0]?.thumbnail || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {item.files[0]?.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Play className="w-6 h-6 text-black ml-1" />
                      </div>
                    </div>
                  )}
                  <div
                    className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-semibold text-white ${getCategoryColor(item.category)}`}
                  >
                    {item.category.toUpperCase()}
                  </div>
                  {/* Media count badge */}
                  {item.files.length > 1 && (
                    <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-semibold">
                      +{item.files.length - 1} more
                    </div>
                  )}
                </div>

                {/* Thumbnail grid for additional files */}
                {item.files.length > 1 && (
                  <div className="grid grid-cols-4 gap-1 p-2 bg-slate-700">
                    {item.files.slice(1, 5).map((file, index) => (
                      <div key={file.id} className="aspect-square relative overflow-hidden rounded">
                        <img
                          src={file.thumbnail || "/placeholder.svg"}
                          alt={`${item.title} ${index + 2}`}
                          className="w-full h-full object-cover"
                        />
                        {file.type === "video" && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                            <Play className="w-3 h-3 text-white" />
                          </div>
                        )}
                        {index === 3 && item.files.length > 5 && (
                          <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white text-xs font-semibold">
                            +{item.files.length - 5}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{item.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
                  <p className="text-xs text-gray-400">{item.files.length} files</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedItem && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Navigation arrows */}
                {selectedItem.files.length > 1 && (
                  <>
                    <button
                      onClick={prevFile}
                      disabled={currentFileIndex === 0}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextFile}
                      disabled={currentFileIndex === selectedItem.files.length - 1}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                <div className="aspect-video relative">
                  {selectedItem.files[currentFileIndex]?.type === "video" ? (
                    <video
                      src={selectedItem.files[currentFileIndex]?.url}
                      poster={selectedItem.files[currentFileIndex]?.thumbnail}
                      controls
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  ) : (
                    <img
                      src={selectedItem.files[currentFileIndex]?.thumbnail || "/placeholder.svg"}
                      alt={selectedItem.title}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`px-3 py-1 rounded text-sm font-semibold text-white ${getCategoryColor(selectedItem.category)}`}
                      >
                        {selectedItem.category.toUpperCase()}
                      </div>
                      <span className="text-gray-400 text-sm">{new Date(selectedItem.date).toLocaleDateString()}</span>
                    </div>
                    {selectedItem.files.length > 1 && (
                      <span className="text-gray-400 text-sm">
                        {currentFileIndex + 1} of {selectedItem.files.length}
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl font-bold mb-2">{selectedItem.title}</h2>
                  {selectedItem.files[currentFileIndex]?.caption && (
                    <p className="text-yellow-400 text-sm mb-4">{selectedItem.files[currentFileIndex].caption}</p>
                  )}
                  <p className="text-gray-300 mb-6">{selectedItem.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedItem.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-gray-700 text-gray-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* File thumbnails navigation */}
                  {selectedItem.files.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {selectedItem.files.map((file, index) => (
                        <button
                          key={file.id}
                          onClick={() => setCurrentFileIndex(index)}
                          className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-colors ${
                            index === currentFileIndex ? "border-yellow-500" : "border-gray-600"
                          }`}
                        >
                          <img
                            src={file.thumbnail || "/placeholder.svg"}
                            alt={`${selectedItem.title} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          {file.type === "video" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <Play className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
