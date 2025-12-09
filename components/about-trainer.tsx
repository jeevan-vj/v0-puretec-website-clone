"use client";

import {
  useState,
  useEffect,
  useRef,
  type MouseEvent as ReactMouseEvent,
} from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  CheckCircle,
  ArrowRight,
  Dumbbell,
  Heart,
  Target,
  TrendingUp,
  Trophy,
  Medal,
  Flag,
  MapPin,
  GraduationCap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useCalEmbed } from "@/lib/useCalEmbed";

const stats = [
  {
    icon: Trophy,
    value: 3,
    suffix: "x",
    label: "Championship Winner",
    color: "text-yellow-400",
  },
  {
    icon: Medal,
    value: 6,
    suffix: "+",
    label: "Gold Medals",
    color: "text-yellow-400",
  },
  {
    icon: Flag,
    value: 1,
    suffix: "st",
    label: "Sri Lankan Winner",
    color: "text-green-400",
  },
  {
    icon: Users,
    value: 100,
    suffix: "+",
    label: "Clients Transformed",
    color: "text-teal-400",
  },
];

const specialties = [
  { name: "Natural Bodybuilding", icon: Dumbbell },
  { name: "Competition Prep", icon: Trophy },
  { name: "Weight Management", icon: TrendingUp },
  { name: "Nutrition Planning", icon: Heart },
  { name: "Strength Training", icon: Target },
  { name: "Recovery Techniques", icon: CheckCircle },
];

const certifications = [
  {
    title: "NZ Certificate in Exercise Level 4",
    organization: "Manukau Institute of Technology",
    year: "2022",
    description: "Personal Trainer Program",
  },
  {
    title: "Natural Bodybuilding Competitor",
    organization: "ICN New Zealand",
    year: "2022-2025",
    description: "Elite Level Athlete",
  },
];

const trainingSkills = [
  { name: "NATURAL", color: "text-green-400" },
  { name: "BODYBUILDING", color: "text-yellow-400" },
  { name: "COMPETITION", color: "text-red-400" },
  { name: "PREP", color: "text-purple-400" },
  { name: "NUTRITION", color: "text-teal-400" },
];

const achievements = [
  {
    year: "2022",
    title: "The Great Lake Muscle & Model Classic Championship",
    location: "Taupo, New Zealand",
    awards: [
      { type: "Gold", category: "Men's Physique First Timer", position: "1st" },
      { type: "Gold", category: "Men's Fitness Novice", position: "1st" },
      {
        type: "Silver",
        category: "Men's Fitness First Timer",
        position: "2nd",
      },
      { type: "Silver", category: "Men's Fitness Open", position: "2nd" },
    ],
    highlight: "First Competition Victory",
    image: "/images/2022-icn-nationals/ruw_570.jpg",
    gallery: [
      "/images/2022-icn-nationals/ruw_570.jpg",
      "/images/2022-icn-nationals/_NZ91439-NEF_RCP.jpg",
      "/images/2022-icn-nationals/_NZ91444-NEF_RCP.jpg",
    ],
  },
  {
    year: "2022",
    title: "New Zealand National Muscle & Model Championship",
    location: "New Zealand",
    awards: [
      { type: "Gold", category: "Men's Fitness Novice", position: "1st" },
      { type: "Gold", category: "Men's Fitness Open", position: "1st" },
      { type: "Bronze", category: "Men's Physique 30+", position: "3rd" },
    ],
    highlight: "National Championship Trophy Winner",
    image: "/images/2022-icn-nationals/_NZ93698-NEF_RCP.jpg",
    gallery: [
      "/images/2022-icn-nationals/_NZ93698-NEF_RCP.jpg",
      "/images/2022-icn-nationals/_NZ93830-NEF_RCP.jpg",
      "/images/coach.png",
    ],
  },
  {
    year: "2025",
    title: "South Island Muscle & Model Classic Championship",
    location: "Christchurch, New Zealand",
    awards: [
      { type: "Gold", category: "Men's Fitness Open", position: "1st" },
      { type: "Gold", category: "Men's Fitness 40+", position: "1st" },
      { type: "Silver", category: "Men's Physique 40+", position: "2nd" },
    ],
    highlight:
      "First Sri Lankan to Win Men's Fitness Model Championship in Christchurch",
    image: "/images/2022-icn-nationals/_NZ94376-NEF_RCP.jpg",
    gallery: [
      "/images/2022-icn-nationals/_NZ94376-NEF_RCP.jpg",
      "/images/2022-icn-nationals/_NZ94381-NEF_RCP.jpg",
      "/images/coach.png",
    ],
  },
];

