"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, X, Calendar, Award, Tv, Camera, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"

interface MediaFile {
  id: string
  type: "image" | "video"
  url: string
  thumbnail: string
  caption?: string
}

interface MediaItem {
  id: string
  category: "events" | "achievements" | "media" | "tv" | "trainers" | "transformations"
  title: string
  description: string
  date: string
  tags: string[]
  files: MediaFile[]
}

const mediaItems: MediaItem[] = [
  // 2022 ICN Nationals - Main Achievement
  {
    id: "icn-2022",
    category: "achievements",
    title: "2022 ICN Nationals Championship",
    description: "Ruwan's outstanding performance at the 2022 ICN Nationals in New Zealand, showcasing dedication to natural bodybuilding excellence.",
    date: "2022-10-15",
    tags: ["ICN", "Nationals", "Championship", "Natural Bodybuilding"],
    files: [
      {
        id: "icn-1",
        type: "image",
        url: "/images/2022-icn-nationals/ruw_570.jpg",
        thumbnail: "/images/2022-icn-nationals/ruw_570.jpg",
        caption: "ICN Nationals 2022 - Championship Pose",
      },
      {
        id: "icn-2",
        type: "image",
        url: "/images/2022-icn-nationals/_NZ91439-NEF_RCP.jpg",
        thumbnail: "/images/2022-icn-nationals/_NZ91439-NEF_RCP.jpg",
        caption: "Stage Presentation",
      },
      {
        id: "icn-3",
        type: "image",
        url: "/images/2022-icn-nationals/_NZ91444-NEF_RCP.jpg",
        thumbnail: "/images/2022-icn-nationals/_NZ91444-NEF_RCP.jpg",
        caption: "Competition Pose",
      },
      {
        id: "icn-4",
        type: "image",
        url: "/images/2022-icn-nationals/_NZ91782-NEF_RCP.jpg",
        thumbnail: "/images/2022-icn-nationals/_NZ91782-NEF_RCP.jpg",
        caption: "Stage Performance",
      },
      {
        id: "icn-5",
        type: "image",
        url: "/images/2022-icn-nationals/_NZ91785-NEF_RCP.jpg",
        thumbnail: "/images/2022-icn-nationals/_NZ91785-NEF_RCP.jpg",
        caption: "Physique Display",
      },
      {
        id: "icn-6",
        type: "image",
        url: "/images/2022-icn-nationals/_NZ93698-NEF_RCP.jpg",
        thumbnail: "/images/2022-icn-nationals/_NZ93698-NEF_RCP.jpg",
        caption: "Front Pose",
      },
      {
        id: "icn-7",
        type: "image",
        url: "/images/2022-icn-nationals/_NZ93830-NEF_RCP.jpg",
        thumbnail: "/images/2022-icn-nationals/_NZ93830-NEF_RCP.jpg",
        caption: "Competition Highlight",
      },
      {
        id: "icn-8",
        type: "image",
        url: "/images/2022-icn-nationals/_NZ93947-NEF_RCP.jpg",
        thumbnail: "/images/2022-icn-nationals/_NZ93947-NEF_RCP.jpg",
        caption: "Stage Presence",
      },
      {
        id: "icn-9",
        type: "video",
        url: "/images/2022-icn-nationals/IMG_0679.MOV",
        thumbnail: "/images/2022-icn-nationals/ruw_570.jpg",
        caption: "Competition Walkout Video",
      },
      {
        id: "icn-10",
        type: "video",
        url: "/images/2022-icn-nationals/IMG_0681.MOV",
        thumbnail: "/images/2022-icn-nationals/_NZ91439-NEF_RCP.jpg",
        caption: "Stage Routine Video",
      },
    ],
  },
  // ICN Nationals Gallery - More Photos
  {
    id: "icn-gallery",
    category: "events",
    title: "ICN Nationals 2022 - Behind the Scenes",
    description: "Exclusive backstage and competition moments from the 2022 ICN Nationals Championship.",
    date: "2022-10-15",
    tags: ["ICN", "Backstage", "Competition Day", "Natural Bodybuilding"],
    files: [
      {
        id: "icn-g1",
        type: "image",
        url: "/images/2022-icn-nationals/_NZ93997-NEF_RCP.jpg",
        thumbnail: "/images/2022-icn-nationals/_NZ93997-NEF_RCP.jpg",
        caption: "Backstage Preparation",
      },
      {
        id: "icn-g2",
        type: "image",
        url: "/images/2022-icn-nationals/_NZ94171-NEF_RCP.jpg",
        thumbnail: "/images/2022-icn-nationals/_NZ94171-NEF_RCP.jpg",
        caption: "Final Checks",
      },
      {
        id: "icn-g3",
        type: "image",
        url: "/images/2022-icn-nationals/_NZ94187-NEF_RCP.jpg",
        thumbnail: "/images/2022-icn-nationals/_NZ94187-NEF_RCP.jpg",
        caption: "Competition Ready",
      },
      {
        id: "icn-g4",
        type: "image",
        url: "/images/2022-icn-nationals/_NZ94228-NEF_RCP.jpg",
        thumbnail: "/images/2022-icn-nationals/_NZ94228-NEF_RCP.jpg",
        caption: "Pre-Stage Moment",
      },
      {
        id: "icn-g5",
        type: "image",
        url: "/images/2022-icn-nationals/_NZ94276-NEF_RCP.jpg",
        thumbnail: "/images/2022-icn-nationals/_NZ94276-NEF_RCP.jpg",
        caption: "Posing Practice",
      },
      {
        id: "icn-g6",
        type: "image",
        url: "/images/2022-icn-nationals/_NZ94376-NEF_RCP.jpg",
        thumbnail: "/images/2022-icn-nationals/_NZ94376-NEF_RCP.jpg",
        caption: "Victory Moment",
      },
      {
        id: "icn-g7",
        type: "image",
        url: "/images/2022-icn-nationals/_NZ94381-NEF_RCP.jpg",
        thumbnail: "/images/2022-icn-nationals/_NZ94381-NEF_RCP.jpg",
        caption: "Championship Celebration",
      },
      {
        id: "icn-g8",
        type: "video",
        url: "/images/2022-icn-nationals/IMG_0683.MOV",
        thumbnail: "/images/2022-icn-nationals/_NZ94376-NEF_RCP.jpg",
        caption: "Award Ceremony Video",
      },
      {
        id: "icn-g9",
        type: "video",
        url: "/images/2022-icn-nationals/IMG_0686.MOV",
        thumbnail: "/images/2022-icn-nationals/_NZ94381-NEF_RCP.jpg",
        caption: "Post-Victory Celebration",
      },
    ],
  },
  // TV Appearance - Swarnavahini
  {
    id: "tv-swarnavahini",
    category: "tv",
    title: "Featured on Swarnavahini TV",
    description: "Ruwan's television appearance on Sri Lanka's Swarnavahini channel, discussing fitness, natural bodybuilding, and his championship journey.",
    date: "2024-06-20",
    tags: ["TV Interview", "Swarnavahini", "Sri Lanka", "Media Coverage"],
    files: [
      {
        id: "tv-1",
        type: "video",
        url: "/images/media-ruwan/Swarnavahini.MP4",
        thumbnail: "/images/media-ruwan/IMG_2235.jpg",
        caption: "Full TV Interview Segment",
      },
      {
        id: "tv-2",
        type: "image",
        url: "/images/media-ruwan/IMG_2235.jpg",
        thumbnail: "/images/media-ruwan/IMG_2235.jpg",
        caption: "On-set Photo",
      },
      {
        id: "tv-3",
        type: "image",
        url: "/images/media-ruwan/IMG_2382.jpg",
        thumbnail: "/images/media-ruwan/IMG_2382.jpg",
        caption: "Interview Moment",
      },
    ],
  },
  // Social Media Highlights
  {
    id: "social-media",
    category: "media",
    title: "Social Media Training Highlights",
    description: "Collection of viral training videos and workout highlights shared across social media platforms.",
    date: "2024-08-01",
    tags: ["Social Media", "Training Videos", "Workout Highlights"],
    files: [
      {
        id: "sm-1",
        type: "video",
        url: "/images/media-ruwan/My Video.mp4",
        thumbnail: "/images/media-ruwan/IMG_3863.jpg",
        caption: "Training Montage",
      },
      {
        id: "sm-2",
        type: "image",
        url: "/images/media-ruwan/IMG_3863.jpg",
        thumbnail: "/images/media-ruwan/IMG_3863.jpg",
        caption: "Gym Session",
      },
      {
        id: "sm-3",
        type: "image",
        url: "/images/media-ruwan/a2af64cf-e5b6-422e-9f94-a81d8aedf0d9.JPG",
        thumbnail: "/images/media-ruwan/a2af64cf-e5b6-422e-9f94-a81d8aedf0d9.JPG",
        caption: "Fitness Showcase",
      },
      {
        id: "sm-4",
        type: "image",
        url: "/images/media-ruwan/1554bfbf-801a-489b-85bb-26269c2a6615.jpg",
        thumbnail: "/images/media-ruwan/1554bfbf-801a-489b-85bb-26269c2a6615.jpg",
        caption: "Progress Photo",
      },
      {
        id: "sm-5",
        type: "image",
        url: "/images/media-ruwan/492001807_10223727106440768_5460577853285061362_na.jpg",
        thumbnail: "/images/media-ruwan/492001807_10223727106440768_5460577853285061362_na.jpg",
        caption: "Competition Ready",
      },
      {
        id: "sm-6",
        type: "image",
        url: "/images/media-ruwan/492149465_10223727103600697_6979307235489043987_n.jpg",
        thumbnail: "/images/media-ruwan/492149465_10223727103600697_6979307235489043987_n.jpg",
        caption: "Championship Physique",
      },
    ],
  },
  // Transformation Journey
  {
    id: "transformations",
    category: "transformations",
    title: "Ruwan's Transformation Journey",
    description: "Witness the incredible transformation journey - from the beginning of the fitness journey to championship-winning physique. Proof that dedication and proper training delivers results.",
    date: "2024-01-01",
    tags: ["Transformation", "Before & After", "Results", "Inspiration"],
    files: [
      {
        id: "trans-1",
        type: "image",
        url: "/images/transformations/568044454_10225701295994273_856687466947557545_n.jpg",
        thumbnail: "/images/transformations/568044454_10225701295994273_856687466947557545_n.jpg",
        caption: "Transformation Progress",
      },
      {
        id: "trans-2",
        type: "image",
        url: "/images/transformations/4762DC3F-4E78-42CD-9BA1-40890F4A2A9D (1).PNG",
        thumbnail: "/images/transformations/4762DC3F-4E78-42CD-9BA1-40890F4A2A9D (1).PNG",
        caption: "Before & After Comparison",
      },
      {
        id: "trans-3",
        type: "image",
        url: "/images/transformations/79151233-B91D-45D3-8AA8-B2A1F57E54FF.PNG",
        thumbnail: "/images/transformations/79151233-B91D-45D3-8AA8-B2A1F57E54FF.PNG",
        caption: "Progress Milestone",
      },
      {
        id: "trans-4",
        type: "image",
        url: "/images/transformations/BB382DC9-56DB-4FF1-AD0D-CE686324DA8B.PNG",
        thumbnail: "/images/transformations/BB382DC9-56DB-4FF1-AD0D-CE686324DA8B.PNG",
        caption: "Final Results",
      },
    ],
  },
  // NZ Champions - Keep existing with local images
  {
    id: "7",
    category: "trainers",
    title: "New Zealand Fitness Champions",
    description: "Our elite trainers are championship-winning athletes from New Zealand and Sri Lankan fitness competitions, bringing world-class expertise to your training.",
    date: "2025-01-01",
    tags: ["Champions", "Elite Trainers", "Competition Winners"],
    files: [
      {
        id: "7-1",
        type: "image",
        url: "/images/2022-icn-nationals/ruw_570.jpg",
        thumbnail: "/images/2022-icn-nationals/ruw_570.jpg",
        caption: "ICN Nationals Champion 2022",
      },
      {
        id: "7-2",
        type: "image", 
        url: "/images/2022-icn-nationals/_NZ91439-NEF_RCP.jpg",
        thumbnail: "/images/2022-icn-nationals/_NZ91439-NEF_RCP.jpg",
        caption: "Stage Presence at Nationals",
      },
      {
        id: "7-3",
        type: "image",
        url: "/images/2022-icn-nationals/_NZ93698-NEF_RCP.jpg",
        thumbnail: "/images/2022-icn-nationals/_NZ93698-NEF_RCP.jpg",
        caption: "Championship Pose",
      },
      {
        id: "7-4",
        type: "image",
        url: "/images/2022-icn-nationals/_NZ94376-NEF_RCP.jpg",
        thumbnail: "/images/2022-icn-nationals/_NZ94376-NEF_RCP.jpg",
        caption: "Victory Moment",
      },
      {
        id: "7-5",
        type: "image",
        url: "/images/2022-icn-nationals/_NZ94381-NEF_RCP.jpg",
        thumbnail: "/images/2022-icn-nationals/_NZ94381-NEF_RCP.jpg",
        caption: "Championship Celebration",
      },
    ],
  },
  // World Champion Trainers - Updated with local images
  {
    id: "8",
    category: "trainers",
    title: "World Champion Trainers",
    description: "Meet our Muscle Model World Champions and elite athletes who have competed at the highest levels of international fitness competitions.",
    date: "2025-01-01",
    tags: ["World Champions", "International", "Muscle Model"],
    files: [
      {
        id: "8-1",
        type: "image",
        url: "/images/2022-icn-nationals/_NZ91782-NEF_RCP.jpg",
        thumbnail: "/images/2022-icn-nationals/_NZ91782-NEF_RCP.jpg",
        caption: "Muscle Model World New Zealand Overall Champion",
      },
      {
        id: "8-2",
        type: "image",
        url: "/images/2022-icn-nationals/_NZ93830-NEF_RCP.jpg",
        thumbnail: "/images/2022-icn-nationals/_NZ93830-NEF_RCP.jpg",
        caption: "Elite Competition Performance",
      },
      {
        id: "8-3",
        type: "image",
        url: "/images/2022-icn-nationals/_NZ93947-NEF_RCP.jpg",
        thumbnail: "/images/2022-icn-nationals/_NZ93947-NEF_RCP.jpg",
        caption: "New Zealand Muscle Model World Champion",
      },
      {
        id: "8-4",
        type: "image",
        url: "/images/2022-icn-nationals/_NZ94171-NEF_RCP.jpg",
        thumbnail: "/images/2022-icn-nationals/_NZ94171-NEF_RCP.jpg",
        caption: "Championship Physique Display",
      },
    ],
  },
]

