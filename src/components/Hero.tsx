import React from 'react';
import { ArrowRight, ThermometerSnowflake, ShieldCheck, Truck, Sparkles, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeroProps {
  onExploreCatalog: () => void;
  onOpenAuth: (tab: 'login' | 'register') => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog, onOpenAuth }) => {
  const { isAuthenticated, currentUser, isB2B } = useAuth();

  return (
    <section id="hero" className="relative overflow-hidden bg-stone-50 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Brand Statement & Route into Collection */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-800">
              <span>Laticínio de Precisão & Origem Controlada</span>
              <span aria-hidden="true">·</span>
              <span>Desde 1928</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-[1.12] text-balance">
              Pureza láctea do pasto regenerativo à alta gastronomia e indústria.
            </h2>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
              A <strong>leitche.enterprises</strong> fornece leites nobres com certificação A2A2, queijos artesanais de maturação lenta, derivados 100% zero lactose e lactose pura microcristalina para confeitaria e formulação industrial.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreCatalog}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Explorar Coleção Láctea</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {!isAuthenticated ? (
                <button
                  onClick={() => onOpenAuth('register')}
                  className="px-5 py-3.5 text-sm font-medium text-stone-800 bg-white hover:bg-stone-100 border border-stone-300 rounded-xl shadow-2xs transition-colors cursor-pointer"
                >
                  Cadastrar Empresa ou Cliente
                </button>
              ) : (
                <div className="py-2 px-3 text-xs text-stone-700 bg-stone-100/90 rounded-lg border border-stone-200">
                  Olá, <span className="font-semibold text-stone-900">{currentUser?.name}</span>
                  {isB2B && ' · Faturamento & Tabela Atacado Desbloqueados'}
                </div>
              )}
            </div>

            {/* Micro trust indicators */}
            <div className="pt-4 flex items-center gap-6 text-xs text-stone-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-800" />
                SIF Federal 4410
              </span>
              <span className="flex items-center gap-1.5">
                <ThermometerSnowflake className="w-4 h-4 text-sky-800" />
                Cadeia Fria 3°C
              </span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-800" />
                Frota Dedicada SP/RJ/MG
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual Anchor */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-200/90 aspect-16/10 lg:aspect-4/3 bg-stone-100">
              <img
                src="/images/products/hero_dairy_leitche.jpg"
                alt="Garrafa de leite orgânico e jarra cerâmica da Leitche Enterprises sobre bancada de pedra natural"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-stone-950/10 to-transparent pointer-events-none" />
              
              {/* Overlay note */}
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs p-3 bg-stone-900/75 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">Leite Orgânico Fresco e Derivados Puros</p>
                  <p className="text-stone-300 text-[11px]">Envasado a frio em até 6 horas após a ordenha matinal</p>
                </div>
                <span className="font-mono text-amber-300 text-xs font-medium">Lote #2026-A2</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Trust Strip (placed below hero split per §3 / §13 spatial rules) */}
        <div className="mt-14 pt-10 border-t border-stone-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1">
              Genótipo A2A2
            </div>
            <div className="text-sm font-semibold text-stone-900">100% Digestão Leve</div>
            <p className="text-xs text-stone-500 mt-1 leading-normal">
              Sem beta-caseína A1 inflamatória, comprovado por sequenciamento genético do rebanho.
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1">
              Cadeia Fria 3°C
            </div>
            <div className="text-sm font-semibold text-stone-900">Sensores IoT em Tempo Real</div>
            <p className="text-xs text-stone-500 mt-1 leading-normal">
              Do tanque de resfriamento da fazenda até o baú frigorífico de entrega na sua porta.
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1">
              Zero Lactose Real
            </div>
            <div className="text-sm font-semibold text-stone-900">Quebra Enzimática Certificada</div>
            <p className="text-xs text-stone-500 mt-1 leading-normal">
              Processo enzimático com lactase grau farmacêutico que elimina 100% do desconforto.
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1">
              Portal B2B & Atacado
            </div>
            <div className="text-sm font-semibold text-stone-900">Faturamento 30 Dias</div>
            <p className="text-xs text-stone-500 mt-1 leading-normal">
              Condições corporativas para cafés de especialidade, confeitarias e indústrias.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
