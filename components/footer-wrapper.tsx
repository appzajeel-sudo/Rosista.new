"use client";

import dynamic from "next/dynamic";

const Footer = dynamic(
  () => import("@/components/footer").then((mod) => ({ default: mod.Footer })),
  { ssr: false }
);

export function FooterWrapper() {
  return <Footer />;
}

