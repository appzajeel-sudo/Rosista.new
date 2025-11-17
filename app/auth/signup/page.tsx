import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "إنشاء حساب جديد | Sign Up - ROSISTA",
  description: "أنشئ حساباً جديداً في ROSISTA",
};

export default function SignupPage() {
  return <SignupForm />;
}

