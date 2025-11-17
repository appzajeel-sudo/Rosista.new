import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "تسجيل الدخول | Login - ROSISTA",
  description: "سجل الدخول إلى حسابك في ROSISTA",
};

export default function LoginPage() {
  return <LoginForm />;
}

