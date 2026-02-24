import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, Instagram, MessageCircle } from "lucide-react";
import { perguntas } from "../data/quizConfig";
import { obterRecomendacoes } from "../utils/recommendationEngine";
import GenderSelect from "./GenderSelect";
import ContactStep from "./ContactStep";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";
import ResultPage from "./ResultPage";

const ETAPAS = { GENERO: "genero", CONTATO: "contato", QUIZ: "quiz", RESULTADO: "resultado" };

const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/deadecants.guarapuava/",
  whatsapp: "https://wa.me/5511999999999",
};

export default function QuizEngine() {
  const [etapa, setEtapa] = useState(ETAPAS.GENERO);
  const [genero, setGenero] = useState(null);
  const [contact, setContact] = useState(null);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [respostas, setRespostas] = useState({});
  const [resultado, setResultado] = useState(null);

  const handleGenero = useCallback((g) => {
    setGenero(g);
    setEtapa(ETAPAS.CONTATO);
  }, []);

  const handleContactSubmit = useCallback((contactData) => {
    setContact(contactData);
    setEtapa(ETAPAS.QUIZ);
  }, []);

  const handleContactSkip = useCallback(() => {
    setContact(null);
    setEtapa(ETAPAS.QUIZ);
  }, []);

  const handleResponder = useCallback(
    (valor) => {
      const pergunta = perguntas[perguntaAtual];
      const newRespostas = { ...respostas, [pergunta.id]: valor };
      setRespostas(newRespostas);
      if (perguntaAtual < perguntas.length - 1) {
        setPerguntaAtual((p) => p + 1);
      } else {
        const rec = obterRecomendacoes(newRespostas, perguntas, genero);
        setResultado(rec);
        setEtapa(ETAPAS.RESULTADO);
      }
    },
    [perguntaAtual, respostas, genero]
  );

  const voltar = useCallback(() => {
    if (perguntaAtual > 0) {
      setPerguntaAtual((p) => p - 1);
    } else {
      setEtapa(ETAPAS.CONTATO);
    }
  }, [perguntaAtual]);

  const recomecar = useCallback(() => {
    setEtapa(ETAPAS.GENERO);
    setGenero(null);
    setContact(null);
    setPerguntaAtual(0);
    setRespostas({});
    setResultado(null);
  }, []);

  const perguntaAtualObj = perguntas[perguntaAtual];
  const respostaAtual = perguntaAtualObj ? respostas[perguntaAtualObj.id] : null;

  return (
    <div className="min-h-screen flex flex-col">
      <header
        className="sticky top-0 z-20 py-4 sm:py-5 px-4 sm:px-6 flex items-center justify-between bg-offwhite/95 backdrop-blur-sm border-b border-graphite/5"
        onClick={(e) => {
          if (e.target.closest("[data-social]")) return;
          window.location.reload();
        }}
      >
        <div className="flex items-center gap-3 cursor-pointer min-w-0">
          <div className="shrink-0">
            <img src="/public/assets/logo_dea_noslogan.PNG" alt="D&A Decants" className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>
          <div className="hidden sm:block min-w-0">
            <span className="font-serif font-bold text-graphite text-lg">D&A Decants</span>
            <span className="block text-[10px] tracking-[0.25em] uppercase text-slate-blue -mt-0.5">
              Luxo e Sofisticação em frascos
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0" data-social>
          {etapa === ETAPAS.QUIZ && (
            <span className="hidden sm:inline text-xs text-slate-blue tracking-widest uppercase mr-1">
              Linha {genero === "masculino" ? "Masculina" : "Feminina"}
            </span>
          )}
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="p-1 rounded-full text-graphite hover:bg-gold/20 hover:text-burgundy transition-colors"
          >
            <Instagram className="w-7 h-7 sm:w-8 sm:h-8" />
          </a>
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="p-1 rounded-full text-graphite hover:bg-green-100 hover:text-green-600 transition-colors"
          >
            <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8" />
          </a>
        </div>
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

          {etapa === ETAPAS.CONTATO && (
            <motion.div
              key="contato"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ContactStep
                onSubmit={handleContactSubmit}
                onSkip={handleContactSkip}
              />
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

              <div className="flex justify-start items-center mt-8 max-w-2xl mx-auto">
                <motion.button
                  onClick={voltar}
                  className="flex items-center gap-1 px-5 py-2.5 rounded-xl text-sm font-medium text-slate-blue hover:text-graphite transition-colors cursor-pointer"
                  whileHover={{ x: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Voltar
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
                contact={contact}
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
