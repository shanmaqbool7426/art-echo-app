import { createFileRoute } from "@tanstack/react-router";
import {
  LifeBuoy,
  Shirt,
  Baby,
  UsersRound,
  TriangleAlert,
  Ban,
  Footprints,
  Siren,
  ShieldAlert,
  Info,
  ArrowRight,
} from "lucide-react";
import { PageHero, PublicFooter, PublicHeader } from "@/lib/public-layout";
import { RULES } from "@/lib/site-data";

export const Route = createFileRoute("/rules")({
  head: () => ({
    meta: [
      { title: "Rules & Regulations | Abbasi Farm Swimming Pool" },
      {
        name: "description",
        content:
          "Read the rules and safety guidelines for Abbasi Farm Swimming Pool in Muzaffargarh.",
      },
    ],
  }),
  component: RulesPage,
});

const icons = [LifeBuoy, Shirt, Baby, UsersRound, Info, Ban, Footprints, Siren];

const toneStyles = {
  warning: {
    chip: "bg-amber-100 text-amber-600",
    border: "border-amber-200",
    icon: TriangleAlert,
  },
  info: { chip: "bg-brand-soft text-brand", border: "border-brand/30", icon: Info },
  danger: { chip: "bg-rose-100 text-rose-600", border: "border-rose-200", icon: ShieldAlert },
} as const;

function RulesPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <PublicHeader />
      <PageHero
        kicker="Rules & Safety"
        title="Rules & Regulations"
        subtitle="Please follow these guidelines to ensure a safe and enjoyable experience for everyone."
      />

      <main className="mx-auto max-w-[1280px] px-6 py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {RULES.map((rule, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={rule.title}
                className={`rounded-2xl border bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg ${toneStyles[rule.tone].border}`}
              >
                <span
                  className={`flex size-12 items-center justify-center rounded-xl ${toneStyles[rule.tone].chip}`}
                >
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-4 font-extrabold text-navy">{rule.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{rule.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-3xl bg-navy-deep p-8 text-white sm:flex-row sm:p-10">
          <div>
            <h2 className="text-2xl font-extrabold">Still have questions?</h2>
            <p className="mt-2 text-white/75">
              Read our FAQs or contact us directly — we're happy to help.
            </p>
          </div>
          <a
            href="/faq"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-navy transition hover:bg-brand-soft"
          >
            View FAQs <ArrowRight className="size-4" />
          </a>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
