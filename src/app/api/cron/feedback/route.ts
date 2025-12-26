import { prisma } from "@/lib/db";
import { sendThankYouEmail } from "@/lib/email-service";
import { NextResponse } from "next/server";

export async function GET() {
  // 1. Tentukan Rentang Waktu "KEMARIN"
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1); // Mundurkan 1 hari
  
  const startOfYesterday = new Date(yesterday);
  startOfYesterday.setHours(0, 0, 0, 0);
  
  const endOfYesterday = new Date(yesterday);
  endOfYesterday.setHours(23, 59, 59, 999);

  try {
    // 2. Cari Reservasi Kemarin yang statusnya SUKSES (Seated / Completed)
    // Kita anggap 'SEATED' juga sudah selesai makan karena ini hari berikutnya.
    const reservations = await prisma.reservation.findMany({
      where: {
        bookingDate: {
          gte: startOfYesterday,
          lte: endOfYesterday
        },
        status: { in: ['SEATED', 'COMPLETED'] } 
      },
      include: { user: true }
    });

    // 3. Kirim Email & Auto-Complete Status
    if (reservations.length > 0) {
      console.log(`🔎 Found ${reservations.length} past visits from yesterday (${startOfYesterday.toDateString()})`);
      
      for (const res of reservations) {
        // A. Kirim Email
        await sendThankYouEmail(res);
        
        // B. Update status jadi COMPLETED (tutup buku)
        await prisma.reservation.update({
          where: { id: res.id },
          data: { status: 'COMPLETED' }
        });
      }
      
      return NextResponse.json({ success: true, processed: reservations.length });
    } else {
      console.log(`Typing... No visits found from yesterday (${startOfYesterday.toDateString()})`);
      return NextResponse.json({ success: true, message: "No past reservations to process." });
    }

  } catch (error) {
    console.error("Cron Error:", error);
    return NextResponse.json({ success: false, error: "Failed to process feedback" }, { status: 500 });
  }
}