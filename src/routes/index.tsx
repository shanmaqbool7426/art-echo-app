import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Waves,
  Calendar,
  Clock,
  Users,
  MessageCircle,
  ShieldCheck,
  LifeBuoy,
  BriefcaseMedical,
  CircleParking,
  Baby,
  Ruler,
  ArrowDownToLine,
  UsersRound,
  Thermometer,
  Sun,
  CheckCircle2,
  Armchair,
  ShowerHead,
  DoorOpen,
  Toilet,
  Dumbbell,
  Eye,
  ChevronDown,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import heroImg from "@/assets/pool-hero.jpg";
import pool1 from "@/assets/pool-1.jpg";
import pool2 from "@/assets/pool-2.jpg";
import pool4 from "@/assets/pool-4.jpg";
import { PublicHeader, PublicFooter, SectionHeading, Squiggle } from "@/lib/public-layout";
import { SITE, POOL_SPECS, FACILITIES, FAQS } from "@/lib/site-data";

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
    ],
  }),
  component: Index,
});

const facilityIcons = [
  DoorOpen,
  ShowerHead,
  CircleParking,
  Toilet,
  BriefcaseMedical,
  Baby,
  Armchair,
  Dumbbell,
];

const timeSlots = [
  { time: "05:00 PM – 06:00 PM", spots: 18, total: 30, status: "available" },
  { time: "06:00 PM – 07:00 PM", spots: 8, total: 30, status: "few" },
  { time: "07:00 PM – 08:00 PM", spots: 0, total: 30, status: "full" },
] as const;

