export interface FavoriteItem {
  id: string;
  nameEn: string;
  nameAr: string;
  price: number;
  imageUrl: string;
  categoryId?: string;
  occasionId?: string;
  isBestSeller?: boolean;
  isSpecialGift?: boolean;
  dateAdded: string;
}

export interface FavoritesResponse {
  favorites: FavoriteItem[];
  count: number;
}

export interface AddToFavoritesRequest {
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
}

export interface AddToFavoritesResponse {
  message: string;
  favorite: {
    id: string;
    dateAdded: string;
  };
}

export interface RemoveFromFavoritesResponse {
  message: string;
}

export interface ClearFavoritesResponse {
  message: string;
  deletedCount: number;
}

export interface CheckFavoriteResponse {
  isFavorite: boolean;
}

export interface FavoritesCountResponse {
  count: number;
}

