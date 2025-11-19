export interface CartItem {
  id: string;
  nameEn: string;
  nameAr: string;
  price: number;
  imageUrl: string;
  quantity: number;
  categoryId?: string;
  occasionId?: string;
  isBestSeller?: boolean;
  isSpecialGift?: boolean;
}

export interface CartResponse {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
  cartCount: number;
}

export interface AddToCartRequest {
  productData: {
    id: string;
    nameEn: string;
    nameAr: string;
    price: number;
    imageUrl: string;
    categoryId?: string;
    occasionId?: string;
    isBestSeller?: boolean;
    isSpecialGift?: boolean;
  };
  quantity?: number;
}

export interface AddToCartResponse {
  message: string;
  cart: {
    totalItems: number;
    totalAmount: number;
  };
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export interface UpdateCartItemResponse {
  message: string;
  cart: {
    totalItems: number;
    totalAmount: number;
  };
}

export interface RemoveFromCartResponse {
  message: string;
  cart: {
    totalItems: number;
    totalAmount: number;
  };
}

export interface ClearCartResponse {
  message: string;
  cart: {
    totalItems: number;
    totalAmount: number;
  };
}

export interface CartCountResponse {
  count: number;
  total: number;
}
