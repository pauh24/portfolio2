import { motion } from "framer-motion";

const skills = [
  "vMix",
  "Premiere Pro",
  "Cámaras PTZ",
  "Realización TV",
  "Photoshop",
  "Streaming",
  "Directos",
];

export function Skills() {
  return (
    <section className="py-10 bg-black border-y border-neutral-900 overflow-hidden">
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex gap-8 md:gap-16 pr-8 md:pr-16"
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20,
          }}
        >
          {[...skills, ...skills, ...skills, ...skills].map((skill, index) => (
            <div key={index} className="flex items-center gap-8 md:gap-16">
              <span className="text-4xl md:text-6xl font-bold text-neutral-800 uppercase tracking-tighter hover:text-white transition-colors duration-300 cursor-default">
                {skill}
              </span>
              <span className="text-2xl md:text-3xl text-blue-500">•</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