const categories = [
  { id: "all", label: "All Media", icon: Camera },
  { id: "achievements", label: "Achievements", icon: Award },
  { id: "transformations", label: "Transformations", icon: Sparkles },
  { id: "trainers", label: "Trainers", icon: Award },
  { id: "events", label: "Events", icon: Calendar },
  { id: "media", label: "Media Coverage", icon: Camera },
  { id: "tv", label: "TV & Podcasts", icon: Tv },
]

export default function MediaGallery() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [currentFileIndex, setCurrentFileIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [cardAnimationKey, setCardAnimationKey] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const modalRef = useRef<HTMLDivElement>(null)
  
  // Simple blur placeholder for smooth loading
  const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzFhMWEyZSIvPjwvc3ZnPg=="
  
  const handleImageLoad = (imageId: string) => {
    setLoadedImages(prev => new Set(prev).add(imageId))
  }

  const filteredItems =
    selectedCategory === "all" ? mediaItems : mediaItems.filter((item) => item.category === selectedCategory)

  // Trigger card re-animation when category changes
  useEffect(() => {
    setCardAnimationKey(prev => prev + 1)
  }, [selectedCategory])

  // Handle modal animations
  useEffect(() => {
    if (selectedItem) {
      setIsModalOpen(true)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedItem])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "trainers":
        return "bg-red-600"
      case "events":
        return "bg-blue-500"
      case "achievements":
        return "bg-yellow-500"
      case "media":
        return "bg-green-500"
      case "tv":
        return "bg-purple-500"
      case "transformations":
        return "bg-gradient-to-r from-pink-500 to-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  const openModal = (item: MediaItem) => {
    setSelectedItem(item)
    setCurrentFileIndex(0)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => {
      setSelectedItem(null)
    }, 300) // Match animation duration
  }

  const nextFile = () => {
    if (selectedItem && currentFileIndex < selectedItem.files.length - 1) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentFileIndex(currentFileIndex + 1)
        setIsTransitioning(false)
      }, 150)
    }
  }

  const prevFile = () => {
    if (currentFileIndex > 0) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentFileIndex(currentFileIndex - 1)
        setIsTransitioning(false)
      }, 150)
    }
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  return (
    <section id="media-gallery" className="relative py-20 bg-gradient-to-br from-[#05070f] via-[#0f111d] to-[#05070f] text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.2),_transparent_65%)]"></div>
      <div className="absolute inset-0 showcase-noise opacity-50"></div>
      
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-yellow-400"></div>
            <span className="text-sm font-medium text-yellow-400 uppercase tracking-wider">OUR JOURNEY</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Media & Achievements</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Showcasing our journey through events, achievements, media coverage, and the incredible transformations
            we've helped create
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 relative z-10">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => handleCategoryChange(category.id)}
                className={`flex items-center gap-2 transform transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.id
                    ? "bg-yellow-500 text-black hover:bg-yellow-600 scale-105 shadow-lg shadow-yellow-500/20"
                    : "border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-yellow-500/50"
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <Icon className={`w-4 h-4 transition-transform duration-300 ${
                  selectedCategory === category.id ? "rotate-12" : ""
                }`} />
                {category.label}
              </Button>
            )
          })}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {filteredItems.map((item, index) => (
            <div
              key={`${item.id}-${cardAnimationKey}`}
              className="group cursor-pointer relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-white/10 hover:border-yellow-400/30 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(250,204,21,0.15)] opacity-0 animate-slideUp"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'forwards'
              }}
              onClick={() => openModal(item)}
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(250,204,21,0.1),_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="relative">
                  {/* Main image */}
                  <div className="aspect-[4/3] overflow-hidden relative bg-gray-800">
                    {/* Skeleton loader */}
                    {!loadedImages.has(`grid-${item.id}-0`) && (
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/50 to-transparent animate-shimmer" />
                      </div>
                    )}
                    
                    <Image
                      src={item.files[0]?.thumbnail || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={75}
                      priority={index < 3}
                      loading={index >= 3 ? "lazy" : undefined}
                      placeholder="blur"
                      blurDataURL={blurDataURL}
                      className={`object-cover group-hover:scale-110 transition-all duration-700 ease-out ${
                        loadedImages.has(`grid-${item.id}-0`) ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => handleImageLoad(`grid-${item.id}-0`)}
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                    
                    {item.files[0]?.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors duration-300">
                        <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                          <Play className="w-6 h-6 text-black ml-1 transition-transform duration-300 group-hover:scale-110" />
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
                    <div className="grid grid-cols-4 gap-1 p-2 bg-gray-900/50">
                      {item.files.slice(1, 5).map((file, thumbIndex) => (
                        <div key={file.id} className="aspect-square relative overflow-hidden rounded bg-gray-800">
                          {/* Skeleton for thumbnails */}
                          {!loadedImages.has(`thumb-${item.id}-${thumbIndex}`) && (
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
                          )}
                          
                          <Image
                            src={file.thumbnail || "/placeholder.svg"}
                            alt={`${item.title} ${thumbIndex + 2}`}
                            fill
                            sizes="80px"
                            quality={60}
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL={blurDataURL}
                            className={`object-cover transition-opacity duration-300 ${
                              loadedImages.has(`thumb-${item.id}-${thumbIndex}`) ? 'opacity-100' : 'opacity-0'
                            }`}
                            onLoad={() => handleImageLoad(`thumb-${item.id}-${thumbIndex}`)}
                          />
                          {file.type === "video" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                              <Play className="w-3 h-3 text-white" />
                            </div>
                          )}
                          {thumbIndex === 3 && item.files.length > 5 && (
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
                    <p className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString("en-US")}</p>
                    <p className="text-xs text-gray-400">{item.files.length} files</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedItem && (
          <div 
            className={`fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 transition-all duration-300 ${
              isModalOpen ? 'opacity-100 backdrop-blur-md' : 'opacity-0'
            }`}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal()
            }}
          >
            <div 
              ref={modalRef}
              className={`relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 border border-white/10 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
                isModalOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              }`}
            >
              {/* Radial glow in modal */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.1),_transparent_60%)] pointer-events-none rounded-2xl" />
              
              <div className="relative z-10">
                <button
                  onClick={closeModal}
                  title="Close gallery"
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-200 hover:scale-110 hover:rotate-90"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Navigation arrows */}
                {selectedItem.files.length > 1 && (
                  <>
                    <button
                      onClick={prevFile}
                      disabled={currentFileIndex === 0}
                      title="Previous image"
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 hover:shadow-lg"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextFile}
                      disabled={currentFileIndex === selectedItem.files.length - 1}
                      title="Next image"
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 hover:shadow-lg"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                <div className="relative overflow-hidden bg-gray-900 rounded-t-2xl" style={{ minHeight: '60vh', maxHeight: '70vh' }}>
                  <div className={`w-full h-full transition-all duration-300 ${isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                    {selectedItem.files[currentFileIndex]?.type === "video" ? (
                      <video
                        key={selectedItem.files[currentFileIndex]?.id}
                        src={selectedItem.files[currentFileIndex]?.url}
                        poster={selectedItem.files[currentFileIndex]?.thumbnail}
                        controls
                        className="w-full h-full object-contain rounded-t-2xl"
                        style={{ minHeight: '60vh', maxHeight: '70vh' }}
                      />
                    ) : (
                      <div className="relative w-full flex items-center justify-center" style={{ minHeight: '60vh', maxHeight: '70vh' }}>
                        {/* Modal skeleton */}
                        {!loadedImages.has(`modal-${selectedItem.files[currentFileIndex]?.id}`) && (
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/50 to-transparent animate-shimmer" />
                          </div>
                        )}
                        
                        <Image
                          key={selectedItem.files[currentFileIndex]?.id}
                          src={selectedItem.files[currentFileIndex]?.thumbnail || "/placeholder.svg"}
                          alt={selectedItem.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 1024px"
                          quality={85}
                          priority
                          placeholder="blur"
                          blurDataURL={blurDataURL}
                          className={`object-contain rounded-t-2xl transition-all duration-500 ${
                            loadedImages.has(`modal-${selectedItem.files[currentFileIndex]?.id}`) ? 'opacity-100' : 'opacity-0'
                          }`}
                          onLoad={() => handleImageLoad(`modal-${selectedItem.files[currentFileIndex]?.id}`)}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`px-3 py-1 rounded text-sm font-semibold text-white ${getCategoryColor(selectedItem.category)}`}
                      >
                        {selectedItem.category.toUpperCase()}
                      </div>
                      <span className="text-gray-400 text-sm">{new Date(selectedItem.date).toLocaleDateString("en-US")}</span>
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
                      {selectedItem.files.map((file, navIndex) => (
                        <button
                          key={file.id}
                          onClick={() => setCurrentFileIndex(navIndex)}
                          className={`relative flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-all duration-200 hover:scale-105 bg-gray-800 ${
                            navIndex === currentFileIndex 
                              ? "border-yellow-500 shadow-lg shadow-yellow-500/20 scale-105" 
                              : "border-gray-600 hover:border-yellow-500/50"
                          }`}
                        >
                          {/* Nav thumbnail skeleton */}
                          {!loadedImages.has(`nav-${file.id}`) && (
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
                          )}
                          
                          <Image
                            src={file.thumbnail || "/placeholder.svg"}
                            alt={`${selectedItem.title} ${navIndex + 1}`}
                            fill
                            sizes="64px"
                            quality={60}
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL={blurDataURL}
                            className={`object-cover transition-all duration-200 hover:scale-110 ${
                              loadedImages.has(`nav-${file.id}`) ? 'opacity-100' : 'opacity-0'
                            }`}
                            onLoad={() => handleImageLoad(`nav-${file.id}`)}
                          />
                          {file.type === "video" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <Play className="w-3 h-3 text-white" />
                            </div>
                          )}
                          {navIndex === currentFileIndex && (
                            <div className="absolute inset-0 border-2 border-yellow-500 rounded animate-pulse" />
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
