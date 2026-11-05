import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin, Truck } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenAuth: (tab: 'login' | 'register') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection, onOpenAuth }) => {
  return (
    <footer className="bg-stone-950 text-stone-400 py-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-xl font-bold tracking-tight text-white">
              leitche<span className="text-amber-500">.</span>enterprises
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Laticínio nobre e soluções de lactose pura para o mercado gastronômico e industrial. Cadeia 100% refrigerada, rebanhos A2A2 genotipados e rastreabilidade total por lote.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-stone-300">
              <span className="px-2.5 py-1 bg-stone-900 border border-stone-800 rounded font-mono text-[11px]">
                SIF 4410
              </span>
              <span className="px-2.5 py-1 bg-stone-900 border border-stone-800 rounded font-mono text-[11px]">
                MAPA Registro 0089/SP
              </span>
              <span className="px-2.5 py-1 bg-stone-900 border border-stone-800 rounded font-mono text-[11px]">
                Orgânico Brasil
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Catálogo Lácteo
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateSection('catalogo')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Leites A2A2 em Vidro
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('zero-lactose')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Iogurtes Zero Lactose
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('catalogo')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Queijos & Manteigas Artesanais
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('lactose-industrial')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Lactose Pura Microcristalina
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('lactose-industrial')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Proteínas Whey CFM 90%
                </button>
              </li>
            </ul>
          </div>

          {/* Institutional */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Área do Cliente
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onOpenAuth('login')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Acesso à Minha Conta
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Cadastro de Empresa (B2B)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('boas-vindas')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Mensagem do Fundador & CEO
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('rastreabilidade')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Consulta de Lote & Laudos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('origem')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Protocolo de Bem-Estar Animal
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Central de Atendimento
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                <span>0800 782 5348 (LEIT)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                <span>contato@leitche.com.br</span>
              </li>
              <li className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                <span>Entregas Seg a Sáb 07h-18h</span>
              </li>
              <li className="flex items-start gap-2 pt-1 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
                <span>CD Refrigerado Principal: Rodovia Anhanguera, km 48 — Jundiaí/SP</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} leitche.enterprises S.A. Todos os direitos reservados. CNPJ 42.190.288/0001-90.</p>
          <div className="flex items-center gap-6">
            <span>Política de Privacidade</span>
            <span>Termos de Cadeia Fria</span>
            <span>Manual do Comprador B2B</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
