import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, MessageCircle, Phone } from "lucide-react";
import { PageHero, PublicFooter, PublicHeader } from "@/lib/public-layout";
import { FAQS, SITE } from "@/lib/site-data";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQs | Abbasi Farm Swimming Pool" },
      {
        name: "description",
        content: "Frequently asked questions about Abbasi Farm Swimming Pool in Muzaffargarh.",
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <PublicHeader />
      <PageHero
        kicker="Help Center"
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about visiting and booking at Abbasi Farm Swimming Pool."
      />

      <main className="mx-auto max-w-3xl px-6 py-14">
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <div
              key={f.q}
              className={`overflow-hidden rounded-2xl border bg-white transition ${
                open === i ? "border-brand/40 shadow-lg shadow-brand/5" : "border-border"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-bold text-navy">{f.q}</span>
                <ChevronDown
                  className={`size-5 shrink-0 text-brand transition ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <div className="border-t border-border px-6 py-5 text-sm leading-6 text-muted-foreground">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-surface p-8 text-center">
          <MessageCircle className="mx-auto size-8 text-brand" />
          <h2 className="mt-3 text-xl font-extrabold text-navy">Still need help?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Reach out to us and we'll be happy to answer any questions.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={SITE.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-bold text-white transition hover:opacity-90"
            >
              <MessageCircle className="size-4" /> WhatsApp
            </a>
            <a
              href={SITE.tel1}
              className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-navy-deep"
            >
              <Phone className="size-4" /> Call Us
            </a>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
