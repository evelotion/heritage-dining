import { Calendar, Clock, Users, MapPin, QrCode } from "lucide-react";

// Tipe data yang diterima komponen ini
interface TicketProps {
  reservation: {
    reservationCode: string;
    bookingDate: Date;
    pax: number;
    user: { fullName: string | null };
    table?: { tableNumber: string } | null; // Opsional (mungkin belum di-assign)
  };
}

export default function GuestTicket({ reservation }: TicketProps) {
  // Format tanggal biar cantik (e.g., "Monday, 12 Oct")
  const dateStr = reservation.bookingDate.toLocaleDateString('en-US', { 
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
  });
  
  // Format jam (e.g., "19:00")
  const timeStr = reservation.bookingDate.toLocaleTimeString('en-US', { 
    hour: '2-digit', minute: '2-digit', hour12: false 
  });

  return (
    <div className="max-w-md mx-auto bg-paper shadow-2xl border-t-4 border-batik relative overflow-hidden">
      
      {/* --- Ticket Header --- */}
      <div className="p-8 text-center space-y-2 border-b border-dashed border-gray-300">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400">Admit One</span>
        <h2 className="font-serif text-3xl text-ink">Chapter I: Origins</h2>
        <p className="text-batik text-xs uppercase tracking-widest font-bold">Priority Reservation</p>
      </div>

      {/* --- Ticket Body --- */}
      <div className="p-8 space-y-8 bg-white">
        
        {/* Guest Name */}
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Guest Name</p>
          <p className="font-serif text-xl text-ink">{reservation.user.fullName}</p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-batik mb-1">
              <Calendar className="w-3 h-3" />
              <span className="text-[10px] uppercase tracking-widest">Date</span>
            </div>
            <p className="font-medium text-sm text-ink">{dateStr}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-batik mb-1">
              <Clock className="w-3 h-3" />
              <span className="text-[10px] uppercase tracking-widest">Time</span>
            </div>
            <p className="font-medium text-sm text-ink">{timeStr}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-batik mb-1">
              <Users className="w-3 h-3" />
              <span className="text-[10px] uppercase tracking-widest">Guests</span>
            </div>
            <p className="font-medium text-sm text-ink">{reservation.pax} Pax</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-batik mb-1">
              <MapPin className="w-3 h-3" />
              <span className="text-[10px] uppercase tracking-widest">Table</span>
            </div>
            <p className="font-medium text-sm text-ink">
              {reservation.table?.tableNumber || "Assigned on arrival"}
            </p>
          </div>
        </div>

        {/* --- QR Code Section --- */}
        <div className="flex flex-col items-center justify-center pt-6 border-t border-dashed border-gray-200">
          <div className="bg-white p-2 border border-gray-100 rounded-lg shadow-sm mb-4">
            {/* Simulasi QR Code (Icon Besar) */}
            <QrCode className="w-32 h-32 text-ink" strokeWidth={1} />
          </div>
          <p className="font-mono text-xl tracking-widest font-bold text-batik">
            {reservation.reservationCode}
          </p>
          <p className="text-[10px] text-gray-400 mt-2 text-center max-w-[200px]">
            Show this code to the host upon arrival.
          </p>
        </div>

      </div>

      {/* Decorative Circles (Kiri Kanan Tiket) */}
      <div className="absolute top-[138px] -left-3 w-6 h-6 bg-paper rounded-full"></div>
      <div className="absolute top-[138px] -right-3 w-6 h-6 bg-paper rounded-full"></div>
    </div>
  );
}