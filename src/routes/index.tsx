import { createFileRoute } from "@tanstack/react-router";
import {
  Calendar,
  Clock,
  Users,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  LifeBuoy,
  BriefcaseMedical,
  CircleParking,
  Baby,
  Waves,
  Ruler,
  ArrowDownToLine,
  UsersRound,
  Thermometer,
  Sun,
  CheckCircle2,
  MessageCircle,
  Facebook,
  Instagram,
} from "lucide-react";

import heroImg from "@/assets/pool-hero.jpg";
import pool1 from "@/assets/pool-1.jpg";
import pool2 from "@/assets/pool-2.jpg";
import pool3 from "@/assets/pool-3.jpg";
import pool4 from "@/assets/pool-4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abbasi Farm Swimming Pool | Muzaffargarh's Premium Outdoor Pool" },
      {
        name: "description",
        content:
          "Book your slot at Abbasi Farm Swimming Pool in Muzaffargarh — a clean, safe outdoor pool with life jackets, kids area, parking and first aid.",
      },
      { property: "og:title", content: "Abbasi Farm Swimming Pool | Muzaffargarh" },
      {
        property: "og:description",
        content:
          "A perfect place for swimmers to refresh, relax and enjoy in a clean and safe environment. Book your slot today.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const navLinks = ["Home", "About", "Facilities", "Timings & Prices", "Gallery", "Rules", "Contact"];

const features = [
  { icon: ShieldCheck, title: "Clean & Safe Pool", sub: "Regularly cleaned & tested" },
  { icon: LifeBuoy, title: "Life Jackets", sub: "For kids & non-swimmers" },
  { icon: BriefcaseMedical, title: "First Aid", sub: "Always available" },
  { icon: CircleParking, title: "Parking Available", sub: "Spacious parking area" },
  { icon: Baby, title: "Kids Area", sub: "Separate kids area" },
];

const details = [
  { icon: Waves, label: "Type", value: "Outdoor Pool" },
  { icon: Ruler, label: "Size", value: "22 ft × 45 ft" },
  { icon: ArrowDownToLine, label: "Depth", value: "5 ft to 7 ft" },
  { icon: UsersRound, label: "Capacity", value: "25 – 30 People" },
  { icon: Thermometer, label: "Temperature", value: "Natural Climate" },
  { icon: Sun, label: "Season", value: "April to September" },
];

const gallery = [pool1, heroImg, pool2, pool4, pool3, pool1];

function Squiggle() {
  return (
    <svg width="46" height="10" viewBox="0 0 46 10" fill="none" className="mt-2 text-brand">
      <path
        d="M1 6c4-6 8 6 12 0s8 6 12 0 8 6 12 0"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-md bg-brand-soft text-brand">
              <Waves className="size-5" />
            </div>
            <div className="leading-none">
              <div className="text-lg font-extrabold tracking-tight text-navy">ABBASI FARM</div>
              <div className="text-[10px] font-medium tracking-[0.25em] text-muted-foreground">
                SWIMMING POOL
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((l, i) => (
              <a
                key={l}
                href="#"
                className={`relative py-5 text-sm font-medium transition-colors hover:text-brand ${
                  i === 0 ? "text-navy" : "text-muted-foreground"
                }`}
              >
                {l}
                {i === 0 && (
                  <span className="absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-navy" />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <span className="hidden items-center gap-2 text-sm font-semibold text-navy md:flex">
              <Phone className="size-4 text-brand" />
              +92 312 9668880
            </span>
            <a
              href="#book"
              className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              Book Now
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <img
          src={heroImg}
          alt="Abbasi Farm outdoor swimming pool at sunset"
          width={1920}
          height={1088}
          className="h-[560px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/80 via-navy-deep/40 to-transparent" />

        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-[1400px] items-center px-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-background/15 px-3 py-1.5 backdrop-blur">
                <span className="flex size-6 items-center justify-center rounded-full bg-brand/90">
                  <Waves className="size-3.5 text-background" />
                </span>
                <span className="text-[11px] font-bold tracking-[0.15em] text-background">
                  MUZAFFARGARH'S PREMIUM OUTDOOR POOL
                </span>
              </div>

              <h1 className="mt-4 text-6xl font-extrabold leading-[1.05] tracking-tight text-background">
                Enjoy. Swim.
                <br />
                Relax. <span className="text-brand">Repeat.</span>
              </h1>

              <p className="mt-5 max-w-md text-base text-background/85">
                A perfect place for swimmers to refresh, relax and enjoy in a clean and safe
                environment.
              </p>

              <div className="mt-7 flex flex-wrap gap-4">
                <a
                  href="#book"
                  className="inline-flex items-center gap-2.5 rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                >
                  Book Your Slot <Calendar className="size-4" />
                </a>
                <a
                  href="https://wa.me/923129668880"
                  className="inline-flex items-center gap-2.5 rounded-full bg-whatsapp px-7 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                >
                  WhatsApp Now <MessageCircle className="size-4" />
                </a>
              </div>
            </div>

            {/* Booking card */}
            <div
              id="book"
              className="ml-auto hidden w-[300px] rounded-lg bg-background p-6 shadow-2xl lg:block"
            >
              <h2 className="text-lg font-bold text-navy">Book Your Slot</h2>
              <p className="mt-1 text-xs text-muted-foreground">Reserve your time in advance</p>

              <div className="mt-4 space-y-3">
                {[
                  { label: "Select Date", icon: Calendar },
                  { label: "Select Time", icon: Clock },
                  { label: "Select People", icon: Users },
                ].map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-md border border-border px-3 py-2.5 text-sm text-muted-foreground"
                  >
                    {label}
                    <Icon className="size-4" />
                  </div>
                ))}
                <button className="w-full rounded-md bg-navy py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90">
                  Check Availability
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feature bar */}
        <div className="mx-auto -mb-10 max-w-[1180px] translate-y-[-44px] px-6">
          <div className="grid grid-cols-2 divide-border rounded-md bg-background px-6 py-5 shadow-xl md:grid-cols-5 md:divide-x">
            {features.map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex items-center gap-3 px-4 py-2">
                <Icon className="size-6 shrink-0 text-brand" />
                <div>
                  <div className="text-sm font-semibold text-navy">{title}</div>
                  <div className="text-xs text-muted-foreground">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-surface pb-16 pt-14">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-start gap-8 px-6 lg:grid-cols-[0.95fr_1.05fr_1fr_0.8fr]">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-navy">About Abbasi Farm</h2>
            <Squiggle />
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              Abbasi Farm Swimming Pool is an outdoor swimming destination in Muzaffargarh. We
              provide a safe, clean and enjoyable environment for swimmers of all ages. Our pool is
              perfect for fitness, recreation and family time.
            </p>
            <a
              href="#"
              className="mt-6 inline-block rounded-md bg-navy px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              Read More
            </a>
          </div>

          <img
            src={pool2}
            alt="Abbasi Farm pool surrounded by palm trees"
            loading="lazy"
            width={1024}
            height={768}
            className="h-[200px] w-full rounded-md object-cover shadow-lg"
          />

          <div>
            <h3 className="text-2xl font-extrabold tracking-tight text-navy">Pool Details</h3>
            <Squiggle />
            <dl className="mt-5 space-y-3">
              {details.map(({ icon: Icon, label, value }) => (
                <div key={label} className="grid grid-cols-[24px_110px_1fr] items-center text-sm">
                  <Icon className="size-4 text-navy" />
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="font-medium text-navy">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-md bg-navy p-6 text-center">
            <LifeBuoy className="mx-auto size-8 text-brand" />
            <h4 className="mt-3 text-base font-bold text-background">Important Note</h4>
            <p className="mt-2 text-xs leading-5 text-background/80">
              Kids and non-swimmers must wear safety jackets or life jackets while using the pool.
            </p>
          </div>
        </div>
      </section>


      {/* Gallery */}
      <section className="bg-background py-14">
        <div className="mx-auto max-w-[1180px] px-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-navy">Our Gallery</h2>
          <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
            {gallery.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Abbasi Farm swimming pool view ${i + 1}`}
                loading="lazy"
                width={1024}
                height={768}
                className="h-24 w-full rounded-md object-cover shadow-md transition-transform hover:scale-[1.03]"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-background">
        <div className="mx-auto max-w-[1180px] px-6 py-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-base font-bold">Contact Us</h3>
              <ul className="mt-5 space-y-4 text-sm text-background/80">
                <li className="flex gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-brand" />
                  <span>
                    +92 312 9668880
                    <br />
                    0334 6014382
                  </span>
                </li>
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
                  <span>
                    Mehmood Kot Road,
                    <br />
                    Near Jamaal Chowk,
                    <br />
                    Muzaffargarh
                  </span>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-brand" />
                  <span>info@abbasifarm.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-bold">Quick Links</h3>
              <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-background/80">
                {navLinks.map((l) => (
                  <a key={l} href="#" className="hover:text-brand">
                    {l}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold">Facilities</h3>
              <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-background/80">
                {[
                  "Changing Rooms",
                  "First Aid",
                  "Showers",
                  "Kids Area",
                  "Washrooms",
                  "Seating Area",
                  "Parking",
                  "Swimming Equipment",
                ].map((f) => (
                  <span key={f} className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 shrink-0 text-brand" />
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold">Find Us</h3>
              <div className="mt-5 flex gap-4">
                <div className="flex size-24 w-28 items-center justify-center rounded-md bg-background/10">
                  <MapPin className="size-7 text-destructive" />
                </div>
                <div className="text-sm text-background/80">
                  Near Jamaal Chowk,
                  <br />
                  Mehmood Kot Road,
                  <br />
                  Muzaffargarh
                  <a
                    href="#"
                    className="mt-3 inline-block rounded-md bg-background/10 px-4 py-2 text-xs font-semibold text-background hover:bg-background/20"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-background/15 pt-6 text-xs text-background/70 sm:flex-row">
            <p>© 2026 Abbasi Farm Swimming Pool. All Rights Reserved.</p>
            <div className="flex gap-4">
              <Facebook className="size-4" />
              <Instagram className="size-4" />
              <MessageCircle className="size-4" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
