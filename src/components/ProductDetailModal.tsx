import React, { useState } from 'react';
import { X, Check, ShoppingBag, ShieldCheck, ThermometerSnowflake, Droplets, MapPin, AlertCircle, Bell } from 'lucide-react';
import { Product } from '../types';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { isB2B } = useAuth();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [waitlistContact, setWaitlistContact] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  if (!product) return null;

  const displayPrice = isB2B ? product.b2bPrice : product.price;

  const handleAdd = () => {
    addItem(product, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/65 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Fechar modal"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-stone-600 hover:text-stone-950 hover:bg-white shadow-xs transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Image Column */}
          <div className="md:col-span-5 bg-gradient-to-br from-stone-100 to-amber-50/40 relative min-h-[260px] md:min-h-full flex items-center justify-center p-6 text-center">
            <div className="text-stone-400 text-xs">
              <span className="font-semibold text-stone-700 block text-sm">{product.name}</span>
              <span className="text-xs text-stone-500 mt-1 block">{product.volumeOrWeight}</span>
            </div>
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center absolute inset-0 z-1"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            {product.badge && (
              <div className="absolute top-4 left-4 bg-stone-900/90 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                {product.badge}
              </div>
            )}
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-stone-900/80 backdrop-blur-md text-white text-xs rounded-xl flex items-center gap-2 z-10">
              <ThermometerSnowflake className="w-4 h-4 text-sky-300 shrink-0" />
              <span>Conserva refrigerada: {product.temperature}</span>
            </div>
          </div>

          {/* Details Column */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between max-h-[80vh] overflow-y-auto">
            <div className="space-y-4">
              {/* Category & Origin */}
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span className="font-semibold text-amber-800 uppercase tracking-wider">{product.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{product.volumeOrWeight}</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold tracking-tight text-stone-900">
                {product.name}
              </h2>

              <p className="text-sm text-stone-600 leading-relaxed">
                {product.description}
              </p>

              {/* Technical badges bar */}
              <div className="grid grid-cols-2 gap-2.5 py-3 border-y border-stone-200">
                <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/60">
                  <span className="block text-[10px] uppercase font-semibold text-stone-500">Teor de Gordura</span>
                  <span className="text-xs font-bold text-stone-900">{product.fatContent}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/60">
                  <span className="block text-[10px] uppercase font-semibold text-stone-500">Lactose</span>
                  <span className="text-xs font-bold text-stone-900">{product.lactoseContent}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/60">
                  <span className="block text-[10px] uppercase font-semibold text-stone-500">Origem & Bacia</span>
                  <span className="text-xs font-medium text-stone-900 truncate block">{product.origin}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/60">
                  <span className="block text-[10px] uppercase font-semibold text-stone-500">Certificação</span>
                  <span className="text-xs font-medium text-stone-900">SIF Inspecionado</span>
                </div>
              </div>

              {/* Nutrition Table */}
              <div>
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                  Tabela Nutricional (Porção de Referência)
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-xs">
                  <div className="p-2 bg-stone-50 rounded-lg border border-stone-200/60">
                    <div className="text-[10px] text-stone-500">Valor Energ.</div>
                    <div className="font-mono font-semibold text-stone-900 mt-0.5">{product.nutrition.calories}</div>
                  </div>
                  <div className="p-2 bg-stone-50 rounded-lg border border-stone-200/60">
                    <div className="text-[10px] text-stone-500">Proteínas</div>
                    <div className="font-mono font-semibold text-stone-900 mt-0.5">{product.nutrition.protein}</div>
                  </div>
                  <div className="p-2 bg-stone-50 rounded-lg border border-stone-200/60">
                    <div className="text-[10px] text-stone-500">Carboidratos</div>
                    <div className="font-mono font-semibold text-stone-900 mt-0.5">{product.nutrition.carbs}</div>
                  </div>
                  <div className="p-2 bg-stone-50 rounded-lg border border-stone-200/60">
                    <div className="text-[10px] text-stone-500">Gorduras</div>
                    <div className="font-mono font-semibold text-stone-900 mt-0.5">{product.nutrition.fat}</div>
                  </div>
                  <div className="p-2 bg-stone-50 rounded-lg border border-stone-200/60">
                    <div className="text-[10px] text-stone-500">Cálcio</div>
                    <div className="font-mono font-semibold text-stone-900 mt-0.5">{product.nutrition.calcium}</div>
                  </div>
                  <div className="p-2 bg-stone-50 rounded-lg border border-stone-200/60">
                    <div className="text-[10px] text-stone-500">Sódio</div>
                    <div className="font-mono font-semibold text-stone-900 mt-0.5">{product.nutrition.sodium}</div>
                  </div>
                </div>
              </div>

              {/* Ingredients */}
              <div>
                <span className="text-xs font-semibold text-stone-900">Ingredientes: </span>
                <span className="text-xs text-stone-600">{product.ingredients.join(', ')}.</span>
              </div>
            </div>

            {/* Price & Out of Stock / Suspension Notice */}
            <div className="mt-8 pt-5 border-t border-stone-200 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-medium text-stone-500">R$</span>
                    <span className="text-2xl font-bold font-mono tabular-nums text-stone-950">
                      {displayPrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  {isB2B && (
                    <span className="text-[11px] text-amber-900 font-semibold block">
                      Valor faturado atacado B2B
                    </span>
                  )}
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-800 text-xs font-semibold rounded-lg border border-red-200">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                  <span>Esgotado por Tempo Indeterminado</span>
                </div>
              </div>

              {/* Suspension Box */}
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200/90 text-xs text-amber-950 space-y-2">
                <div className="font-bold flex items-center gap-1.5 text-amber-900">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Vendas Temporariamente Suspensas</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Todos os lotes deste produto lácteo estão esgotados. Para preservar o rigor artesanal e a segurança biológica das nossas fazendas, as vendas online estão suspensas por tempo indeterminado.
                </p>

                {/* Waitlist simulator */}
                {waitlistSubmitted ? (
                  <div className="p-2 bg-emerald-100/80 border border-emerald-300 text-emerald-900 rounded-lg text-xs font-medium flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Inscrição confirmada na lista de espera! Avisaremos você via WhatsApp/E-mail assim que as ordenhas forem liberadas.</span>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (waitlistContact.trim()) setWaitlistSubmitted(true);
                    }}
                    className="pt-1 flex gap-2"
                  >
                    <input
                      type="text"
                      required
                      placeholder="Seu WhatsApp ou E-mail para a lista de espera"
                      value={waitlistContact}
                      onChange={e => setWaitlistContact(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs bg-white border border-amber-300 rounded-lg text-stone-900"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                    >
                      <Bell className="w-3.5 h-3.5" />
                      <span>Entrar na Fila</span>
                    </button>
                  </form>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  disabled
                  className="w-full py-3 px-4 text-xs sm:text-sm font-semibold text-stone-500 bg-stone-100 border border-stone-300 rounded-xl cursor-not-allowed opacity-80 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-stone-400" />
                  <span>Não é Possível Comprar (Lote Esgotado)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
