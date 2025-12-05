import { notFound } from "next/navigation";
import { getOccasionBySlug } from "@/lib/api/occasions";
import { OccasionView } from "@/components/occasions/occasion-view";

interface Props {
  params: {
    slug: string;
  };
}

export default async function OccasionPage({ params }: Props) {
  const { slug } = await params; // Next.js 15+ requires awaiting params
  const occasion = await getOccasionBySlug(slug);

  if (!occasion) {
    notFound();
  }

  // Ensure image property exists (map imageUrl to image if needed)
  const formattedOccasion = {
    ...occasion,
    id: occasion._id,
    image: occasion.imageUrl,
  };

  return <OccasionView occasion={formattedOccasion} />;
}
