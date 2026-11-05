import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, Lock, Mail, User, Building2, Phone, MapPin, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AccountType, UserAddress } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'register';
  redirectMessage?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'login',
  redirectMessage
}) => {
  const { login, register, quickLogin } = useAuth();
  const [tab, setTab] = useState<'login' | 'register'>(initialTab);
  const [accountType, setAccountType] = useState<AccountType>('consumer');
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Login form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [document, setDocument] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('São Paulo');
  const [state, setState] = useState('SP');
  const [zipCode, setZipCode] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setTab(initialTab);
      setErrorMessage('');
      setSuccessMessage('');
      setIsForgotPassword(false);
      setForgotSubmitted(false);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!loginEmail || !loginPassword) {
      setErrorMessage('Por favor, informe seu e-mail e sua senha.');
      return;
    }

    setLoading(true);
    try {
      const result = await login(loginEmail, loginPassword);
      if (result.success) {
        setSuccessMessage('Login efetuado com sucesso!');
        setTimeout(() => {
          onClose();
        }, 600);
      } else {
        setErrorMessage(result.message || 'Falha ao autenticar.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Informe seu nome completo ou razão social.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Informe um e-mail válido.');
      return;
    }
    if (accountType === 'business' && !companyName.trim()) {
      setErrorMessage('Informe a Razão Social ou Nome Fantasia da sua empresa.');
      return;
    }
    if (!document.trim()) {
      setErrorMessage(`Informe seu ${accountType === 'business' ? 'CNPJ' : 'CPF'}.`);
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Informe um telefone celular ou WhatsApp para agendamento da entrega.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('A senha deve conter no mínimo 6 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem. Digite novamente.');
      return;
    }
    if (!street.trim() || !number.trim() || !zipCode.trim()) {
      setErrorMessage('Preencha os dados de endereço para a rota de entrega refrigerada.');
      return;
    }
    if (!termsAccepted) {
      setErrorMessage('É necessário aceitar os termos de recebimento em cadeia de frio.');
      return;
    }

    setLoading(true);
    try {
      const address: UserAddress = {
        street: street.trim(),
        number: number.trim(),
        complement: complement.trim(),
        neighborhood: neighborhood.trim() || 'Centro',
        city: city.trim(),
        state: state.trim(),
        zipCode: zipCode.trim()
      };

      const result = await register({
        name: name.trim(),
        email: email.trim(),
        password,
        accountType,
        companyName: accountType === 'business' ? companyName.trim() : undefined,
        document: document.trim(),
        phone: phone.trim(),
        address
      });

      if (result.success) {
        setSuccessMessage('Cadastro realizado com sucesso! Bem-vindo à Leitche Enterprises.');
        setTimeout(() => {
          onClose();
        }, 800);
      } else {
        setErrorMessage(result.message || 'Erro ao realizar cadastro.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuick = (type: 'consumer' | 'business') => {
    quickLogin(type);
    setSuccessMessage(`Conectado como conta de teste (${type === 'business' ? 'B2B Atacado' : 'Consumidor VIP'})!`);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-stone-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-stone-900">
              {tab === 'login' ? 'Acessar Leitche.enterprises' : 'Criar Conta de Cliente'}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {tab === 'login' 
                ? 'Entre para gerenciar pedidos, faturamento e entregas refrigeradas'
                : 'Cadastre-se para comprar leites especiais, queijos e derivados de lactose'}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Redirect Notice if requested by checkout */}
        {redirectMessage && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>{redirectMessage}</span>
          </div>
        )}

        {/* Demo 1-Click Access Pill Bar */}
        <div className="mx-6 mt-4 p-3 bg-stone-50 rounded-xl border border-stone-200/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-stone-600 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              1-Clique: Acesso de Demonstração Imediato
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuick('consumer')}
              className="py-1.5 px-3 text-xs font-medium text-stone-800 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg text-left transition-colors flex items-center justify-between cursor-pointer shadow-2xs"
            >
              <span>Ana C. (Consumidor VIP)</span>
              <span className="text-[10px] text-amber-800 font-mono">B2C</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuick('business')}
              className="py-1.5 px-3 text-xs font-medium text-stone-800 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg text-left transition-colors flex items-center justify-between cursor-pointer shadow-2xs"
            >
              <span>Café Gourmet (Empresa B2B)</span>
              <span className="text-[10px] text-emerald-800 font-mono">Atacado</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-4">
          <div className="grid grid-cols-2 p-1 bg-stone-100 rounded-lg">
            <button
              type="button"
              onClick={() => {
                setTab('login');
                setIsForgotPassword(false);
                setErrorMessage('');
              }}
              className={`py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                tab === 'login'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              Já sou cliente (Login)
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('register');
                setIsForgotPassword(false);
                setErrorMessage('');
              }}
              className={`py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                tab === 'register'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              Quero me cadastrar
            </button>
          </div>
        </div>

        {/* Status Messages */}
        {errorMessage && (
          <div className="mx-6 mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}
        {successMessage && (
          <div className="mx-6 mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Body Form */}
        <div className="p-6">
          {tab === 'login' ? (
            !isForgotPassword ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    E-mail cadastrado
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={e => setLoginEmail(e.target.value)}
                      placeholder="exemplo@leitche.com.br"
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-medium text-stone-700">
                      Sua senha
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsForgotPassword(true)}
                      className="text-xs text-amber-800 hover:underline cursor-pointer"
                    >
                      Esqueci a senha
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={e => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-10 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-stone-400 hover:text-stone-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 disabled:opacity-50 rounded-lg shadow-xs transition-colors cursor-pointer"
                  >
                    {loading ? 'Entrando...' : 'Entrar na Conta'}
                  </button>
                </div>

                <div className="text-center pt-2">
                  <p className="text-xs text-stone-500">
                    Não possui cadastro?{' '}
                    <button
                      type="button"
                      onClick={() => setTab('register')}
                      className="font-medium text-stone-900 hover:underline cursor-pointer"
                    >
                      Cadastre-se gratuitamente
                    </button>
                  </p>
                </div>
              </form>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div className="text-xs text-stone-600">
                  Insira o e-mail cadastrado na Leitche Enterprises para receber as instruções de recuperação:
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    E-mail
                  </label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={e => setForgotEmail(e.target.value)}
                    placeholder="seuemail@empresa.com.br"
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                  />
                </div>
                {forgotSubmitted ? (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
                    Instruções enviadas com sucesso para <strong>{forgotEmail}</strong>. Verifique sua caixa de entrada.
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full py-2.5 text-xs font-semibold text-white bg-stone-900 rounded-lg"
                  >
                    Enviar Link de Recuperação
                  </button>
                )}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(false)}
                    className="text-xs text-stone-600 hover:underline"
                  >
                    Voltar ao Login
                  </button>
                </div>
              </form>
            )
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {/* Account type toggle */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1.5">
                  Tipo de Cadastro
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAccountType('consumer')}
                    className={`p-3 text-left border rounded-xl transition-all cursor-pointer ${
                      accountType === 'consumer'
                        ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-4 h-4" />
                      <span className="text-xs font-bold">Consumidor Final</span>
                    </div>
                    <p className={`text-[11px] ${accountType === 'consumer' ? 'text-stone-300' : 'text-stone-500'}`}>
                      Para consumo residencial de leites nobres e zero lactose
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAccountType('business')}
                    className={`p-3 text-left border rounded-xl transition-all cursor-pointer ${
                      accountType === 'business'
                        ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 className="w-4 h-4" />
                      <span className="text-xs font-bold">Empresa / B2B</span>
                    </div>
                    <p className={`text-[11px] ${accountType === 'business' ? 'text-stone-300' : 'text-stone-500'}`}>
                      Para cafeterias, confeitarias, sorveterias e indústria
                    </p>
                  </button>
                </div>
              </div>

              {/* Personal / Corporate details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    {accountType === 'business' ? 'Nome do Responsável Comercial' : 'Nome Completo'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Ex: Carlos Eduardo Silveira"
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:border-stone-900"
                  />
                </div>

                {accountType === 'business' && (
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Razão Social / Nome Fantasia
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={e => setCompanyName(e.target.value)}
                      placeholder="Ex: Café Especial & Pâtisserie Ltda"
                      className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:border-stone-900"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    E-mail institucional / pessoal
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="contato@empresa.com.br"
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:border-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    {accountType === 'business' ? 'CNPJ' : 'CPF'}
                  </label>
                  <input
                    type="text"
                    required
                    value={document}
                    onChange={e => setDocument(e.target.value)}
                    placeholder={accountType === 'business' ? '00.000.000/0001-00' : '000.000.000-00'}
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:border-stone-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    WhatsApp para confirmação de entrega refrigerada
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="(11) 99999-0000"
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:border-stone-900"
                  />
                </div>
              </div>

              {/* Password fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-stone-100">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Criar Senha (mín. 6 dígitos)
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:border-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Confirmar Senha
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:border-stone-900"
                  />
                </div>
              </div>

              {/* Delivery Address for cold supply */}
              <div className="pt-2 border-t border-stone-100 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-900">
                  <MapPin className="w-3.5 h-3.5 text-amber-700" />
                  <span>Endereço de Recebimento da Frota Refrigerada</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="block text-[11px] text-stone-600 mb-0.5">Logradouro (Rua/Avenida)</label>
                    <input
                      type="text"
                      required
                      value={street}
                      onChange={e => setStreet(e.target.value)}
                      placeholder="Ex: Alameda Santos"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-stone-600 mb-0.5">Número</label>
                    <input
                      type="text"
                      required
                      value={number}
                      onChange={e => setNumber(e.target.value)}
                      placeholder="1200"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[11px] text-stone-600 mb-0.5">Complemento</label>
                    <input
                      type="text"
                      value={complement}
                      onChange={e => setComplement(e.target.value)}
                      placeholder="Loja 3 / Bloco B"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-stone-600 mb-0.5">Bairro</label>
                    <input
                      type="text"
                      value={neighborhood}
                      onChange={e => setNeighborhood(e.target.value)}
                      placeholder="Cerqueira César"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-stone-600 mb-0.5">CEP</label>
                    <input
                      type="text"
                      required
                      value={zipCode}
                      onChange={e => setZipCode(e.target.value)}
                      placeholder="01419-001"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Cold supply compliance checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2 text-[11px] text-stone-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={e => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 rounded border-stone-300 text-stone-900 focus:ring-stone-900"
                  />
                  <span>
                    Concordo em receber os produtos lácteos e derivados com acompanhamento de temperatura e manter refrigeração de 1°C a 4°C no local de entrega.
                  </span>
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 disabled:opacity-50 rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  {loading ? 'Criando Conta...' : `Concluir Cadastro ${accountType === 'business' ? 'Empresarial' : 'de Cliente'}`}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
