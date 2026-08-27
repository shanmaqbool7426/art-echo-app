import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  Phone,
  Search,
  Waves,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Hourglass,
  CalendarCheck,
  MessageCircle,
  Filter,
  UserRound,
} from "lucide-react";

export const Route = createFileRoute("/bookings")({
  head: () => ({
    meta: [
      { title: "Bookings | Abbasi Farm Swimming Pool" },
      {
        name: "description",
        content:
          "View and manage all swimming pool bookings at Abbasi Farm Swimming Pool, Muzaffargarh — search, filter by status and see upcoming slots.",
      },
      { property: "og:title", content: "Bookings | Abbasi Farm Swimming Pool" },
      {
        property: "og:description",
        content: "All pool bookings at a glance — search, filter and manage reservations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BookingsPage,
});

type BookingStatus = "confirmed" | "pending" | "cancelled";

interface Booking {
  id: string;
  name: string;
  phone: string;
  date: string; // ISO
  time: string;
  people: number;
  status: BookingStatus;
  notes?: string;
}

const bookings: Booking[] = [
  { id: "BK-1042", name: "Ahmed Raza", phone: "+92 312 9668880", date: "2026-08-27", time: "4:00 PM – 6:00 PM", people: 6, status: "confirmed", notes: "2 kids, needs life jackets" },
  { id: "BK-1043", name: "Bilal Hussain", phone: "+92 334 6014382", date: "2026-08-27", time: "6:00 PM – 8:00 PM", people: 4, status: "confirmed" },
  { id: "BK-1044", name: "Usman Ghani", phone: "+92 300 1234567", date: "2026-08-28", time: "8:00 AM – 10:00 AM", people: 3, status: "pending", notes: "First visit" },
  { id: "BK-1045", name: "Ali Sher", phone: "+92 301 7654321", date: "2026-08-28", time: "10:00 AM – 12:00 PM", people: 8, status: "confirmed", notes: "Family group" },
  { id: "BK-1046", name: "Hamza Tariq", phone: "+92 333 5556677", date: "2026-08-28", time: "4:00 PM – 6:00 PM", people: 2, status: "cancelled" },
  { id: "BK-1047", name: "Saqib Mehmood", phone: "+92 345 9871234", date: "2026-08-29", time: "8:00 AM – 10:00 AM", people: 5, status: "pending" },
  { id: "BK-1048", name: "Fahad Iqbal", phone: "+92 321 4448899", date: "2026-08-29", time: "6:00 PM – 8:00 PM", people: 10, status: "confirmed", notes: "Birthday group" },
  { id: "BK-1049", name: "Zain Abbas", phone: "+92 302 1112233", date: "2026-08-30", time: "10:00 AM – 12:00 PM", people: 3, status: "pending" },
  { id: "BK-1050", name: "Kamran Yousaf", phone: "+92 313 7776655", date: "2026-08-30", time: "4:00 PM – 6:00 PM", people: 4, status: "cancelled" },
  { id: "BK-1051", name: "Naveed Anjum", phone: "+92 344 2221100", date: "2026-08-31", time: "8:00 AM – 10:00 AM", people: 7, status: "confirmed" },
];

const statusStyles: Record<BookingStatus, { label: string; chip: string; icon: typeof CheckCircle2 }> = {
  confirmed: { label: "Confirmed", chip: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
  pending: { label: "Pending", chip: "bg-amber-100 text-amber-700", icon: Hourglass },
  cancelled: { label: "Cancelled", chip: "bg-red-100 text-red-600", icon: XCircle },
};

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function BookingsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<BookingStatus | "all">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bookings.filter((b) => {
      const matchesStatus = status === "all" || b.status === status;
      const matchesQuery =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.phone.replace(/\s/g, "").includes(q.replace(/\s/g, "")) ||
        b.id.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [query, status]);

  const stats = useMemo(
    () => ({
      total: bookings.length,
      confirmed: bookings.filter((b) => b.status === "confirmed").length,
      pending: bookings.filter((b) => b.status === "pending").length,
      people: bookings.filter((b) => b.status !== "cancelled").reduce((s, b) => s + b.people, 0),
    }),
    []
  );

  return (
    <div className="min-h-screen bg-surface font-sans text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background">
        <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-md bg-brand-soft text-brand">
              <Waves className="size-5" />
            </div>
            <div className="leading-none">
              <div className="text-lg font-extrabold tracking-tight text-navy">ABBASI FARM</div>
              <div className="text-[10px] font-medium tracking-[0.25em] text-muted-foreground">
                SWIMMING POOL
              </div>
            </div>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            <ArrowLeft className="size-4" /> Back to Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1180px] px-6 py-10">
        {/* Title */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-navy">All Bookings</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Search, filter and manage pool reservations.
            </p>
          </div>
          <a
            href="https://wa.me/923129668880"
            className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            <MessageCircle className="size-4" /> New Booking on WhatsApp
          </a>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { icon: CalendarCheck, label: "Total Bookings", value: stats.total },
            { icon: CheckCircle2, label: "Confirmed", value: stats.confirmed },
            { icon: Hourglass, label: "Pending", value: stats.pending },
            { icon: Users, label: "Expected Swimmers", value: stats.people },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-lg border border-border bg-background p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-md bg-brand-soft text-brand">
                  <Icon className="size-5" />
                </span>
                <div>
                  <div className="text-2xl font-extrabold text-navy">{value}</div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search + filter */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, phone or booking ID..."
              className="w-full rounded-md border border-border bg-background py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="size-4 text-muted-foreground" />
            {(["all", "confirmed", "pending", "cancelled"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition-colors ${
                  status === s
                    ? "bg-navy text-background"
                    : "bg-background text-muted-foreground ring-1 ring-border hover:text-navy"
                }`}
              >
                {s === "all" ? "All" : statusStyles[s].label}
              </button>
            ))}
          </div>
        </div>

        {/* Booking list */}
        <div className="mt-6 space-y-3">
          {filtered.length === 0 && (
            <div className="rounded-lg border border-dashed border-border bg-background p-10 text-center">
              <Search className="mx-auto size-8 text-muted-foreground/50" />
              <p className="mt-3 text-sm font-semibold text-navy">No bookings found</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Try a different name, phone number or status filter.
              </p>
            </div>
          )}

          {filtered.map((b) => {
            const st = statusStyles[b.status];
            const StatusIcon = st.icon;
            return (
              <div
                key={b.id}
                className="flex flex-col gap-4 rounded-lg border border-border bg-background p-5 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                    <UserRound className="size-5" />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-navy">{b.name}</span>
                      <span className="text-xs text-muted-foreground">#{b.id}</span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="size-3.5 text-brand" /> {formatDate(b.date)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="size-3.5 text-brand" /> {b.time}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Users className="size-3.5 text-brand" /> {b.people} people
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Phone className="size-3.5 text-brand" /> {b.phone}
                      </span>
                    </div>
                    {b.notes && (
                      <p className="mt-1.5 text-xs italic text-muted-foreground">“{b.notes}”</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${st.chip}`}
                  >
                    <StatusIcon className="size-3.5" /> {st.label}
                  </span>
                  <a
                    href={`https://wa.me/${b.phone.replace(/[^0-9]/g, "")}`}
                    className="text-xs font-semibold text-brand hover:underline"
                  >
                    Contact Guest
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
