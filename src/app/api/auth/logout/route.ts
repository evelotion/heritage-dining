// src/app/api/auth/logout/route.ts
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  const cookieStore = await cookies();
  
  // Hapus semua sesi biar bersih
  cookieStore.delete("guest_session");
  cookieStore.delete("admin_session");
  
  // Balikin ke login
  redirect("/guest/login");
}