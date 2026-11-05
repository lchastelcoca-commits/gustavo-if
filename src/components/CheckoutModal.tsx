import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, QrCode, FileText, MapPin, ThermometerSnowflake, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderSuccess
}) => {
  const { currentUser, isB2B, createOrder } = useAuth();
  const { items, subtotal, clearCart } = useCart();

  const [deliverySlot, setDeliverySlot] = useState('Janela Manhã (07h às 12h) — Frota Própria Leitche');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit' | 'invoice'>('pix');
  const [pixCopied, setPixCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Address edit state
  const [street, setStreet] = useState(currentUser?.address.street || 'Rua dos Pinheiros');
  const [number, setNumber] = useState(currentUser?.address.number || '820');
  const [neighborhood, setNeighborhood] = useState(currentUser?.address.neighborhood || 'Pinheiros');
  const [city, setCity] = useState(currentUser?.address.city || 'São Paulo');
  const [state, setState] = useState(currentUser?.address.state || 'SP');
  const [zipCode, setZipCode] = useState(currentUser?.address.zipCode || '05422-001');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 150;
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 15.0;
  const discount = isB2B ? subtotal * 0.05 : 0; // 5% adiantamento B2B
  const finalTotal = Math.max(0, subtotal + shippingFee - discount);

  const handleFinishOrder = async () => {
    setLoading(true);
    setTimeout(() => {
      const address = {
        street,
        number,
        neighborhood,
        city,
        state,
        zipCode
      };

      const paymentLabel = paymentMethod === 'pix' 
        ? 'PIX Instantâneo' 
        : paymentMethod === 'credit' 
          ? 'Cartão de Crédito' 
          : 'Boleto Faturado B2B (30 Dias)';

      const order = createOrder(
        items,
        subtotal,
        shippingFee,
        discount,
        finalTotal,
        address,
        deliverySlot,
        paymentLabel
      );

      clearCart();
      setCompletedOrder(order);
      setLoading(false);
    }, 1000);
  };

  const handleCopyPix = () => {
    navigator.clipboard?.writeText('00020126580014br.gov.bcb.pix0136leitche-enterprises-recebimentos@pix.com.br5204000053039865405' + finalTotal.toFixed(2));
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/65 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-800" />
            <h2 className="text-base font-bold text-stone-900">
              {completedOrder ? 'Pedido Confirmado' : 'Agendamento & Checkout da Cadeia Fria'}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar checkout"
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {completedOrder ? (
          /* Order Confirmation View */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-stone-900">
                Pedido #{completedOrder.orderNumber} Registrado!
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                A nota fiscal eletrônica e a rota refrigerada foram atribuídas com sucesso.
              </p>
            </div>

            {/* Cold Chain Receipt Details */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 text-left text-xs space-y-2.5 max-w-md mx-auto">
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Destinatário:</span>
                <span className="font-semibold text-stone-900">{currentUser?.name}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Janela de Entrega:</span>
                <span className="font-semibold text-stone-900">{completedOrder.deliverySlot}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Sensor da Câmara/Baú:</span>
                <span className="font-semibold text-sky-800">{completedOrder.coldLogTemp}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Código de Rastreio Frota:</span>
                <span className="font-mono font-semibold text-stone-900">{completedOrder.trackingCode}</span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-bold text-stone-950">
                <span>Valor Total:</span>
                <span className="font-mono tabular-nums">R$ {completedOrder.total.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={() => {
                  onClose();
                  onOrderSuccess(completedOrder);
                }}
                className="py-3 px-6 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Acompanhar no Meu Painel
              </button>
              <button
                onClick={onClose}
                className="py-3 px-5 text-xs font-medium text-stone-700 bg-white border border-stone-300 hover:bg-stone-50 rounded-xl transition-colors cursor-pointer"
              >
                Voltar à Loja
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Steps */
          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Step 1: Delivery Address Confirmation */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-900 uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-amber-800" />
                <span>1. Endereço de Recebimento Refrigerado</span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div className="col-span-2">
                  <label className="block text-[11px] text-stone-500 mb-0.5">Rua / Avenida</label>
                  <input
                    type="text"
                    value={street}
                    onChange={e => setStreet(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-500 mb-0.5">Número</label>
                  <input
                    type="text"
                    value={number}
                    onChange={e => setNumber(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-500 mb-0.5">Bairro</label>
                  <input
                    type="text"
                    value={neighborhood}
                    onChange={e => setNeighborhood(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-500 mb-0.5">Cidade</label>
                  <input
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-500 mb-0.5">CEP</label>
                  <input
                    type="text"
                    value={zipCode}
                    onChange={e => setZipCode(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Cold Logistics Time Slot */}
            <div className="space-y-3 pt-4 border-t border-stone-100">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-900 uppercase tracking-wider">
                <Clock className="w-4 h-4 text-sky-800" />
                <span>2. Janela de Entrega Refrigerada (Amanhã)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDeliverySlot('Janela Manhã (07h às 12h) — Frota Própria Leitche')}
                  className={`p-3 text-left border rounded-xl text-xs transition-all cursor-pointer ${
                    deliverySlot.includes('Manhã')
                      ? 'border-stone-900 bg-stone-900 text-white'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <div className="font-semibold mb-0.5">Manhã (07h às 12h)</div>
                  <div className={`text-[11px] ${deliverySlot.includes('Manhã') ? 'text-stone-300' : 'text-stone-500'}`}>
                    Ideal para cafés e reposição matinal
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliverySlot('Janela Tarde (13h às 18h) — Frota Própria Leitche')}
                  className={`p-3 text-left border rounded-xl text-xs transition-all cursor-pointer ${
                    deliverySlot.includes('Tarde')
                      ? 'border-stone-900 bg-stone-900 text-white'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <div className="font-semibold mb-0.5">Tarde (13h às 18h)</div>
                  <div className={`text-[11px] ${deliverySlot.includes('Tarde') ? 'text-stone-300' : 'text-stone-500'}`}>
                    Entregas comerciais e residenciais
                  </div>
                </button>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="space-y-3 pt-4 border-t border-stone-100">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-900 uppercase tracking-wider">
                <CreditCard className="w-4 h-4 text-amber-800" />
                <span>3. Forma de Pagamento</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'pix'
                      ? 'border-stone-900 bg-stone-900 text-white'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <QrCode className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs font-semibold block">PIX</span>
                  <span className={`text-[10px] block ${paymentMethod === 'pix' ? 'text-emerald-300' : 'text-emerald-700'}`}>
                    Aprovação Instantânea
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'credit'
                      ? 'border-stone-900 bg-stone-900 text-white'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs font-semibold block">Cartão</span>
                  <span className={`text-[10px] block ${paymentMethod === 'credit' ? 'text-stone-300' : 'text-stone-500'}`}>
                    Até 3x sem juros
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('invoice')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'invoice'
                      ? 'border-stone-900 bg-stone-900 text-white'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <FileText className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs font-semibold block">Boleto B2B</span>
                  <span className={`text-[10px] block ${paymentMethod === 'invoice' ? 'text-stone-300' : 'text-stone-500'}`}>
                    Faturamento 30d
                  </span>
                </button>
              </div>

              {/* Dynamic Payment Details */}
              {paymentMethod === 'pix' && (
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-2">
                  <p className="text-stone-700">
                    Chave PIX (E-mail): <strong>financeiro@leitche.com.br</strong>
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value="00020126580014br.gov.bcb.pix0136leitche-enterprises-recebimentos@pix.com.br"
                      className="flex-1 px-3 py-1.5 bg-white border border-stone-300 rounded-lg font-mono text-[11px] truncate text-stone-600"
                    />
                    <button
                      type="button"
                      onClick={handleCopyPix}
                      className="px-3 py-1.5 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 cursor-pointer"
                    >
                      {pixCopied ? 'Copiado!' : 'Copiar Código'}
                    </button>
                  </div>
                  <p className="text-[10px] text-stone-500">
                    O pagamento é confirmado automaticamente no baú refrigerado no momento do carregamento.
                  </p>
                </div>
              )}

              {paymentMethod === 'credit' && (
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-2.5">
                  <div>
                    <label className="block text-[11px] text-stone-500 mb-0.5">Nome no Cartão</label>
                    <input
                      type="text"
                      placeholder="Nome impresso no cartão"
                      defaultValue={currentUser?.name}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <label className="block text-[11px] text-stone-500 mb-0.5">Número do Cartão</label>
                      <input
                        type="text"
                        placeholder="•••• •••• •••• 4242"
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-stone-500 mb-0.5">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'invoice' && (
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs space-y-1.5 text-amber-950">
                  <div className="font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-800" />
                    Condição Exclusiva Leitche Enterprises B2B
                  </div>
                  <p className="text-[11px]">
                    Boleto bancário emitido contra o documento <strong>{currentUser?.document}</strong> com vencimento para 30 dias após emissão da NF-e com DANFE da câmara fria.
                  </p>
                </div>
              )}
            </div>

            {/* Order Total & Submit */}
            <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
              <div>
                <span className="block text-xs text-stone-500">Valor Final</span>
                <span className="text-xl font-bold font-mono text-stone-900 tabular-nums">
                  R$ {finalTotal.toFixed(2).replace('.', ',')}
                </span>
              </div>

              <button
                type="button"
                onClick={handleFinishOrder}
                disabled={loading}
                className="py-3 px-6 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 disabled:opacity-50 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                {loading ? 'Confirmando Frota...' : 'Confirmar e Agendar Pedido'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
