import React, { useState } from 'react';
import { Search, ShieldCheck, ThermometerSnowflake, MapPin, Calendar, Award, CheckCircle2 } from 'lucide-react';
import { TRACEABILITY_LOTS } from '../data/products';
import { TraceabilityLot } from '../types';

export const TraceabilitySection: React.FC = () => {
  const [selectedLot, setSelectedLot] = useState<TraceabilityLot>(TRACEABILITY_LOTS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError('');
    const found = TRACEABILITY_LOTS.find(l => 
      l.lotNumber.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      l.productName.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );

    if (found) {
      setSelectedLot(found);
    } else {
      setSearchError('Lote não localizado no banco de registros. Experimente os lotes em destaque abaixo.');
    }
  };

  return (
    <section id="rastreabilidade" className="py-16 sm:py-20 bg-stone-100/70 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-2">
            Rastreabilidade Ponta a Ponta
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 text-balance">
            Consulte o laudo microbiológico e a origem exata do seu lote de leite.
          </h2>
          <p className="text-sm text-stone-600 mt-2 leading-relaxed">
            Cada garrafa e embalagem industrial da Leitche Enterprises possui um código de lote gravado a laser. Verifique a hora da ordenha, a fazenda parceira e a temperatura contínua da câmara.
          </p>
        </div>

        {/* Search & Lot Selector */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Digite o código do lote (ex: LT-2026-A2-094)"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-hidden focus:border-stone-900 font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors cursor-pointer"
            >
              Consultar Laudo
            </button>
          </form>

          {searchError && (
            <p className="text-xs text-red-600 mt-2 font-medium">{searchError}</p>
          )}

          {/* Quick Buttons for Sample Lots */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-stone-500">Lotes auditados recentes:</span>
            {TRACEABILITY_LOTS.map(lot => (
              <button
                key={lot.lotNumber}
                type="button"
                onClick={() => {
                  setSelectedLot(lot);
                  setSearchError('');
                }}
                className={`py-1 px-2.5 text-xs rounded-lg font-mono transition-colors cursor-pointer ${
                  selectedLot.lotNumber === lot.lotNumber
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {lot.lotNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Active Lot Inspection Card */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg sm:text-xl font-bold text-stone-900">
                  {selectedLot.lotNumber}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Laudo Aprovado
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 font-medium mt-1">
                {selectedLot.productName}
              </p>
            </div>

            <div className="text-xs sm:text-right text-stone-500">
              <span className="block">Data e Hora de Extração / Envasamento:</span>
              <span className="font-semibold text-stone-900 font-mono">{selectedLot.harvestDate}</span>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/60">
              <div className="flex items-center gap-2 text-stone-500 text-xs mb-1">
                <MapPin className="w-4 h-4 text-amber-800" />
                <span>Fazenda & Bacia</span>
              </div>
              <div className="font-semibold text-stone-900 text-xs sm:text-sm">{selectedLot.farm}</div>
              <div className="text-[11px] text-stone-500 mt-0.5">{selectedLot.location}</div>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/60">
              <div className="flex items-center gap-2 text-stone-500 text-xs mb-1">
                <Award className="w-4 h-4 text-amber-800" />
                <span>Rebanho & Genótipo</span>
              </div>
              <div className="font-semibold text-stone-900 text-xs sm:text-sm">{selectedLot.herdType}</div>
              <div className="text-[11px] text-stone-500 mt-0.5">Alimentação a pasto regenerativo</div>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/60">
              <div className="flex items-center gap-2 text-stone-500 text-xs mb-1">
                <ThermometerSnowflake className="w-4 h-4 text-sky-800" />
                <span>Cadeia Fria Monitorada</span>
              </div>
              <div className="font-semibold text-sky-950 font-mono text-xs sm:text-sm">{selectedLot.coldChainAverage}</div>
              <div className="text-[11px] text-stone-500 mt-0.5">Telemetria IoT sem interrupção</div>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/60">
              <div className="flex items-center gap-2 text-stone-500 text-xs mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-800" />
                <span>Análise de Sólidos</span>
              </div>
              <div className="font-semibold text-stone-900 font-mono text-xs sm:text-sm">
                Gordura: {selectedLot.fatScore} · Prot: {selectedLot.proteinScore}
              </div>
              <div className="text-[11px] text-emerald-700 mt-0.5 font-medium">{selectedLot.microbiologyStatus}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
