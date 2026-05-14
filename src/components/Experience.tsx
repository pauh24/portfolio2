import { motion } from "framer-motion";
import { Briefcase, Video, Radio, Camera, Film } from "lucide-react";

const experiences = [
  {
    company: "Dorna Sports",
    role: "Operador de Cámara & Trackside",
    period: "MotoGP / DAZN / JuniorGP",
    description: "Operador de cámara en plató virtual y operador de pista para señal internacional.",
    icon: <Camera className="w-6 h-6" />,
  },
  {
    company: "Gestmusic (Operación Triunfo)",
    role: "Realizador & Streaming Manager",
    period: "OT 2023",
    description: "Realizador y operador en la Academia. Gestión integral de señal YouTube con vMix en Castings.",
    icon: <Radio className="w-6 h-6" />,
  },
  {
    company: "Barça Studios",
    role: "Realizador & Técnico",
    period: "Barça TV / Podcasts",
    description: "Realizador de 'Culers Corner' y 'Barra Lliure'. Técnico de conexiones con mochilas desde estadios.",
    icon: <Video className="w-6 h-6" />,
  },
  {
    company: "Projecte Beta",
    role: "Técnico de Plató & Operador vMix",
    period: "Projecte Beta",
    description: "Operación técnica y realización en directo.",
    icon: <Briefcase className="w-6 h-6" />,
  },
  {
    company: "Freelance",
    role: "Realizador & Streaming Specialist",
    period: "Atomic Beat / Replay / Davideo",
    description: "Documentales ('Aüc'), streamings deportivos (FCF) y eventos corporativos.",
    icon: <Film className="w-6 h-6" />,
  },
];

export function Experience() {
  return (
    <section className="py-20 bg-black text-white px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          Experiencia
        </motion.h2>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-neutral-800 transform -translate-x-1/2" />

          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-8 md:left-1/2 w-12 h-12 bg-neutral-900 border border-neutral-700 rounded-full flex items-center justify-center z-10 transform -translate-x-1/2">
                {exp.icon}
              </div>

              {/* Content Card */}
              <div className={`w-full md:w-5/12 pl-20 md:pl-0 ${
                index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
              }`}>
                <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-xl hover:border-neutral-600 transition-colors">
                  <h3 className="text-xl font-bold text-white mb-1">{exp.company}</h3>
                  <p className="text-blue-400 font-medium text-sm mb-2">{exp.role}</p>
                  <p className="text-neutral-500 text-xs mb-3 uppercase tracking-wider">{exp.period}</p>
                  <p className="text-neutral-400 leading-relaxed text-sm">
                    {exp.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
