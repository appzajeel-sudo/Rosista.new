export interface Product {
  _id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  price: number;
  mainImage: string;
  additionalImages?: string[];
  productStatus?: string[];

  // New fields from backend model
  careInstructionsAr?: string;
  careInstructionsEn?: string;
  arrangementContentsAr?: string;
  arrangementContentsEn?: string;
  dimensions?: {
    height?: number;
    width?: number;
    unit?: string;
  };

  // Relations (Populated or ID)
  category?:
    | {
        _id: string;
        nameAr: string;
        nameEn: string;
        imageUrl?: string;
        slug?: string;
      }
    | string;

  brand?:
    | {
        _id: string;
        nameAr: string;
        nameEn: string;
        imageUrl?: string;
        slug?: string;
      }
    | string;

  // Backend inconsistency note: Model has 'occasions' array, but controller maps 'occasion'.
  // We'll define both to be safe, but rely on what we get.
  occasion?: any;
  occasions?: any[];
}
