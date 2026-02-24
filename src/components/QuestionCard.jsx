import { motion } from "framer-motion";
import AnswerScale from "./AnswerScale";

export default function QuestionCard({ pergunta, resposta, onResponder }) {
  return (
    <motion.div
      key={pergunta.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white">
        <div className="relative h-56 sm:h-72 overflow-hidden">
          <img
            src={pergunta.imagem}
            alt={pergunta.texto}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-linear-to-t from-graphite/80 via-graphite/30 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight mb-2">
              {pergunta.texto}
            </h2>
            {pergunta.subtexto && (
              <p className="text-white/70 text-sm sm:text-base">
                {pergunta.subtexto}
              </p>
            )}
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <AnswerScale selected={resposta} onSelect={onResponder} />
        </div>
      </div>
    </motion.div>
  );
}
