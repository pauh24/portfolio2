import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">¿Hablamos?</h2>
          <p className="text-neutral-400 text-lg mb-8 max-w-xl mx-auto">
            Estoy disponible para nuevos proyectos y colaboraciones. Si buscas un perfil técnico y creativo para tu próxima producción, contáctame.
          </p>
          <a 
            href="mailto:pauherbera@gmail.com"
            className="inline-block bg-white text-black font-bold py-4 px-10 rounded-full text-lg hover:scale-105 transition-transform duration-300"
          >
            Contactar
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-neutral-800 pt-12">
          <div className="flex flex-col items-center gap-2">
            <Mail className="w-6 h-6 text-neutral-500 mb-2" />
            <span className="text-neutral-300">pauherbera@gmail.com</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Phone className="w-6 h-6 text-neutral-500 mb-2" />
            <span className="text-neutral-300">+34 674 62 02 88</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MapPin className="w-6 h-6 text-neutral-500 mb-2" />
            <span className="text-neutral-300">Barcelona, España</span>
          </div>
        </div>

        <div className="mt-20 text-neutral-600 text-sm">
          © {new Date().getFullYear()} Pau Herbera. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
