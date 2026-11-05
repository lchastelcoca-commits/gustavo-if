import React from 'react';
import { Sparkles, ArrowRight, UserPlus, LogIn, ShieldCheck, HeartHandshake, ThermometerSnowflake, Truck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface FounderWelcomeProps {
  onOpenAuth: (tab: 'login' | 'register') => void;
  onExploreCatalog: () => void;
}

export const FounderWelcome: React.FC<FounderWelcomeProps> = ({
  onOpenAuth,
  onExploreCatalog
}) => {
  const { isAuthenticated, currentUser, isB2B } = useAuth();

  return (
    <section id="boas-vindas" className="relative overflow-hidden bg-stone-900 text-white pt-8 pb-14 sm:pt-12 sm:pb-20 border-b border-stone-800">
      {/* Subtle organic light reflections */}
      <div className="absolute top-0 right-1/4 -mt-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -mb-24 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Founder Photo Column — The First Visual Anchor of the Site */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <div className="relative group w-full max-w-md">
              {/* Outer glow ring */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500 via-emerald-500 to-lime-400 rounded-3xl blur-md opacity-80 group-hover:opacity-100 transition duration-300" />
              
              <div className="relative rounded-2xl overflow-hidden bg-stone-950 border-2 border-white/20 aspect-4/3 sm:aspect-square w-full shadow-2xl">
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-11-01_at_21.53.48_2c479c6e.jpeg"
                  alt="Dono e Fundador da Leitche Enterprises"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />
                
                {/* Photo Badge Lockup */}
                <div className="absolute bottom-4 left-4 right-4 bg-stone-900/90 backdrop-blur-md px-4 py-3 rounded-xl border border-white/15 flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-white tracking-wide">Dono & Fundador</p>
                    <p className="text-[11px] text-amber-300 font-mono font-medium">leitche.enterprises</p>
                  </div>
                  <span className="text-[11px] px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-semibold uppercase tracking-wider">
                    Comando Geral
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Message & Welcome Column */}
          <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-800/90 border border-stone-700 text-xs font-semibold text-amber-400 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Boas-Vindas Oficiais da Direção</span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span className="text-stone-300">leitche.enterprises</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.12] text-balance">
              "Seja muito bem-vindo à Leitche Enterprises! Aqui nossa paixão é levar o leite mais nobre e puro até você."
            </h1>

            <div className="space-y-3.5 text-stone-300 text-sm sm:text-base leading-relaxed">
              <p>
                Olá! É um grande prazer receber você no portal da <strong>leitche.enterprises</strong>. Como fundador, criei esta empresa com um compromisso inegociável de qualidade e pureza máxima em leites A2A2, queijos artesanais, linha Zero Lactose e insumos industriais.
              </p>
              
              {/* Highlighted Notice from Founder */}
              <div className="p-3.5 bg-red-950/80 border border-red-500/60 rounded-xl text-xs sm:text-sm text-red-200 space-y-1.5">
                <div className="font-bold text-red-300 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                  <span>AVISO IMPORTANTE: TODOS OS PRODUTOS ESTÃO ESGOTADOS</span>
                </div>
                <p className="text-xs text-red-200/90 leading-relaxed">
                  Informamos a todos os clientes e parceiros que <strong>não será possível realizar compras por tempo indeterminado</strong>. Devido à altíssima procura e para preservar o processo de ordenha e cura tradicional das nossas bacias parceiras, nossa capacidade está 100% esgotada.
                </p>
              </div>

              <p className="text-xs sm:text-sm text-stone-400">
                Você ainda pode <strong>criar seu cadastro ou fazer login</strong> para garantir prioridade na fila de espera, consultar laudos microbiológicos e acompanhar os lotes da fazenda.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => onOpenAuth('register')}
                    className="px-6 py-3.5 text-xs sm:text-sm font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Cadastre-se Gratuitamente</span>
                  </button>
                  <button
                    onClick={() => onOpenAuth('login')}
                    className="px-5 py-3.5 text-xs sm:text-sm font-semibold text-white bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Fazer Login</span>
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2.5 p-3.5 bg-stone-800/90 rounded-xl border border-stone-700 text-xs text-stone-200">
                  <HeartHandshake className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    Que bom ter você de volta, <strong>{currentUser?.name}</strong>!
                    {isB2B ? ' Sua tabela de atacado está ativa.' : ' Sua conta VIP está pronta para novos pedidos.'}
                  </span>
                </div>
              )}

              <button
                onClick={onExploreCatalog}
                className="px-5 py-3.5 text-xs sm:text-sm font-medium text-stone-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Conhecer Catálogo & Produtos</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Micro trust indicators */}
            <div className="pt-4 border-t border-stone-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Garantia do Dono</span>
              </div>
              <div className="flex items-center gap-2">
                <ThermometerSnowflake className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Cadeia Fria 3°C</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Frota Dedicada</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-lime-400 shrink-0" />
                <span>Lotes Rastreáveis</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
