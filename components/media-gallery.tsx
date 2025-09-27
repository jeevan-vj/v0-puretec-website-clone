"use client"

import { useState, useEffect, useRef } from "react"
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
  category: "events" | "achievements" | "media" | "tv" | "trainers"
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
        url: "https://scontent.fakl1-4.fna.fbcdn.net/v/t39.30808-6/549744299_787666347341448_8296222060750083575_n.jpg?stp=c0.169.1536.1536a_cp6_dst-jpg_s552x414_tt6&_nc_cat=106&ccb=1-7&_nc_sid=50ad20&_nc_ohc=9oQ5US-_IHUQ7kNvwHdhvnK&_nc_oc=AdmQ-VLSLxs681bKpqLadsm14Ayw5Zj2GoMz7VopiU_Wtwsm6yPn4poI0O1dFtpwH6W61ky3AP_qFSCeloOCVCKP&_nc_zt=23&_nc_ht=scontent.fakl1-4.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_Afb-awQJ1nBHx6tucsNvvWYhZZJ6_TIsyzKUnyYQQmCUQw&oe=68DB9829",
        thumbnail: "https://scontent.fakl1-4.fna.fbcdn.net/v/t39.30808-6/549744299_787666347341448_8296222060750083575_n.jpg?stp=c0.169.1536.1536a_cp6_dst-jpg_s552x414_tt6&_nc_cat=106&ccb=1-7&_nc_sid=50ad20&_nc_ohc=9oQ5US-_IHUQ7kNvwHdhvnK&_nc_oc=AdmQ-VLSLxs681bKpqLadsm14Ayw5Zj2GoMz7VopiU_Wtwsm6yPn4poI0O1dFtpwH6W61ky3AP_qFSCeloOCVCKP&_nc_zt=23&_nc_ht=scontent.fakl1-4.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_Afb-awQJ1nBHx6tucsNvvWYhZZJ6_TIsyzKUnyYQQmCUQw&oe=68DB9829",
        caption: "New Zealand South Island Classic 2025 Overall Champion Men's Fitness",
      },
      {
        id: "7-2",
        type: "image", 
        url: "https://scontent.fakl1-3.fna.fbcdn.net/v/t39.30808-6/548215441_787666307341452_8148520755277527195_n.jpg?stp=c0.169.1536.1536a_cp6_dst-jpg_s552x414_tt6&_nc_cat=105&ccb=1-7&_nc_sid=50ad20&_nc_ohc=xSeKEYP2hk0Q7kNvwHMRFak&_nc_oc=Adk-QCXdek2BJQ1xlLgriwCautd7MH_P9Jki5LZBoPp87m5geZsVhJnFmis3vJQpdVuKnMWW_N1aQZmlPnKgqkI0&_nc_zt=23&_nc_ht=scontent.fakl1-3.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_Afb58Lrlb2Oy-A9n19rZoYdDP0GugGSwwWG5pi5pgl6p9A&oe=68DBAECC",
        thumbnail: "https://scontent.fakl1-3.fna.fbcdn.net/v/t39.30808-6/548215441_787666307341452_8148520755277527195_n.jpg?stp=c0.169.1536.1536a_cp6_dst-jpg_s552x414_tt6&_nc_cat=105&ccb=1-7&_nc_sid=50ad20&_nc_ohc=xSeKEYP2hk0Q7kNvwHMRFak&_nc_oc=Adk-QCXdek2BJQ1xlLgriwCautd7MH_P9Jki5LZBoPp87m5geZsVhJnFmis3vJQpdVuKnMWW_N1aQZmlPnKgqkI0&_nc_zt=23&_nc_ht=scontent.fakl1-3.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_Afb58Lrlb2Oy-A9n19rZoYdDP0GugGSwwWG5pi5pgl6p9A&oe=68DBAECC",
        caption: "Sri Lankan Men's Fitness Champion",
      },
      {
        id: "7-3",
        type: "image",
        url: "https://scontent.fakl1-3.fna.fbcdn.net/v/t39.30808-6/547915185_787666300674786_3781282252748569396_n.jpg?stp=c0.73.1826.1826a_cp6_dst-jpg_s552x414_tt6&_nc_cat=109&ccb=1-7&_nc_sid=50ad20&_nc_ohc=5Z5Yx_aJ-A0Q7kNvwF60qNM&_nc_oc=AdkC-HeYi_DleeFQrk50kxHTPLjTKJG4jGMSATfP6xxWO2XRJNfhU_TOMp1slo8sSOUbLO9kJqrvEPrxqtGUigFh&_nc_zt=23&_nc_ht=scontent.fakl1-3.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_AfYPtM4iI1xbbY1ARLrqLM3vg5W5NLWgt9WNZEzPaWPiqA&oe=68DB9F42",
        thumbnail: "https://scontent.fakl1-3.fna.fbcdn.net/v/t39.30808-6/547915185_787666300674786_3781282252748569396_n.jpg?stp=c0.73.1826.1826a_cp6_dst-jpg_s552x414_tt6&_nc_cat=109&ccb=1-7&_nc_sid=50ad20&_nc_ohc=5Z5Yx_aJ-A0Q7kNvwF60qNM&_nc_oc=AdkC-HeYi_DleeFQrk50kxHTPLjTKJG4jGMSATfP6xxWO2XRJNfhU_TOMp1slo8sSOUbLO9kJqrvEPrxqtGUigFh&_nc_zt=23&_nc_ht=scontent.fakl1-3.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_AfYPtM4iI1xbbY1ARLrqLM3vg5W5NLWgt9WNZEzPaWPiqA&oe=68DB9F42",
        caption: "Professional Bodybuilder Competition Photo",
      },
      {
        id: "7-4",
        type: "image",
        url: "https://scontent.fakl1-3.fna.fbcdn.net/v/t39.30808-6/547310124_783761117731971_7305928698565373587_n.jpg?stp=dst-jpg_s552x414_tt6&_nc_cat=105&ccb=1-7&_nc_sid=50ad20&_nc_ohc=cbNiIBNuS24Q7kNvwFRnXkM&_nc_oc=AdktNUZzrcNuDG7PFtC4Auoq9-1ApbOuXxAVvqbu6TUG1FrCBWf6tx0dgm9320pjVoF1t89etWDIUibEluyw8XTp&_nc_zt=23&_nc_ht=scontent.fakl1-3.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_AfYRIHEJWCU0hCbJEc2Zw8SnXJXQfZQhVW-Bh8DgDF4MfQ&oe=68DBAED6",
        thumbnail: "https://scontent.fakl1-3.fna.fbcdn.net/v/t39.30808-6/547310124_783761117731971_7305928698565373587_n.jpg?stp=dst-jpg_s552x414_tt6&_nc_cat=105&ccb=1-7&_nc_sid=50ad20&_nc_ohc=cbNiIBNuS24Q7kNvwFRnXkM&_nc_oc=AdktNUZzrcNuDG7PFtC4Auoq9-1ApbOuXxAVvqbu6TUG1FrCBWf6tx0dgm9320pjVoF1t89etWDIUibEluyw8XTp&_nc_zt=23&_nc_ht=scontent.fakl1-3.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_AfYRIHEJWCU0hCbJEc2Zw8SnXJXQfZQhVW-Bh8DgDF4MfQ&oe=68DBAED6",
        caption: "New Zealand South Island Classic 2025 - Multiple Competitors",
      },
      {
        id: "7-5",
        type: "image",
        url: "https://scontent.fakl1-4.fna.fbcdn.net/v/t39.30808-6/547005151_783761097731973_3523782292342795538_n.jpg?stp=c0.140.1624.1624a_cp6_dst-jpg_s552x414_tt6&_nc_cat=103&ccb=1-7&_nc_sid=50ad20&_nc_ohc=o_A8EwfiVMMQ7kNvwGNofA0&_nc_oc=AdlavV4Eal0AdZMwq8oSsicS6cXf45vYPvGvgmAcU39ofDeq6PPeADy6sL0YrLJjHKvI4QGmKVnYZ2wPtMHry0mh&_nc_zt=23&_nc_ht=scontent.fakl1-4.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_Afb36M1X4OnsoRge0bquzHhzW2gnO734na0HzHo8U3rjbw&oe=68DBA41E",
        thumbnail: "https://scontent.fakl1-4.fna.fbcdn.net/v/t39.30808-6/547005151_783761097731973_3523782292342795538_n.jpg?stp=c0.140.1624.1624a_cp6_dst-jpg_s552x414_tt6&_nc_cat=103&ccb=1-7&_nc_sid=50ad20&_nc_ohc=o_A8EwfiVMMQ7kNvwGNofA0&_nc_oc=AdlavV4Eal0AdZMwq8oSsicS6cXf45vYPvGvgmAcU39ofDeq6PPeADy6sL0YrLJjHKvI4QGmKVnYZ2wPtMHry0mh&_nc_zt=23&_nc_ht=scontent.fakl1-4.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_Afb36M1X4OnsoRge0bquzHhzW2gnO734na0HzHo8U3rjbw&oe=68DBA41E",
        caption: "Professional Bodybuilder with Competition Text",
      },
    ],
  },
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
        url: "https://scontent.fakl1-4.fna.fbcdn.net/v/t39.30808-6/547443797_783761091065307_3759639552296253486_n.jpg?stp=c0.169.1536.1536a_cp6_dst-jpg_s552x414_tt6&_nc_cat=101&ccb=1-7&_nc_sid=50ad20&_nc_ohc=1q39RCD4C3EQ7kNvwHx1EmQ&_nc_oc=AdmU-QFJfk3u_mFYTuXlfC2kZaR1pcrHpLxUVPdRKP-PuHWjK3J5ROJLK2P9lirowxZXtbnprNb-HA6egQOvCTUv&_nc_zt=23&_nc_ht=scontent.fakl1-4.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_AfbcRfguPM9A5rVQ4Q4dEnKA2TSlC91rqPNFktfw0fBv3g&oe=68DBAB6F",
        thumbnail: "https://scontent.fakl1-4.fna.fbcdn.net/v/t39.30808-6/547443797_783761091065307_3759639552296253486_n.jpg?stp=c0.169.1536.1536a_cp6_dst-jpg_s552x414_tt6&_nc_cat=101&ccb=1-7&_nc_sid=50ad20&_nc_ohc=1q39RCD4C3EQ7kNvwHx1EmQ&_nc_oc=AdmU-QFJfk3u_mFYTuXlfC2kZaR1pcrHpLxUVPdRKP-PuHWjK3J5ROJLK2P9lirowxZXtbnprNb-HA6egQOvCTUv&_nc_zt=23&_nc_ht=scontent.fakl1-4.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_AfbcRfguPM9A5rVQ4Q4dEnKA2TSlC91rqPNFktfw0fBv3g&oe=68DBAB6F",
        caption: "Muscle Model World New Zealand Overall Champion",
      },
      {
        id: "8-2",
        type: "image",
        url: "https://scontent.fakl1-4.fna.fbcdn.net/v/t39.30808-6/548207804_783761061065310_1006180264145076764_n.jpg?stp=c85.0.1878.1878a_cp6_dst-jpg_s552x414_tt6&_nc_cat=107&ccb=1-7&_nc_sid=50ad20&_nc_ohc=fnd959aDmE4Q7kNvwEx1jXd&_nc_oc=AdnyYhv3E8C9jdo7x55DuMq5FqhBj9H3q1HaTW92LrvQJArDACP7ggawWq8m_ueZEIvAiTryBsiyhyEAZQ9JMwcg&_nc_zt=23&_nc_ht=scontent.fakl1-4.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_Afa9ij3uFH9LZoZ2IdgCcijFGjrz_jOpEfZPYnS4NDQWVw&oe=68DB8EB1",
        thumbnail: "https://scontent.fakl1-4.fna.fbcdn.net/v/t39.30808-6/548207804_783761061065310_1006180264145076764_n.jpg?stp=c85.0.1878.1878a_cp6_dst-jpg_s552x414_tt6&_nc_cat=107&ccb=1-7&_nc_sid=50ad20&_nc_ohc=fnd959aDmE4Q7kNvwEx1jXd&_nc_oc=AdnyYhv3E8C9jdo7x55DuMq5FqhBj9H3q1HaTW92LrvQJArDACP7ggawWq8m_ueZEIvAiTryBsiyhyEAZQ9JMwcg&_nc_zt=23&_nc_ht=scontent.fakl1-4.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_Afa9ij3uFH9LZoZ2IdgCcijFGjrz_jOpEfZPYnS4NDQWVw&oe=68DB8EB1",
        caption: "Group of Elite Fitness Competitors",
      },
      {
        id: "8-3",
        type: "image",
        url: "https://scontent.fakl1-3.fna.fbcdn.net/v/t39.30808-6/547368206_783761054398644_4339144588284793795_n.jpg?stp=c0.156.1576.1576a_cp6_dst-jpg_s552x414_tt6&_nc_cat=109&ccb=1-7&_nc_sid=50ad20&_nc_ohc=gGSzY9PB_DEQ7kNvwGNrwuH&_nc_oc=AdmzWZ3q1cVmoz3tN0iLLVo6nI1bv8f-S9gI_MSvH3AkREfN-Fi6YQvcj4dKt9eCag9g4ramuNyPYfOk63TccDoT&_nc_zt=23&_nc_ht=scontent.fakl1-3.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_AfZHw2Ys-wJK4QM8T7gSDe0Dueh1iHOCYcVwRTPDsqeA4g&oe=68DB893F",
        thumbnail: "https://scontent.fakl1-3.fna.fbcdn.net/v/t39.30808-6/547368206_783761054398644_4339144588284793795_n.jpg?stp=c0.156.1576.1576a_cp6_dst-jpg_s552x414_tt6&_nc_cat=109&ccb=1-7&_nc_sid=50ad20&_nc_ohc=gGSzY9PB_DEQ7kNvwGNrwuH&_nc_oc=AdmzWZ3q1cVmoz3tN0iLLVo6nI1bv8f-S9gI_MSvH3AkREfN-Fi6YQvcj4dKt9eCag9g4ramuNyPYfOk63TccDoT&_nc_zt=23&_nc_ht=scontent.fakl1-3.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_AfZHw2Ys-wJK4QM8T7gSDe0Dueh1iHOCYcVwRTPDsqeA4g&oe=68DB893F",
        caption: "New Zealand Muscle Model World Champion",
      },
      {
        id: "8-4",
        type: "image",
        url: "https://scontent.fakl1-4.fna.fbcdn.net/v/t39.30808-6/546101753_781860691255347_2020129501768908139_n.jpg?stp=c0.169.1536.1536a_cp6_dst-jpg_s552x414_tt6&_nc_cat=103&ccb=1-7&_nc_sid=50ad20&_nc_ohc=z8wjAcJf-YQQ7kNvwGMg2h1&_nc_oc=AdlZ0wU1PAiBaHd2HlPA12Ij0-p1nK8KJtit0mBLkdN3mWpy_m6R63aA6dozBnJsDNqjVOFsYoNS6MTKlCXbjJZJ&_nc_zt=23&_nc_ht=scontent.fakl1-4.fna&_nc_gid=QdmdtFbcw1HaDhmE3Ov2-g&oh=00_AfYnOWzCwX6TrAVrgr0qb-gphLYJBP0OqqPm8oseLf1SLw&oe=68DB8A3C",
        thumbnail: "https://scontent.fakl1-4.fna.fbcdn.net/v/t39.30808-6/546101753_781860691255347_2020129501768908139_n.jpg?stp=c0.169.1536.1536a_cp6_dst-jpg_s552x414_tt6&_nc_cat=103&ccb=1-7&_nc_sid=50ad20&_nc_ohc=z8wjAcJf-YQQ7kNvwGMg2h1&_nc_oc=AdlZ0wU1PAiBaHd2HlPA12Ij0-p1nK8KJtit0mBLkdN3mWpy_m6R63aA6dozBnJsDNqjVOFsYoNS6MTKlCXbjJZJ&_nc_zt=23&_nc_ht=scontent.fakl1-4.fna&_nc_gid=QdmdtFbcw1HaDhmE3Ov2-g&oh=00_AfYnOWzCwX6TrAVrgr0qb-gphLYJBP0OqqPm8oseLf1SLw&oe=68DB8A3C",
        caption: "Sri Lankan Men's Fitness Life Champion",
      },
    ],
  },
]

