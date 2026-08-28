import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  UserRound,
  FileText,
  Check,
  CheckCircle2,
  ChevronLeft,
  Minus,
  Plus,
  Phone,
  MessageCircle,
  Download,
  Waves,
  Timer,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import { PublicHeader, PublicFooter } from "@/lib/public-layout";
import { SITE } from "@/lib/site-data";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book Your Slot | Abbasi Farm Swimming Pool" },
      {
        name: "description",
        content:
          "Reserve your swimming slot at Abbasi Farm Swimming Pool in Muzaffargarh. Simple online booking — date, time and visitors.",
      },
    ],
  }),
  component: BookingPage,
});

const STEPS = [
  { label: "Date", icon: Calendar },
  { label: "Time", icon: Clock },
  { label: "Visitors", icon: Users },
  { label: "Details", icon: UserRound },
  { label: "Summary", icon: FileText },
];

const timeSlots = [
  { time: "05:00 PM – 06:00 PM", spots: 18, total: 30, status: "available" },
  { time: "06:00 PM – 07:00 PM", spots: 8, total: 30, status: "few" },
  { time: "07:00 PM – 08:00 PM", spots: 0, total: 30, status: "full" },
] as const;

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const PRICE_PER_VISITOR = 250;

function BookingPage() {
  const [step, setStep] = useState(0);
  const [date, setDate] = useState<number | null>(28);
  const [time, setTime] = useState<string | null>(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
    emergency: "",
    notes: "",
    agree: false,
  });
  const [confirmed, setConfirmed] = useState(false);

  const totalVisitors = adults + children;
  const totalAmount = totalVisitors * PRICE_PER_VISITOR;
  const selectedTime = timeSlots.find((t) => t.time === time);

  const canContinue = useMemo(() => {
    switch (step) {
      case 0:
        return date !== null;
      case 1:
        return time !== null;
      case 2:
        return totalVisitors > 0 && totalVisitors <= 8;
      case 3:
        return form.name.trim() && form.phone.trim() && form.agree;
      default:
        return true;
    }
  }, [step, date, time, totalVisitors, form]);

  const handleContinue = () => {
    if (step === 4) {
      setConfirmed(true);
    } else {
      setStep((s) => s + 1);
    }
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-white font-sans text-foreground">
        <PublicHeader />
        <main className="mx-auto max-w-xl px-6 py-16 text-center">
          <span className="mx-auto flex size-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-500">
            <CheckCircle2 className="size-11" />
          </span>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-navy">
            Booking Confirmed!
          </h1>
          <p className="mt-3 text-muted-foreground">
            Your swimming slot has been successfully reserved.
          </p>

          <div className="mt-8 rounded-3xl border border-border bg-white p-6 shadow-xl shadow-navy/5 text-left">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Booking ID
                </p>
                <p className="mt-1 text-lg font-extrabold text-navy">#ABF-00124</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-600">
                <Check className="size-3.5" /> Confirmed
              </span>
            </div>

            <div className="mt-6 space-y-3 border-t border-border pt-6">
              {[
                { icon: Calendar, label: "Date", value: `August ${date}, 2026` },
                { icon: Clock, label: "Time", value: selectedTime?.time ?? "–" },
                {
                  icon: Users,
                  label: "Visitors",
                  value: `${adults} Adult${adults > 1 ? "s" : ""} · ${children} Child${children > 1 ? "ren" : ""}`,
                },
                { icon: Waves, label: "Pool", value: "Outdoor Pool · Abbasi Farm" },
                {
                  icon: Timer,
                  label: "Total Amount",
                  value: `PKR ${totalAmount.toLocaleString()}`,
                },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <Icon className="size-4 text-brand" />
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <span className="ml-auto text-sm font-bold text-navy">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-navy-deep"
            >
              View Booking
            </a>
            <a
              href={SITE.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-bold text-white transition hover:opacity-90"
            >
              <MessageCircle className="size-4" /> WhatsApp Details
            </a>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-bold text-navy transition hover:border-brand hover:text-brand"
            >
              <Download className="size-4" /> Download Receipt
            </button>
          </div>
        </main>
        <PublicFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface font-sans text-foreground">
      <PublicHeader />

      <header className="border-b border-border bg-white">
        <div className="mx-auto max-w-[900px] px-6 py-10 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Book Your Swimming Slot
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            Reserve your time in a few simple steps. You'll always know what you've selected and
            what it will cost.
          </p>

          <div className="mx-auto mt-8 flex items-center justify-center gap-0">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const isDone = i < step;
              const isActive = i === step;
              return (
                <div key={s.label} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <span
                      className={`flex size-10 items-center justify-center rounded-full border-2 transition ${
                        isDone
                          ? "border-brand bg-brand text-white"
                          : isActive
                            ? "border-brand bg-brand-soft text-brand"
                            : "border-border bg-white text-muted-foreground"
                      }`}
                    >
                      {isDone ? <Check className="size-4" /> : <Icon className="size-4" />}
                    </span>
                    <span
                      className={`mt-1.5 hidden text-[10px] font-bold sm:block ${
                        isActive ? "text-brand" : "text-muted-foreground"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={`mx-2 h-0.5 w-8 sm:w-14 ${i < step ? "bg-brand" : "bg-border"}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[900px] gap-8 px-6 py-10 lg:grid-cols-[1fr_300px]">
        <section className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
          {/* Step 1 Date */}
          {step === 0 && (
            <div>
              <h2 className="text-2xl font-extrabold text-navy">Select Date</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Pick an available date for your visit.
              </p>
              <div className="mt-6">
                <div className="flex items-center justify-between rounded-2xl border border-border bg-surface p-3">
                  <button
                    aria-label="Previous month"
                    className="flex size-10 items-center justify-center rounded-xl bg-white shadow-sm hover:text-brand"
                  >
                    ‹
                  </button>
                  <span className="font-bold text-navy">August 2026</span>
                  <button
                    aria-label="Next month"
                    className="flex size-10 items-center justify-center rounded-xl bg-white shadow-sm hover:text-brand"
                  >
                    ›
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-bold text-muted-foreground">
                  {DAYS.map((d) => (
                    <span key={d} className="py-2">
                      {d}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {Array.from({ length: 6 }).map((_, blank) => (
                    <span key={`b${blank}`} />
                  ))}
                  {Array.from({ length: 31 }).map((_, i) => {
                    const d = i + 1;
                    const isToday = d === 28;
                    const disabled = d < 28;
                    const selected = date === d;
                    return (
                      <button
                        key={d}
                        type="button"
                        disabled={disabled}
                        onClick={() => setDate(d)}
                        className={`flex aspect-square items-center justify-center rounded-xl text-sm font-semibold transition ${
                          selected
                            ? "bg-brand text-white shadow-lg shadow-brand/30"
                            : disabled
                              ? "text-muted-foreground/40 line-through"
                              : isToday
                                ? "bg-brand-soft text-brand ring-1 ring-brand"
                                : "text-navy hover:bg-brand-soft"
                        }`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex size-3 items-center justify-center rounded bg-brand-soft" />
                  Available &nbsp;·&nbsp;
                  <span className="inline-block size-3 rounded bg-white ring-1 ring-brand" />
                  Today
                </p>
              </div>
            </div>
          )}

          {/* Step 2 Time */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-extrabold text-navy">Select Time</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Choose a time slot. Booked slots fill up quickly on weekends.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {timeSlots.map((slot) => {
                  const selected = time === slot.time;
                  const status =
                    slot.status === "available"
                      ? { cls: "text-emerald-600", label: `${slot.spots} spots available` }
                      : slot.status === "few"
                        ? { cls: "text-amber-600", label: `${slot.spots} spots left` }
                        : { cls: "text-rose-600", label: "Fully booked" };
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={slot.status === "full"}
                      onClick={() => setTime(slot.time)}
                      className={`flex flex-col items-center gap-3 rounded-2xl border-2 p-5 text-center transition ${
                        selected
                          ? "border-brand bg-brand-soft shadow-lg shadow-brand/10"
                          : slot.status === "full"
                            ? "cursor-not-allowed border-border bg-surface opacity-60"
                            : "border-border bg-white hover:border-brand/60"
                      }`}
                    >
                      <Clock
                        className={`size-6 ${selected ? "text-brand" : "text-muted-foreground"}`}
                      />
                      <span className="text-sm font-bold text-navy">{slot.time}</span>
                      <span className={`text-xs font-bold ${status.cls}`}>{status.label}</span>
                      {selected && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-brand">
                          <Check className="size-3.5" /> Selected
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3 Visitors */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-extrabold text-navy">Visitors</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Add the number of adults and children. Max 8 per booking.
              </p>
              <div className="mt-6 space-y-4">
                {[
                  { label: "Adults", hint: "Ages 12+", value: adults, set: setAdults },
                  { label: "Children", hint: "Ages 3 – 11", value: children, set: setChildren },
                ].map(({ label, hint, value, set }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-2xl border border-border bg-surface px-5 py-4"
                  >
                    <div>
                      <p className="font-bold text-navy">{label}</p>
                      <p className="text-xs text-muted-foreground">{hint}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        aria-label={`Decrease ${label}`}
                        onClick={() => set(Math.max(0, value - 1))}
                        className="flex size-10 items-center justify-center rounded-full border border-border bg-white text-navy transition hover:border-brand hover:text-brand"
                      >
                        <Minus className="size-4" />
                      </button>
                      <span className="w-8 text-center text-xl font-extrabold text-navy">
                        {value}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase ${label}`}
                        onClick={() => set(Math.min(10, value + 1))}
                        className="flex size-10 items-center justify-center rounded-full bg-navy text-white transition hover:bg-navy-deep"
                      >
                        <Plus className="size-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between rounded-2xl bg-navy px-5 py-4 text-white">
                <span className="text-sm font-bold">Total Visitors</span>
                <span className="text-xl font-extrabold">{totalVisitors}</span>
              </div>
              <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="size-4 text-emerald-500" />
                Remaining capacity in this slot: {8 - totalVisitors} spots. Max 8 per booking.
              </p>
            </div>
          )}

          {/* Step 4 Details */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-extrabold text-navy">Customer Details</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                We'll use these details to confirm your booking.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label="Full Name" required>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    className="h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm font-medium text-navy outline-none transition placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                </Field>
                <Field label="Phone Number" required>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="e.g. 0334 6014382"
                    className="h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm font-medium text-navy outline-none transition placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                </Field>
                <Field label="WhatsApp Number">
                  <input
                    value={form.whatsapp}
                    onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                    placeholder="Your WhatsApp number"
                    className="h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm font-medium text-navy outline-none transition placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                </Field>
                <Field label="Email">
                  <input
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    type="email"
                    placeholder="your@email.com"
                    className="h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm font-medium text-navy outline-none transition placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                </Field>
                <Field label="Emergency Contact">
                  <input
                    value={form.emergency}
                    onChange={(e) => setForm({ ...form, emergency: e.target.value })}
                    placeholder="Emergency contact number"
                    className="h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm font-medium text-navy outline-none transition placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                </Field>
              </div>
              <Field label="Additional Notes" className="mt-4">
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Any special requirements or requests (optional)"
                  rows={3}
                  className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-navy outline-none transition placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/20"
                />
              </Field>
              <label className="mt-5 flex items-start gap-3 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={form.agree}
                  onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                  className="mt-0.5 size-4 rounded border-border accent-brand"
                />
                <span>
                  I agree to the swimming pool rules and safety guidelines. Children and
                  non-swimmers must wear life jackets.
                </span>
              </label>
            </div>
          )}

          {/* Step 5 Summary */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-extrabold text-navy">Booking Summary</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Review your booking before confirming.
              </p>
              <div className="mt-6 space-y-3 border-t border-border pt-6">
                {[
                  { icon: Waves, label: "Pool", value: "Outdoor Pool" },
                  { icon: Calendar, label: "Date", value: `August ${date}, 2026` },
                  { icon: Clock, label: "Time", value: selectedTime?.time ?? "–" },
                  {
                    icon: Users,
                    label: "Visitors",
                    value: `${adults} Adult${adults > 1 ? "s" : ""} · ${children} Child${children > 1 ? "ren" : ""}`,
                  },
                  { icon: UserRound, label: "Guest", value: form.name || "–" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <Icon className="size-4 text-brand" />
                    <span className="text-sm text-muted-foreground">{label}</span>
                    <span className="ml-auto text-sm font-bold text-navy">{value}</span>
                  </div>
                ))}
                <div className="mt-4 flex items-center justify-between rounded-2xl bg-navy px-5 py-4 text-white">
                  <span className="text-sm font-bold">Total Amount</span>
                  <span className="text-xl font-extrabold">PKR {totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-bold text-navy transition hover:border-brand hover:text-brand"
              >
                <ChevronLeft className="size-4" /> Back
              </button>
            ) : (
              <span />
            )}
            <button
              type="button"
              disabled={!canContinue}
              onClick={handleContinue}
              className="inline-flex items-center gap-2 rounded-full bg-navy px-8 py-3 text-sm font-bold text-white transition hover:bg-navy-deep disabled:cursor-not-allowed disabled:opacity-50"
            >
              {step === 4 ? "Confirm Booking" : "Continue"}
              {step === 4 && <Check className="size-4" />}
            </button>
          </div>
        </section>

        {/* Summary sidebar */}
        <aside className="h-fit rounded-3xl border border-border bg-white p-6 shadow-sm lg:sticky lg:top-24">
          <h3 className="font-extrabold text-navy">Your Selection</h3>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="size-4 text-brand" />
              <span>{date ? `August ${date}, 2026` : "No date selected"}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="size-4 text-brand" />
              <span>{time ?? "No time selected"}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="size-4 text-brand" />
              <span>{totalVisitors} visitors</span>
            </div>
          </div>
          <div className="mt-4 border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-navy">Total</span>
              <span className="text-lg font-extrabold text-brand">
                PKR {totalAmount.toLocaleString()}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {PRICE_PER_VISITOR} per visitor · payable on arrival
            </p>
          </div>
          <div className="mt-4 rounded-2xl bg-emerald-50 p-3 text-xs text-emerald-700">
            No advance payment needed. Pay on arrival. Can be cancelled anytime.
          </div>
        </aside>
      </main>

      <PublicFooter />
    </div>
  );
}

function Field({
  label,
  required,
  children,
  className = "",
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 flex text-sm font-bold text-navy">
        {label}
        {required && <span className="ml-1 text-rose-500">*</span>}
      </label>
      {children}
    </div>
  );
}
