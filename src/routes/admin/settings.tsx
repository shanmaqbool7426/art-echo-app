import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Waves,
  SlidersHorizontal,
  Clock,
  ImageIcon,
  ShieldCheck,
  FileQuestion,
  BellRing,
  Settings,
  Save,
  X,
  Eye,
  Plus,
  Trash2,
} from "lucide-react";
import { AdminShell } from "../admin";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

const SECTIONS = [
  { key: "pool", label: "Pool Information", icon: Waves },
  { key: "pricing", label: "Pricing", icon: SlidersHorizontal },
  { key: "timings", label: "Timings", icon: Clock },
  { key: "facilities", label: "Facilities", icon: Waves },
  { key: "gallery", label: "Gallery", icon: ImageIcon },
  { key: "rules", label: "Rules & Safety", icon: ShieldCheck },
  { key: "faqs", label: "FAQs", icon: FileQuestion },
  { key: "notifications", label: "Notifications", icon: BellRing },
  { key: "settings", label: "Settings", icon: Settings },
];

function Input({ label, defaultValue = "" }: { label: string; defaultValue?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-bold text-navy">{label}</label>
      <input
        defaultValue={defaultValue}
        className="h-11 w-full rounded-xl border border-[#dcecf1] bg-white px-4 text-sm text-navy outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
      />
    </div>
  );
}

