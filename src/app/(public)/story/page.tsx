import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export default function StoryPage() {
  return (
    <div className="bg-paper text-ink overflow-x-hidden">
      {/* --- SECTION 1: HERO NARRATIVE --- */}
      <section className="min-h-[80vh] flex flex-col justify-center items-center text-center md:pt-10 px-6 pt-32 pb-20">
        <Reveal>
          <span className="text-batik text-xs font-bold tracking-[0.4em] uppercase mb-8 block">
            Our Philosophy
          </span>
        </Reveal>

        <Reveal delay={200}>
          <h1 className="font-serif text-5xl md:text-8xl leading-[0.9] text-ink mb-12 max-w-4xl">
            To honor the <br />
            <span className="italic text-batik/80">silent origins</span> <br />
            of flavor.
          </h1>
        </Reveal>

        <Reveal delay={300}>
          <div className="max-w-xl text-center space-y-6 font-light text-gray-500 leading-relaxed">
            <p>
              We believe that fine dining is not just about the plate, but the
              path it took to get there. Before the fire touches the ingredient,
              there was the soil, the rain, and the hands of the farmer.
            </p>
            <p>
              Heritage Dining is a tribute to the Indonesian archipelago—not as
              a tourist destination, but as an ancient land of spices, volcanic
              soil, and deep oceans.
            </p>
          </div>
        </Reveal>
      </section>

      {/* --- SECTION 2: THE MOTIF (KAWUNG) --- */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        <div className="relative h-[50vh] md:h-auto bg-zinc-200 overflow-hidden">
          {/* Gambar Batik dengan efek Blur In */}
          <Reveal variant="blur" className="w-full h-full absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/assets/story/motif-kawung.png')",
              }}
            >
              <div className="absolute inset-0 bg-batik/10 mix-blend-multiply"></div>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col justify-center px-8 md:px-24 py-20 bg-zinc-900 text-zinc-200">
          <Reveal>
            <span className="text-batik text-xs font-bold tracking-[0.3em] uppercase mb-6 block">
              The Motif
            </span>
          </Reveal>

          <Reveal delay={200}>
            <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">
              Kawung: <br />
              The Symbol of <span className="italic">Void</span>.
            </h2>
          </Reveal>

          <Reveal delay={300}>
            <div className="space-y-6">
              <p className="font-light text-zinc-400 leading-relaxed">
                Our visual identity is rooted in the <em>Kawung</em> batik
                motif. Historically reserved for royalty, its geometric circles
                represent the fruit of the Areca palm.
              </p>
              <p className="font-light text-zinc-400 leading-relaxed">
                More deeply, it symbolizes <em>Suwung</em> (The Void)—a state of
                purity, self-control, and the origin of all creation. We strip
                away the unnecessary to let the ingredients speak their truth.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
      {/* --- SECTION 3: THE ELEMENTS (FIXED ALIGNMENT) --- */}
      <section className="py-20 md:py-32 bg-paper px-0 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16 px-6">
            <Reveal>
              <h2 className="font-serif text-4xl md:text-5xl text-ink">
                The Four Elements
              </h2>
              <p className="text-gray-500 mt-4 max-w-lg mx-auto font-light">
                The ancient forces that shape our archipelago and define our
                flavor palette.
              </p>
              <div className="w-16 h-[1px] bg-batik mx-auto mt-6"></div>
            </Reveal>
          </div>

          {/* ELEMENTAL ACCORDION CONTAINER */}
          <Reveal
            delay={200}
            className="w-full h-auto md:h-[70vh] flex flex-col md:flex-row gap-2 md:gap-0 overflow-hidden md:rounded-3xl shadow-2xl shadow-black/10"
          >
            {/* ITEM 1: SOIL */}
            <div className="group relative w-full md:w-auto md:flex-1 hover:grow-[3] transition-all duration-700 ease-cubic h-[400px] md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-paper/20">
              <Image
                src="/assets/story/element-soil.png"
                alt="Soil"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

              {/* Content Box - Added min-w to prevent text squishing */}
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 flex flex-col justify-end h-full">
                {/* Text Wrapper: Whitespace nowrap biar gak turun baris */}
                <div className="min-w-[300px]">
                  <span className="text-batik/80 font-bold tracking-[0.3em] text-xs uppercase mb-2 block translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    01 — Origins
                  </span>
                  <h3 className="text-3xl md:text-5xl font-serif text-white mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 whitespace-nowrap">
                    Bumi{" "}
                    <span className="text-lg md:text-2xl italic font-light text-white/60 ml-2">
                      (Soil)
                    </span>
                  </h3>

                  <div className="max-w-md opacity-100 md:opacity-0 md:max-h-0 group-hover:opacity-100 group-hover:max-h-[200px] transition-all duration-700 ease-out text-white/80 font-light leading-relaxed text-sm md:text-base overflow-hidden whitespace-normal">
                    <p className="pb-2">
                      Volcanic ash that nourishes our roots. We source our
                      tubers and spices directly from the high-altitude farms of
                      Java's mountains.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ITEM 2: OCEAN */}
            <div className="group relative w-full md:w-auto md:flex-1 hover:grow-[3] transition-all duration-700 ease-cubic h-[400px] md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-paper/20">
              <Image
                src="/assets/story/element-ocean.png"
                alt="Ocean"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

              <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 flex flex-col justify-end h-full">
                <div className="min-w-[300px]">
                  <span className="text-cyan-400/80 font-bold tracking-[0.3em] text-xs uppercase mb-2 block translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    02 — Depth
                  </span>
                  <h3 className="text-3xl md:text-5xl font-serif text-white mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 whitespace-nowrap">
                    Segara{" "}
                    <span className="text-lg md:text-2xl italic font-light text-white/60 ml-2">
                      (Ocean)
                    </span>
                  </h3>

                  <div className="max-w-md opacity-100 md:opacity-0 md:max-h-0 group-hover:opacity-100 group-hover:max-h-[200px] transition-all duration-700 ease-out text-white/80 font-light leading-relaxed text-sm md:text-base overflow-hidden whitespace-normal">
                    <p className="pb-2">
                      The deep belts of the archipelago. Our seafood is
                      line-caught by local fishermen in the pristine waters of
                      Maluku and Bali.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ITEM 3: FOREST */}
            <div className="group relative w-full md:w-auto md:flex-1 hover:grow-[3] transition-all duration-700 ease-cubic h-[400px] md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-paper/20">
              <Image
                src="/assets/story/element-forest.png"
                alt="Forest"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

              <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 flex flex-col justify-end h-full">
                <div className="min-w-[300px]">
                  <span className="text-emerald-400/80 font-bold tracking-[0.3em] text-xs uppercase mb-2 block translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    03 — Life
                  </span>
                  <h3 className="text-3xl md:text-5xl font-serif text-white mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 whitespace-nowrap">
                    Wana{" "}
                    <span className="text-lg md:text-2xl italic font-light text-white/60 ml-2">
                      (Forest)
                    </span>
                  </h3>

                  <div className="max-w-md opacity-100 md:opacity-0 md:max-h-0 group-hover:opacity-100 group-hover:max-h-[200px] transition-all duration-700 ease-out text-white/80 font-light leading-relaxed text-sm md:text-base overflow-hidden whitespace-normal">
                    <p className="pb-2">
                      Foraged ferns, rare mushrooms, and wild honey collected
                      from the humid, ancient canopies of Sumatra and
                      Kalimantan.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ITEM 4: FIRE */}
            <div className="group relative w-full md:w-auto md:flex-1 hover:grow-[3] transition-all duration-700 ease-cubic h-[400px] md:h-full overflow-hidden">
              <Image
                src="/assets/story/element-fire.png"
                alt="Fire"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

              <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 flex flex-col justify-end h-full">
                <div className="min-w-[300px]">
                  <span className="text-orange-400/80 font-bold tracking-[0.3em] text-xs uppercase mb-2 block translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    04 — Soul
                  </span>
                  <h3 className="text-3xl md:text-5xl font-serif text-white mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 whitespace-nowrap">
                    Agni{" "}
                    <span className="text-lg md:text-2xl italic font-light text-white/60 ml-2">
                      (Fire)
                    </span>
                  </h3>

                  <div className="max-w-md opacity-100 md:opacity-0 md:max-h-0 group-hover:opacity-100 group-hover:max-h-[200px] transition-all duration-700 ease-out text-white/80 font-light leading-relaxed text-sm md:text-base overflow-hidden whitespace-normal">
                    <p className="pb-2">
                      The great transformation. Using traditional charcoal and
                      ancient claypots to unlock the deepest soul of every raw
                      ingredient.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      {/* --- SECTION 4: CHEF QUOTE --- */}
      <section className="bg-batik text-paper py-32 px-6 text-center">
        <Reveal>
          <div className="max-w-3xl mx-auto space-y-8">
            <p className="font-serif text-3xl md:text-5xl italic leading-tight">
              "We are not inventors. We are merely translators of what nature
              has already written."
            </p>
            <div className="font-sans text-xs uppercase tracking-[0.2em] opacity-80">
              — Executive Chef
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
