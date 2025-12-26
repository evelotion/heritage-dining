import ReservationForm from "@/components/features/ReservationForm";
import { Reveal } from "@/components/ui/Reveal";

export default function ReservationPage() {
  return (
    <section className="min-h-screen bg-paper pt-20 px-6 pb-32">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20">
        
        {/* Left: Text Info */}
        <div className="w-full md:w-1/3 space-y-12">
          <div>
            <Reveal>
              <span className="text-batik text-xs font-bold tracking-[0.3em] uppercase block mb-6">
                Reservations
              </span>
            </Reveal>
            
            <Reveal delay={100}>
              <h1 className="text-5xl font-serif italic text-ink mb-6">
                Secure Your Table
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-gray-500 font-light leading-relaxed">
                We release tables for "Chapter I: Origins" 60 days in advance. 
                A credit card hold is required to secure your booking.
              </p>
            </Reveal>
          </div>

          <Reveal delay={300} className="space-y-6 border-t border-subtle pt-8">
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-gray-400 mb-1">Price</span>
              <span className="text-ink font-serif text-xl">IDR 1,850,000++ / pax</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-gray-400 mb-1">Duration</span>
              <span className="text-ink font-serif text-xl">approx. 2.5 hours</span>
            </div>
          </Reveal>
        </div>

        {/* Right: The Form */}
        {/* Kita kasih delay dikit & efek blur biar formnya munculnya 'mahal' */}
        <Reveal variant="blur" delay={200} className="w-full md:w-2/3 bg-white p-8 md:p-12 shadow-sm border border-subtle">
          <ReservationForm />
        </Reveal>

      </div>
    </section>
  );
}