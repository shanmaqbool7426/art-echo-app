import { createFileRoute } from "@tanstack/react-router";
import { Phone, MessageCircle, Navigation, MapPin, Mail, Clock } from "lucide-react";
import { PageHero, PublicFooter, PublicHeader } from "@/lib/public-layout";
import { SITE } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Abbasi Farm Swimming Pool" },
      {
        name: "description",
        content:
          "Contact Abbasi Farm Swimming Pool in Muzaffargarh. Call, WhatsApp or get directions.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <PublicHeader />
      <PageHero
        kicker="Get In Touch"
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out for bookings, questions or directions."
      />

      <main className="mx-auto grid max-w-[1100px] gap-10 px-6 py-14 lg:grid-cols-2">
        <div>
          <div className="rounded-3xl border border-border bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-extrabold text-navy">Abbasi Farm Swimming Pool</h2>
            <div className="mt-6 space-y-5">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-brand" />
                <div>
                  <p className="font-bold text-navy">Location</p>
                  {SITE.address.map((line) => (
                    <p key={line} className="text-sm text-muted-foreground">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="mt-0.5 size-5 shrink-0 text-brand" />
                <div>
                  <p className="font-bold text-navy">Phone</p>
                  <p className="text-sm text-muted-foreground">{SITE.phone1}</p>
                  <p className="text-sm text-muted-foreground">{SITE.phone2}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail className="mt-0.5 size-5 shrink-0 text-brand" />
                <div>
                  <p className="font-bold text-navy">Email</p>
                  <p className="text-sm text-muted-foreground">{SITE.email}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="mt-0.5 size-5 shrink-0 text-brand" />
                <div>
                  <p className="font-bold text-navy">Season</p>
                  <p className="text-sm text-muted-foreground">April – September, {SITE.season}</p>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3 border-t border-border pt-6">
              <a
                href={SITE.tel1}
                className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-navy-deep"
              >
                <Phone className="size-4" /> Call Now
              </a>
              <a
                href={SITE.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-bold text-white transition hover:opacity-90"
              >
                <MessageCircle className="size-4" /> WhatsApp
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  "Abbasi Farm, Muzaffargarh",
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-bold text-navy transition hover:border-brand hover:text-brand"
              >
                <Navigation className="size-4" /> Get Directions
              </a>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border shadow-sm">
          <div className="relative flex h-full min-h-[420px] items-center justify-center bg-navy-deep">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4) 0, transparent 8%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.3) 0, transparent 7%)",
              }}
            />
            <div className="relative z-10 text-center text-white">
              <MapPin className="mx-auto size-10 text-brand-soft" />
              <p className="mt-4 font-extrabold">Abbasi Farm Swimming Pool</p>
              <p className="mt-1 text-sm text-white/70">Near Jamaal Chowk, Muzaffargarh</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  "Abbasi Farm, Muzaffargarh",
                )}`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-navy transition hover:bg-brand-soft"
              >
                <Navigation className="size-4" /> Open in Maps
              </a>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
