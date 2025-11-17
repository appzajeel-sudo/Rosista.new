import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ProfilePage } from "@/components/user/profile-page";

export default async function ProfilePageRoute() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  // إذا لم يكن هناك token، إعادة التوجيه إلى صفحة تسجيل الدخول
  if (!token) {
    redirect("/auth/login?redirect=/profile");
  }

  return <ProfilePage />;
}

