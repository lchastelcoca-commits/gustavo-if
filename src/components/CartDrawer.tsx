import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, ThermometerSnowflake, Plus, Minus, ShoppingBag, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface CartDrawerProps {
  onOpenCheckout: () => void;
  onOpenAuthForCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onOpenCheckout,
  onOpenAuthForCheckout
}) => {
  const { items, isOpen, closeCart, updateQuantity, removeItem, clearCart, subtotal, itemCount } = useCart();
  const { isAuthenticated, isB2B } = useAuth();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 150;
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 15.0;
  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const finalTotal = Math.max(0, subtotal + shippingFee - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'LEITCHE10') {
      setAppliedCoupon({ code: 'LEITCHE10', discount: 10.0 });
    } else if (clean === 'FAZENDA15') {
      setAppliedCoupon({ code: 'FAZENDA15', discount: 15.0 });
    } else {
      setCouponError('Cupom inválido. Experimente LEITCHE10');
    }
  };

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      closeCart();
      onOpenAuthForCheckout();
    } else {
      closeCart();
      onOpenCheckout();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        onClick={closeCart}
        className="absolute inset-0 bg-stone-950/50 backdrop-blur-xs transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-stone-900" />
              <h2 className="text-base font-bold text-stone-900">
                Sacola Refrigerada ({itemCount})
              </h2>
            </div>
            <button
              onClick={closeCart}
              aria-label="Fechar sacola"
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free refrigerated shipping indicator */}
          <div className="px-6 py-3 bg-stone-50 border-b border-stone-200/80">
            {subtotal >= FREE_SHIPPING_THRESHOLD ? (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Frete com caixa térmica e gelo seco grátis!</span>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between text-xs text-stone-600 mb-1.5">
                  <span>Entrega refrigerada grátis a partir de R$ 150</span>
                  <span className="font-semibold text-stone-900 font-mono">
                    Faltam R$ {(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-700 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-base font-semibold text-stone-900">Sua sacola está vazia</p>
                <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                  Explore nossos leites orgânicos A2A2, queijos artesanais, linha zero lactose e derivados industriais.
                </p>
              </div>
            ) : (
              items.map(({ product, quantity }) => {
                const itemPrice = isB2B ? product.b2bPrice : product.price;
                return (
                  <div
                    key={product.id}
                    className="flex gap-4 p-3 rounded-xl bg-stone-50/70 border border-stone-200/70"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-18 h-18 rounded-lg object-cover bg-stone-200 shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-semibold text-stone-900 line-clamp-1">
                            {product.name}
                          </h4>
                          <button
                            onClick={() => removeItem(product.id)}
                            className="text-stone-400 hover:text-red-600 p-0.5 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          {product.volumeOrWeight} · {product.temperature}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-200/60">
                        {/* Stepper */}
                        <div className="flex items-center border border-stone-300 rounded-md bg-white">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="p-1 hover:bg-stone-100 text-stone-700 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono font-semibold">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="p-1 hover:bg-stone-100 text-stone-700 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Line total */}
                        <span className="font-mono font-bold text-xs text-stone-900">
                          R$ {(itemPrice * quantity).toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-stone-50/90 space-y-4">
              {/* Cupom */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Cupom (ex: LEITCHE10)"
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg uppercase font-mono"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-semibold text-stone-800 bg-white border border-stone-300 hover:bg-stone-100 rounded-lg cursor-pointer"
                >
                  Aplicar
                </button>
              </form>
              {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}
              {appliedCoupon && (
                <p className="text-[11px] text-emerald-700 font-semibold">
                  Cupom {appliedCoupon.code} aplicado: - R$ {appliedCoupon.discount.toFixed(2).replace('.', ',')}
                </p>
              )}

              {/* Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal produtos lácteos</span>
                  <span className="font-mono tabular-nums text-stone-900 font-medium">
                    R$ {subtotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    <ThermometerSnowflake className="w-3.5 h-3.5 text-sky-700" />
                    Frete refrigerado 3°C
                  </span>
                  <span className="font-mono tabular-nums">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-semibold uppercase text-[10px]">Grátis</span>
                    ) : (
                      `R$ ${shippingFee.toFixed(2).replace('.', ',')}`
                    )}
                  </span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Desconto</span>
                    <span className="font-mono tabular-nums">
                      - R$ {appliedCoupon.discount.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                )}
                <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-bold text-stone-900">
                  <span>Total do Pedido</span>
                  <span className="font-mono tabular-nums text-base">
                    R$ {finalTotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {/* Suspension warning */}
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-red-800">
                  <Lock className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Vendas Suspensas por Tempo Indeterminado</span>
                </div>
                <p className="text-[11px] leading-relaxed text-red-700">
                  Devido ao esgotamento completo de todos os nossos lotes de leite e queijos, o checkout e novos pedidos estão bloqueados temporariamente.
                </p>
              </div>

              {/* Checkout Button (Disabled) */}
              <button
                disabled
                className="w-full py-3.5 px-4 text-xs sm:text-sm font-semibold text-stone-500 bg-stone-200 border border-stone-300 rounded-xl cursor-not-allowed opacity-80 flex items-center justify-center gap-2"
              >
                <span>Compras Indisponíveis (Todos os Produtos Esgotados)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
