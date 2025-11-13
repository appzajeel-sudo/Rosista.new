import type { Metadata } from "next";
import type { ReactNode } from "react";

// ISR: إعادة توليد الصفحة كل 3600 ثانية (ساعة)
export const revalidate = 3600;

// Metadata للصفحات
export const metadata: Metadata = {
  title: "Occasions - ROSISTA",
  description: "Discover our exclusive collection for every special occasion",
  openGraph: {
    title: "Occasions - ROSISTA",
    description: "Discover our exclusive collection for every special occasion",
    type: "website",
  },
};

export default function OccasionsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}

