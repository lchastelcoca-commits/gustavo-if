import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Sparkles, 
  Film, 
  Zap, 
  ShieldCheck 
} from 'lucide-react';

export interface FounderClip {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
  quote: string;
  color: string;
}

export const FOUNDER_CLIPS: FounderClip[] = [
  {
    id: 'omnitrix',
    title: 'Fase 1: O Omnitrix Lácteo',
    subtitle: 'Origem da Leitche Enterprises',
    description: 'O início da jornada: tecnologia alienígena aplicada ao controle genético dos rebanhos A2A2.',
    image: '/assets/aistudio/WhatsApp_Image_2026-11-01_at_21.53.48_2c479c6e.jpeg',
    badge: 'Modo Herói Alien',
    quote: '"Com o poder da bio-engenharia láctea, transformamos o leite comum em pureza absoluta."',
    color: 'from-emerald-500/30 to-lime-500/20'
  },
  {
    id: 'milhouse',
    title: 'Fase 2: Milhouse em Springfield',
    subtitle: 'Pesquisa da Quebra Enzimática Zero Lactose',
    description: 'Desenvolvimento em laboratório da enzima lactase pura que quebra a lactose sem alterar o sabor.',
    image: '/assets/aistudio/WhatsApp_Image_2026-11-01_at_21.53.48__1__434170a5.jpeg',
    badge: 'Modo Springfield',
    quote: '"Tudo finalmente deu certo para o Milhouse e para os intolerantes a lactose!"',
    color: 'from-blue-500/30 to-yellow-500/20'
  },
  {
    id: 'thanos',
    title: 'Fase 3: Thanos do Laticínio',
    subtitle: 'O Equilíbrio Perfeito do Mercado Lácteo',
    description: 'Com a Manopla do Infinito, ele equilibrou a cadeia de frio no universo e esgotou todos os lotes.',
    image: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_14.37.11_19b41e89.jpeg',
    badge: 'Modo Manopla Cósmica',
    quote: '"O esgotamento dos nossos lotes é inevitável. Eu sou a Leitche Enterprises."',
    color: 'from-purple-600/40 to-amber-500/30'
  }
];

