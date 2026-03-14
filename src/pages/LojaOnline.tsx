import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const WHATSAPP_NUMBER = "5561996165083";

type Product = {
  name: string;
  price: string;
  store: string;
  url: string;
};

const PART_TYPES = [
  { value: "tela", label: "Tela / Display" },
  { value: "bateria", label: "Bateria" },
  { value: "carcaca", label: "Carcaça" },
  { value: "conector-carga", label: "Conector de Carga" },
  { value: "camera", label: "Câmera" },
  { value: "alto-falante", label: "Alto-falante" },
  { value: "outro", label: "Outro" },
];

const LojaOnline = () => {
  const navigate = useNavigate();
  const [partType, setPartType] = useState("");
  const [deviceModel, setDeviceModel] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!partType || !deviceModel.trim()) {
      toast.error("Preencha todos os campos");
      return;
    }

    setLoading(true);
    setProducts([]);
    setSelected(new Set());
    setSearched(true);

    try {
      const { data, error } = await supabase.functions.invoke("search-parts", {
        body: {
          partType: PART_TYPES.find((p) => p.value === partType)?.label || partType,
          deviceModel: deviceModel.trim(),
        },
      });

      if (error) throw error;

      if (data?.results?.length) {
        setProducts(data.results);
      } else {
        toast.info("Nenhum produto encontrado. Tente outro modelo ou peça.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro ao buscar produtos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSelect = (idx: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const sendToWhatsApp = () => {
    if (selected.size === 0) {
      toast.error("Selecione pelo menos um produto");
      return;
    }

    const items = Array.from(selected).map((idx) => {
      const p = products[idx];
      return `• ${p.name} — ${p.price} (${p.store})\n  ${p.url}`;
    });

    const message = [
      `Olá! Tenho interesse nos seguintes produtos:`,
      ``,
      `*Modelo:* ${deviceModel}`,
      `*Peça:* ${PART_TYPES.find((p) => p.value === partType)?.label || partType}`,
      ``,
      ...items,
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border px-8 md:px-16 py-6 flex items-center justify-between">
        <div>
          <span className="font-body text-xs tracking-[4px] text-secondary uppercase font-semibold">
            Concerta+
          </span>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-1">
            Loja Online
          </h1>
        </div>
        <button
          onClick={() => navigate("/")}
          className="font-body text-xs tracking-[2px] text-muted-foreground uppercase hover:text-foreground transition-colors"
        >
          ← Voltar
        </button>
      </div>

      <div className="px-8 md:px-16 lg:px-24 py-12 max-w-5xl">
        {/* Filters */}
        <form onSubmit={handleSearch} className="mb-12">
          <p className="font-body text-xs text-muted-foreground tracking-[3px] uppercase mb-6">
            Buscar peças de reposição
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col gap-2">
              <label className="font-body text-[10px] tracking-[3px] text-primary uppercase font-semibold">
                Tipo de Peça
              </label>
              <div className="flex flex-wrap gap-2">
                {PART_TYPES.map((pt) => (
                  <button
                    key={pt.value}
                    type="button"
                    onClick={() => setPartType(pt.value)}
                    className={`font-body text-[11px] tracking-[2px] uppercase px-4 py-2.5 border transition-colors duration-200 ${
                      partType === pt.value
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    {pt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-body text-[10px] tracking-[3px] text-primary uppercase font-semibold">
                Modelo do Dispositivo
              </label>
              <input
                type="text"
                required
                maxLength={100}
                value={deviceModel}
                onChange={(e) => setDeviceModel(e.target.value)}
                placeholder="Ex: iPhone 14, Samsung S23, Redmi Note 12"
                className="bg-muted border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="border border-primary bg-primary px-10 py-4 font-body text-sm tracking-[3px] text-primary-foreground font-semibold uppercase transition-colors duration-200 hover:bg-transparent hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Buscando..." : "Buscar Peças"}
          </button>
        </form>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center py-16 gap-4">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="font-body text-sm text-muted-foreground tracking-wide">
              Buscando produtos nas melhores lojas...
            </p>
          </div>
        )}

        {/* Results */}
        <AnimatePresence>
          {products.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-foreground">
                    Resultados
                  </h2>
                  <div className="w-10 h-[2px] bg-secondary mt-2" />
                </div>

                {selected.size > 0 && (
                  <button
                    onClick={sendToWhatsApp}
                    className="border border-primary bg-primary px-6 py-3 font-body text-xs tracking-[3px] text-primary-foreground font-semibold uppercase transition-colors duration-200 hover:bg-transparent hover:text-primary"
                  >
                    Enviar {selected.size} {selected.size === 1 ? "item" : "itens"} pelo WhatsApp
                  </button>
                )}
              </div>

              <p className="font-body text-xs text-muted-foreground mb-6">
                Selecione os itens desejados e envie para nosso WhatsApp
              </p>

              <div className="grid gap-4">
                {products.map((product, idx) => {
                  const isSelected = selected.has(idx);
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => toggleSelect(idx)}
                      className={`cursor-pointer border p-5 transition-all duration-200 flex flex-col sm:flex-row sm:items-center gap-4 ${
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {/* Checkbox */}
                      <div
                        className={`w-5 h-5 shrink-0 border-2 flex items-center justify-center transition-colors ${
                          isSelected
                            ? "border-primary bg-primary"
                            : "border-muted-foreground"
                        }`}
                      >
                        {isSelected && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path
                              d="M2 6L5 9L10 3"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="text-primary-foreground"
                            />
                          </svg>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-body text-sm font-semibold text-foreground truncate">
                          {product.name}
                        </h3>
                        <p className="font-body text-xs text-muted-foreground mt-1">
                          {product.store}
                        </p>
                      </div>

                      {/* Price */}
                      <p className="font-heading text-xl font-bold text-primary shrink-0">
                        {product.price}
                      </p>

                      {/* Link */}
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="font-body text-[10px] tracking-[2px] text-secondary uppercase hover:underline shrink-0"
                      >
                        Ver na loja →
                      </a>
                    </motion.div>
                  );
                })}
              </div>

              {/* Floating WhatsApp bar */}
              {selected.size > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-8 py-4 flex items-center justify-between z-50"
                >
                  <p className="font-body text-sm text-foreground">
                    <span className="font-semibold">{selected.size}</span>{" "}
                    {selected.size === 1 ? "item selecionado" : "itens selecionados"}
                  </p>
                  <button
                    onClick={sendToWhatsApp}
                    className="border border-primary bg-primary px-8 py-3 font-body text-sm tracking-[3px] text-primary-foreground font-semibold uppercase transition-colors duration-200 hover:bg-transparent hover:text-primary"
                  >
                    Enviar pelo WhatsApp
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {searched && !loading && products.length === 0 && (
          <div className="text-center py-16">
            <p className="font-body text-sm text-muted-foreground">
              Nenhum produto encontrado. Tente ajustar os filtros.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LojaOnline;
