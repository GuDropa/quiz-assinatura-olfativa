import { motion } from "framer-motion";
import { escalaRespostas } from "../data/quizConfig";

const scaleColors = [
  "bg-burgundy text-white",
  "bg-burgundy-light text-white",
  "bg-slate-blue text-white",
  "bg-graphite/30 text-graphite",
  "bg-graphite/15 text-graphite",
];

export default function AnswerScale({ selected, onSelect }) {
  return (
    <div className="flex flex-col gap-3 w-full max-w-md mx-auto mt-8">
      {escalaRespostas.map((opcao, index) => {
        const isSelected = selected === opcao.valor;

        return (
          <motion.button
            key={opcao.valor}
            onClick={() => onSelect(opcao.valor)}
            className={`
              relative py-3.5 px-6 rounded-xl text-left font-medium
              transition-all duration-200 cursor-pointer
              border-2
              ${
                isSelected
                  ? "border-gold bg-gold/10 shadow-lg shadow-gold/20"
                  : "border-transparent hover:border-gold/40 hover:shadow-md"
              }
              ${scaleColors[index]}
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08, duration: 0.3 }}
          >
            <span className="flex items-center gap-3">
              <span
                className={`
                  w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                  ${isSelected ? "bg-gold text-graphite" : "bg-white/20"}
                `}
              >
                {opcao.valor}
              </span>
              {opcao.label}
            </span>

            {isSelected && (
              <motion.div
                layoutId="selected-indicator"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
