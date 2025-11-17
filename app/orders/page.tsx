import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { OrdersPage } from "@/components/user/orders-page";

export default async function OrdersPageRoute() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  // إذا لم يكن هناك token، إعادة التوجيه إلى صفحة تسجيل الدخول
  if (!token) {
    redirect("/auth/login?redirect=/orders");
  }

  return <OrdersPage />;
}

