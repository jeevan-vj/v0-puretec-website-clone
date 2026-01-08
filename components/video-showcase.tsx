'use client';

import { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

// Cloudinary video with optimizations
// f_auto = auto format (webm/mp4), q_auto = auto quality
const CLOUDINARY_BASE = 'https://res.cloudinary.com/dcb7rocrk/video/upload';
const VIDEO_ID = 'v1767899106/kiwilankan_charana_tv_kzfdvk';

const VIDEO_URL = `${CLOUDINARY_BASE}/f_auto,q_auto/${VIDEO_ID}`;
const POSTER_URL = `${CLOUDINARY_BASE}/f_jpg,q_auto,so_2/${VIDEO_ID}.jpg`; // Thumbnail at 2 seconds

export default function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        // Unmute when user clicks play
        videoRef.current.muted = false;
        setIsMuted(false);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-br from-[#020204] via-[#0a0b12] to-[#020204] overflow-hidden">
      {/* Ambient glow effects */}
      <div className="absolute inset-0 opacity-50 bg-[radial-gradient(ellipse_at_top_left,_rgba(250,204,21,0.15),_transparent_50%)]"></div>
      <div className="absolute inset-0 opacity-50 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(250,204,21,0.1),_transparent_50%)]"></div>
      <div className="absolute inset-0 showcase-noise opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-3 mb-4 opacity-0 animate-slideUp" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <div className="w-8 h-0.5 bg-yellow-400"></div>
            <span className="text-sm font-medium text-yellow-400 uppercase tracking-[0.2em]">
              See The Proof
            </span>
            <div className="w-8 h-0.5 bg-yellow-400"></div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-display opacity-0 animate-slideUp" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            Real <span className="text-yellow-400">Results</span>, Real People
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto opacity-0 animate-slideUp" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            Watch the incredible transformation journey that&apos;s possible with dedication and expert guidance
          </p>
        </div>

        {/* Video Container */}
        <div className="max-w-sm mx-auto opacity-0 animate-slideUp" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          <div 
            className="relative group"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            {/* Outer glow frame */}
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/30 via-yellow-500/20 to-yellow-400/30 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Video frame with border */}
            <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black group-hover:border-yellow-400/30 transition-all duration-500">
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-yellow-400/50 rounded-tl-xl pointer-events-none z-20"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-yellow-400/50 rounded-tr-xl pointer-events-none z-20"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-yellow-400/50 rounded-bl-xl pointer-events-none z-20"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-yellow-400/50 rounded-br-xl pointer-events-none z-20"></div>

              {/* Video Container */}
              <div className="relative w-full h-[500px] lg:h-[550px]">
                {/* Native Video Player */}
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  poster={POSTER_URL}
                  playsInline
                  muted={isMuted}
                  loop
                  preload="metadata"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                >
                  <source src={VIDEO_URL} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Play Overlay (when not playing) */}
                {!isPlaying && (
                  <div 
                    className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/30 transition-opacity duration-300"
                    onClick={handlePlayPause}
                  >
                    {/* Play button */}
                    <div className="relative z-10 flex flex-col items-center gap-4">
                      <div className="relative">
                        {/* Pulsing ring */}
                        <div className="absolute inset-0 bg-yellow-400/20 rounded-full animate-ping"></div>
                        <div className="absolute -inset-4 bg-yellow-400/10 rounded-full animate-pulse"></div>
                        
                        {/* Play button */}
                        <button className="relative w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(250,204,21,0.5)] hover:shadow-[0_0_60px_rgba(250,204,21,0.7)] hover:scale-110 transition-all duration-300 group/btn">
                          <Play className="w-8 h-8 lg:w-10 lg:h-10 text-black fill-black ml-1 group-hover/btn:scale-110 transition-transform" />
                        </button>
                      </div>
                      
                      <span className="text-white font-semibold text-lg tracking-wide uppercase drop-shadow-lg">
                        Play Video
                      </span>
                    </div>

                    {/* Corner text badges */}
                    <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                      <span className="text-yellow-400 font-bold text-sm">TRANSFORMATION</span>
                    </div>
                    <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                      <span className="text-white/80 text-sm">Watch the journey</span>
                    </div>
                  </div>
                )}

                {/* Video Controls (when playing) */}
                {isPlaying && (
                  <div 
                    className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <div className="flex items-center justify-between">
                      {/* Play/Pause */}
                      <button
                        onClick={handlePlayPause}
                        className="w-10 h-10 bg-yellow-400/20 hover:bg-yellow-400/40 rounded-full flex items-center justify-center transition-colors"
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5 text-white" />
                        ) : (
                          <Play className="w-5 h-5 text-white ml-0.5" />
                        )}
                      </button>

                      {/* Mute/Unmute */}
                      <button
                        onClick={toggleMute}
                        className="w-10 h-10 bg-yellow-400/20 hover:bg-yellow-400/40 rounded-full flex items-center justify-center transition-colors"
                      >
                        {isMuted ? (
                          <VolumeX className="w-5 h-5 text-white" />
                        ) : (
                          <Volume2 className="w-5 h-5 text-white" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Tap to pause indicator */}
                {isPlaying && showControls && (
                  <div 
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    onClick={handlePlayPause}
                  >
                    <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Pause className="w-8 h-8 text-white" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Video caption/CTA */}
          <div className="text-center mt-8 opacity-0 animate-slideUp" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <p className="text-gray-400 text-sm mb-4">
              Join hundreds of others who&apos;ve transformed their lives
            </p>
            <div className="flex justify-center items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-yellow-400">
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium">16-Week Program</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-gray-600"></div>
              <div className="flex items-center gap-2 text-gray-300">
                <span className="text-sm">Personalized Coaching</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-gray-600"></div>
              <div className="flex items-center gap-2 text-gray-300">
                <span className="text-sm">Proven Results</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#05070f] to-transparent pointer-events-none"></div>
    </section>
  );
}
