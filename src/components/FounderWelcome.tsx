import React from 'react';
import { Sparkles, ArrowRight, UserPlus, LogIn, ShieldCheck, HeartHandshake } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface FounderWelcomeProps {
  onOpenAuth: (tab: 'login' | 'register') => void;
  onExploreCatalog: () => void;
}

export const FounderWelcome: React.FC<FounderWelcomeProps> = ({
  onOpenAuth,
  onExploreCatalog
}) => {
  const { isAuthenticated, currentUser } = useAuth();

  return (
    <section id="boas-vindas" className="py-12 sm:py-16 bg-white border-b border-stone-200/90 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-stone-800 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Founder Photo Column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group">
                {/* Glow ring */}
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-amber-500 via-emerald-500 to-lime-400 rounded-2xl blur-xs opacity-75 group-hover:opacity-100 transition duration-300" />
                
                <div className="relative rounded-2xl overflow-hidden bg-stone-950 border-2 border-white/20 aspect-4/3 sm:aspect-square w-full max-w-sm shadow-2xl">
                  <img
                    src="/assets/aistudio/WhatsApp_Image_2026-11-01_at_21.53.48_2c479c6e.jpeg"
                    alt="Fundador e Proprietário da Leitche.enterprises"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top hover:scale-103 transition-transform duration-500"
                  />
                  
                  {/* Photo Overlay Tag */}
                  <div className="absolute bottom-3 left-3 right-3 bg-stone-950/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white tracking-wide">Dono & Fundador</p>
                      <p className="text-[10px] text-amber-300 font-mono">leitche.enterprises</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-semibold">
                      Comando Geral
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-800 border border-stone-700 text-xs font-semibold text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mensagem de Boas-Vindas do Fundador</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                "Seja muito bem-vindo à Leitche Enterprises! Aqui nossa paixão é levar o leite mais nobre e puro até você."
              </h2>

              <div className="space-y-3 text-stone-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Olá! É uma honra ter você conosco em nosso portal oficial. Criei a <strong>leitche.enterprises</strong> com um propósito muito claro: acabar com a mesmice do mercado lácteo e entregar qualidade máxima em cada produto — desde o leite cru A2A2 e queijos da fazenda até nossa premiada linha 100% Zero Lactose e lactose industrial para empresas.
                </p>
                <p className="text-xs sm:text-sm text-stone-400">
                  Para aproveitar tudo o que preparamos — incluindo compras com frota refrigerada própria, rastreabilidade de lote e nossas tabelas exclusivas de atacado —, <strong>faça seu cadastro ou login agora mesmo</strong>. Nossa equipe está pronta para atender você com o mais alto padrão!
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                {!isAuthenticated ? (
                  <>
                    <button
                      onClick={() => onOpenAuth('register')}
                      className="px-5 py-3 text-xs sm:text-sm font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Cadastre-se Gratuitamente</span>
                    </button>
                    <button
                      onClick={() => onOpenAuth('login')}
                      className="px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Fazer Login</span>
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-stone-800/80 rounded-xl border border-stone-700 text-xs text-stone-200">
                    <HeartHandshake className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      Bem-vindo de volta, <strong>{currentUser?.name}</strong>! Obrigado pela confiança na família Leitche.
                    </span>
                  </div>
                )}

                <button
                  onClick={onExploreCatalog}
                  className="px-4 py-3 text-xs sm:text-sm font-medium text-stone-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Ver Todos os Produtos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trust markers */}
              <div className="pt-4 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-stone-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Compromisso do Dono</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Cadeia Fria Monitorada</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <HeartHandshake className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Atendimento Especial B2B</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
