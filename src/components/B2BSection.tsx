import React, { useState } from 'react';
import { Building2, Coffee, Cake, Factory, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface B2BSectionProps {
  onOpenAuth: (tab: 'register') => void;
}

export const B2BSection: React.FC<B2BSectionProps> = ({ onOpenAuth }) => {
  const { isAuthenticated, isB2B } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [empresa, setEmpresa] = useState('');
  const [ramo, setRamo] = useState('Cafeteria / Café Especial');
  const [consumo, setConsumo] = useState('50 a 200 litros/semana');
  const [contato, setContato] = useState('');

  const handleB2BQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="lactose-industrial" className="py-16 sm:py-24 bg-stone-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Proposition */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400">
              <Building2 className="w-4 h-4" />
              <span>Divisão Corporativa Leitche.enterprises</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Soluções lácteas sob medida para cafés especiais, confeitarias e indústrias.
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Desenvolvemos produtos com padronização físico-química rigorosa. Seja para vaporização com microespuma sedosa no café expresso, textura estruturada em doces finos ou fornecimento em escala de lactose pura monoidratada.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <Coffee className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Baristas & Cafeterias</h4>
                  <p className="text-xs text-stone-400">
                    Leite integral A2A2 e linha Zero Lactose pasteurizados com equilíbrio perfeito entre proteína e lipídios para latte art duradouro e doçura natural.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Cake className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Confeitaria & Chocolataria</h4>
                  <p className="text-xs text-stone-400">
                    Creme de leite 38% fresco que não talha em reduções e manteiga de primeira maturação com baixo teor de água.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Factory className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Lactose Industrial & Whey CFM</h4>
                  <p className="text-xs text-stone-400">
                    Lactose monoidratada pura 99.8% (malhas 100 e 200 mesh) e proteínas concentradas com laudo analítico por lote para nutrição e massas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive B2B Quote / Registration Box */}
          <div className="lg:col-span-6 bg-stone-800/90 rounded-2xl p-6 sm:p-8 border border-stone-700/80 shadow-xl">
            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 bg-emerald-950 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-800">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white">Solicitação Comercial Recebida</h3>
                <p className="text-xs text-stone-300 max-w-sm mx-auto">
                  Nosso consultor de contas B2B entrará em contato em até 4 horas úteis com a tabela de atacado para <strong>{empresa}</strong>.
                </p>
                {!isAuthenticated && (
                  <button
                    onClick={() => onOpenAuth('register')}
                    className="mt-4 px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-xs rounded-xl cursor-pointer"
                  >
                    Criar Cadastro B2B Completo Agora
                  </button>
                )}
              </div>
            ) : (
              <form onSubmit={handleB2BQuote} className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white">
                    Solicitar Cotação Corporativa & Amostras Técnicas
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Forneça os dados da sua empresa para entrar na fila prioritária de faturamento.
                  </p>
                </div>

                <div className="p-2.5 bg-red-950/70 border border-red-500/50 rounded-lg text-[11px] text-red-200">
                  <strong className="text-white">Aviso:</strong> Nossos tanques e estoques industriais estão com capacidade esgotada. Compras e novos contratos estão suspensos por tempo indeterminado.
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Nome da Empresa / Razão Social
                  </label>
                  <input
                    type="text"
                    required
                    value={empresa}
                    onChange={e => setEmpresa(e.target.value)}
                    placeholder="Ex: Padaria e Confeitaria Artesanal Ltda"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-hidden focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">
                      Segmento de Atuação
                    </label>
                    <select
                      value={ramo}
                      onChange={e => setRamo(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-hidden"
                    >
                      <option>Cafeteria / Café Especial</option>
                      <option>Confeitaria / Panificação</option>
                      <option>Sorveteria Artesanal (Gelato)</option>
                      <option>Indústria Alimentícia / Nutracêutica</option>
                      <option>Restaurante / Hotelaria</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">
                      Volume Estimado
                    </label>
                    <select
                      value={consumo}
                      onChange={e => setConsumo(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-hidden"
                    >
                      <option>Até 50 litros / kg semana</option>
                      <option>50 a 200 litros / kg semana</option>
                      <option>200 a 1.000 litros / kg semana</option>
                      <option>Acima de 1.000 litros (Cargas Fracionadas)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    WhatsApp ou E-mail do Comprador
                  </label>
                  <input
                    type="text"
                    required
                    value={contato}
                    onChange={e => setContato(e.target.value)}
                    placeholder="(11) 98888-0000 ou compras@empresa.com"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-hidden focus:border-amber-400"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 text-xs sm:text-sm font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Receber Tabela de Atacado & Laudos</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-center pt-1">
                  <p className="text-[11px] text-stone-400">
                    Já possui conta jurídica cadastrada?{' '}
                    <button
                      type="button"
                      onClick={() => onOpenAuth('register')}
                      className="text-amber-400 hover:underline cursor-pointer"
                    >
                      Faça login para faturar diretamente
                    </button>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
