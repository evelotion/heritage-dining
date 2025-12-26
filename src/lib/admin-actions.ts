'use server'

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation";

// --- 1. CHECK-IN TAMU ---
// Mengubah status dari CONFIRMED -> SEATED agar QR Code meja aktif
export async function checkInGuest(formData: FormData) {
  const reservationId = formData.get('id') as string
  
  await prisma.reservation.update({
    where: { id: reservationId },
    data: { status: 'SEATED' }
  })

  revalidatePath('/admin/reservations')
}

// --- 2. ASSIGN MEJA ---
// Menghubungkan Reservasi dengan Meja tertentu
export async function assignTable(formData: FormData) {
  const reservationId = formData.get('reservationId') as string
  const tableId = formData.get('tableId') as string

  if (!tableId || !reservationId) return

  await prisma.reservation.update({
    where: { id: reservationId },
    data: { tableId: tableId }
  })

  revalidatePath('/admin/reservations')
}

// --- 3. BATALKAN RESERVASI ---
export async function cancelReservation(formData: FormData) {
  const reservationId = formData.get('id') as string
  
  await prisma.reservation.update({
    where: { id: reservationId },
    data: { status: 'CANCELLED' }
  })

  revalidatePath('/admin/reservations')
}

// --- 4. MANAJEMEN CHAPTER ---
// Mengganti menu musim yang aktif (CMS)
export async function activateChapter(formData: FormData) {
  const chapterId = formData.get('id') as string

  // 1. Matikan semua chapter dulu
  await prisma.chapter.updateMany({
    data: { isActive: false }
  })

  // 2. Aktifkan chapter yang dipilih
  await prisma.chapter.update({
    where: { id: chapterId },
    data: { isActive: true }
  })

  revalidatePath('/admin/settings')
  revalidatePath('/') // Refresh halaman depan juga
}

// --- 5. FINANCE: REDEEM DEPOSIT ---
// Menandai deposit sudah dipakai (dipotong) saat bayar di kasir
export async function redeemDeposit(formData: FormData) {
  const reservationId = formData.get('id') as string
  
  await prisma.reservation.update({
    where: { id: reservationId },
    data: { isRedeemed: true } // Tandai sudah terpakai
  })

  revalidatePath('/admin/reservations')
}

// --- 6. KITCHEN: UPDATE COURSE PACE ---
// Tombol 'Fire' di layar dapur untuk memajukan urutan makanan
export async function updateCourseProgress(formData: FormData) {
  const reservationId = formData.get('id') as string
  const action = formData.get('action') as string // 'NEXT' or 'PREV'
  
  const reservation = await prisma.reservation.findUnique({
    where: { id: reservationId },
    select: { currentCourse: true }
  })

  if (!reservation) return

  let newCourse = reservation.currentCourse
  if (action === 'NEXT') newCourse++
  if (action === 'PREV' && newCourse > 0) newCourse--

  await prisma.reservation.update({
    where: { id: reservationId },
    data: { currentCourse: newCourse }
  })

  // Revalidate halaman kitchen agar tampilan real-time
  revalidatePath('/admin/kitchen')
}

export async function completeDiningSession(formData: FormData) {
  const reservationId = formData.get('id') as string
  
  await prisma.reservation.update({
    where: { id: reservationId },
    data: { status: 'COMPLETED' } // Ubah status agar hilang dari list SEATED
  })

  revalidatePath('/admin/kitchen')
  revalidatePath('/admin/reservations')
}

export async function createTable(formData: FormData) {
  const tableNumber = formData.get('tableNumber') as string
  const capacity = Number(formData.get('capacity'))

  if (!tableNumber || !capacity) return

  try {
    await prisma.table.create({
      data: {
        tableNumber,
        capacity
      }
    })
    revalidatePath('/admin/settings')
    revalidatePath('/admin/reservations') // Refresh dropdown juga
  } catch (error) {
    console.error("Failed create table:", error)
    // Bisa handle error unique constraint di sini
  }
}

// --- 9. FLOOR MANAGEMENT: DELETE TABLE ---
export async function deleteTable(formData: FormData) {
  const id = formData.get('id') as string
  
  try {
    await prisma.table.delete({ where: { id } })
    revalidatePath('/admin/settings')
    revalidatePath('/admin/reservations')
  } catch (error) {
    console.error("Failed delete table (mungkin ada relasi):", error)
  }
}

export async function createChapter(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const sequence = Number(formData.get('sequence'))
  
  // Default tanggal (misal berlaku 6 bulan dari sekarang)
  const startDate = new Date()
  const endDate = new Date()
  endDate.setMonth(endDate.getMonth() + 6)

  if (!title || !sequence) return

  await prisma.chapter.create({
    data: {
      title,
      description,
      sequence,
      startDate,
      endDate,
      isActive: false // Default tidak aktif (Draft)
    }
  })

  revalidatePath('/admin/settings')
}

export async function createCourse(formData: FormData) {
  const chapterId = formData.get('chapterId') as string
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const sequence = Number(formData.get('sequence'))
  const tags = formData.get('tags') as string

  if (!chapterId || !name) return

  await prisma.course.create({
    data: {
      chapterId,
      sequence,
      name,
      description,
      tags
    }
  })

  revalidatePath(`/admin/settings/${chapterId}`)
}

// --- 12. MENU MANAGEMENT: DELETE COURSE ---
export async function deleteCourse(formData: FormData) {
  const id = formData.get('id') as string
  const chapterId = formData.get('chapterId') as string
  
  await prisma.course.delete({ where: { id } })
  revalidatePath(`/admin/settings/${chapterId}`)
}

export async function updateChapter(formData: FormData) {
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const sequence = Number(formData.get('sequence'))

  // 1. Cek Keamanan: Jangan edit chapter yang sedang aktif
  const existingChapter = await prisma.chapter.findUnique({ where: { id } })
  
  if (!existingChapter || existingChapter.isActive) {
    // Jika aktif, tolak update (Silent return atau throw error)
    return 
  }

  // 2. Lakukan Update
  await prisma.chapter.update({
    where: { id },
    data: { title, description, sequence }
  })

  revalidatePath('/admin/settings')
  redirect('/admin/settings') // Kembali ke menu utama
}

// --- 14. CONTENT MANAGEMENT: DELETE CHAPTER ---
export async function deleteChapter(formData: FormData) {
  const id = formData.get('id') as string
  
  const existingChapter = await prisma.chapter.findUnique({ where: { id } })

  // 1. Cek Keamanan
  if (!existingChapter || existingChapter.isActive) return

  // 2. Hapus Anak-anaknya dulu (Courses & Reservations terkait)
  // Ini penting agar database tidak error (Foreign Key Constraint)
  await prisma.course.deleteMany({ where: { chapterId: id } })
  // Note: Hati-hati menghapus reservasi history, idealnya reservasi di-archive. 
  // Untuk MVP ini kita asumsikan chapter yang dihapus adalah Draft yang belum ada reservasinya.
  
  // 3. Hapus Chapter
  await prisma.chapter.delete({ where: { id } })

  revalidatePath('/admin/settings')
}