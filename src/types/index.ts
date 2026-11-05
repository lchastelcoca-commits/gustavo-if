export type AccountType = 'consumer' | 'business';

export interface UserAddress {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  accountType: AccountType;
  companyName?: string;
  document: string; // CPF or CNPJ
  phone: string;
  address: UserAddress;
  createdAt: string;
  isVip?: boolean;
}

export type ProductCategory = 
  | 'all'
  | 'leites'
  | 'derivados'
  | 'zero_lactose'
  | 'lactose_industrial';

export interface ProductNutrition {
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  calcium: string;
  sodium: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  subtitle: string;
  price: number;
  b2bPrice: number;
  volumeOrWeight: string;
  fatContent: string;
  lactoseContent: string;
  description: string;
  origin: string;
  temperature: string;
  inStock: boolean;
  image: string;
  ingredients: string[];
  nutrition: ProductNutrition;
  badge?: string;
  minOrderB2B?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'received' | 'cold_storage' | 'in_transit' | 'delivered';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  deliveryAddress: UserAddress;
  deliverySlot: string;
  paymentMethod: string;
  trackingCode: string;
  coldLogTemp: string;
}

export interface TraceabilityLot {
  lotNumber: string;
  productName: string;
  harvestDate: string;
  farm: string;
  location: string;
  herdType: string;
  fatScore: string;
  proteinScore: string;
  microbiologyStatus: string;
  coldChainAverage: string;
}
