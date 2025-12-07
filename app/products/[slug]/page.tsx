import { notFound } from "next/navigation";
import { getProductBySlug, getBestSellers } from "@/lib/api/products";
import { ProductView } from "@/components/products/product-view";
import type { Metadata } from "next";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

// Generate Metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.nameEn} | ROSISTA`,
    description: product.descriptionEn || `Buy ${product.nameEn} from ROSISTA`,
    openGraph: {
      title: product.nameEn,
      description: product.descriptionEn,
      images: [product.mainImage],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Fetch some related products (e.g., best sellers for now as fallback)
  // Ideally this would be fetching products from same category
  const relatedProducts = await getBestSellers(8);

  return <ProductView product={product} relatedProducts={relatedProducts} />;
}
