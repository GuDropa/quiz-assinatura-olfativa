import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, ArrowRight } from "lucide-react";

export default function ContactStep({ onSubmit, onSkip }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const canSubmit = email?.trim().length > 0;

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit({
      nome: nome.trim(),
      email: email.trim(),
      telefone: telefone.trim(),
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-graphite mb-2">
          Antes de começar
        </h2>
        <p className="text-slate-blue text-sm sm:text-base">
          Deixe seu contato para receber seu resultado e ofertas exclusivas.
        </p>
      </div>

      <div className="rounded-2xl bg-white shadow-xl border border-graphite/5 overflow-hidden">
        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="contact-nome"
                className="block text-sm font-medium text-graphite mb-1.5"
              >
                Nome
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-blue" />
                <input
                  id="contact-nome"
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
                htmlFor="contact-email"
                className="block text-sm font-medium text-graphite mb-1.5"
              >
                Email <span className="text-burgundy">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-blue" />
                <input
                  id="contact-email"
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
                htmlFor="contact-telefone"
                className="block text-sm font-medium text-graphite mb-1.5"
              >
                Telefone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-blue" />
                <input
                  id="contact-telefone"
                  type="tel"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="(11) 99999-9999"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-graphite/15 bg-offwhite text-graphite placeholder:text-slate-blue/60 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                  autoComplete="tel"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white bg-linear-to-r from-burgundy to-burgundy-light hover:opacity-95 disabled:cursor-not-allowed transition-opacity cursor-pointer"
            >
              Iniciar quiz
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <button
            type="button"
            onClick={onSkip}
            className="w-full mt-4 py-2 text-xs text-slate-blue/30 hover:text-slate-blue/60 transition-colors underline underline-offset-2"
          >
            Pular e continuar sem informar
          </button>
        </div>
      </div>
    </motion.div>
  );
}
