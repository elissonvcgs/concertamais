import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InteractiveCube from "@/components/InteractiveCube";
import WhatsAppForm from "@/components/WhatsAppForm";

const EMAIL = "elissonvictorc@gmail.com";

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Column - Identity Anchor */}
      <div className="lg:w-[40%] lg:fixed lg:h-screen flex flex-col justify-center px-8 md:px-16 py-16 lg:py-0 border-r border-border overflow-y-auto">
        <div className="mb-6">
          <span className="font-body text-xs tracking-[4px] text-secondary uppercase font-semibold">
            Concerta+
          </span>
        </div>

        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-[2px] text-foreground">
          ELISSON
          <br />
          SIQUEIRA
        </h1>

        <div className="mt-5 w-16 h-[2px] bg-primary" />

        <p className="font-body text-sm tracking-[6px] text-primary mt-5 uppercase font-medium">
          Técnico
        </p>

        <p className="font-body text-xs text-muted-foreground mt-6 tracking-wide leading-relaxed max-w-[280px]">
          Atuação exclusiva em Brasília — DF.
          <br />
          Assistência técnica especializada com compromisso, pontualidade e transparência.
        </p>

        {/* Stats */}
        <div className="mt-8 flex gap-8">
          <div>
            <p className="font-heading text-3xl font-bold text-foreground">5+</p>
            <p className="font-body text-[10px] tracking-[2px] text-muted-foreground uppercase">Anos de experiência</p>
          </div>
          <div>
            <p className="font-heading text-3xl font-bold text-foreground">1000+</p>
            <p className="font-body text-[10px] tracking-[2px] text-muted-foreground uppercase">Reparos realizados</p>
          </div>
        </div>

        {/* Specialties */}
        <div className="mt-8 flex flex-wrap gap-2">
          {["Celulares", "Notebooks", "Tablets", "Eletrônicos"].map((tag) => (
            <span
              key={tag}
              className="font-body text-[10px] tracking-[2px] text-primary uppercase border border-border px-3 py-1.5"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="font-body text-[10px] text-muted-foreground mt-8 opacity-50">
          (61) 99616-5083 · elissonvictorc@gmail.com
        </p>
      </div>

      {/* Right Column - Action & Content */}
      <div className="lg:w-[60%] lg:ml-[40%] flex flex-col">
        {/* Hero Section */}
        <div className="relative flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 lg:py-0 min-h-[60vh] overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-[50%] opacity-40">
            <InteractiveCube />
          </div>

          <div className="relative z-10">
            <p className="font-body text-xs text-muted-foreground tracking-[3px] uppercase mb-12">
              Entre em contato
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {[
                { label: "WHATSAPP", onClick: () => setShowForm(true) },
                { label: "E-MAIL", href: `mailto:${EMAIL}` },
                { label: "LOJA ONLINE", href: STORE_URL },
              ].map((btn, i) => (
                <motion.a
                  key={btn.label}
                  href={"href" in btn ? btn.href : undefined}
                  onClick={"onClick" in btn ? (e: React.MouseEvent) => { e.preventDefault(); btn.onClick?.(); } : undefined}
                  target={btn.label === "LOJA ONLINE" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.5, ease: "easeOut" }}
                  className="cursor-pointer border border-primary px-8 py-5 text-center font-body text-sm tracking-[3px] text-primary font-semibold uppercase transition-colors duration-200 hover:bg-primary hover:text-primary-foreground"
                >
                  {btn.label}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* WhatsApp Form */}
        {showForm && (
          <WhatsAppForm onClose={() => setShowForm(false)} />
        )}

        {/* Services Section */}
        <div className="px-8 md:px-16 lg:px-24 py-20 border-t border-border">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-2">
            Serviços
          </h2>
          <div className="w-10 h-[2px] bg-secondary mb-8" />

          <div className="grid sm:grid-cols-2 gap-8">
            {[
              { title: "Manutenção Preventiva", desc: "Diagnóstico completo e manutenção para evitar falhas futuras em seus equipamentos." },
              { title: "Reparo Especializado", desc: "Conserto de equipamentos eletrônicos, eletrodomésticos e dispositivos com peças de qualidade." },
              { title: "Atendimento Rápido", desc: "Agilidade no atendimento com deslocamento até o local em Brasília e região." },
              { title: "Orçamento Gratuito", desc: "Avaliação sem compromisso. Você só paga se aprovar o serviço." },
            ].map((item) => (
              <div key={item.title} className="border-l-2 border-border pl-6">
                <h3 className="font-body text-xs tracking-[3px] text-primary uppercase font-semibold mb-3">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Location Section */}
        <div className="px-8 md:px-16 lg:px-24 py-16 border-t border-border">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-secondary" />
            <p className="font-body text-xs tracking-[3px] text-muted-foreground uppercase">
              Brasília — Distrito Federal
            </p>
          </div>
          <p className="font-body text-xs text-muted-foreground mt-4 opacity-60">
            (61) 99616-5083 · elissonvictorc@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
