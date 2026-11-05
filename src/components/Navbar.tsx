import React, { useState } from 'react';
import { ShoppingBag, User, LogOut, ChevronDown, Menu, X, ShieldCheck, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onOpenAuth: (initialTab?: 'login' | 'register') => void;
  onOpenProfile: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  onOpenProfile,
  onNavigateSection
}) => {
  const { currentUser, isAuthenticated, isB2B, logout } = useAuth();
  const { itemCount, openCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single Text Element) */}
        <button
          onClick={() => handleNavClick('boas-vindas')}
          className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 text-left cursor-pointer transition-opacity hover:opacity-80"
        >
          leitche<span className="text-amber-700">.</span>enterprises
        </button>

        {/* Zone 2: 4-5 Clean Single-Line Text Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => handleNavClick('catalogo')}
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            Catálogo
          </button>
          <button
            onClick={() => handleNavClick('zero-lactose')}
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            Zero Lactose
          </button>
          <button
            onClick={() => handleNavClick('lactose-industrial')}
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            Lactose & B2B
          </button>
          <button
            onClick={() => handleNavClick('rastreabilidade')}
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            Rastreabilidade
          </button>
          <button
            onClick={() => handleNavClick('origem')}
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            Nossa Origem
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Cart & User Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Cart Trigger */}
          <button
            onClick={openCart}
            aria-label="Sacola de Compras Refrigeradas"
            className="relative p-2.5 rounded-lg text-stone-700 hover:text-stone-900 hover:bg-stone-200/60 transition-colors cursor-pointer flex items-center gap-2"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-700 text-white font-mono text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </button>

          {/* User Account / Auth Trigger */}
          {isAuthenticated && currentUser ? (
            <div className="relative">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center gap-2.5 py-2 px-3.5 rounded-lg text-xs sm:text-sm font-medium text-stone-900 bg-white border border-stone-200 hover:border-stone-300 shadow-xs transition-colors cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-semibold text-xs shrink-0">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-left hidden sm:block max-w-[140px] truncate">
                  <span className="truncate block font-semibold leading-tight">{currentUser.name}</span>
                  <span className="text-[10px] text-stone-500 block">
                    {isB2B ? 'Empresa / B2B' : 'Consumidor VIP'}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-stone-500 shrink-0" />
              </button>

              {isUserDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setIsUserDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-30 divide-y divide-stone-100">
                    <div className="px-4 py-3">
                      <p className="text-xs text-stone-500">Conectado como</p>
                      <p className="text-sm font-semibold text-stone-900 truncate">{currentUser.name}</p>
                      <p className="text-xs text-stone-500 truncate">{currentUser.email}</p>
                      {isB2B && (
                        <div className="mt-2 flex items-center gap-1.5 text-[11px] text-amber-800 font-medium">
                          <Building2 className="w-3 h-3" />
                          <span>Tabela com Preço de Atacado Ativa</span>
                        </div>
                      )}
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          onOpenProfile();
                        }}
                        className="w-full text-left px-4 py-2 text-xs sm:text-sm text-stone-700 hover:bg-stone-50 transition-colors flex items-center gap-2"
                      >
                        <User className="w-4 h-4 text-stone-500" />
                        <span>Minha Conta & Pedidos</span>
                      </button>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-4 py-2 text-xs sm:text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        <span>Encerrar Sessão</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="hidden sm:inline-flex px-3.5 py-2 text-xs sm:text-sm font-medium text-stone-700 hover:text-stone-950 transition-colors cursor-pointer"
              >
                Entrar
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <span>Cadastrar</span>
              </button>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menu"
            className="p-2 rounded-lg text-stone-700 hover:bg-stone-200/60 lg:hidden cursor-pointer"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-stone-50 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-stone-700">
            <button
              onClick={() => handleNavClick('catalogo')}
              className="text-left py-2 px-2 rounded-md hover:bg-stone-100"
            >
              Catálogo & Produtos
            </button>
            <button
              onClick={() => handleNavClick('zero-lactose')}
              className="text-left py-2 px-2 rounded-md hover:bg-stone-100"
            >
              Linha Zero Lactose
            </button>
            <button
              onClick={() => handleNavClick('lactose-industrial')}
              className="text-left py-2 px-2 rounded-md hover:bg-stone-100"
            >
              Lactose & B2B
            </button>
            <button
              onClick={() => handleNavClick('rastreabilidade')}
              className="text-left py-2 px-2 rounded-md hover:bg-stone-100"
            >
              Rastreabilidade de Lotes
            </button>
            <button
              onClick={() => handleNavClick('boas-vindas')}
              className="text-left py-2 px-2 rounded-md hover:bg-stone-100 flex items-center justify-between"
            >
              <span>Boas-Vindas do Dono</span>
              <span className="text-[10px] text-amber-800 font-semibold uppercase">Novo</span>
            </button>
            <button
              onClick={() => handleNavClick('origem')}
              className="text-left py-2 px-2 rounded-md hover:bg-stone-100"
            >
              Nossa Origem & Fazendas
            </button>
          </nav>

          <div className="pt-2 border-t border-stone-200/80 flex flex-col gap-2">
            {!isAuthenticated ? (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="py-2.5 text-center text-xs font-semibold text-stone-800 bg-white border border-stone-300 rounded-lg"
                >
                  Entrar
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenAuth('register');
                  }}
                  className="py-2.5 text-center text-xs font-semibold text-white bg-stone-900 rounded-lg"
                >
                  Criar Cadastro
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenProfile();
                }}
                className="w-full py-2.5 text-center text-xs font-semibold text-stone-900 bg-white border border-stone-300 rounded-lg flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4 text-stone-600" />
                <span>Acessar Painel da Conta</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
