import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { perguntas } from "../data/quizConfig";
import { obterRecomendacoes } from "../utils/recommendationEngine";
import GenderSelect from "./GenderSelect";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";
import ResultPage from "./ResultPage";

const ETAPAS = { GENERO: "genero", QUIZ: "quiz", RESULTADO: "resultado" };

export default function QuizEngine() {
  const [etapa, setEtapa] = useState(ETAPAS.GENERO);
  const [genero, setGenero] = useState(null);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [respostas, setRespostas] = useState({});
  const [resultado, setResultado] = useState(null);

  const handleGenero = useCallback((g) => {
    setGenero(g);
    setEtapa(ETAPAS.QUIZ);
  }, []);

  const handleResponder = useCallback(
    (valor) => {
      const pergunta = perguntas[perguntaAtual];
      setRespostas((prev) => ({ ...prev, [pergunta.id]: valor }));
    },
    [perguntaAtual]
  );

  const avancar = useCallback(() => {
    if (perguntaAtual < perguntas.length - 1) {
      setPerguntaAtual((p) => p + 1);
    } else {
      const rec = obterRecomendacoes(respostas, perguntas, genero);
      setResultado(rec);
      setEtapa(ETAPAS.RESULTADO);
    }
  }, [perguntaAtual, respostas, genero]);

  const voltar = useCallback(() => {
    if (perguntaAtual > 0) {
      setPerguntaAtual((p) => p - 1);
    } else {
      setEtapa(ETAPAS.GENERO);
      setGenero(null);
    }
  }, [perguntaAtual]);

  const recomecar = useCallback(() => {
    setEtapa(ETAPAS.GENERO);
    setGenero(null);
    setPerguntaAtual(0);
    setRespostas({});
    setResultado(null);
  }, []);

  const perguntaAtualObj = perguntas[perguntaAtual];
  const respostaAtual = perguntaAtualObj ? respostas[perguntaAtualObj.id] : null;
  const podeAvancar = respostaAtual != null;
  const isUltima = perguntaAtual === perguntas.length - 1;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-5 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-burgundy to-gold flex items-center justify-center">
            <span className="text-white font-serif font-bold text-sm">D&A</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-serif font-bold text-graphite text-lg">D&A Decants</span>
            <span className="block text-[10px] tracking-[0.25em] uppercase text-slate-blue -mt-0.5">
              Luxo e Sofisticação em frascos
            </span>
          </div>
        </div>

        {etapa === ETAPAS.QUIZ && (
          <span className="text-xs text-slate-blue tracking-widest uppercase">
            Linha {genero === "masculino" ? "Masculina" : "Feminina"}
          </span>
        )}
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-6">
        <AnimatePresence mode="wait">
          {etapa === ETAPAS.GENERO && (
            <motion.div
              key="genero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GenderSelect onSelect={handleGenero} />
            </motion.div>
          )}

          {etapa === ETAPAS.QUIZ && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-2xl"
            >
              <ProgressBar current={perguntaAtual} total={perguntas.length} />

              <AnimatePresence mode="wait">
                <QuestionCard
                  key={perguntaAtualObj.id}
                  pergunta={perguntaAtualObj}
                  resposta={respostaAtual}
                  onResponder={handleResponder}
                />
              </AnimatePresence>

              <div className="flex justify-between items-center mt-8 max-w-2xl mx-auto">
                <motion.button
                  onClick={voltar}
                  className="flex items-center gap-1 px-5 py-2.5 rounded-xl text-sm font-medium text-slate-blue hover:text-graphite transition-colors cursor-pointer"
                  whileHover={{ x: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Voltar
                </motion.button>

                <motion.button
                  onClick={avancar}
                  disabled={!podeAvancar}
                  className={`
                    flex items-center gap-1 px-7 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer
                    ${
                      podeAvancar
                        ? "bg-linear-to-r from-burgundy to-burgundy-light text-white shadow-lg shadow-burgundy/25 hover:shadow-xl"
                        : "bg-graphite/10 text-graphite/30 cursor-not-allowed"
                    }
                  `}
                  whileHover={podeAvancar ? { scale: 1.03 } : {}}
                  whileTap={podeAvancar ? { scale: 0.97 } : {}}
                >
                  {isUltima ? "Ver Resultado" : "Próxima"}
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {etapa === ETAPAS.RESULTADO && resultado && (
            <motion.div
              key="resultado"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ResultPage
                resultado={resultado}
                respostas={respostas}
                genero={genero}
                onRestart={recomecar}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-6 text-center border-t border-graphite/5">
        <p className="text-xs text-slate-blue/60">
          &copy; {new Date().getFullYear()} D&A Decants — Luxo e Sofisticação em frascos
        </p>
      </footer>
    </div>
  );
}
