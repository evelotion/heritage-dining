'use server'

import { z } from 'zod'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'
import { sendBookingConfirmation } from '@/lib/email-service'

// --- FEATURE FLAG LOGIC ---
const IS_PAYMENT_ENABLED = process.env.ENABLE_DEPOSIT_SYSTEM === 'true'

// 1. Skema Validasi Input
const ReservationSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is too short"),
  date: z.string(),
  time: z.string(),
  pax: z.coerce.number().min(1, "Minimum 1 person").max(10, "For groups > 10, please contact us"),
  allergies: z.string().optional(),
  occasion: z.string().optional(),
})

export async function createReservation(prevState: any, formData: FormData) {
  // 2. Ambil data dari FormData
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    date: formData.get('date'),
    time: formData.get('time'),
    pax: formData.get('pax'),
    allergies: formData.get('allergies'),
    occasion: formData.get('occasion'),
  }

  // 3. Validasi
  const validated = ReservationSchema.safeParse(rawData)

  if (!validated.success) {
    return {
      success: false,
      message: "Please check your input.",
      errors: validated.error.flatten().fieldErrors
    }
  }

  const data = validated.data
  const bookingDate = new Date(`${data.date}T${data.time}:00`)

  // --- LOGIKA STATUS AWAL ---
  const initialStatus = IS_PAYMENT_ENABLED ? 'PENDING' : 'CONFIRMED'
  let code = "" 

  try {
    // 4. Cari Chapter yang aktif
    const activeChapter = await prisma.chapter.findFirst({
      where: { isActive: true }
    })

    if (!activeChapter) {
      return { success: false, message: "We are closed or no seasonal menu available." }
    }

    // 5. Generate Code Unik (RES-XXXX)
    code = "RES-" + Math.floor(1000 + Math.random() * 9000)

    // 6. Database Transaction
    await prisma.$transaction(async (tx) => {
      
      // =====================================================================
      // 🛡️ DATA INTEGRITY FIX: Ganti connectOrCreate dengan upsert
      // =====================================================================
      // Tujuannya: Jika user sudah ada (email sama), UPDATE nama & hp-nya.
      // Jika belum ada, CREATE baru.
      
      const user = await tx.user.upsert({
        where: { email: data.email },
        update: {
          fullName: data.name,
          phone: data.phone,
          // Role tidak di-update agar Admin tidak tidak sengaja jadi Guest
        },
        create: {
          email: data.email,
          fullName: data.name,
          phone: data.phone,
          role: 'GUEST'
        }
      });

      // B. Buat Reservasi (Sekarang kita link ke user.id yang sudah pasti update)
      const newReservation = await tx.reservation.create({
        data: {
          reservationCode: code,
          bookingDate: bookingDate,
          pax: data.pax,
          status: initialStatus,
          
          userId: user.id, // <--- Link Manual ke User ID
          chapterId: activeChapter.id,
          
          // Simpan Preferensi
          guestPreferences: {
            create: {
              allergies: data.allergies,
              occasion: data.occasion
            }
          }
        },
        include: { user: true }
      })

      // C. Kirim Email Konfirmasi (Hanya jika langsung CONFIRMED)
      if (newReservation.status === 'CONFIRMED') {
        await sendBookingConfirmation(newReservation)
      }
    })

  } catch (error) {
    console.error("Reservation Error:", error)
    return { success: false, message: "System error. Please try again." }
  }

  // 7. Redirect Sesuai Mode
  if (IS_PAYMENT_ENABLED) {
    redirect(`/payment/checkout?code=${code}`)
  } else {
    redirect(`/guest/login?code=${code}&new=true`)
  }
}