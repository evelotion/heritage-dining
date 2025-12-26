import { Resend } from 'resend';
import { BookingTemplate } from '@/components/emails/BookingTemplate';
import { ReminderTemplate } from '@/components/emails/ReminderTemplate';
import { ThankYouTemplate } from '@/components/emails/ThankYouTemplate';
import { render } from '@react-email/components';

// Inisialisasi Resend (Nanti diisi API Key asli di .env)
// const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingConfirmation(reservation: any) {
  
  // 1. Render Template React menjadi String HTML
  const emailHtml = await render(BookingTemplate({
    guestName: reservation.user.fullName,
    reservationCode: reservation.reservationCode,
    date: new Date(reservation.bookingDate).toLocaleDateString(),
    time: new Date(reservation.bookingDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
    pax: reservation.pax
  }));

  // 2. SIMULASI PENGIRIMAN (Development Mode)
  console.log("==========================================");
  console.log("📧 MOCK EMAIL SENT TO:", reservation.user.email);
  console.log("------------------------------------------");
  console.log("Subject: Reservation Confirmed - Heritage Dining");
  console.log("Preview URL: http://localhost:3000/guest/login?code=" + reservation.reservationCode);
  console.log("------------------------------------------");
  // console.log(emailHtml); // Uncomment jika ingin lihat kode HTML mentahnya
  console.log("==========================================");

  // 3. KODE ASLI (Jika sudah punya API Key nanti tinggal uncomment)
  /*
  try {
    await resend.emails.send({
      from: 'Heritage Dining <concierge@heritagedining.com>',
      to: [reservation.user.email],
      subject: 'Your Table is Secured',
      html: emailHtml,
    });
  } catch (error) {
    console.error("Failed to send email:", error);
  }
  */
}

export async function sendReminderEmail(reservation: any) {
  
  const emailHtml = await render(ReminderTemplate({
    guestName: reservation.user.fullName,
    time: new Date(reservation.bookingDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
    pax: reservation.pax
  }));

  // SIMULASI PENGIRIMAN
  console.log("🔔 [CRON JOB] REMINDER SENT TO:", reservation.user.email);
  console.log("------------------------------------------");
  console.log("Subject: H-1 Reminder: Your Dinner Tomorrow");
  console.log("Content: Don't forget dress code Smart Casual!");
  console.log("------------------------------------------");
}

export async function sendThankYouEmail(reservation: any) {
  
  const emailHtml = await render(ThankYouTemplate({
    guestName: reservation.user.fullName,
  }));

  // SIMULASI PENGIRIMAN
  console.log("🌟 [CRON JOB] FEEDBACK REQUEST SENT TO:", reservation.user.email);
  console.log("------------------------------------------");
  console.log("Subject: A Note of Gratitude from Heritage");
  console.log("Content: Link to Private Survey Form");
  console.log("------------------------------------------");
}