function SectionEditor({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[#deedf1] bg-white p-6 shadow-[0_10px_30px_rgba(24,82,105,0.04)]">
      {children}
      <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-[#edf3f4] pt-5">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-[#dcecf1] px-5 py-2.5 text-xs font-bold text-navy hover:border-brand"
        >
          <X className="size-3.5" /> Cancel
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-[#dcecf1] px-5 py-2.5 text-xs font-bold text-navy hover:border-brand"
        >
          <Eye className="size-3.5" /> Preview
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-xs font-bold text-white transition hover:bg-navy-deep"
        >
          <Save className="size-3.5 text-brand-soft" /> Save Changes
        </button>
      </div>
    </div>
  );
}

function AdminSettings() {
  const [section, setSection] = useState("pool");

  const active = SECTIONS.find((s) => s.key === section)!;

  return (
    <AdminShell title="Settings" subtitle="Manage all content and configuration for the website.">
      <div className="flex flex-col gap-6 lg:flex-row">
        <aside className="lg:w-64 lg:shrink-0">
          <div className="rounded-2xl border border-[#deedf1] bg-white p-2 lg:sticky lg:top-20">
            {SECTIONS.map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setSection(s.key)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-semibold transition ${
                  section === s.key
                    ? "bg-brand-soft text-brand"
                    : "text-muted-foreground hover:bg-surface hover:text-navy"
                }`}
              >
                <s.icon className="size-4" /> {s.label}
              </button>
            ))}
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          {active.key === "pool" && (
            <SectionEditor>
              <h2 className="text-lg font-extrabold text-navy">Pool Information</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Edit the public pool specification shown on the website.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Input label="Pool Type" defaultValue="Outdoor" />
                <Input label="Pool Size" defaultValue="22 × 45 ft" />
                <Input label="Depth" defaultValue="5 – 7 ft" />
                <Input label="Capacity" defaultValue="25 – 30 People" />
                <Input label="Temperature" defaultValue="Natural Climate" />
                <Input label="Season" defaultValue="April – September" />
              </div>
            </SectionEditor>
          )}

          {active.key === "pricing" && (
            <SectionEditor>
              <h2 className="text-lg font-extrabold text-navy">Pricing</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Set entry fees and package pricing. Prices display on the public site.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <Input label="Single Visit (PKR)" defaultValue="XXX" />
                <Input label="Family Day (PKR)" defaultValue="XXX" />
                <Input label="Season Pass (PKR)" defaultValue="XXX" />
              </div>
              <div className="mt-6 flex items-center gap-2 rounded-xl bg-surface px-4 py-3 text-xs text-muted-foreground">
                <span className="font-bold text-navy">Note:</span> Prices are placeholders (XXX)
                until final amounts are confirmed.
              </div>
            </SectionEditor>
          )}

          {active.key === "timings" && (
            <SectionEditor>
              <h2 className="text-lg font-extrabold text-navy">Pool Timings</h2>
              <p className="mt-1 text-sm text-muted-foreground">Set the weekly opening schedule.</p>
              <div className="mt-6 space-y-3">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                  (d) => (
                    <div
                      key={d}
                      className="grid gap-3 rounded-xl border border-[#edf3f4] p-3 sm:grid-cols-[1fr_1fr_auto] sm:items-center"
                    >
                      <span className="text-sm font-bold text-navy">{d}</span>
                      <input
                        defaultValue="05:00 – 08:00 PM"
                        className="h-10 rounded-lg border border-[#dcecf1] px-3 text-sm text-navy outline-none focus:border-brand"
                      />
                      <button
                        type="button"
                        aria-label="Remove"
                        className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-rose-50 hover:text-rose-500"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  ),
                )}
              </div>
            </SectionEditor>
          )}

          {active.key === "facilities" && (
            <SectionEditor>
              <h2 className="text-lg font-extrabold text-navy">Facilities</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Add or remove facilities shown on the website.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  "Changing Rooms",
                  "Showers",
                  "Parking",
                  "Washrooms",
                  "First Aid",
                  "Kids Area",
                  "Seating Area",
                  "Swimming Equipment",
                ].map((f) => (
                  <div
                    key={f}
                    className="flex items-center justify-between rounded-xl border border-[#edf3f4] px-4 py-3"
                  >
                    <span className="text-sm font-bold text-navy">{f}</span>
                    <button
                      type="button"
                      aria-label="Remove facility"
                      className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-rose-50 hover:text-rose-500"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-dashed border-[#dcecf1] px-4 py-2.5 text-xs font-bold text-brand hover:border-brand"
              >
                <Plus className="size-3.5" /> Add Facility
              </button>
            </SectionEditor>
          )}

          {active.key === "gallery" && (
            <SectionEditor>
              <h2 className="text-lg font-extrabold text-navy">Gallery</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage images shown in the website gallery.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex aspect-square items-center justify-center rounded-xl bg-brand-soft text-sm font-bold text-brand"
                  >
                    Photo {i + 1}
                  </div>
                ))}
                <button
                  type="button"
                  className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-[#dcecf1] text-brand hover:border-brand"
                >
                  <Plus className="size-5" />
                </button>
              </div>
            </SectionEditor>
          )}

          {active.key === "rules" && (
            <SectionEditor>
              <h2 className="text-lg font-extrabold text-navy">Rules & Safety</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Edit the safety rules displayed on the public site.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  { t: "Safety Jackets", d: "Children and non-swimmers must wear life jackets." },
                  { t: "No Diving", d: "Diving from the pool edge is prohibited." },
                  { t: "No Running", d: "Running around the pool area is not allowed." },
                ].map((r) => (
                  <div key={r.t} className="rounded-xl border border-[#edf3f4] p-4">
                    <Input label={r.t} defaultValue={r.d} />
                  </div>
                ))}
              </div>
            </SectionEditor>
          )}

          {active.key === "faqs" && (
            <SectionEditor>
              <h2 className="text-lg font-extrabold text-navy">FAQ Management</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Add and edit frequently asked questions.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  { q: "What are the pool timings?", a: "The pool operates in evening slots." },
                  { q: "Is the pool suitable for children?", a: "Yes, with adult supervision." },
                ].map((f) => (
                  <div key={f.q} className="space-y-3 rounded-xl border border-[#edf3f4] p-4">
                    <Input label="Question" defaultValue={f.q} />
                    <textarea
                      defaultValue={f.a}
                      className="w-full rounded-xl border border-[#dcecf1] px-4 py-3 text-sm text-navy outline-none focus:border-brand"
                      rows={2}
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-dashed border-[#dcecf1] px-4 py-2.5 text-xs font-bold text-brand hover:border-brand"
              >
                <Plus className="size-3.5" /> Add Question
              </button>
            </SectionEditor>
          )}

          {active.key === "notifications" && (
            <SectionEditor>
              <h2 className="text-lg font-extrabold text-navy">Notifications</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Choose what and how you want to be notified.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  "New booking received",
                  "Booking confirmed by guest",
                  "Slot nearly full",
                  "Booking cancelled",
                  "Daily summary report",
                ].map((n) => (
                  <label
                    key={n}
                    className="flex items-center justify-between rounded-xl border border-[#edf3f4] px-4 py-3"
                  >
                    <span className="text-sm font-bold text-navy">{n}</span>
                    <span className="relative inline-flex h-6 w-11 items-center rounded-full bg-brand">
                      <span className="ml-auto mr-0.5 block size-5 rounded-full bg-white shadow" />
                    </span>
                  </label>
                ))}
              </div>
            </SectionEditor>
          )}

          {active.key === "settings" && (
            <SectionEditor>
              <h2 className="text-lg font-extrabold text-navy">General Settings</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage pool contact details and profile.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Input label="Pool Name" defaultValue="Abbasi Farm Swimming Pool" />
                <Input label="Phone 1" defaultValue="+92 312 9668880" />
                <Input label="Phone 2" defaultValue="0334 6014382" />
                <Input label="WhatsApp" defaultValue="+92 312 9668880" />
                <Input label="Email" defaultValue="info@abbasifarm.com" />
                <Input label="Address" defaultValue="Mehmood Kot Road, Muzaffargarh" />
              </div>
            </SectionEditor>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
