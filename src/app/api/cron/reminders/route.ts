import { prisma } from "@/lib/db";
import { sendReminderEmail } from "@/lib/email-service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // =========================================================================
    // 🛡️ TIMEZONE FIX: Manual Offset untuk WIB (UTC+7)
    // =========================================================================
    // Kita ingin mencari reservasi untuk "BESOK" (H+1) secara waktu lokal.
    
    const nowUtc = new Date();
    const TIMEZONE_OFFSET = 7; // WIB (Jakarta)
    
    // 1. Konversi waktu sekarang ke Waktu Server Lokal (Virtual)
    const nowJakarta = new Date(nowUtc.getTime() + (TIMEZONE_OFFSET * 60 * 60 * 1000));

    // 2. Tentukan "Besok" berdasarkan jam Jakarta
    const tomorrowJakarta = new Date(nowJakarta);
    tomorrowJakarta.setDate(tomorrowJakarta.getDate() + 1);
    
    // Set Range: 00:00:00 s/d 23:59:59 (Waktu Jakarta)
    tomorrowJakarta.setHours(0, 0, 0, 0);
    const endTomorrowJakarta = new Date(tomorrowJakarta);
    endTomorrowJakarta.setHours(23, 59, 59, 999);

    // 3. Konversi Range Filter kembali ke UTC untuk Query Database
    // (Karena Database menyimpan datetime dalam UTC)
    const filterStartUtc = new Date(tomorrowJakarta.getTime() - (TIMEZONE_OFFSET * 60 * 60 * 1000));
    const filterEndUtc = new Date(endTomorrowJakarta.getTime() - (TIMEZONE_OFFSET * 60 * 60 * 1000));

    // 4. Query Database
    const reservations = await prisma.reservation.findMany({
      where: {
        bookingDate: {
          gte: filterStartUtc,
          lte: filterEndUtc
        },
        status: 'CONFIRMED' // Hanya ingatkan yang sudah confirm
      },
      include: { user: true }
    });

    if (reservations.length === 0) {
      console.log(`✅ [CRON] No reservations found for Jakarta Date: ${tomorrowJakarta.toLocaleDateString()}`);
      return NextResponse.json({ success: true, message: "No upcoming reservations." });
    }

    // =========================================================================
    // ⚡ PERFORMANCE FIX: Kirim Email Paralel
    // =========================================================================
    // Jangan gunakan 'await' di dalam loop for biasa karena akan lambat (serial).
    // Gunakan Promise.allSettled agar jika satu gagal, yang lain tetap terkirim.

    console.log(`🚀 [CRON] Sending reminders to ${reservations.length} guests...`);

    const emailResults = await Promise.allSettled(
      reservations.map((res) => sendReminderEmail(res))
    );

    // Hitung sukses/gagal
    const successCount = emailResults.filter(r => r.status === 'fulfilled').length;
    const failCount = emailResults.filter(r => r.status === 'rejected').length;

    console.log(`✅ [CRON] Finished. Success: ${successCount}, Failed: ${failCount}`);

    return NextResponse.json({ 
      success: true, 
      sent: successCount, 
      failed: failCount,
      targetDate: tomorrowJakarta.toLocaleDateString('id-ID')
    });

  } catch (error) {
    console.error("❌ [CRON] Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}