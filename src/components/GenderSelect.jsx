import { motion } from "framer-motion";
import { Crown, Gem } from "lucide-react";

export default function GenderSelect({ onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="text-center max-w-2xl mx-auto"
    >
      <div className="mb-4">
        <span className="inline-block text-gold text-sm font-medium tracking-[0.3em] uppercase">
          D&A Decants
        </span>
      </div>
      <h1 className="font-serif text-4xl sm:text-5xl font-bold text-graphite mb-4 leading-tight">
        Quiz de Assinatura
        <span className="text-burgundy"> Olfativa</span>
      </h1>
      <p className="text-slate-blue text-lg mb-2">
        Descubra o perfume perfeito para sua personalidade.
      </p>
      <p className="text-slate-blue/70 text-sm mb-12">
        Responda 7 perguntas rápidas e encontre seu match.
      </p>

      <p className="text-graphite font-medium mb-6 text-lg">
        Para começar, qual linha você quer explorar?
      </p>

      <div className="flex flex-col sm:flex-row gap-5 justify-center">
        <motion.button
          onClick={() => onSelect("masculino")}
          className="group relative flex-1 max-w-xs mx-auto sm:mx-0 bg-graphite text-white rounded-2xl p-8 cursor-pointer overflow-hidden"
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="absolute inset-0 bg-linear-to-br from-graphite to-burgundy opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <Crown className="w-10 h-10 text-gold mx-auto mb-4" />
            <span className="font-serif text-xl font-bold block mb-1">
              Masculino
            </span>
            <span className="text-white/60 text-sm">27 fragrâncias</span>
          </div>
        </motion.button>

        <motion.button
          onClick={() => onSelect("feminino")}
          className="group relative flex-1 max-w-xs mx-auto sm:mx-0 bg-white border-2 border-graphite/10 text-graphite rounded-2xl p-8 cursor-pointer overflow-hidden"
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="absolute inset-0 bg-linear-to-br from-white to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <Gem className="w-10 h-10 text-burgundy mx-auto mb-4" />
            <span className="font-serif text-xl font-bold block mb-1">
              Feminino
            </span>
            <span className="text-slate-blue text-sm">20 fragrâncias</span>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
}
