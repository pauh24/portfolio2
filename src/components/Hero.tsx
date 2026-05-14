import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const { scrollY } = useScroll();
  
  const titleY = useTransform(scrollY, [0, 300], [0, 100]);
  const opacityInitial = useTransform(scrollY, [0, 100], [1, 0]);
  const opacityScrolled = useTransform(scrollY, [0, 100], [0, 1]);
  const yInitial = useTransform(scrollY, [0, 100], [0, -20]);
  const yScrolled = useTransform(scrollY, [0, 100], [20, 0]);

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black text-white">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" /> {/* Overlay for text readability */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_24fps.mp4" type="video/mp4" />
        </video>
      </div>
      
      <div className="z-20 text-center px-4 sticky top-1/2 -translate-y-1/2">
        <motion.h1 
          style={{ y: titleY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 text-white drop-shadow-lg"
        >
          PAU HERBERA
        </motion.h1>
        
        <div className="relative h-20 overflow-hidden">
          {/* Initial Subtitle */}
          <motion.div 
            style={{ opacity: opacityInitial, y: yInitial }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <h2 className="text-2xl md:text-4xl font-light tracking-widest text-neutral-200 uppercase">
              Freelance Audiovisual
            </h2>
          </motion.div>

          {/* Scrolled Subtitle */}
          <motion.div 
            style={{ opacity: opacityScrolled, y: yScrolled }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <h2 className="text-xl md:text-3xl font-bold tracking-[0.2em] text-white uppercase bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full border border-white/20">
              Realizador | Op. Cámara | vMix
            </h2>
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 z-20 animate-bounce"
      >
        <ChevronDown className="w-10 h-10 text-white/70" />
      </motion.div>
    </section>
  );
}