function SlotCard({ slot }: { slot: (typeof timeSlots)[number] }) {
  const [selected, setSelected] = useState(false);
  const status =
    slot.status === "available"
      ? { label: `${slot.spots} Spots Available`, cls: "text-emerald-600", tone: "bg-emerald-100" }
      : slot.status === "few"
        ? { label: `${slot.spots} Spots Left`, cls: "text-amber-600", tone: "bg-amber-100" }
        : { label: "Fully Booked", cls: "text-rose-600", tone: "bg-rose-100" };

  return (
    <button
      type="button"
      onClick={() => setSelected((s) => !s)}
      disabled={slot.status === "full"}
      className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition ${
        selected
          ? "border-brand bg-brand-soft ring-2 ring-brand"
          : slot.status === "full"
            ? "cursor-not-allowed border-border bg-surface opacity-60"
            : "border-border bg-white hover:border-brand/60"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex size-9 items-center justify-center rounded-lg ${
            selected ? "bg-brand text-white" : "bg-surface text-muted-foreground"
          }`}
        >
          <Clock className="size-4" />
        </span>
        <div>
          <p className="text-sm font-bold text-navy">{slot.time}</p>
          <p className={`mt-0.5 text-xs font-semibold ${status.cls}`}>{status.label}</p>
        </div>
      </div>
      {selected && (
        <span className="flex size-6 items-center justify-center rounded-full bg-brand text-white">
          <CheckCircle2 className="size-4" />
        </span>
      )}
    </button>
  );
}

const weekSchedule = [
  { day: "Monday", morning: "–", evening: "05:00 – 08:00 PM" },
  { day: "Tuesday", morning: "–", evening: "05:00 – 08:00 PM" },
  { day: "Wednesday", morning: "–", evening: "05:00 – 08:00 PM" },
  { day: "Thursday", morning: "–", evening: "05:00 – 08:00 PM" },
  { day: "Friday", morning: "12:00 – 02:00 PM", evening: "05:00 – 08:00 PM" },
  { day: "Saturday", morning: "10:00 AM – 12:00 PM", evening: "05:00 – 08:00 PM" },
  { day: "Sunday", morning: "10:00 AM – 12:00 PM", evening: "05:00 – 08:00 PM" },
];

const packages = [
  {
    name: "Single Visit",
    price: "PKR XXX",
    features: ["Access for 1 slot", "Life jackets included", "Kids area access"],
    featured: false,
  },
  {
    name: "Family Day",
    price: "PKR XXX",
    features: [
      "Up to 5 visitors",
      "1 full day access",
      "Life jackets included",
      "Seating area booking",
    ],
    featured: true,
  },
  {
    name: "Season Pass",
    price: "PKR XXX",
    features: ["Entire season access", "Priority slot booking", "Family discounts"],
    featured: false,
  },
];

function Index() {
  const [activeTab, setActiveTab] = useState("timings");

  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <PublicHeader />

      {/* Hero */}
      <section className="relative">
        <img
          src={heroImg}
          alt="Abbasi Farm outdoor swimming pool at sunset"
          width={1920}
          height={1088}
          className="h-[640px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/85 via-navy-deep/45 to-transparent" />
        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-[1280px] items-center px-6">
            <div className="max-w-2xl pb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.14em] text-white backdrop-blur">
                <span className="size-1.5 rounded-full bg-brand-soft" />
                Outdoor Pool • April – September
              </div>
              <h1 className="mt-5 text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-7xl">
                Swim. Relax.
                <br />
                <span className="text-brand-soft">Enjoy.</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8 text-white/85">
                A clean, safe and refreshing swimming experience in Muzaffargarh.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/booking"
                  className="inline-flex items-center gap-2.5 rounded-full bg-brand px-7 py-3.5 text-sm font-bold text-navy shadow-xl shadow-brand/40 transition hover:-translate-y-0.5"
                >
                  <Calendar className="size-4" /> Book Your Slot
                </a>
                <a
                  href="#pool"
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
                >
                  Explore Our Pool <Waves className="size-4" />
                </a>
              </div>

              {/* Floating pool info */}
              <div className="mt-10 hidden max-w-md rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md sm:block">
                <div className="flex items-center gap-2 text-white">
                  <Sparkles className="size-4 text-brand-soft" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Pool Information
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {POOL_SPECS.map((s) => (
                    <div key={s.label} className="text-white">
                      <p className="text-sm font-extrabold">{s.value}</p>
                      <p className="mt-0.5 text-[10px] uppercase tracking-wide text-white/60">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Booking */}
      <section className="relative z-10 mx-auto -mt-10 max-w-[1280px] px-6">
        <div className="rounded-3xl border border-border bg-white p-6 shadow-2xl shadow-navy/10 sm:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-navy">
                Book Your Swimming Slot
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Reserve your time in advance — simple and instant.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
              <span className="text-brand">01 Date</span>→<span>02 Time</span>→
              <span>03 Visitors</span>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
            <div className="rounded-2xl border border-border bg-surface p-4">
              <p className="text-xs font-bold text-muted-foreground">Select Date</p>
              <div className="mt-3 flex items-center justify-between text-sm font-bold text-navy">
                <button aria-label="Previous month" className="size-7 rounded-lg hover:bg-white">
                  ‹
                </button>
                <span>August 2026</span>
                <button aria-label="Next month" className="size-7 rounded-lg hover:bg-white">
                  ›
                </button>
              </div>
              <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-muted-foreground">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
              <div className="mt-2 grid grid-cols-7 gap-1 text-center text-xs">
                {Array.from({ length: 31 }).map((_, i) => {
                  const date = i + 1;
                  const today = date === 28;
                  const disabled = date < 28;
                  return (
                    <span
                      key={date}
                      className={`flex aspect-square items-center justify-center rounded-lg font-semibold ${
                        today
                          ? "bg-brand text-white shadow-md shadow-brand/30"
                          : disabled
                            ? "text-muted-foreground/40 line-through"
                            : "text-navy hover:bg-brand-soft"
                      }`}
                    >
                      {date}
                    </span>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-muted-foreground">Select Time</p>
              <div className="mt-3 space-y-3">
                {timeSlots.map((slot) => (
                  <SlotCard key={slot.time} slot={slot} />
                ))}
              </div>
              <div className="mt-5 flex flex-col gap-3 rounded-2xl bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <Users className="size-5 text-brand" />
                  <div>
                    <p className="text-sm font-bold text-navy">2 Adults · 1 Child</p>
                    <p className="text-xs text-muted-foreground">3 visitors total</p>
                  </div>
                </div>
                <a
                  href="/booking"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-navy-deep"
                >
                  Continue <ArrowRight className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-surface py-20">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-6 lg:grid-cols-2">
          <div className="relative">
            <img
              src={pool2}
              alt="Abbasi Farm pool"
              width={1024}
              height={768}
              className="h-[380px] w-full rounded-3xl object-cover shadow-2xl shadow-navy/10 sm:h-[460px]"
            />
            <div className="absolute -bottom-6 left-6 rounded-2xl bg-navy px-6 py-5 text-white shadow-xl">
              <p className="text-3xl font-extrabold">{SITE.season.split(" ")[0]}–Sep</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-white/70">Outdoor Season</p>
            </div>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
              About Us
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Welcome to Abbasi Farm Swimming Pool
            </h2>
            <Squiggle />
            <p className="mt-5 leading-7 text-muted-foreground">
              Nestled in Muzaffargarh, Abbasi Farm Swimming Pool offers a clean, relaxing and safe
              swimming experience for families, friends and fitness enthusiasts. Our outdoor pool is
              maintained to the highest standard so every visit feels refreshing and worry-free.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { v: "22 × 45 ft", l: "Pool Size" },
                { v: "5–7 ft", l: "Depth" },
                { v: "25–30", l: "Capacity" },
                { v: "Apr–Sep", l: "Season" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-border bg-white p-4">
                  <p className="text-xl font-extrabold text-navy">{s.v}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.l}</p>
                </div>
              ))}
            </div>
            <a
              href="#pool"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-navy-deep"
            >
              Learn More <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section id="facilities" className="py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading
            center
            kicker="Facilities"
            title="Everything You Need for a Great Swim"
            sub="Thoughtful amenities designed for comfort, safety and a premium experience."
          />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {FACILITIES.map((f, i) => {
              const Icon = facilityIcons[i % facilityIcons.length];
              return (
                <div
                  key={f.name}
                  className="group rounded-2xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10"
                >
                  <span className="flex size-12 items-center justify-center rounded-xl bg-brand-soft text-brand transition group-hover:bg-brand group-hover:text-white">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-4 font-bold text-navy">{f.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pool Details */}
      <section id="pool" className="bg-navy-deep py-20 text-white">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-soft">
                Pool Details
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Our Pool, In Numbers
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-white/70">
              An outdoor pool built for relaxation and recreation, with a safe shallow kids' area.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3">
            {[
              { icon: Waves, label: "Pool Type", value: "Outdoor" },
              { icon: Ruler, label: "Pool Size", value: "22 × 45 ft" },
              { icon: ArrowDownToLine, label: "Depth", value: "5 – 7 ft" },
              { icon: UsersRound, label: "Capacity", value: "25 – 30 People" },
              { icon: Thermometer, label: "Temperature", value: "Natural Climate" },
              { icon: Sun, label: "Season", value: "April – September" },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:bg-white/10"
              >
                <Icon className="size-7 text-brand-soft" />
                <p className="mt-5 text-xs uppercase tracking-wider text-white/60">{label}</p>
                <p className="mt-1 text-lg font-extrabold">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety */}
      <section className="py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                kicker="Safety First"
                title="Your Safety Comes First"
                sub="We take safety seriously, so every guest can relax with complete peace of mind."
              />
              <div className="mt-8 rounded-2xl border-l-4 border-amber-400 bg-amber-50 p-5">
                <div className="flex items-center gap-3">
                  <LifeBuoy className="size-6 text-amber-500" />
                  <h3 className="font-bold text-amber-700">Children & Non-Swimmers</h3>
                </div>
                <p className="mt-2 text-sm leading-6 text-amber-800">
                  Children and non-swimmers must wear safety jackets / life jackets while using the
                  pool.
                </p>
              </div>
              <a
                href="/rules"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-navy-deep"
              >
                View Safety Rules <ShieldCheck className="size-4" />
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: BriefcaseMedical, title: "First Aid Available", desc: "On-site supplies" },
                { icon: LifeBuoy, title: "Lifeguard on Request", desc: "Supervised sessions" },
                { icon: ShieldCheck, title: "Safety Equipment", desc: "Jackets & floaters" },
                { icon: UsersRound, title: "Controlled Capacity", desc: "Never overcrowded" },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:shadow-lg"
                >
                  <span className="flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-4 font-bold text-navy">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timings & Pricing */}
      <section id="pricing" className="bg-surface py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading
            center
            kicker="Plan Your Visit"
            title="Timings & Pricing"
            sub="Flexible slots and simple pricing for visitors, families and regular swimmers."
          />

          <div className="mt-10 flex justify-center gap-2 rounded-full border border-border bg-white p-1.5 shadow-sm">
            {[
              { key: "timings", label: "Pool Timings" },
              { key: "entry", label: "Entry Fees" },
              { key: "packages", label: "Packages" },
            ].map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setActiveTab(t.key)}
                className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                  activeTab === t.key ? "bg-navy text-white shadow" : "text-muted-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-10">
            {activeTab === "timings" && (
              <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-navy text-white">
                    <tr>
                      <th className="px-6 py-4 text-sm font-bold">Day</th>
                      <th className="px-6 py-4 text-sm font-bold">Morning</th>
                      <th className="px-6 py-4 text-sm font-bold">Evening</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weekSchedule.map((d) => (
                      <tr key={d.day} className="border-b border-border last:border-0">
                        <td className="px-6 py-4 font-bold text-navy">{d.day}</td>
                        <td className="px-6 py-4 text-muted-foreground">{d.morning}</td>
                        <td className="px-6 py-4 text-muted-foreground">{d.evening}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "entry" && (
              <div className="mx-auto max-w-lg rounded-2xl border border-border bg-white p-8 text-center shadow-sm">
                <Waves className="mx-auto size-10 text-brand" />
                <h3 className="mt-4 text-xl font-extrabold text-navy">Entry Fee</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Individual entry per visitor, per slot. Entry fees will be confirmed soon.
                </p>
                <div className="mt-6 rounded-2xl bg-surface p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Per Visitor / Slot
                  </p>
                  <p className="mt-2 text-4xl font-extrabold text-navy">PKR XXX</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Final pricing to be announced
                  </p>
                </div>
                <a
                  href="/booking"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3 text-sm font-bold text-white transition hover:bg-navy-deep"
                >
                  Book Now <Calendar className="size-4" />
                </a>
              </div>
            )}

            {activeTab === "packages" && (
              <div className="grid gap-6 md:grid-cols-3">
                {packages.map((p) => (
                  <div
                    key={p.name}
                    className={`relative flex flex-col rounded-3xl border bg-white p-7 ${
                      p.featured
                        ? "border-brand shadow-2xl shadow-brand/20 ring-2 ring-brand"
                        : "border-border shadow-sm"
                    }`}
                  >
                    {p.featured && (
                      <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-brand px-4 py-1 text-xs font-bold text-navy">
                        Most Popular
                      </span>
                    )}
                    <h3 className="text-lg font-extrabold text-navy">{p.name}</h3>
                    <p className="mt-4 text-3xl font-extrabold text-brand">{p.price}</p>
                    <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5">
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="/booking"
                      className={`mt-8 rounded-full py-3 text-center text-sm font-bold transition ${
                        p.featured
                          ? "bg-navy text-white hover:bg-navy-deep"
                          : "border border-border text-navy hover:border-brand hover:text-brand"
                      }`}
                    >
                      Book Now
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <SectionHeading
                kicker="Gallery"
                title="A Glimpse of the Pool"
                sub="Breathtaking moments from around the pool and its surroundings."
              />
            </div>
            <a
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-bold text-navy transition hover:border-brand hover:text-brand"
            >
              View Full Gallery <ArrowRight className="size-4" />
            </a>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[pool1, pool2, heroImg, pool4].map((src, i) => (
              <a key={i} href="/gallery" className="group relative overflow-hidden rounded-2xl">
                <img
                  src={src}
                  alt={`Pool view ${i + 1}`}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-52 w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-navy/0 opacity-0 transition group-hover:bg-navy/30 group-hover:opacity-100">
                  <span className="flex size-12 items-center justify-center rounded-full bg-white text-navy">
                    <Eye className="size-5" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ preview */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading
            center
            kicker="FAQs"
            title="Frequently Asked Questions"
            sub="Quick answers to the questions we hear most often."
          />
          <div className="mt-10 space-y-3">
            {FAQS.slice(0, 4).map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-border bg-white p-5 open:shadow-lg"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-navy">
                  {f.q}
                  <ChevronDown className="size-5 shrink-0 text-brand transition group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-6 text-center">
            <a
              href="/faq"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand hover:underline"
            >
              View all FAQs <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="relative overflow-hidden bg-navy-deep py-16">
        <div className="absolute -right-20 -top-20 size-72 rounded-full bg-brand/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 size-72 rounded-full bg-brand/10 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <MessageCircle className="mx-auto size-10 text-brand-soft" />
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Ready for a Refreshing Swim?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/75">
            Book your slot online in under a minute, or reach out to us on WhatsApp for any
            questions.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="/booking"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-bold text-navy transition hover:-translate-y-0.5"
            >
              <Calendar className="size-4" /> Book Your Slot
            </a>
            <a
              href={SITE.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/20"
            >
              <MessageCircle className="size-4" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
