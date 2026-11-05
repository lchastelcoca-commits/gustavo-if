import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Order, AccountType, UserAddress, CartItem } from '../types';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  accountType: AccountType;
  companyName?: string;
  document: string;
  phone: string;
  address: UserAddress;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isB2B: boolean;
  orders: Order[];
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateProfile: (updated: Partial<User>) => void;
  quickLogin: (type: 'consumer' | 'business') => void;
  createOrder: (cartItems: CartItem[], subtotal: number, shipping: number, discount: number, total: number, address: UserAddress, slot: string, paymentMethod: string) => Order;
}

const DEFAULT_USERS: (User & { passwordHash: string })[] = [
  {
    id: 'user-ana',
    name: 'Ana Carolina Silveira',
    email: 'ana@leitche.com.br',
    passwordHash: 'leitche123',
    accountType: 'consumer',
    document: '342.981.428-11',
    phone: '(11) 98744-1290',
    createdAt: '2026-08-12',
    isVip: true,
    address: {
      street: 'Rua dos Pinheiros',
      number: '820',
      complement: 'Apt 141',
      neighborhood: 'Pinheiros',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '05422-001'
    }
  },
  {
    id: 'user-b2b-rodrigo',
    name: 'Rodrigo Mendes',
    email: 'rodrigo@cafegourmet.com.br',
    passwordHash: 'leitche123',
    accountType: 'business',
    companyName: 'Café & Pâtisserie do Campo Ltda',
    document: '28.491.029/0001-83',
    phone: '(11) 97120-4499',
    createdAt: '2026-05-19',
    isVip: true,
    address: {
      street: 'Av. Brigadeiro Faria Lima',
      number: '2400',
      complement: 'Loja 02',
      neighborhood: 'Jardim Paulistano',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01452-000'
    }
  }
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-9021',
    orderNumber: 'LEIT-9021',
    date: '04/11/2026 às 11:20',
    status: 'in_transit',
    items: [
      {
        product: {
          id: 'prod-leite-a2a2',
          name: 'Leite Integral Orgânico A2A2 Pasteurizado',
          category: 'leites',
          categoryLabel: 'Leite Especial',
          subtitle: 'Digestão leve de rebanho selecionado',
          price: 13.90,
          b2bPrice: 9.80,
          volumeOrWeight: '1 Litro',
          fatContent: '3.8%',
          lactoseContent: '4.8g/100ml',
          description: '100% A2A2 orgânico.',
          origin: 'Fazenda Vale do Sol, MG',
          temperature: '2°C a 4°C',
          inStock: true,
          image: '/images/products/product_whole_milk.jpg',
          ingredients: ['Leite cru orgânico integral'],
          nutrition: { calories: '61 kcal', protein: '3.4g', carbs: '4.8g', fat: '3.8g', calcium: '124mg', sodium: '48mg' }
        },
        quantity: 3
      },
      {
        product: {
          id: 'prod-iogurte-zero-lactose',
          name: 'Iogurte Grego Artesanal Zero Lactose',
          category: 'zero_lactose',
          categoryLabel: 'Zero Lactose',
          subtitle: 'Maturação lenta 18h',
          price: 18.50,
          b2bPrice: 13.20,
          volumeOrWeight: '250g',
          fatContent: '6.5%',
          lactoseContent: '0.0g',
          description: 'Zero lactose grego autêntico.',
          origin: 'Laticínio Leitche',
          temperature: '1°C a 4°C',
          inStock: true,
          image: '/images/products/product_yogurt_lactose_free.jpg',
          ingredients: ['Leite pasteurizado', 'Lactase'],
          nutrition: { calories: '112 kcal', protein: '7.8g', carbs: '4.2g', fat: '6.5g', calcium: '142mg', sodium: '52mg' }
        },
        quantity: 2
      }
    ],
    subtotal: 78.70,
    shipping: 0.00,
    discount: 5.00,
    total: 73.70,
    deliveryAddress: {
      street: 'Rua dos Pinheiros',
      number: '820',
      complement: 'Apt 141',
      neighborhood: 'Pinheiros',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '05422-001'
    },
    deliverySlot: 'Janela Manhã (08h às 12h) — Frota Refrigerada Leitche',
    paymentMethod: 'PIX Instantâneo',
    trackingCode: 'LT-SP-88290-FROTA3',
    coldLogTemp: '2.6°C (Sensor Baú Ativo)'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<(User & { passwordHash: string })[]>(() => {
    try {
      const stored = localStorage.getItem('leitche_users');
      return stored ? JSON.parse(stored) : DEFAULT_USERS;
    } catch {
      return DEFAULT_USERS;
    }
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('leitche_current_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const normalizeImg = (p: string) => {
      if (!p) return '/images/products/product_whole_milk.jpg';
      if (p.includes('product_whole_milk')) return '/images/products/product_whole_milk.jpg';
      if (p.includes('product_yogurt')) return '/images/products/product_yogurt_lactose_free.jpg';
      if (p.includes('product_cheeses') || p.includes('cheese')) return '/images/products/product_cheeses_dairy.jpg';
      if (p.includes('product_bulk_dairy') || p.includes('lactose')) return '/images/products/product_bulk_dairy_lactose.jpg';
      if (p.includes('hero_dairy') || p.includes('creme')) return '/images/products/hero_dairy_leitche.jpg';
      return p;
    };
    try {
      const stored = localStorage.getItem('leitche_orders');
      if (!stored) return INITIAL_ORDERS;
      const parsed: Order[] = JSON.parse(stored);
      return parsed.map(ord => ({
        ...ord,
        items: ord.items.map(it => ({
          ...it,
          product: {
            ...it.product,
            image: normalizeImg(it.product.image)
          }
        }))
      }));
    } catch {
      return INITIAL_ORDERS;
    }
  });

  useEffect(() => {
    localStorage.setItem('leitche_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('leitche_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('leitche_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('leitche_orders', JSON.stringify(orders));
  }, [orders]);

  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    const trimmedEmail = email.trim().toLowerCase();
    const user = users.find(u => u.email.toLowerCase() === trimmedEmail);

    if (!user) {
      return { success: false, message: 'Nenhuma conta encontrada com este e-mail. Por favor, faça seu cadastro.' };
    }

    if (user.passwordHash !== password) {
      return { success: false, message: 'Senha incorreta. Verifique os dados digitados ou recupere seu acesso.' };
    }

    const { passwordHash: _, ...safeUser } = user;
    setCurrentUser(safeUser);
    return { success: true };
  };

  const register = async (data: RegisterData): Promise<{ success: boolean; message?: string }> => {
    const trimmedEmail = data.email.trim().toLowerCase();
    const existing = users.find(u => u.email.toLowerCase() === trimmedEmail);

    if (existing) {
      return { success: false, message: 'Este e-mail já possui um cadastro ativo. Faça login ou use outro e-mail.' };
    }

    const newUser: User & { passwordHash: string } = {
      id: `user-${Date.now()}`,
      name: data.name.trim(),
      email: trimmedEmail,
      passwordHash: data.password,
      accountType: data.accountType,
      companyName: data.companyName?.trim(),
      document: data.document.trim(),
      phone: data.phone.trim(),
      address: data.address,
      createdAt: new Date().toISOString().split('T')[0],
      isVip: data.accountType === 'business'
    };

    setUsers(prev => [...prev, newUser]);
    const { passwordHash: _, ...safeUser } = newUser;
    setCurrentUser(safeUser);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updated: Partial<User>) => {
    if (!currentUser) return;
    const newCurrent = { ...currentUser, ...updated };
    setCurrentUser(newCurrent);
    setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, ...updated } : u));
  };

  const quickLogin = (type: 'consumer' | 'business') => {
    const target = users.find(u => u.accountType === type) || DEFAULT_USERS.find(u => u.accountType === type);
    if (target) {
      const { passwordHash: _, ...safeUser } = target;
      setCurrentUser(safeUser);
    }
  };

  const createOrder = (
    cartItems: CartItem[],
    subtotal: number,
    shipping: number,
    discount: number,
    total: number,
    address: UserAddress,
    slot: string,
    paymentMethod: string
  ): Order => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `LEIT-${randomNum}`,
      date: new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }),
      status: 'received',
      items: cartItems,
      subtotal,
      shipping,
      discount,
      total,
      deliveryAddress: address,
      deliverySlot: slot,
      paymentMethod,
      trackingCode: `LT-FR-${randomNum}-EXP`,
      coldLogTemp: '2.4°C (Câmara Fria Ativa)'
    };

    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const isB2B = currentUser?.accountType === 'business';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isB2B,
        orders,
        login,
        register,
        logout,
        updateProfile,
        quickLogin,
        createOrder
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
