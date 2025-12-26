'use server'

import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { sendBookingConfirmation } from '@/lib/email-service'; // Import fungsi email

// Simulasi Pembayaran Sukses
export async function processMockPayment(formData: FormData) {
  const reservationCode = formData.get("code") as string;

  // Cek data dulu untuk hitung deposit (agar konsisten)
  const reservation = await prisma.reservation.findUnique({
    where: { reservationCode },
    include: { user: true } // Butuh user buat email
  });

  if (!reservation) throw new Error("Reservation not found");

  const DEPOSIT_PER_PAX = 500000;
  const totalAmount = reservation.pax * DEPOSIT_PER_PAX;

  // 1. Update Status & Simpan Data Pembayaran
  const updatedReservation = await prisma.reservation.update({
    where: { reservationCode: reservationCode },
    data: { 
      status: 'CONFIRMED',
      depositAmount: totalAmount,       // <--- Simpan Nominal
      paymentId: `MOCK-${Date.now()}`,  // <--- Simpan ID Palsu
      notes: 'Paid via Mock Payment'
    },
    include: { user: true } // Penting buat email
  });

  // 2. Kirim Email Konfirmasi (Karena baru lunas sekarang)
  await sendBookingConfirmation(updatedReservation);

  // 3. Redirect ke Login Tamu
  redirect(`/guest/login?code=${reservationCode}&new=true`);
}