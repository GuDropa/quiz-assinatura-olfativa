import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  MessageCircle,
  RotateCcw,
  Star,
  Award,
  Sparkles,
  User,
  Phone,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { buildAirtablePayload, buildContactFields } from "../data/airtableSchema";

function PerfumeCard({ perfume, destaque = false }) {
  const whatsappMsg = encodeURIComponent(
    `Olá! Vi no quiz da D&A Decants e gostaria de saber mais sobre o decant de ${perfume.nome} (${perfume.marca}).`
  );
  const whatsappUrl = `https://wa.me/5542936180888?text=${whatsappMsg}`;
  const notas = perfume.notasPrincipais || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        rounded-2xl overflow-hidden shadow-xl
        ${destaque ? "bg-white ring-2 ring-gold" : "bg-white"}
      `}
    >
      {destaque && (
        <div className="bg-linear-to-r from-burgundy to-burgundy-light text-white text-center py-2 px-4">
          <span className="flex items-center justify-center gap-2 text-sm font-semibold tracking-wider uppercase">
            <Star className="w-4 h-4 text-gold fill-gold" />
            Match Perfeito
            <Star className="w-4 h-4 text-gold fill-gold" />
          </span>
        </div>
      )}

      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={perfume.imagem}
          alt={perfume.nome}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="text-white/70 text-xs uppercase tracking-wider">
            {perfume.marca}
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
            {perfume.nome}
          </h3>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <p className="text-slate-blue text-sm mb-5 leading-relaxed">
          {perfume.descricao}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {notas.map((nota) => (
            <span
              key={nota}
              className="px-3 py-1 text-xs font-medium rounded-full bg-gold/15 text-graphite"
            >
              {nota}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all
              ${
                destaque
                  ? "bg-linear-to-r from-burgundy to-burgundy-light text-white hover:shadow-lg hover:shadow-burgundy/30"
                  : "bg-graphite/10 text-graphite hover:bg-graphite/20"
              }
            `}
          >
            <ShoppingBag className="w-4 h-4" />
            Decant 10ml
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-semibold text-sm bg-green-600 text-white hover:bg-green-700 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function ResultPage({ resultado, respostas = {}, genero, onRestart }) {
  const { matchPerfeito, outrasOpcoes } = resultado;
  const createdRef = useRef(false);

  const [recordId, setRecordId] = useState(null);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const canSubmit = nome?.trim().length > 0 || telefone?.trim().length > 0;

  // Ao abrir o resultado: cria o lead no Airtable (sem contato)
  useEffect(() => {
    if (createdRef.current) return;
    createdRef.current = true;
    const fields = buildAirtablePayload({}, resultado, respostas, genero);
    fetch("/api/save-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields }),
    })
      .then((res) => res.json().catch(() => ({})))
      .then((data) => {
        if (data.id) setRecordId(data.id);
      })
      .catch(() => {});
  }, [resultado, respostas, genero]);

  // Ao preencher o formulário: atualiza o lead existente com PATCH
  async function handleSubmitLead(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setError(null);
    setLoading(true);
    try {
      const contactFields = buildContactFields({ nome: nome.trim(), telefone: telefone.trim() });
      if (recordId) {
        const res = await fetch("/api/save-lead", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ recordId, fields: contactFields }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.message || data.error || "Falha ao atualizar");
      } else {
        // Fallback: se o lead não foi criado no mount, cria com os dados completos
        const fields = buildAirtablePayload(
          { nome: nome.trim(), telefone: telefone.trim() },
          resultado,
          respostas,
          genero
        );
        const res = await fetch("/api/save-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fields }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.message || data.error || "Falha ao enviar");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Não foi possível salvar. Tente de novo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-6xl mx-auto"
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
        {/* Conteúdo principal - order-2 no mobile (form em cima), order-1 no desktop */}
        <div className="flex-1 min-w-0 w-full flex flex-col items-center order-2 lg:order-1">
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 mb-4"
            >
              <Sparkles className="w-8 h-8 text-gold" />
            </motion.div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-graphite mb-3">
              Sua Assinatura Olfativa
            </h2>
            <p className="text-slate-blue max-w-lg mx-auto">
              Baseado nas suas respostas, encontramos a fragrância ideal para você.
            </p>
          </div>

          <div className="mb-8 w-full max-w-2xl">
            <PerfumeCard perfume={matchPerfeito} destaque />
          </div>

          <div className="mb-8 w-full max-w-3xl">
            <h3 className="flex items-center justify-center gap-2 font-serif text-xl font-bold text-graphite mb-5">
              <Award className="w-5 h-5 text-gold" />
              Outras Opções Para Você
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {outrasOpcoes.map((perfume) => (
                <PerfumeCard key={perfume.id} perfume={perfume} />
              ))}
            </div>
          </div>

          <div className="text-center pt-4 pb-8">
            <motion.button
              onClick={onRestart}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border-2 border-graphite/15 text-graphite font-medium hover:border-gold hover:text-burgundy transition-all cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <RotateCcw className="w-4 h-4" />
              Refazer o Quiz
            </motion.button>
          </div>
        </div>

        {/* Formulário - em cima no mobile (order-1), fixo à direita no desktop */}
        <aside className="w-full max-w-md mx-auto lg:mx-0 lg:w-80 lg:fixed lg:right-6 lg:top-24 shrink-0 z-10 order-1 lg:order-2">
          <div className="rounded-2xl bg-white shadow-lg border border-graphite/5 overflow-hidden">
            <div className="px-5 py-5 border-b border-graphite/5 bg-gold/5">
              <h3 className="font-serif text-lg font-bold text-graphite mb-2">
                Entre para o Grupo VIP
              </h3>
              <p className="text-sm text-slate-blue">
                Receba notícias e promoções exclusivas da D&A Decants.
              </p>
            </div>
            <div className="p-5">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 text-graphite rounded-xl bg-gold/10 border border-gold/30 py-4 px-4"
                >
                  <CheckCircle className="w-6 h-6 text-gold shrink-0" />
                  <p className="text-sm">Você entrou no grupo VIP! Em breve você receberá nossas novidades.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmitLead} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-blue" />
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Nome"
                      className="w-full pl-9 pr-3 py-3 rounded-lg border border-graphite/15 bg-offwhite text-graphite text-sm placeholder:text-slate-blue/60 focus:outline-none focus:ring-2 focus:ring-gold/50"
                      autoComplete="name"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-blue" />
                    <input
                      type="tel"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      placeholder="Telefone"
                      className="w-full pl-9 pr-3 py-3 rounded-lg border border-graphite/15 bg-offwhite text-graphite text-sm placeholder:text-slate-blue/60 focus:outline-none focus:ring-2 focus:ring-gold/50"
                      autoComplete="tel"
                    />
                  </div>
                  {error && (
                    <div className="flex items-center gap-2 text-red-600 text-xs">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={loading || !canSubmit}
                    className="w-full flex items-center justify-center gap-1.5 py-3 rounded-lg text-sm font-semibold text-white bg-linear-to-r from-burgundy to-burgundy-light hover:opacity-95 disabled:cursor-not-allowed"
                  >
                    {loading ? "Enviando..." : <><Send className="w-3.5 h-3.5" /> Entrar no Grupo VIP</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}