const fallbackImage = "/images/showcase-fallback.svg";

const journeyTimeline = [
  {
    year: "2021",
    title: "12-Week Program Success",
    description:
      "Lost 12kg in 12 weeks following proper nutrition and training",
    icon: TrendingUp,
    color: "text-green-400",
    details: {
      content:
        "Ruwan committed to a proper 12-week transformation program, following scientific nutrition and training principles. Through discipline, consistency, and trusting the process, he achieved remarkable results - losing 12kg in just 12 weeks. This success proved that with the right approach and dedication, transformation was not only possible but achievable.",
      images: [
        "/images/transformations/568044454_10225701295994273_856687466947557545_n.jpg",
        "/images/transformations/4762DC3F-4E78-42CD-9BA1-40890F4A2A9D (1).PNG",
      ],
      highlights: [
        "12kg Weight Loss",
        "Scientific Approach",
        "Discipline & Consistency",
      ],
    },
  },
  {
    year: "2022",
    title: "First Competition Victory",
    description:
      "Won first Gold medal at The Great Lake Muscle & Model Classic",
    icon: Trophy,
    color: "text-yellow-400",
    details: {
      content:
        "After 16 weeks of intense preparation, Ruwan competed in his first bodybuilding competition - The Great Lake Muscle & Model Classic Championship in Taupo, New Zealand. Against all odds, he won his first Gold medal in Men's Physique First Timer category, proving that his transformation was not just physical but mental as well.",
      images: [
        "/images/2022-icn-nationals/ruw_570.jpg",
        "/images/2022-icn-nationals/_NZ91439-NEF_RCP.jpg",
      ],
      highlights: ["First Gold Medal", "16-Week Prep", "Taupo Championship"],
    },
  },
  {
    year: "2022",
    title: "NZ Qualified Trainer",
    description:
      "Graduated from Manukau Institute of Technology as certified trainer",
    icon: GraduationCap,
    color: "text-teal-400",
    details: {
      content:
        "Recognizing his passion for helping others achieve their fitness goals, Ruwan enrolled in the NZ Certificate in Exercise Level 4 program at Manukau Institute of Technology. He graduated as a qualified personal trainer, combining his practical experience with scientific knowledge to help others transform their lives.",
      images: [
        "/images/2022-icn-nationals/_NZ93698-NEF_RCP.jpg",
        "/images/2022-icn-nationals/_NZ93830-NEF_RCP.jpg",
      ],
      highlights: [
        "NZ Certificate Level 4",
        "Scientific Knowledge",
        "Professional Qualification",
      ],
    },
  },
  {
    year: "2025",
    title: "Historic Achievement",
    description:
      "First Sri Lankan to win Men's Fitness Model Championship in Christchurch",
    icon: Flag,
    color: "text-red-400",
    details: {
      content:
        "In a historic moment for Sri Lankan fitness, Ruwan became the first Sri Lankan to win the Men's Fitness Model Championship at the South Island Muscle & Model Classic Championship in Christchurch, New Zealand. This achievement not only marked his personal success but also inspired countless others from his homeland to pursue their fitness dreams.",
      images: [
        "/images/2022-icn-nationals/_NZ94376-NEF_RCP.jpg",
        "/images/2022-icn-nationals/_NZ94381-NEF_RCP.jpg",
      ],
      highlights: [
        "First Sri Lankan Winner",
        "Historic Achievement",
        "Christchurch Championship",
      ],
    },
  },
];

