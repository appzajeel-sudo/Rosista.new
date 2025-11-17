import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "تسجيل الدخول | Login - ROSISTA",
  description: "سجل الدخول إلى حسابك في ROSISTA",
};

type Props = {
  searchParams: Promise<{ redirect?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const params = await searchParams;
  const redirectTo = params.redirect || "/";

  return <LoginForm redirectTo={redirectTo} />;
}

