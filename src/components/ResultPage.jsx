import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  MessageCircle,
  RotateCcw,
  Star,
  Award,
  Sparkles,
  User,
  Mail,
  Phone,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { buildAirtablePayload } from "../data/airtableSchema";

function PerfumeCard({ perfume, destaque = false }) {
  const whatsappMsg = encodeURIComponent(
    `Olá! Vi no quiz da D&A Decants e gostaria de saber mais sobre o decant de ${perfume.nome} (${perfume.marca}). 🧴`
  );
  const whatsappUrl = `https://wa.me/5500000000000?text=${whatsappMsg}`;

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

        {destaque && (
          <div className="flex flex-wrap gap-2 mb-5">
            {Object.entries(perfume.atributos)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 4)
              .map(([attr]) => (
                <span
                  key={attr}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-gold/15 text-graphite capitalize"
                >
                  {attr}
                </span>
              ))}
          </div>
        )}

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
            Decant 5ml
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

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmitLead(e) {
    e.preventDefault();
    if (!email?.trim()) return;
    setError(null);
    setLoading(true);
    try {
      const fields = buildAirtablePayload(
        { nome: nome.trim(), email: email.trim(), telefone: telefone.trim() },
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
      className="w-full max-w-4xl mx-auto"
    >
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

      <div className="mb-8">
        <PerfumeCard perfume={matchPerfeito} destaque />
      </div>

      <div className="mb-8">
        <h3 className="flex items-center gap-2 font-serif text-xl font-bold text-graphite mb-5">
          <Award className="w-5 h-5 text-gold" />
          Outras Opções Para Você
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {outrasOpcoes.map((perfume) => (
            <PerfumeCard key={perfume.id} perfume={perfume} />
          ))}
        </div>
      </div>

      <div className="mb-8 rounded-2xl bg-white shadow-xl border border-graphite/5 overflow-hidden">
        <div className="bg-linear-to-r from-burgundy/90 to-burgundy-light/90 px-6 py-4">
          <h3 className="font-serif text-xl font-bold text-white">
            Receba ofertas e suporte
          </h3>
          <p className="text-white/80 text-sm mt-0.5">
            Deixe seus dados e entramos em contato para o seu decant.
          </p>
        </div>
        <div className="p-6">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 text-graphite rounded-xl bg-gold/10 border border-gold/30 py-4 px-5"
            >
              <CheckCircle className="w-8 h-8 text-gold shrink-0" />
              <div>
                <p className="font-semibold">Dados enviados!</p>
                <p className="text-sm text-slate-blue">
                  Em breve entraremos em contato.
                </p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmitLead} className="space-y-4">
              <div>
                <label
                  htmlFor="lead-nome"
                  className="block text-sm font-medium text-graphite mb-1.5"
                >
                  Nome
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-blue" />
                  <input
                    id="lead-nome"
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-graphite/15 bg-offwhite text-graphite placeholder:text-slate-blue/60 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    autoComplete="name"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="lead-email"
                  className="block text-sm font-medium text-graphite mb-1.5"
                >
                  Email <span className="text-burgundy">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-blue" />
                  <input
                    id="lead-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-graphite/15 bg-offwhite text-graphite placeholder:text-slate-blue/60 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    autoComplete="email"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="lead-telefone"
                  className="block text-sm font-medium text-graphite mb-1.5"
                >
                  Telefone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-blue" />
                  <input
                    id="lead-telefone"
                    type="tel"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-graphite/15 bg-offwhite text-graphite placeholder:text-slate-blue/60 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    autoComplete="tel"
                  />
                </div>
              </div>
              {error && (
                <div className="flex items-center gap-2 text-red-600 text-sm py-1">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={loading || !email?.trim()}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white bg-linear-to-r from-burgundy to-burgundy-light hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                {loading ? (
                  "Enviando..."
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Enviar e salvar meu resultado
                  </>
                )}
              </button>
            </form>
          )}
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
    </motion.div>
  );
}
