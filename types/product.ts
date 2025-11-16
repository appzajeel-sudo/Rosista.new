export interface Product {
  _id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  price: number;
  mainImage: string;
  productStatus?: string[];
}
