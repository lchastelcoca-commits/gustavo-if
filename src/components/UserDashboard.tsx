import React, { useState } from 'react';
import { User, Order, UserAddress } from '../types';
import { useAuth } from '../context/AuthContext';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Package, 
  ThermometerSnowflake, 
  Truck, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  FileText, 
  LogOut, 
  Edit3,
  Save,
  X
} from 'lucide-react';

interface UserDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ isOpen, onClose }) => {
  const { currentUser, orders, logout, updateProfile, isB2B } = useAuth();
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'b2b' | 'subscription'>('orders');
  
  // Edit profile form state
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '');
  const [editStreet, setEditStreet] = useState(currentUser?.address.street || '');
  const [editNumber, setEditNumber] = useState(currentUser?.address.number || '');
  const [editComplement, setEditComplement] = useState(currentUser?.address.complement || '');
  const [editNeighborhood, setEditNeighborhood] = useState(currentUser?.address.neighborhood || '');
  const [editCity, setEditCity] = useState(currentUser?.address.city || '');
  const [editZipCode, setEditZipCode] = useState(currentUser?.address.zipCode || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen || !currentUser) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedAddress: UserAddress = {
      street: editStreet,
      number: editNumber,
      complement: editComplement,
      neighborhood: editNeighborhood,
      city: editCity,
      state: currentUser.address.state || 'SP',
      zipCode: editZipCode
    };

    updateProfile({
      name: editName,
      phone: editPhone,
      address: updatedAddress
    });

    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'received':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            <Clock className="w-3 h-3" />
            Em Separação Câmara Fria
          </span>
        );
      case 'in_transit':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800">
            <Truck className="w-3 h-3" />
            Em Rota Refrigerada
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3 h-3" />
            Entregue & Certificado
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-800">
            Processando
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/65 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6 flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="p-6 bg-stone-900 text-white flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-700/80 text-white flex items-center justify-center text-lg font-bold">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">{currentUser.name}</h2>
                <span className="text-[11px] font-mono px-2 py-0.5 bg-stone-800 text-amber-300 rounded border border-stone-700">
                  {isB2B ? 'Conta B2B Corporativa' : 'Consumidor VIP'}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                {currentUser.email} · Documento: {currentUser.document}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="py-1.5 px-3 text-xs font-medium text-stone-300 hover:text-white hover:bg-stone-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              <span>Sair da Conta</span>
            </button>
            <button
              onClick={onClose}
              aria-label="Fechar painel"
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-3 border-b border-stone-200 bg-stone-50 flex gap-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Pedidos & Entregas Refrigeradas ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Dados Cadastrais & Endereço
          </button>
          {isB2B && (
            <button
              onClick={() => setActiveTab('b2b')}
              className={`pb-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'b2b'
                  ? 'border-stone-900 text-stone-900'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Condições & Tabela Atacado
            </button>
          )}
          <button
            onClick={() => setActiveTab('subscription')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'subscription'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Clube Leitche (Assinatura Semanal)
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {saveSuccess && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Dados atualizados com sucesso no sistema da frota!</span>
            </div>
          )}

          {/* TAB 1: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="py-12 text-center">
                  <Package className="w-10 h-10 text-stone-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-stone-900">Nenhum pedido realizado ainda</p>
                  <p className="text-xs text-stone-500 mt-1">
                    Adicione leites especiais ou queijos à sua sacola para agendar a primeira entrega.
                  </p>
                </div>
              ) : (
                orders.map(order => (
                  <div
                    key={order.id}
                    className="p-5 rounded-xl bg-stone-50 border border-stone-200/90 space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/80 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-stone-900 font-mono">
                            Pedido #{order.orderNumber}
                          </span>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-xs text-stone-500 mt-0.5">
                          {order.date} · Pagamento: {order.paymentMethod}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-stone-500 block">Total faturado</span>
                        <span className="text-base font-bold font-mono tabular-nums text-stone-900">
                          R$ {order.total.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>

                    {/* Cold Chain Sensor & Tracking */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white p-3 rounded-lg border border-stone-200/60">
                      <div className="flex items-center gap-2 text-stone-700">
                        <ThermometerSnowflake className="w-4 h-4 text-sky-700 shrink-0" />
                        <div>
                          <span className="text-stone-500 block text-[10px]">Sensor Térmico da Frota:</span>
                          <span className="font-mono font-semibold text-sky-950">{order.coldLogTemp}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-stone-700">
                        <Truck className="w-4 h-4 text-amber-700 shrink-0" />
                        <div>
                          <span className="text-stone-500 block text-[10px]">Janela Agendada:</span>
                          <span className="font-medium text-stone-900 truncate block">{order.deliverySlot}</span>
                        </div>
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                        Itens do Lote
                      </span>
                      <div className="divide-y divide-stone-200/60 bg-white rounded-lg border border-stone-200/60 px-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="py-2 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-stone-400 font-bold">{item.quantity}x</span>
                              <span className="text-stone-800 font-medium">{item.product.name}</span>
                              <span className="text-[11px] text-stone-500">({item.product.volumeOrWeight})</span>
                            </div>
                            <span className="font-mono font-semibold text-stone-900">
                              R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: PROFILE & ADDRESS */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-stone-900">Endereço de Recebimento & Contatos</h3>
                  <p className="text-xs text-stone-500">
                    Utilizado pelos motoristas da frota refrigerada Leitche para descarga com caixa térmica.
                  </p>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="py-1.5 px-3 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Editar Dados</span>
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSaveProfile} className="space-y-4 bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Nome Completo</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">WhatsApp / Telefone</label>
                      <input
                        type="text"
                        value={editPhone}
                        onChange={e => setEditPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label className="block text-xs font-medium text-stone-700 mb-1">Logradouro</label>
                      <input
                        type="text"
                        value={editStreet}
                        onChange={e => setEditStreet(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Número</label>
                      <input
                        type="text"
                        value={editNumber}
                        onChange={e => setEditNumber(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Complemento</label>
                      <input
                        type="text"
                        value={editComplement}
                        onChange={e => setEditComplement(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Bairro</label>
                      <input
                        type="text"
                        value={editNeighborhood}
                        onChange={e => setEditNeighborhood(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">CEP</label>
                      <input
                        type="text"
                        value={editZipCode}
                        onChange={e => setEditZipCode(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="py-2 px-4 text-xs font-semibold text-white bg-stone-900 rounded-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Salvar Alterações</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="py-2 px-4 text-xs font-medium text-stone-600 bg-white border border-stone-300 rounded-lg cursor-pointer"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-stone-500 block">Endereço de Entrega:</span>
                      <p className="font-semibold text-stone-900 mt-0.5">
                        {currentUser.address.street}, {currentUser.address.number}
                        {currentUser.address.complement && ` (${currentUser.address.complement})`}
                      </p>
                      <p className="text-stone-600">
                        {currentUser.address.neighborhood} — {currentUser.address.city}/{currentUser.address.state}
                      </p>
                      <p className="font-mono text-stone-500">CEP: {currentUser.address.zipCode}</p>
                    </div>

                    <div>
                      <span className="text-stone-500 block">Contatos Registrados:</span>
                      <p className="font-semibold text-stone-900 mt-0.5">{currentUser.phone}</p>
                      <p className="text-stone-600">{currentUser.email}</p>
                      <p className="text-stone-500 mt-1 font-mono">
                        Documento: {currentUser.document}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: B2B CONDITIONS */}
          {activeTab === 'b2b' && isB2B && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <Building2 className="w-4 h-4" />
                  <span>Conta Corporativa Ativada: {currentUser.companyName || currentUser.name}</span>
                </div>
                <p>
                  Sua empresa possui acesso direto à tabela de atacado com faturamento via boleto em 30 dias e entrega programada por lote.
                </p>
              </div>

              <div className="border border-stone-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-100 text-stone-700 font-semibold border-b border-stone-200">
                    <tr>
                      <th className="py-2.5 px-3">Linha de Produto</th>
                      <th className="py-2.5 px-3">Pedido Mínimo</th>
                      <th className="py-2.5 px-3">Desconto Médio</th>
                      <th className="py-2.5 px-3">Faturamento</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-800">
                    <tr>
                      <td className="py-2.5 px-3 font-medium">Leites Pasteurizados A2A2 (Garrafas 1L)</td>
                      <td className="py-2.5 px-3 font-mono">12 garrafas</td>
                      <td className="py-2.5 px-3 text-emerald-700 font-semibold">-30% vs Varejo</td>
                      <td className="py-2.5 px-3">Boleto 30 dias</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-medium">Creme de Leite Fresco 38% para Chantilly</td>
                      <td className="py-2.5 px-3 font-mono">12 garrafas</td>
                      <td className="py-2.5 px-3 text-emerald-700 font-semibold">-28% vs Varejo</td>
                      <td className="py-2.5 px-3">Boleto 30 dias</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-medium">Lactose Pura Microcristalina (Grau Alimentício)</td>
                      <td className="py-2.5 px-3 font-mono">Saca 25kg / 5kg</td>
                      <td className="py-2.5 px-3 text-emerald-700 font-semibold">-32% vs Varejo</td>
                      <td className="py-2.5 px-3">Boleto 30/60 dias</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-3 bg-stone-50 rounded-lg text-xs text-stone-600 flex items-center justify-between">
                <span>Dúvidas comerciais ou cotações personalizadas de soro/lactose:</span>
                <span className="font-semibold text-stone-900 font-mono">b2b@leitche.com.br</span>
              </div>
            </div>
          )}

          {/* TAB 4: SUBSCRIPTION (CLUBE LEITCHE) */}
          {activeTab === 'subscription' && (
            <div className="space-y-4">
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-2">
                <h4 className="font-bold text-stone-900">Clube Leitche — Entrega Semanal Recorrente</h4>
                <p className="text-stone-600 leading-relaxed">
                  Receba leites frescos A2A2 e queijos todas as terças ou sextas-feiras na sua porta, sem precisar refazer pedidos manualmente. Garrafas de vidro são trocadas na entrega com higienização estéril.
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <span className="font-semibold text-emerald-700">10% de desconto adicional na recorrência</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-stone-500">Sem taxa de adesão ou fidelidade</span>
                </div>
              </div>

              <div className="p-4 border border-stone-200 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-stone-900 block">Status da Assinatura:</span>
                  <span className="text-stone-500">Pronto para ativar com base no seu endereço cadastrado.</span>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Assinatura recorrente solicitada! Nosso consultor da frota entrará em contato via WhatsApp para confirmar o dia fixo da semana.')}
                  className="py-2 px-4 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg cursor-pointer"
                >
                  Ativar Assinatura Semanal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