const getProgressionStyles = (index: number, total: number) => {
  const safeTotal = Math.max(total - 1, 1);
  const progress = index / safeTotal;
  return {
    progress,
    iconSize: 48 + progress * 24,
    iconBackground:
      progress < 0.4
        ? "from-neutral-200 to-neutral-300"
        : progress < 0.8
        ? "from-yellow-200 to-yellow-300"
        : "from-yellow-300 via-yellow-400 to-yellow-500",
    ringGlow:
      progress > 0.7
        ? "ring-4 ring-yellow-400/40 shadow-[0_0_30px_rgba(250,204,21,0.35)]"
        : "ring-2 ring-white/60 shadow-[0_5px_20px_rgba(15,23,42,0.06)]",
  };
};

const getCardTone = (progress: number) => {
  if (progress < 0.35) return "early";
  if (progress < 0.65) return "middle";
  if (progress < 0.95) return "late";
  return "champion";
};

const cardToneClasses: Record<string, string> = {
  early: "bg-neutral-50/80 border border-neutral-200/80",
  middle:
    "bg-gradient-to-br from-neutral-50 via-yellow-50/20 to-white border border-yellow-100/70 shadow-md",
  late: "bg-gradient-to-br from-yellow-50 via-white to-yellow-100/60 border border-yellow-200 shadow-lg",
  champion:
    "bg-gradient-to-br from-yellow-50 via-white to-yellow-100 border border-yellow-300 shadow-xl ring-1 ring-yellow-300/40 shimmer-border",
};

const useCountUp = (target: number, duration = 1800) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame: number;
    let startTime: number | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          const animate = (timestamp: number) => {
            if (startTime === null) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.round(progress * target));
            if (progress < 1) {
              frame = requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };

          frame = requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, [target, duration]);

  return { ref, count };
};

type AchievementItem = (typeof achievements)[number];

function AnimatedStat({
  icon: Icon,
  value,
  suffix = "",
  label,
  color,
}: {
  icon: LucideIcon;
  value: number;
  suffix?: string;
  label: string;
  color: string;
}) {
  const { ref, count } = useCountUp(value);
  const displayValue = count > value ? value : count;

  return (
    <div
      ref={ref}
      className="text-center transform transition-all duration-600 hover:scale-105 cursor-default"
    >
      <div className={`${color} mb-3 flex justify-center drop-shadow-lg`}>
        <Icon className="w-8 h-8" />
      </div>
      <div className="text-3xl font-black text-white mb-1 drop-shadow-lg">
        {displayValue}
        {suffix}
      </div>
      <div className="text-sm text-gray-300 uppercase tracking-wide drop-shadow-lg">
        {label}
      </div>
    </div>
  );
}

