import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { PageHero, PublicFooter, PublicHeader } from "@/lib/public-layout";
import heroImg from "@/assets/pool-hero.jpg";
import pool1 from "@/assets/pool-1.jpg";
import pool2 from "@/assets/pool-2.jpg";
import pool3 from "@/assets/pool-3.jpg";
import pool4 from "@/assets/pool-4.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Abbasi Farm Swimming Pool" },
      {
        name: "description",
        content: "Explore the gallery of Abbasi Farm Swimming Pool in Muzaffargarh.",
      },
    ],
  }),
  component: GalleryPage,
});

const CATEGORIES = ["All", "Pool", "Facilities", "Environment", "Swimming"];

const images = [
  { src: heroImg, cat: "Pool", w: 1920, h: 1088 },
  { src: pool1, cat: "Swimming", w: 1024, h: 768 },
  { src: pool2, cat: "Environment", w: 1024, h: 768 },
  { src: pool3, cat: "Pool", w: 1024, h: 768 },
  { src: pool4, cat: "Facilities", w: 1024, h: 768 },
  { src: pool1, cat: "Pool", w: 1024, h: 768 },
  { src: heroImg, cat: "Environment", w: 1920, h: 1088 },
  { src: pool2, cat: "Swimming", w: 1024, h: 768 },
  { src: pool4, cat: "Environment", w: 1024, h: 768 },
];

function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = images.filter((img) => filter === "All" || img.cat === filter);
  const show =
    lightbox !== null ? images.filter((img) => img.cat === filter || filter === "All") : [];

  const prev = () => {
    if (lightbox === null) return;
    setLightbox((lightbox - 1 + show.length) % show.length);
  };
  const next = () => {
    if (lightbox === null) return;
    setLightbox((lightbox + 1) % show.length);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <PublicHeader />
      <PageHero
        kicker="Gallery"
        title="Moments at the Pool"
        subtitle="A glimpse of the beautiful environment, facilities and swimming experiences at Abbasi Farm."
      />

      <main className="mx-auto max-w-[1280px] px-6 py-14">
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                filter === c
                  ? "bg-navy text-white shadow-lg shadow-navy/20"
                  : "bg-surface text-muted-foreground hover:text-navy"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {filtered.map((img, i) => (
            <button
              key={`${img.cat}-${i}`}
              type="button"
              onClick={() => setLightbox(i)}
              className="group relative block w-full overflow-hidden rounded-2xl"
            >
              <img
                src={img.src}
                alt={`Abbasi Farm pool - ${img.cat}`}
                loading="lazy"
                width={img.w}
                height={img.h}
                className="w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-navy-deep/70 via-transparent to-transparent p-4 opacity-0 transition group-hover:opacity-100">
                <span className="text-sm font-bold text-white">{img.cat}</span>
                <span className="flex size-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur">
                  <Expand className="size-4" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </main>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/90 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLightbox(null)}
            className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-8"
          >
            <ChevronLeft className="size-6" />
          </button>
          <img
            src={show[lightbox]?.src}
            alt="Gallery preview"
            className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-8"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      )}

      <PublicFooter />
    </div>
  );
}
