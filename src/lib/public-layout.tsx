import { Link } from "@tanstack/react-router";
import { useState, type ComponentProps } from "react";

type NavTo = ComponentProps<typeof Link>["to"];
import {
  Waves,
  Phone,
  MessageCircle,
  Menu,
  X,
  MapPin,
  Mail,
  Calendar,
  CheckCircle2,
  Facebook,
  Instagram,
} from "lucide-react";
import { SITE, NAV_LINKS } from "./site-data";

export function PublicHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-navy text-white shadow-lg shadow-brand/30">
            <Waves className="size-6" strokeWidth={2.4} />
          </span>
          <span className="leading-none">
            <span className="block text-[17px] font-extrabold tracking-tight text-navy">
              ABBASI FARM
            </span>
            <span className="mt-1 block text-[9px] font-semibold tracking-[0.3em] text-muted-foreground">
              SWIMMING POOL
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to as NavTo}
              className="rounded-full px-3.5 py-2 text-[13px] font-semibold text-muted-foreground transition hover:bg-brand-soft hover:text-navy"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={SITE.whatsappLink}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="hidden size-10 items-center justify-center rounded-full border border-border text-whatsapp transition hover:bg-whatsapp hover:text-white md:flex"
          >
            <MessageCircle className="size-5" />
          </a>
          <Link
            to="/booking"
            className="hidden items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-navy/20 transition hover:-translate-y-0.5 hover:bg-navy-deep sm:inline-flex"
          >
            <Calendar className="size-4" /> Book Your Slot
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="flex size-10 items-center justify-center rounded-xl border border-border text-navy xl:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-white px-6 py-4 xl:hidden">
          <nav className="grid grid-cols-2 gap-2">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to as NavTo}
                onClick={() => setOpen(false)}
                className="rounded-xl bg-surface px-4 py-3 text-sm font-semibold text-navy"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/booking"
              onClick={() => setOpen(false)}
              className="col-span-2 mt-1 flex items-center justify-center gap-2 rounded-xl bg-navy px-4 py-3 text-sm font-semibold text-white"
            >
              <Calendar className="size-4" /> Book Your Slot
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export function PageHero({
  title,
  subtitle,
  kicker,
}: {
  title: string;
  subtitle: string;
  kicker: string;
}) {
  return (
    <section className="bg-gradient-to-br from-navy-deep via-navy to-brand/80">
      <div className="mx-auto max-w-[1280px] px-6 py-20 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-soft">
          <Waves className="size-3.5" /> {kicker}
        </span>
        <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/80">{subtitle}</p>
      </div>
    </section>
  );
}

export function Squiggle({ muted }: { muted?: boolean }) {
  return (
    <svg
      width="46"
      height="10"
      viewBox="0 0 46 10"
      fill="none"
      className={`mt-3 ${muted ? "text-brand/50" : "text-brand"}`}
    >
      <path
        d="M1 6c4-6 8 6 12 0s8 6 12 0 8 6 12 0"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SectionHeading({
  kicker,
  title,
  sub,
  center,
}: {
  kicker: string;
  title: string;
  sub?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand">{kicker}</span>
      <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{title}</h2>
      {sub && <p className="mt-4 text-sm leading-7 text-muted-foreground">{sub}</p>}
      <Squiggle />
    </div>
  );
}

export function PublicFooter() {
  return (
    <footer className="bg-navy-deep text-white">
      <div className="mx-auto max-w-[1280px] px-6 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-brand text-white">
                <Waves className="size-5" />
              </span>
              <span className="leading-none">
                <span className="block text-base font-extrabold">ABBASI FARM</span>
                <span className="mt-1 block text-[9px] tracking-[0.28em] text-white/60">
                  SWIMMING POOL
                </span>
              </span>
            </div>
            <p className="mt-5 text-sm leading-6 text-white/70">
              A clean, safe and refreshing outdoor swimming experience in Muzaffargarh, designed for
              families and swimmers of all levels.
            </p>
            <div className="mt-5 flex gap-3">
              {[Facebook, Instagram, MessageCircle].map((Icon, i) => (
                <span
                  key={i}
                  className="flex size-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-brand"
                >
                  <Icon className="size-4" />
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/50">
              Quick Links
            </h3>
            <div className="mt-5 grid grid-cols-1 gap-2.5 text-sm text-white/75">
              {NAV_LINKS.map((l) => (
                <Link key={l.label} to={l.to as NavTo} className="transition hover:text-brand-soft">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/50">Facilities</h3>
            <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-white/75">
              {[
                "Changing Rooms",
                "First Aid",
                "Showers",
                "Kids Area",
                "Washrooms",
                "Seating Area",
                "Parking",
                "Swim Equipment",
              ].map((f) => (
                <span key={f} className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 shrink-0 text-brand-soft" /> {f}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/50">Contact</h3>
            <ul className="mt-5 space-y-4 text-sm text-white/75">
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand-soft" />
                <span>
                  {SITE.phone1}
                  <br />
                  {SITE.phone2}
                </span>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-soft" />
                <span>
                  {SITE.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-brand-soft" />
                <span>{SITE.email}</span>
              </li>
            </ul>
            <Link
              to="/booking"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-navy transition hover:bg-brand-soft"
            >
              <Calendar className="size-4" /> Book Your Slot
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row">
          <p>© 2026 Abbasi Farm Swimming Pool. All Rights Reserved.</p>
          <div className="flex gap-5">
            <span>Outdoor Pool</span>
            <span>•</span>
            <span>{SITE.season}</span>
            <span>•</span>
            <span>Muzaffargarh</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
