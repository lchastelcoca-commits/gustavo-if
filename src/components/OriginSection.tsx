import React from 'react';
import { ShieldCheck, HeartHandshake, Leaf, Sparkles } from 'lucide-react';

export const OriginSection: React.FC = () => {
  return (
    <section id="origem" className="py-16 sm:py-24 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-800">
            <span>Nossa Origem & Sustentabilidade</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 text-balance">
            Do solo regenerativo da Mantiqueira às formulações lácteas mais puras do Brasil.
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Acreditamos que a qualidade de um leite nobre e de seus derivados começa na saúde do solo e no bem-estar integral das vacas. Na Leitche Enterprises, combinamos pecuária regenerativa com engenharia de processos lácteos de última geração.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900">Manejo Pasto a Pasto</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Rotação diária de piquetes com capins nativos e leguminosas ricas em trevo, sem uso de agrotóxicos ou fertilizantes sintéticos. O resultado é um perfil lipídico natural rico em Ômega-3 e CLA.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900">Bem-Estar Animal Certificado</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Ordenha voluntária sem estresse, sombra natural e música clássica nas instalações de descanso. Vacas 100% genotipadas A2A2 registradas pela Associação Brasileira de Criadores.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-900 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900">Engenharia Enzimática & Soro</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Aproveitamento integral de subprodutos com extração de lactose pura grau alimentício e proteínas do soro por microfiltração tangencial a frio, reduzindo o desperdício industrial a quase zero.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
