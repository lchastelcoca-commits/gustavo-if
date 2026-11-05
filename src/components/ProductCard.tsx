import React from 'react';
import { Plus, Eye, Check } from 'lucide-react';
import { Product } from '../types';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetail }) => {
  const { isB2B } = useAuth();
  const { addItem, items } = useCart();

  const cartItem = items.find(item => item.product.id === product.id);
  const currentQuantity = cartItem?.quantity || 0;

  const displayPrice = isB2B ? product.b2bPrice : product.price;

  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200">
      {/* 65-75% Image Container */}
      <div 
        onClick={() => onOpenDetail(product)}
        className="relative aspect-4/3 bg-gradient-to-br from-stone-100 to-amber-50/40 overflow-hidden cursor-pointer flex items-center justify-center text-center p-4"
      >
        {/* Fallback container underneath image */}
        <div className="text-stone-400 text-xs flex flex-col items-center gap-1 z-0">
          <span className="font-semibold text-stone-700">{product.name}</span>
          <span className="text-[10px] text-stone-500">{product.volumeOrWeight}</span>
        </div>

        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300 absolute inset-0 z-1"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Subtle single tag if present */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-stone-900/85 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-md z-10">
            {product.badge}
          </div>
        )}

        {/* Volume/Weight indicator */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-stone-800 text-[11px] font-mono font-medium px-2 py-0.5 rounded-md border border-stone-200/60 z-10">
          {product.volumeOrWeight}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Clean unboxed metadata with typographic separator */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{product.origin.split('—')[0]}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onOpenDetail(product)}
            className="text-base font-semibold text-stone-900 group-hover:text-amber-900 transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Subtitle / Key Spec */}
          <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs font-medium text-stone-500">R$</span>
              <span className="text-lg font-bold font-mono tabular-nums text-stone-950">
                {displayPrice.toFixed(2).replace('.', ',')}
              </span>
            </div>

            {isB2B ? (
              <div className="text-[10px] text-amber-900 font-semibold">
                Preço Atacado B2B <span className="line-through text-stone-400 font-normal">R$ {product.price.toFixed(2).replace('.', ',')}</span>
              </div>
            ) : (
              <div className="text-[10px] text-stone-500">
                Embalagem refrigerada inclusa
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onOpenDetail(product)}
              aria-label={`Ver detalhes de ${product.name}`}
              className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenDetail(product)}
              className="px-3.5 py-2 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span>Esgotado</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
