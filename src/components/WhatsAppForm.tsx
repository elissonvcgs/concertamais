import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "5561996165083";

interface WhatsAppFormProps {
  onClose: () => void;
}

const WhatsAppForm = ({ onClose }: WhatsAppFormProps) => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [modelo, setModelo] = useState("");
  const [defeito, setDefeito] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const sanitize = (str: string) => str.trim().slice(0, 200);
    const sNome = sanitize(nome);
    const sTelefone = sanitize(telefone);
    const sModelo = sanitize(modelo);
    const sDefeito = sanitize(defeito);

    if (!sNome || !sTelefone || !sModelo || !sDefeito) return;

    const message = [
      `Olá, gostaria de solicitar um orçamento.`,
      ``,
      `*Nome:* ${sNome}`,
      `*Telefone:* ${sTelefone}`,
      `*Modelo do aparelho:* ${sModelo}`,
      `*Defeito:* ${sDefeito}`,
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="border-t border-border"
      >
        <form
          onSubmit={handleSubmit}
          className="px-8 md:px-16 lg:px-24 py-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Solicitar Orçamento
              </h2>
              <div className="w-10 h-[2px] bg-secondary mt-2" />
            </div>
            <button
              type="button"
              onClick={onClose}
              className="font-body text-xs tracking-[2px] text-muted-foreground uppercase hover:text-foreground transition-colors"
            >
              Fechar ✕
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-xl">
            <div className="flex flex-col gap-2">
              <label className="font-body text-[10px] tracking-[3px] text-primary uppercase font-semibold">
                Nome Completo
              </label>
              <input
                type="text"
                required
                maxLength={200}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome completo"
                className="bg-muted border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-body text-[10px] tracking-[3px] text-primary uppercase font-semibold">
                Telefone
              </label>
              <input
                type="tel"
                required
                maxLength={20}
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="(61) 99999-9999"
                className="bg-muted border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-body text-[10px] tracking-[3px] text-primary uppercase font-semibold">
                Modelo do Aparelho
              </label>
              <input
                type="text"
                required
                maxLength={200}
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                placeholder="Ex: iPhone 14, Samsung S23"
                className="bg-muted border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2 sm:col-span-2">
              <label className="font-body text-[10px] tracking-[3px] text-primary uppercase font-semibold">
                Qual o Defeito?
              </label>
              <textarea
                required
                maxLength={500}
                rows={3}
                value={defeito}
                onChange={(e) => setDefeito(e.target.value)}
                placeholder="Descreva o problema do seu aparelho..."
                className="bg-muted border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 border border-primary bg-primary px-10 py-4 font-body text-sm tracking-[3px] text-primary-foreground font-semibold uppercase transition-colors duration-200 hover:bg-transparent hover:text-primary"
          >
            Enviar pelo WhatsApp
          </button>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};

export default WhatsAppForm;
