"use server";

import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// ==========================================
// 🛡️ ADMIN ACTIONS (Manager)
// ==========================================

export async function loginAdmin(prevState: any, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  // 1. Cari User berdasarkan USERNAME
  const user = await prisma.user.findUnique({
    where: { username: username },
  });

  // 2. Validasi
  if (!user || user.role !== "ADMIN" || user.password !== password) {
    return { error: "Invalid username or password" };
  }

  // 3. Set Session Cookie
  const cookieStore = await cookies();
  cookieStore.set("admin_session", user.id, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24, // 1 Hari
  });

  // 4. Redirect
  redirect("/admin/dashboard");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}

// ==========================================
// 👤 GUEST ACTIONS (Tamu) - INI YANG HILANG TADI
// ==========================================

export async function loginGuest(prevState: any, formData: FormData) {
  const identifier = formData.get("identifier") as string;
  console.log("🔍 Login Attempt Identifier:", identifier); // <--- DEBUG 1

  if (!identifier) {
    return { success: false, message: "Please enter your Reservation Code or Email." };
  }

  // 1. Cari by Reservation Code
  const reservation = await prisma.reservation.findUnique({
    where: { reservationCode: identifier },
    include: { user: true } // Pastikan include user
  });

  let userId = null;

  if (reservation) {
    console.log("✅ Reservation Found:", reservation.id); // <--- DEBUG 2
    userId = reservation.userId;
  } else {
    // 2. Cari by Email
    console.log("⚠️ Reservation not found by code, trying email..."); // <--- DEBUG 3
    const user = await prisma.user.findUnique({
      where: { email: identifier },
    });
    
    if (user && user.role === 'GUEST') {
        userId = user.id;
    }
  }

  if (!userId) {
    console.log("❌ Login Failed: User/Reservation not found"); // <--- DEBUG 4
    return { success: false, message: "Reservation not found. Please check your code or email." };
  }

  console.log("🔓 Login Success! Setting cookie for User:", userId); // <--- DEBUG 5

  // 3. Set Session
  const cookieStore = await cookies();
  cookieStore.set("guest_session", userId, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24, // 1 Hari
    sameSite: 'lax', // Tambahin ini biar aman redirect
    secure: process.env.NODE_ENV === 'production' // Secure cuma true kalau production
  });

  // 4. Redirect
  redirect("/guest/dashboard");
}

export async function logoutGuest() {
  const cookieStore = await cookies();
  cookieStore.delete("guest_session");
  redirect("/guest/login");
}