const categories = [
  { id: "all", label: "All Media", icon: Camera },
  { id: "trainers", label: "Trainers", icon: Award },
  { id: "events", label: "Events", icon: Calendar },
  { id: "achievements", label: "Achievements", icon: Award },
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
  const modalRef = useRef<HTMLDivElement>(null)

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
    <section id="media-gallery" className="py-20 bg-slate-900 text-white">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={`${item.id}-${cardAnimationKey}`}
              className="group cursor-pointer bg-slate-800 rounded-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/10 opacity-0 animate-slideUp"
              style={{
                animationDelay: `${index * 0.15}s`,
                animationFillMode: 'forwards'
              }}
              onClick={() => openModal(item)}
            >
              <div className="relative">
                {/* Main image */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={item.files[0]?.thumbnail || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
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
                  <p className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString("en-US")}</p>
                  <p className="text-xs text-gray-400">{item.files.length} files</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedItem && (
          <div 
            className={`fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 transition-all duration-300 ${
              isModalOpen ? 'opacity-100 backdrop-blur-sm' : 'opacity-0'
            }`}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal()
            }}
          >
            <div 
              ref={modalRef}
              className={`bg-slate-800 rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
                isModalOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              }`}
            >
              <div className="relative">
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

                <div className="aspect-video relative overflow-hidden">
                  <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                    {selectedItem.files[currentFileIndex]?.type === "video" ? (
                      <video
                        key={selectedItem.files[currentFileIndex]?.id}
                        src={selectedItem.files[currentFileIndex]?.url}
                        poster={selectedItem.files[currentFileIndex]?.thumbnail}
                        controls
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                    ) : (
                      <img
                        key={selectedItem.files[currentFileIndex]?.id}
                        src={selectedItem.files[currentFileIndex]?.thumbnail || "/placeholder.svg"}
                        alt={selectedItem.title}
                        className="w-full h-full object-cover rounded-t-lg transition-transform duration-300"
                      />
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
                      {selectedItem.files.map((file, index) => (
                        <button
                          key={file.id}
                          onClick={() => setCurrentFileIndex(index)}
                          className={`relative flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                            index === currentFileIndex 
                              ? "border-yellow-500 shadow-lg shadow-yellow-500/20 scale-105" 
                              : "border-gray-600 hover:border-yellow-500/50"
                          }`}
                        >
                          <img
                            src={file.thumbnail || "/placeholder.svg"}
                            alt={`${selectedItem.title} ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-200 hover:scale-110"
                          />
                          {file.type === "video" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <Play className="w-3 h-3 text-white" />
                            </div>
                          )}
                          {index === currentFileIndex && (
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
