import { motion } from "framer-motion";

export default function ProgressBar({ current, total }) {
  const porcentagem = ((current + 1) / total) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-slate-blue tracking-wide uppercase">
          Pergunta {current + 1} de {total}
        </span>
        <span className="text-sm font-semibold text-graphite">
          {Math.round(porcentagem)}%
        </span>
      </div>
      <div className="h-2 bg-graphite/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #3F0D12, #FFD700)",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${porcentagem}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