export const FounderVideoPlayer: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0 to 100 for current slide
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  const SLIDE_DURATION_MS = 4500; // 4.5s per photo

  // Sound synthesis on slide change if unmuted
  const playSlideTransitionTone = () => {
    if (isMuted) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320 + currentIndex * 120, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(540 + currentIndex * 140, ctx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      // Audio autoplay restrictions or unsupported
    }
  };

  // Timer loop for video playback
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 50;
    const increment = (intervalTime / SLIDE_DURATION_MS) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setCurrentIndex(curr => {
            const next = (curr + 1) % FOUNDER_CLIPS.length;
            return next;
          });
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, currentIndex]);

  useEffect(() => {
    playSlideTransitionTone();
  }, [currentIndex, isMuted]);

  const handleNext = () => {
    setProgress(0);
    setCurrentIndex(prev => (prev + 1) % FOUNDER_CLIPS.length);
  };

  const handlePrev = () => {
    setProgress(0);
    setCurrentIndex(prev => (prev - 1 + FOUNDER_CLIPS.length) % FOUNDER_CLIPS.length);
  };

  const handleSelectClip = (index: number) => {
    setProgress(0);
    setCurrentIndex(index);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const currentClip = FOUNDER_CLIPS[currentIndex];
  const totalSeconds = Math.floor((currentIndex * 4.5) + ((progress / 100) * 4.5));
  const formattedTime = `00:${totalSeconds < 10 ? '0' : ''}${totalSeconds} / 00:13`;

  return (
    <div 
      ref={containerRef}
      className={`relative rounded-3xl bg-stone-950 border-2 border-stone-800 shadow-2xl overflow-hidden flex flex-col group transition-all duration-300 ${
        isFullscreen ? 'p-6 fixed inset-0 z-50 rounded-none' : 'w-full'
      }`}
    >
      {/* Video Screen Top Bar */}
      <div className="absolute top-0 inset-x-0 z-20 p-4 bg-gradient-to-b from-stone-950/90 via-stone-950/50 to-transparent flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-red-950/80 border border-red-500/50 px-2 py-0.5 rounded">
            Vídeo do Fundador · Ao Vivo
          </span>
          <span className="text-xs text-stone-300 font-mono hidden sm:inline">
            Clip {currentIndex + 1} de {FOUNDER_CLIPS.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Mute button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? 'Ativar Efeitos Sonoros' : 'Mutar Áudio'}
            className="p-1.5 rounded-lg bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors cursor-pointer border border-stone-700/60"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-stone-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Fullscreen button */}
          <button
            onClick={toggleFullscreen}
            title="Tela Cheia"
            className="p-1.5 rounded-lg bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors cursor-pointer border border-stone-700/60"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Video Viewport with Ken Burns motion */}
      <div className="relative aspect-4/3 sm:aspect-16/10 bg-stone-950 overflow-hidden flex items-center justify-center">
        {/* Ambient backdrop glow */}
        <div className={`absolute inset-0 bg-gradient-to-tr ${currentClip.color} transition-all duration-700 opacity-60 pointer-events-none`} />

        {/* The active founder photo */}
        <img
          key={currentClip.id}
          src={currentClip.image}
          alt={currentClip.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top transition-all duration-700 scale-100 animate-pulse-none hover:scale-103"
          style={{
            animation: isPlaying ? 'kenburns 4.5s ease-out infinite alternate' : 'none'
          }}
        />

        {/* Video Scrim Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-stone-950/40 pointer-events-none" />

        {/* Play/Pause Large Center Click Overlay */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
          className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer z-10"
        >
          <div className="w-14 h-14 rounded-full bg-stone-900/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform">
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
          </div>
        </button>

        {/* Dynamic Video Lower Third / Subtitle Overlay */}
        <div className="absolute bottom-16 inset-x-0 p-4 sm:p-6 z-20 pointer-events-none">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-950/85 backdrop-blur-md border border-white/15 text-[11px] font-bold text-amber-300 mb-1.5">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>{currentClip.badge}</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight drop-shadow-md">
            {currentClip.title}
          </h3>

          <p className="text-xs sm:text-sm text-stone-200 max-w-xl drop-shadow-sm mt-0.5 line-clamp-2">
            {currentClip.description}
          </p>

          <p className="text-[11px] text-amber-200/90 italic font-mono mt-1 drop-shadow-sm">
            {currentClip.quote}
          </p>
        </div>

        {/* Bottom Control Bar */}
        <div className="absolute bottom-0 inset-x-0 z-30 p-3 sm:p-4 bg-gradient-to-t from-stone-950 via-stone-950/90 to-transparent">
          {/* Segmented Timeline Progress Bars (Story/Video Reel style) */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {FOUNDER_CLIPS.map((clip, idx) => (
              <button
                key={clip.id}
                onClick={() => handleSelectClip(idx)}
                className="h-1.5 bg-stone-700/80 rounded-full overflow-hidden relative cursor-pointer"
                title={`Ir para ${clip.title}`}
              >
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-75"
                  style={{
                    width: idx < currentIndex ? '100%' : idx === currentIndex ? `${progress}%` : '0%'
                  }}
                />
              </button>
            ))}
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between text-white text-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                title="Foto Anterior"
                className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-300 hover:text-white transition-colors cursor-pointer"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                title={isPlaying ? 'Pausar' : 'Reproduzir'}
                className="p-2 rounded-lg bg-amber-400 text-stone-950 hover:bg-amber-300 font-bold transition-transform cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={handleNext}
                title="Próxima Foto"
                className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-300 hover:text-white transition-colors cursor-pointer"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              <span className="font-mono text-stone-400 text-[11px] ml-1">
                {formattedTime}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-stone-400 font-mono">
              <Film className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Vídeo Reel Contínuo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Multiverse Thumbnail Strip */}
      <div className="p-3 bg-stone-900 border-t border-stone-800 grid grid-cols-3 gap-2">
        {FOUNDER_CLIPS.map((clip, index) => (
          <button
            key={clip.id}
            onClick={() => handleSelectClip(index)}
            className={`flex items-center gap-2 p-2 rounded-xl text-left border transition-all cursor-pointer ${
              currentIndex === index
                ? 'bg-stone-800 border-amber-400/80 shadow-xs'
                : 'bg-stone-950/50 border-stone-800 hover:border-stone-700 opacity-70 hover:opacity-100'
            }`}
          >
            <img
              src={clip.image}
              alt={clip.title}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-lg object-cover object-top shrink-0 border border-white/10"
            />
            <div className="overflow-hidden">
              <p className="text-[11px] font-bold text-white truncate">{clip.badge}</p>
              <p className="text-[10px] text-stone-400 truncate">{clip.title.split(':')[1] || clip.title}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
