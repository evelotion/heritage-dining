import Link from "next/link";
import { MapPin, Clock, Mail, Phone, Car, Info } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export default function ContactPage() {
  return (
    <div className="bg-paper min-h-screen text-ink pb-20">
      {/* --- HERO HEADER --- */}
      <section className="pt-32 pb-20 px-6 text-center md:pt-10">
        <Reveal>
          <h1 className="font-serif text-5xl md:text-6xl text-ink mb-6">
            Visit Us
          </h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="text-gray-500 font-light max-w-lg mx-auto">
            A sanctuary of flavor in the heart of Jakarta.
          </p>
        </Reveal>
      </section>

      {/* --- MAIN INFO GRID --- */}
      <section className="max-w-6xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {/* LEFT: TEXT INFO */}
          <div className="space-y-12">
            {/* Address */}
            <Reveal delay={200}>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-batik">
                  <MapPin className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Location
                  </span>
                </div>
                <p className="font-serif text-2xl text-ink leading-tight">
                  Jl. Senopati No. 88,
                  <br />
                  Kebayoran Baru, Jakarta Selatan
                  <br />
                  12190
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  className="inline-block text-xs uppercase tracking-widest text-gray-400 border-b border-gray-300 hover:text-batik hover:border-batik transition-colors pb-1"
                >
                  Get Directions
                </a>
              </div>
            </Reveal>

            {/* Opening Hours */}
            <Reveal delay={300}>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-batik">
                  <Clock className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Hours
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-8 text-sm text-gray-600 font-light">
                  <div>
                    <strong className="block text-ink font-medium mb-1">
                      Dinner Service
                    </strong>
                    <p>Tue — Sun</p>
                    <p>18:00 — 23:00</p>
                  </div>
                  <div>
                    <strong className="block text-ink font-medium mb-1">
                      Closed
                    </strong>
                    <p>Mondays</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Contacts */}
            <Reveal delay={500}>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-batik">
                  <Phone className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Contact
                  </span>
                </div>
                <div className="text-sm text-gray-600 font-light space-y-1">
                  <p>concierge@heritagedining.com</p>
                  <p>+62 21 5555 8888</p>
                  <p>+62 812 9999 0000 (WhatsApp)</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: MAP VISUAL */}
          <Reveal
            variant="blur"
            delay={300}
            className="relative h-[400px] md:h-auto bg-zinc-200 min-h-[400px] overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.257221375323!2d106.80383137583686!3d-6.230883660999516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f143715c0e21%3A0x6739b6b80261376d!2sJl.%20Senopati%2C%20Kebayoran%20Baru%2C%20Jakarta%20Selatan!5e0!3m2!1sen!2sid!4v1709629342221!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </Reveal>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="bg-white border-y border-subtle py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Reveal>
              <span className="text-batik text-xs font-bold tracking-[0.3em] uppercase block">
                Information
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-serif text-3xl mt-4">Guest Policies</h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Urutan delay diperbaiki: 200 -> 300 -> 500 -> 700 */}

            <Reveal delay={200} className="space-y-3">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-batik shrink-0 mt-0.5" />
                <h3 className="font-serif text-lg">Dress Code</h3>
              </div>
              <p className="text-sm text-gray-500 font-light leading-relaxed pl-8">
                Smart Casual. We kindly ask gentlemen to wear long trousers and
                covered shoes. No slippers, beachwear, or athletic attire
                please.
              </p>
            </Reveal>

            <Reveal delay={300} className="space-y-3">
              <div className="flex items-start gap-3">
                <Car className="w-5 h-5 text-batik shrink-0 mt-0.5" />
                <h3 className="font-serif text-lg">Valet Parking</h3>
              </div>
              <p className="text-sm text-gray-500 font-light leading-relaxed pl-8">
                Complimentary valet service is available for all dinner guests
                directly at our main entrance.
              </p>
            </Reveal>

            {/* ERROR FIXED: Ganti 400 jadi 500 */}
            <Reveal delay={500} className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-batik shrink-0 mt-0.5" />
                <h3 className="font-serif text-lg">Corkage Policy</h3>
              </div>
              <p className="text-sm text-gray-500 font-light leading-relaxed pl-8">
                Guests are welcome to bring their own wine. A corkage fee of IDR
                500,000++ applies per 750ml bottle. Maximum 2 bottles per table.
              </p>
            </Reveal>

            {/* Adjusted: Ganti 500 jadi 700 biar tetep ada jeda */}
            <Reveal delay={700} className="space-y-3">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-batik shrink-0 mt-0.5" />
                <h3 className="font-serif text-lg">Children</h3>
              </div>
              <p className="text-sm text-gray-500 font-light leading-relaxed pl-8">
                To maintain an intimate atmosphere, we welcome children aged 10
                and above who can enjoy our full tasting menu.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
