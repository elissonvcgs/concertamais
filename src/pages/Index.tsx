import { motion } from "framer-motion";
import logo from "@/assets/logo-transparent.png";

const WHATSAPP_NUMBER = "5561996165083";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento.`;
const EMAIL = "elissonvictorc@gmail.com";
const STORE_URL = "#";

const actionButtons = [
  { label: "WHATSAPP", href: WHATSAPP_URL },
  { label: "E-MAIL", href: `mailto:${EMAIL}` },
  { label: "LOJA ONLINE", href: STORE_URL },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Column - Identity Anchor */}
      <div className="lg:w-[40%] lg:fixed lg:h-screen flex flex-col justify-center px-8 md:px-16 py-16 lg:py-0 border-r border-border">
        <div className="mb-8">
          <span className="font-body text-xs tracking-[4px] text-secondary uppercase font-semibold">
            Concerta+
          </span>
        </div>

        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-[2px] text-foreground">
          ELISSON
          <br />
          SIQUEIRA
        </h1>

        <div className="mt-6 w-16 h-[2px] bg-primary" />

        <p className="font-body text-sm tracking-[6px] text-primary mt-6 uppercase font-medium">
          Técnico
        </p>

        <p className="font-body text-xs text-muted-foreground mt-10 tracking-wide leading-relaxed max-w-[280px]">
          Atuação exclusiva em Brasília — DF.
          <br />
          Assistência técnica especializada com compromisso, pontualidade e transparência.
        </p>
      </div>

      {/* Right Column - Action & Content */}
      <div className="lg:w-[60%] lg:ml-[40%] flex flex-col">
        {/* Hero with Logo */}
        <div className="relative flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 lg:py-0 min-h-[60vh] overflow-hidden">
          {/* Big logo on the right */}
          <motion.img
            src={logo}
            alt="Concerta+ Logo"
            className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[320px] h-[320px] md:w-[420px] md:h-[420px] lg:w-[500px] lg:h-[500px] object-contain opacity-20 cursor-pointer select-none pointer-events-auto"
            whileHover={{
              filter: [
                "hue-rotate(0deg)",
                "hue-rotate(90deg)",
                "hue-rotate(180deg)",
                "hue-rotate(270deg)",
                "hue-rotate(360deg)",
              ],
              opacity: 0.5,
              scale: 1.05,
            }}
            transition={{
              filter: { duration: 1.5, repeat: Infinity, ease: "linear" },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
            }}
          />

          <div className="relative z-10">
            <p className="font-body text-xs text-muted-foreground tracking-[3px] uppercase mb-12">
              Entre em contato
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {actionButtons.map((btn, i) => (
                <motion.a
                  key={btn.label}
                  href={btn.href}
                  target={btn.label === "WHATSAPP" || btn.label === "LOJA ONLINE" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.5, ease: "easeOut" }}
                  className="group border border-primary px-8 py-5 text-center font-body text-sm tracking-[3px] text-primary font-semibold uppercase transition-colors duration-200 hover:bg-primary hover:text-primary-foreground"
                >
                  {btn.label}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* About Section */}
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
