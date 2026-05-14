import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { Play } from "lucide-react";

const projects = [
  {
    title: "Mundial MotoGP",
    category: "Op. Cámara Broadcast",
    description: "Operador de cámara en plató virtual y operador de pista (Trackside) para señal internacional.",
    video: "https://videos.pexels.com/video-files/5029375/5029375-uhd_2560_1440_24fps.mp4",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Castings OT 2023",
    category: "Realizador vMix",
    description: "Realizador y operador en la Academia. Gestión integral de señal YouTube con vMix.",
    video: "https://videos.pexels.com/video-files/3196068/3196068-uhd_2560_1440_25fps.mp4",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Barra Lliure & Culers Corner",
    category: "Realizador",
    description: "Realizador de 'Culers Corner' y Podcast 'Barra Lliure'. Técnico de conexiones.",
    video: "https://videos.pexels.com/video-files/4761603/4761603-uhd_2560_1440_25fps.mp4",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Documental Aüc",
    category: "Op. Cámara Ficción/Doc",
    description: "Dirección de fotografía y montaje para pieza documental premiada.",
    video: "https://videos.pexels.com/video-files/855018/855018-hd_1920_1080_30fps.mp4",
    className: "md:col-span-2 md:row-span-1",
  },
];

export function Projects() {
  return (
    <section className="py-20 bg-black text-white px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-12 text-center tracking-tighter"
        >
          Selected Work
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-[1200px] md:h-[800px]">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "group relative overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800 cursor-pointer",
                project.className
              )}
            >
              {/* Video Background */}
              <div className="absolute inset-0 w-full h-full">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110"
                >
                  <source src={project.video} type="video/mp4" />
                </video>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6 backdrop-blur-sm">
                <motion.span 
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm md:text-base font-bold text-neutral-400 uppercase tracking-widest mb-4"
                >
                  {project.category}
                </motion.span>
                
                <motion.h3 
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="text-3xl md:text-5xl font-bold text-white tracking-tighter leading-tight"
                >
                  {project.title}
                </motion.h3>

                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="mt-6 bg-white text-black p-3 rounded-full"
                >
                  <Play className="w-6 h-6 fill-current" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