function ShowcaseCard({
  achievement,
  index,
  isVisible,
  openGallery,
}: {
  achievement: AchievementItem;
  index: number;
  isVisible: boolean;
  openGallery: (images: string[]) => void;
}) {
  const [imageSrc, setImageSrc] = useState(achievement.image);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const isFeatured = index === achievements.length - 1;

  const galleryImages =
    achievement.gallery && achievement.gallery.length > 0
      ? achievement.gallery
      : undefined;

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm shadow-2xl transform transition-all duration-700 hover:scale-105 hover:shadow-3xl ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${
        isFeatured
          ? "showcase-gold-glow ring-2 ring-yellow-400/40 shadow-[0_0_40px_rgba(250,204,21,0.35)]"
          : ""
      }`}
      style={{
        transitionDelay: isVisible ? `${1000 + index * 200}ms` : "0ms",
      }}
    >
      <div className="relative h-64 overflow-hidden">
        <div
          className={`absolute inset-0 bg-gray-800/40 animate-pulse transition-opacity duration-500 ${
            isImageLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />
        <Image
          src={imageSrc}
          alt={achievement.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setImageSrc(fallbackImage)}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-teal-400/10 mix-blend-overlay" />
        <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
          <Trophy className="w-8 h-8 text-black" />
        </div>
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2">
          <span className="text-yellow-400 font-bold text-lg">
            {achievement.year}
          </span>
        </div>
        {isFeatured && (
          <span className="showcase-ribbon">Historic Achievement</span>
        )}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-2 rounded-lg font-bold text-sm text-center">
            {achievement.highlight}
          </div>
        </div>
      </div>

      <div className="p-6 relative z-10">
        <div className="mb-4">
          <h4 className="text-xl font-bold text-white mb-2 line-clamp-2">
            {achievement.title}
          </h4>
          <div className="flex items-center gap-2 text-gray-300 mb-4">
            <MapPin className="w-4 h-4 text-yellow-400" />
            <span className="text-sm">{achievement.location}</span>
          </div>
        </div>

        <div className="space-y-3">
          {achievement.awards.map((award, awardIndex) => (
            <div
              key={`${award.category}-${awardIndex}`}
              className="flex items-center gap-3 p-3 bg-black/30 rounded-lg border border-white/10 transition-all duration-300 group-hover:translate-x-1 hover:bg-black/50"
              style={{ transitionDelay: `${awardIndex * 60}ms` }}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 medal-pulse ${
                  award.type === "Gold"
                    ? "bg-gradient-to-br from-yellow-300 to-yellow-500"
                    : award.type === "Silver"
                    ? "bg-gradient-to-br from-gray-200 to-gray-400"
                    : "bg-gradient-to-br from-orange-400 to-orange-500"
                }`}
              >
                <Medal className="w-4 h-4 text-black" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-semibold text-sm truncate">
                  {award.category}
                </div>
                <div className="text-gray-300 text-xs">
                  {award.type} - {award.position} Place
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="showcase-button-shimmer w-full mt-5 bg-gradient-to-r from-yellow-400/20 to-teal-400/20 hover:from-yellow-400/30 hover:to-teal-400/30 border border-yellow-400/30 text-yellow-400 py-2 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-105"
          onClick={() =>
            openGallery(
              galleryImages && galleryImages.length > 0
                ? galleryImages
                : [imageSrc]
            )
          }
        >
          View Full Gallery
          <ArrowRight className="inline-block ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function AboutTrainer() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [visibleTimelineItems, setVisibleTimelineItems] = useState<Set<number>>(
    new Set()
  );
  const sectionRef = useRef<HTMLElement>(null);
  const timelineItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const totalTimelineItems = journeyTimeline.length;
  const { openCal } = useCalEmbed();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Timeline items intersection observer
  useEffect(() => {
    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-timeline-index") || "0"
            );
            setVisibleTimelineItems((prev) => new Set([...prev, index]));
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-50px 0px -50px 0px",
      }
    );

    timelineItemRefs.current.forEach((ref) => {
      if (ref) {
        timelineObserver.observe(ref);
      }
    });

    return () => timelineObserver.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        setScrollY(rate);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const lineFill = totalTimelineItems
    ? Math.min(visibleTimelineItems.size / totalTimelineItems, 1)
    : 0;

  const handleCardToggle = (
    event: ReactMouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--ripple-x", `${event.clientX - rect.left}px`);
    target.style.setProperty("--ripple-y", `${event.clientY - rect.top}px`);
    setExpandedCard((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="about-trainer"
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-white"
    >
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col gap-2">
          <div className={`transform transition-all duration-700`}>
            <span className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
              Meet Your Trainer
            </span>
          </div>
          <div
            className={`flex flex-col gap-1 items-start transform transition-all duration-800`}
          >
            <h2>RUWAN PALIHAWADANA</h2>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary">2 times NZ Champion</Badge>
              <Badge variant="secondary">Natural Bodybuilding</Badge>
              <Badge variant="secondary">Proven Personal Coach</Badge>
            </div>
          </div>
        </div>

        {/* Hero Story Section */}

        <div
          className={`mt-10 transform transition-all duration-800`}
          style={{ transitionDelay: isVisible ? "400ms" : "0ms" }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="font-display text-3xl lg:text-4xl font-bold text-black leading-tight">
                From Ordinary to Extraordinary
              </h3>
              <p className="leading-relaxed">
                Born and raised in Sri Lanka, Ruwan's journey took him from
                Dubai to New Zealand in 2018. What started as a normal life with
                work and routine became a transformation story that would make
                history in New Zealand's fitness scene.
              </p>
              <p className="leading-relaxed">
                After seeing a transformation picture on social media, Ruwan
                decided to change his life. Following a proper 12-week program,
                he lost 12kg and discovered his passion for natural
                bodybuilding. This led to his first competition victory and
                eventually becoming the first Sri Lankan to win a Men's Fitness
                Model Championship in Christchurch, New Zealand.
              </p>
              <div className="flex flex-wrap gap-3">
                {trainingSkills.map((skill, index) => (
                  <Badge
                    key={skill.name}
                    className={`bg-yellow-100 transform transition-all duration-500 hover:scale-105 text-yellow-800`}
                    style={{
                      transitionDelay: isVisible
                        ? `${600 + index * 100}ms`
                        : "0ms",
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible
                        ? "translateY(0)"
                        : "translateY(20px)",
                    }}
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative h-full min-h-[400px] lg:min-h-[600px]">
                <Image
                  src="/images/coach.png"
                  alt="Ruwan Palihawadana - Champion"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain object-bottom relative z-1"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="my-20">
          <div className="space-y-2 mb-10">
            <span className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
              The Journey
            </span>
            <h2>From transformation to championship</h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5">
              <div className="h-full w-full bg-neutral-200 rounded-full"></div>
              <div
                className="absolute left-0 top-0 w-full bg-gradient-to-b from-yellow-200 via-yellow-300 to-yellow-400 rounded-full transition-all duration-700 ease-out"
                style={{
                  height: `${Math.max(lineFill * 100, isVisible ? 5 : 0)}%`,
                }}
              ></div>
              <div
                className={`timeline-pulse absolute -left-3 w-6 h-6 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 shadow-lg transition-all duration-700 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  top: `calc(${Math.max(lineFill * 100, 5)}% - 12px)`,
                }}
              ></div>
            </div>
            <div className="space-y-8">
              {journeyTimeline.map((item, index) => {
                const Icon = item.icon;
                const isExpanded = expandedCard === index;
                const isTimelineItemVisible = visibleTimelineItems.has(index);
                const progression = getProgressionStyles(
                  index,
                  totalTimelineItems
                );
                const cardTone = getCardTone(progression.progress);
                const previewImage = item.details.images?.[0];
                const isChampion = index === totalTimelineItems - 1;
                const iconColor = item.color ?? "text-neutral-800";

                return (
                  <div
                    key={index}
                    ref={(el) => {
                      timelineItemRefs.current[index] = el;
                    }}
                    data-timeline-index={index}
                    className={`relative flex items-start gap-8 transition-all duration-700 ${
                      isTimelineItemVisible
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-6"
                    }`}
                    style={{
                      transitionDelay: isTimelineItemVisible
                        ? `${index * 150}ms`
                        : "0ms",
                      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    {/* Timeline Dot */}
                    <button
                      type="button"
                      className={`relative z-10 flex items-center justify-center rounded-full bg-gradient-to-br ${progression.iconBackground} text-neutral-800 transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300`}
                      style={{
                        width: progression.iconSize,
                        height: progression.iconSize,
                      }}
                      onClick={() => setExpandedCard(isExpanded ? null : index)}
                      aria-label={`${item.year} milestone: ${item.title}`}
                      title={`${item.year} milestone: ${item.title}`}
                    >
                      <div
                        className={`absolute inset-0 rounded-full ${progression.ringGlow}`}
                      ></div>
                      <Icon
                        className={`relative z-10 transition-all duration-500 ${iconColor} ${
                          isTimelineItemVisible
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-75"
                        }`}
                        style={{
                          transitionDelay: isTimelineItemVisible
                            ? `${index * 150 + 100}ms`
                            : "0ms",
                        }}
                      />
                    </button>

                    {/* Collapsible Content Card */}
                    <div
                      className={`group timeline-card relative flex-1 backdrop-blur-sm rounded-3xl overflow-hidden transition-all duration-700 ${
                        cardToneClasses[cardTone]
                      } ${
                        isTimelineItemVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-6"
                      } ${
                        isExpanded
                          ? "scale-[1.015] shadow-2xl"
                          : "hover:scale-[1.01]"
                      } ${isChampion ? "timeline-card_champion" : ""}`}
                      style={{
                        transitionDelay: isTimelineItemVisible
                          ? `${index * 150 + 180}ms`
                          : "0ms",
                      }}
                    >
                      {isChampion && (
                        <>
                          <span className="champion-ribbon">Historic Achievement</span>
                          <div className="champion-confetti one"></div>
                          <div className="champion-confetti two"></div>
                        </>
                      )}
                      {/* Card Header - Always Visible */}
                      <button
                        type="button"
                        className="timeline-card_trigger"
                        onClick={(event) => handleCardToggle(event, index)}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-1 space-y-2 text-left">
                            <div className="flex flex-wrap items-center gap-4">
                              <span className="text-2xl font-black text-black">
                                {item.year}
                              </span>
                              <h4 className="text-xl font-semibold text-neutral-700">
                                {item.title}
                              </h4>
                            </div>
                            <p className="text-neutral-600 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                          {previewImage && (
                            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-white/40 shadow-lg hidden sm:block">
                              <Image
                                src={previewImage}
                                alt={`${item.title} preview`}
                                fill
                                sizes="80px"
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                            </div>
                          )}
                        </div>
                        <div className="mt-4 flex items-center justify-between text-sm">
                          <span className="text-neutral-500">
                            {isExpanded ? "Hide details" : "See the story"}
                          </span>
                          <div
                            className={`chevron-indicator ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          >
                            <ArrowRight className="w-4 h-4 text-neutral-600" />
                          </div>
                        </div>
                      </button>

                      {!isExpanded && previewImage && (
                        <div className="collapse-gradient pointer-events-none"></div>
                      )}

                      {/* Expanded Content */}
                      <div
                        className={`transition-all duration-500 overflow-hidden ${
                          isExpanded
                            ? "max-h-screen opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="px-6 pb-6 border-t border-white/10">
                          {/* Detailed Content */}
                          <div className="mt-6 space-y-6">
                            <p className="text-neutral-600 leading-relaxed">
                              {item.details.content}
                            </p>

                            {/* Highlights */}
                            <div className="flex flex-wrap gap-2">
                              {item.details.highlights.map(
                                (highlight, highlightIndex) => (
                                  <Badge
                                    key={highlightIndex}
                                    className="bg-yellow-400/15 text-neutral-700 border border-yellow-400/30 px-3 py-1 text-xs font-semibold tracking-wide"
                                  >
                                    {highlight}
                                  </Badge>
                                )
                              )}
                            </div>

                            {/* Image Gallery */}
                            {item.details.images &&
                              item.details.images.length > 0 && (
                                <div className="space-y-4">
                                  <h5 className="text-lg font-semibold text-neutral-900">
                                    Gallery
                                  </h5>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {item.details.images.map(
                                      (image, imageIndex) => (
                                        <div
                                          key={imageIndex}
                                          className="relative group cursor-pointer"
                                          onClick={() => {
                                            setCurrentImages(
                                              item.details.images
                                            );
                                            setSelectedImageIndex(imageIndex);
                                            setIsImageModalOpen(true);
                                          }}
                                        >
                                          <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-yellow-400/20 to-teal-400/20 p-1 relative">
                                            <Image
                                              src={image}
                                              alt={`${item.title} - Image ${
                                                imageIndex + 1
                                              }`}
                                              fill
                                              sizes="(max-width: 768px) 100vw, 50vw"
                                              className="object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
                                            />
                                          </div>
                                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                                              <ArrowRight className="w-6 h-6 text-white" />
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modern Achievements Showcase */}
        {/* <div className="relative mb-20 overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#05070f] via-[#0f111d] to-[#05070f] px-4 py-16 sm:px-8 lg:px-12">
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.25),_transparent_60%)]"></div>
          <div className="absolute inset-0 showcase-noise"></div>
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Championship{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                  Showcase
                </span>
              </h3>
              <p className="text-gray-300 text-xl max-w-3xl mx-auto">
                A visual journey through Ruwan's championship victories and
                historic achievements
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {achievements.map((achievement, index) => (
                <ShowcaseCard
                  key={`${achievement.title}-${achievement.year}`}
                  achievement={achievement}
                  index={index}
                  isVisible={isVisible}
                  openGallery={(images) => {
                    setCurrentImages(images);
                    setSelectedImageIndex(0);
                    setIsImageModalOpen(true);
                  }}
                />
              ))}
            </div>

            <div
              className={`grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 transform transition-all duration-800 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: isVisible ? "700ms" : "0ms" }}
            >
              {stats.map((stat) => (
                <AnimatedStat
                  key={stat.label}
                  icon={stat.icon}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  color={stat.color}
                />
              ))}
            </div>
          </div>
        </div> */}

        <div className="relative mb-20 overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#05070f] via-[#0f111d] to-[#05070f] px-6 py-10 sm:px-10">
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.3),_transparent_65%)]"></div>
          <div className="absolute inset-0 showcase-noise opacity-50"></div>
          <div className="relative grid lg:grid-cols-2 gap-12">
            <div
              className={`transform transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
              style={{ transitionDelay: isVisible ? "1000ms" : "0ms" }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">
                Specialties
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {specialties.map((specialty, index) => {
                  const Icon = specialty.icon;
                  return (
                    <div
                      key={specialty.name}
                      className={`flex items-center gap-3 p-3 bg-gray-900/80 backdrop-blur-sm rounded-lg hover:bg-gray-800/80 transition-all duration-300 hover:scale-105 transform transition-all duration-500 shadow-lg`}
                      style={{
                        transitionDelay: isVisible
                          ? `${1200 + index * 100}ms`
                          : "0ms",
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible
                          ? "translateY(0)"
                          : "translateY(20px)",
                      }}
                    >
                      <Icon className="w-5 h-5 text-yellow-400 drop-shadow-lg" />
                      <span className="text-sm font-medium text-white drop-shadow-lg">
                        {specialty.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className={`transform transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
              style={{ transitionDelay: isVisible ? "1100ms" : "0ms" }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">
                Certifications
              </h3>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div
                    key={cert.title}
                    className={`p-4 bg-gray-900/80 backdrop-blur-sm rounded-lg border-l-4 border-yellow-400 hover:bg-gray-800/80 transition-all duration-300 hover:scale-105 transform transition-all duration-500 shadow-lg`}
                    style={{
                      transitionDelay: isVisible
                        ? `${1300 + index * 100}ms`
                        : "0ms",
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "translateY(0)" : "translateY(20px)",
                    }}
                  >
                    <h4 className="font-semibold text-white mb-1 drop-shadow-lg">
                      {cert.title}
                    </h4>
                    <p className="text-sm text-gray-300 mb-1 drop-shadow-lg">
                      {cert.organization}
                    </p>
                    <p className="text-xs text-gray-400 mb-2 drop-shadow-lg">
                      {cert.description}
                    </p>
                    <Badge
                      variant="secondary"
                      className="bg-yellow-400/30 text-yellow-400 text-xs border border-yellow-400/50"
                    >
                      {cert.year}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div
            className={`relative rounded-[32px] overflow-hidden transform transition-all duration-800 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: isVisible ? "1500ms" : "0ms" }}
          >
            {/* Animated glow border */}
            <div className="absolute inset-0 rounded-[32px] p-[2px] bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 animate-border-glow" />

            {/* Inner dark container */}
            <div className="relative m-[2px] rounded-[30px] bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a] p-8 lg:p-12">
              {/* Radial glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(250,204,21,0.15),_transparent_60%)] pointer-events-none" />

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                  Ready to Start Your{" "}
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                    Transformation?
                  </span>
                </h3>
                <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
                  Join Ruwan's proven program and experience the same dedication,
                  science-based approach, and championship mindset that led to his
                  historic achievements.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 px-8 py-4 text-lg font-bold tracking-wide uppercase hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(250,204,21,0.5)]"
                    onClick={openCal}
                  >
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-4 text-lg font-bold tracking-wide uppercase hover:scale-105 transition-all duration-300"
                    onClick={openCal}
                  >
                    Free Consultation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Training Philosophy */}
        <div
          className={`relative rounded-[32px] bg-gradient-to-br from-[#05070f] via-[#0f111d] to-[#05070f] border border-white/10 p-8 lg:p-12 overflow-hidden transform transition-all duration-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: isVisible ? "1500ms" : "0ms" }}
        >
          {/* Background effects */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_rgba(250,204,21,0.2),_transparent_65%)] pointer-events-none" />
          <div className="absolute inset-0 showcase-noise opacity-50 pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-[1fr,auto] gap-8 items-center">
            {/* Quote side */}
            <div className="relative">
              {/* Large decorative quote mark */}
              <svg
                className="absolute -top-4 -left-4 w-20 h-20 text-yellow-400/20 animate-float"
                viewBox="0 0 100 100"
                fill="currentColor"
              >
                <text
                  x="0"
                  y="80"
                  fontSize="100"
                  fontFamily="serif"
                  fontWeight="bold"
                >
                  "
                </text>
              </svg>

              <div className="relative z-10 pl-8">
                <h3 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">
                  Training Philosophy
                </h3>

                <blockquote className="text-xl text-gray-200 italic leading-relaxed mb-6">
                  "I've been where you are - struggling with weight, lacking
                  confidence, and feeling lost in the fitness world. I
                  understand the frustration of trying everything without
                  seeing results. That's why I'm here to share the scientific
                  approach that transformed my life and made me a champion.
                  Trust the process, stay consistent, and let me guide you to
                  unleash your full potential."
                </blockquote>

                <div className="mt-6">
                  <span className="text-yellow-400 font-bold text-lg drop-shadow-lg">
                    - Ruwan Palihawadana
                  </span>
                  <p className="text-sm text-gray-400 mt-2">
                    Natural Bodybuilding Champion & NZ Qualified Trainer
                  </p>
                </div>
              </div>
            </div>

            {/* Trainer image */}
            <div className="hidden lg:block">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-yellow-400/30 shadow-[0_0_30px_rgba(250,204,21,0.2)]">
                <Image
                  src="/images/coach.png"
                  alt="Ruwan Palihawadana"
                  fill
                  sizes="192px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative max-w-4xl max-h-[90vh] w-full mx-4">
            {/* Close Button */}
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute -top-12 right-0 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
            >
              <span className="text-white text-xl font-bold">×</span>
            </button>

            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-yellow-400/20 to-teal-400/20 p-1 min-h-[50vh]">
              <Image
                src={currentImages[selectedImageIndex]}
                alt={`Gallery Image ${selectedImageIndex + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-contain rounded-xl"
                priority
              />
            </div>

            {/* Navigation */}
            {currentImages.length > 1 && (
              <>
                {/* Previous Button */}
                {selectedImageIndex > 0 && (
                  <button
                    onClick={() =>
                      setSelectedImageIndex(selectedImageIndex - 1)
                    }
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                    title="Previous image"
                    aria-label="Previous image"
                  >
                    <ArrowRight className="w-6 h-6 text-white transform rotate-180" />
                  </button>
                )}

                {/* Next Button */}
                {selectedImageIndex < currentImages.length - 1 && (
                  <button
                    onClick={() =>
                      setSelectedImageIndex(selectedImageIndex + 1)
                    }
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                    title="Next image"
                    aria-label="Next image"
                  >
                    <ArrowRight className="w-6 h-6 text-white" />
                  </button>
                )}

                {/* Thumbnail Strip */}
                <div className="flex gap-2 mt-4 justify-center overflow-x-auto">
                  {currentImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 relative ${
                        index === selectedImageIndex
                          ? "border-yellow-400 scale-110"
                          : "border-white/30 hover:border-white/60"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
