import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { PRODUCTS } from './data/products';
import { Product, ProductCategory, Order } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { UserDashboard } from './components/UserDashboard';
import { AuthModal } from './components/AuthModal';
import { TraceabilitySection } from './components/TraceabilitySection';
import { B2BSection } from './components/B2BSection';
import { OriginSection } from './components/OriginSection';
import { FounderWelcome } from './components/FounderWelcome';
import { Footer } from './components/Footer';
import { Search, Sparkles, Filter, Building2, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

const MainContent: React.FC = () => {
  const { isAuthenticated, currentUser, isB2B } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState<'login' | 'register'>('login');
  const [authRedirectMessage, setAuthRedirectMessage] = useState('');
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Catalog filters
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const openAuth = (tab: 'login' | 'register' = 'login', message: string = '') => {
    setAuthInitialTab(tab);
    setAuthRedirectMessage(message);
    setAuthModalOpen(true);
  };

  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'boas-vindas' || sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'zero-lactose') {
      setSelectedCategory('zero_lactose');
      const el = document.getElementById('catalogo');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (sectionId === 'catalogo') {
      setSelectedCategory('all');
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered products list
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesQuery = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.origin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-amber-200">
      {/* Top Banner for Account/Order Notification */}
      <div className="bg-stone-950 text-stone-300 px-4 py-2 text-center text-xs border-b border-stone-800 flex items-center justify-center gap-2">
        <span className="font-semibold text-white">leitche.enterprises</span>
        <span aria-hidden="true" className="text-stone-600">·</span>
        <span>Entrega refrigerada expressa a 3°C para SP, RJ e Minas Gerais</span>
        <span aria-hidden="true" className="text-stone-600">·</span>
        {!isAuthenticated ? (
          <button
            onClick={() => openAuth('register')}
            className="text-amber-400 hover:text-amber-300 font-semibold underline cursor-pointer"
          >
            Cadastre-se para faturamento B2B ou pedidos residenciais
          </button>
        ) : (
          <span className="text-amber-300 font-medium">
            Conectado como {currentUser?.name} ({isB2B ? 'Tabela Atacado Ativa' : 'Consumidor VIP'})
          </span>
        )}
      </div>

      {/* Primary Navigation */}
      <Navbar
        onOpenAuth={(tab) => openAuth(tab || 'login')}
        onOpenProfile={() => setProfileModalOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* 1. Primeira Imagem e Boas-Vindas: Mensagem Oficial do Dono & Fundador */}
      <FounderWelcome
        onOpenAuth={(tab) => openAuth(tab)}
        onExploreCatalog={() => handleNavigateSection('catalogo')}
      />

      {/* Logged-In User Banner / Prompt */}
      {isAuthenticated && currentUser && (
        <div className="bg-amber-50/70 border-b border-amber-200/80 py-3 px-4">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span className="text-stone-800">
                Sessão ativa: <strong>{currentUser.name}</strong> ({currentUser.email})
                {isB2B && ' — Preços de atacado aplicados automaticamente nos produtos.'}
              </span>
            </div>
            <button
              onClick={() => setProfileModalOpen(true)}
              className="font-semibold text-stone-900 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Ver Meus Pedidos & Laudos de Lote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 2. Coleção e Laticínios Nobres */}
      <Hero
        onExploreCatalog={() => handleNavigateSection('catalogo')}
        onOpenAuth={(tab) => openAuth(tab)}
      />

      {/* Main Catalog Section */}
      <section id="catalogo" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-2">
              Catálogo & Derivados Lácteos
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
              Leites nobres, queijos de caverna e derivados puros
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
              Selecione por categoria para visualizar especificações físico-químicas, teor de gordura e certificados de pasteurização a frio.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar por produto, queijo, lactose..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-300 rounded-xl focus:outline-hidden focus:border-stone-900 shadow-2xs"
            />
          </div>
        </div>

        {/* Category Filter Tabs (Segmented Controls per §1.A / §0) */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-200/60 rounded-xl overflow-x-auto mb-10 max-w-max">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Todos os Produtos
          </button>
          <button
            onClick={() => setSelectedCategory('leites')}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              selectedCategory === 'leites'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Leites Nobres A2A2
          </button>
          <button
            onClick={() => setSelectedCategory('derivados')}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              selectedCategory === 'derivados'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Queijos & Cremes
          </button>
          <button
            onClick={() => setSelectedCategory('zero_lactose')}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              selectedCategory === 'zero_lactose'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Linha Zero Lactose
          </button>
          <button
            onClick={() => setSelectedCategory('lactose_industrial')}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              selectedCategory === 'lactose_industrial'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Lactose & Whey Industrial
          </button>
        </div>

        {/* Product Grid (3-columns desktop / 2-columns tablet with generous gap-8) */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-stone-200">
            <p className="text-base font-semibold text-stone-900">Nenhum produto lácteo encontrado</p>
            <p className="text-xs text-stone-500 mt-1">Tente ajustar sua busca ou selecionar outra categoria.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-medium text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg cursor-pointer"
            >
              Limpar Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetail={setSelectedProduct}
              />
            ))}
          </div>
        )}
      </section>

      {/* Traceability Section */}
      <TraceabilitySection />

      {/* B2B / Industrial Solutions Section */}
      <B2BSection onOpenAuth={(tab) => openAuth(tab)} />

      {/* Farm Origin & Sustainability */}
      <OriginSection />

      {/* Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
        onOpenAuth={(tab) => openAuth(tab)}
      />

      {/* Modals & Overlays */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab={authInitialTab}
        redirectMessage={authRedirectMessage}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <CartDrawer
        onOpenCheckout={() => setCheckoutModalOpen(true)}
        onOpenAuthForCheckout={() => openAuth('login', 'Faça login ou cadastre sua conta para confirmar o endereço de entrega e a janela da frota refrigerada.')}
      />

      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        onOrderSuccess={() => setProfileModalOpen(true)}
      />

      <UserDashboard
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainContent />
      </CartProvider>
    </AuthProvider>
  );
}
