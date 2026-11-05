import React, { useState } from 'react';
import { X, Check, ShoppingBag, ShieldCheck, ThermometerSnowflake, Droplets, MapPin } from 'lucide-react';
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
          <div className="md:col-span-5 bg-stone-100 relative min-h-[260px] md:min-h-full">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            {product.badge && (
              <div className="absolute top-4 left-4 bg-stone-900/90 text-white text-xs font-semibold px-3 py-1 rounded-md">
                {product.badge}
              </div>
            )}
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-stone-900/80 backdrop-blur-md text-white text-xs rounded-xl flex items-center gap-2">
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

            {/* Price & Add to Cart Module */}
            <div className="mt-8 pt-5 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm font-medium text-stone-500">R$</span>
                  <span className="text-2xl font-bold font-mono tabular-nums text-stone-950">
                    {(displayPrice * quantity).toFixed(2).replace('.', ',')}
                  </span>
                </div>
                {isB2B && (
                  <span className="text-[11px] text-amber-900 font-semibold">
                    Valor faturado atacado B2B
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                {/* Stepper */}
                <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50 p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 flex items-center justify-center text-stone-700 hover:bg-stone-200 rounded text-sm font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-mono font-semibold text-sm">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center text-stone-700 hover:bg-stone-200 rounded text-sm font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Adicionado!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Adicionar ao Pedido</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
