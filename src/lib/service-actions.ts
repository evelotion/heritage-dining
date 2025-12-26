'use server'

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function submitRequest(formData: FormData) {
  const token = formData.get("token") as string
  const type = formData.get("type") as string

  if (!token || !type) return

  // 1. Cari Reservasi ID berdasarkan Token (Reservation Code)
  const reservation = await prisma.reservation.findUnique({
    where: { reservationCode: token }
  })

  if (!reservation) {
    throw new Error("Invalid reservation")
  }

  // 2. Simpan Request ke Database
  await prisma.serviceRequest.create({
    data: {
      type: type, // "WATER", "BILL", "CUTLERY", "STAFF"
      status: "NEW",
      reservationId: reservation.id
    }
  })

  // 3. Refresh halaman agar status terupdate (opsional)
  revalidatePath(`/table/${token}/request`)
  
  // Tidak perlu redirect, biarkan user tetap di halaman request
  // untuk melihat status "Terkirim"
}