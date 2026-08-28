import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Users,
  CheckCircle2,
  Hourglass,
  XCircle,
  Check,
  MessageCircle,
  Calendar,
  Clock,
  Phone,
  X,
  MoreHorizontal,
  ChevronRight,
  CalendarClock,
} from "lucide-react";
import { AdminShell } from "../admin";

export const Route = createFileRoute("/admin/bookings")({
  component: AdminBookings,
});

type Status = "confirmed" | "pending" | "cancelled" | "completed";

interface Booking {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  date: string;
  time: string;
  adults: number;
  children: number;
  amount: number;
  payment: "paid" | "unpaid";
  status: Status;
  notes?: string;
}

const data: Booking[] = [
  {
    id: "BK-1042",
    name: "Ahmed Raza",
    phone: "+92 312 9668880",
    whatsapp: "+92 312 9668880",
    email: "ahmed@mail.com",
    date: "2026-08-27",
    time: "5:00 PM – 6:00 PM",
    adults: 4,
    children: 2,
    amount: 1500,
    payment: "paid",
    status: "completed",
    notes: "2 kids, needs life jackets",
  },
  {
    id: "BK-1043",
    name: "Bilal Hussain",
    phone: "+92 334 6014382",
    whatsapp: "+92 334 6014382",
    email: "bilal@mail.com",
    date: "2026-08-27",
    time: "6:00 PM – 7:00 PM",
    adults: 3,
    children: 1,
    amount: 1000,
    payment: "unpaid",
    status: "confirmed",
  },
  {
    id: "BK-1044",
    name: "Usman Ghani",
    phone: "+92 300 1234567",
    whatsapp: "+92 300 1234567",
    email: "usman@mail.com",
    date: "2026-08-28",
    time: "7:00 PM – 8:00 PM",
    adults: 2,
    children: 1,
    amount: 750,
    payment: "unpaid",
    status: "pending",
    notes: "First visit",
  },
  {
    id: "BK-1045",
    name: "Ali Sher",
    phone: "+92 301 7654321",
    whatsapp: "+92 301 7654321",
    email: "ali@mail.com",
    date: "2026-08-28",
    time: "5:00 PM – 6:00 PM",
    adults: 6,
    children: 2,
    amount: 2000,
    payment: "paid",
    status: "confirmed",
    notes: "Family group, birthday",
  },
  {
    id: "BK-1046",
    name: "Hamza Tariq",
    phone: "+92 333 5556677",
    whatsapp: "+92 333 5556677",
    email: "hamza@mail.com",
    date: "2026-08-28",
    time: "6:00 PM – 7:00 PM",
    adults: 2,
    children: 0,
    amount: 500,
    payment: "unpaid",
    status: "cancelled",
  },
  {
    id: "BK-1047",
    name: "Saqib Mehmood",
    phone: "+92 345 9871234",
    whatsapp: "+92 345 9871234",
    email: "saqib@mail.com",
    date: "2026-08-29",
    time: "5:00 PM – 6:00 PM",
    adults: 4,
    children: 1,
    amount: 1250,
    payment: "unpaid",
    status: "pending",
  },
  {
    id: "BK-1048",
    name: "Fahad Iqbal",
    phone: "+92 321 4448899",
    whatsapp: "+92 321 4448899",
    email: "fahad@mail.com",
    date: "2026-08-29",
    time: "7:00 PM – 8:00 PM",
    adults: 8,
    children: 2,
    amount: 2500,
    payment: "paid",
    status: "confirmed",
    notes: "Birthday group, 10 total",
  },
  {
    id: "BK-1049",
    name: "Zain Abbas",
    phone: "+92 302 1112233",
    whatsapp: "+92 302 1112233",
    email: "zain@mail.com",
    date: "2026-08-30",
    time: "6:00 PM – 7:00 PM",
    adults: 2,
    children: 1,
    amount: 750,
    payment: "unpaid",
    status: "pending",
  },
  {
    id: "BK-1050",
    name: "Kamran Yousaf",
    phone: "+92 313 7776655",
    whatsapp: "+92 313 7776655",
    email: "kamran@mail.com",
    date: "2026-08-30",
    time: "5:00 PM – 6:00 PM",
    adults: 3,
    children: 1,
    amount: 1000,
    payment: "paid",
    status: "cancelled",
  },
  {
    id: "BK-1051",
    name: "Naveed Anjum",
    phone: "+92 344 2221100",
    whatsapp: "+92 344 2221100",
    email: "naveed@mail.com",
    date: "2026-08-31",
    time: "6:00 PM – 7:00 PM",
    adults: 5,
    children: 2,
    amount: 1750,
    payment: "unpaid",
    status: "confirmed",
  },
];

const statusConfig: Record<Status, { label: string; chip: string; dot: string }> = {
  confirmed: { label: "Confirmed", chip: "bg-[#e8f8f1] text-emerald-600", dot: "bg-emerald-500" },
  pending: { label: "Pending", chip: "bg-[#fff6df] text-amber-600", dot: "bg-amber-400" },
  cancelled: { label: "Cancelled", chip: "bg-rose-50 text-rose-500", dot: "bg-rose-400" },
  completed: { label: "Completed", chip: "bg-brand-soft text-brand", dot: "bg-brand" },
};

const paymentConfig = {
  paid: { label: "Paid", chip: "bg-emerald-50 text-emerald-600" },
  unpaid: { label: "Unpaid", chip: "bg-[#fff6df] text-amber-600" },
};

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function AdminBookings() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status | "all">("all");
  const [selected, setSelected] = useState<Booking | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.filter((b) => {
      const okStatus = status === "all" || b.status === status;
      const okQuery =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.phone.includes(q) ||
        b.id.toLowerCase().includes(q);
      return okStatus && okQuery;
    });
  }, [query, status]);

  const stats = useMemo(
    () => ({
      total: data.length,
      confirmed: data.filter((b) => b.status === "confirmed").length,
      pending: data.filter((b) => b.status === "pending").length,
      completed: data.filter((b) => b.status === "completed").length,
    }),
    [],
  );

  return (
    <AdminShell title="Bookings" subtitle="Manage, confirm and track every pool reservation.">
      {/* Stat row */}
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Total Bookings", value: stats.total, cls: "text-navy", icon: CalendarClock },
          {
            label: "Confirmed",
            value: stats.confirmed,
            cls: "text-emerald-600",
            icon: CheckCircle2,
          },
          { label: "Pending", value: stats.pending, cls: "text-amber-600", icon: Hourglass },
          { label: "Completed", value: stats.completed, cls: "text-brand", icon: CheckCircle2 },
        ].map(({ label, value, cls, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-[#deedf1] bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-muted-foreground">{label}</span>
              <Icon className={`size-4 ${cls}`} />
            </div>
            <p className={`mt-3 text-3xl font-extrabold tracking-tight ${cls}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#deedf1] bg-white p-4 sm:flex-row sm:items-center">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, phone or booking ID"
            className="h-10 w-full rounded-xl border border-[#dcecf1] bg-surface pl-9 pr-3 text-xs font-medium text-navy outline-none transition placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/10"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto">
          <Filter className="size-4 shrink-0 text-muted-foreground" />
          {(["all", "confirmed", "pending", "cancelled", "completed"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setStatus(f)}
              className={`whitespace-nowrap rounded-lg px-3 py-2 text-[11px] font-bold capitalize transition ${
                status === f
                  ? "bg-navy text-white"
                  : "bg-white text-muted-foreground ring-1 ring-[#dcecf1] hover:text-navy"
              }`}
            >
              {f === "all" ? "All" : statusConfig[f].label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-xl border border-[#dcecf1] px-4 py-2 text-xs font-bold text-muted-foreground hover:text-navy"
          >
            Date
          </button>
          <button
            type="button"
            className="rounded-xl border border-[#dcecf1] px-4 py-2 text-xs font-bold text-muted-foreground hover:text-navy"
          >
            Time
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-[#deedf1] bg-white shadow-[0_10px_30px_rgba(24,82,105,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead>
              <tr className="border-b border-[#edf3f4] text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                <th className="px-6 py-4">Booking ID</th>
                <th className="px-4 py-4">Customer</th>
                <th className="px-4 py-4">Date</th>
                <th className="px-4 py-4">Time</th>
                <th className="px-4 py-4">Visitors</th>
                <th className="px-4 py-4">Amount</th>
                <th className="px-4 py-4">Payment</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr
                  key={b.id}
                  onClick={() => setSelected(b)}
                  className="cursor-pointer border-b border-[#edf3f4] transition hover:bg-surface"
                >
                  <td className="px-6 py-4 text-xs font-extrabold text-brand">{b.id}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 items-center justify-center rounded-xl bg-brand-soft text-[10px] font-extrabold text-brand">
                        {initials(b.name)}
                      </span>
                      <div>
                        <p className="text-xs font-extrabold text-navy">{b.name}</p>
                        <p className="mt-0.5 text-[10px] text-muted-foreground">{b.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-xs font-bold text-navy">{formatDate(b.date)}</td>
                  <td className="px-4 py-4 text-xs text-muted-foreground">{b.time}</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-navy">
                      <Users className="size-3.5 text-brand" /> {b.adults + b.children}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-xs font-bold text-navy">
                    PKR {b.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${paymentConfig[b.payment].chip}`}
                    >
                      {paymentConfig[b.payment].label}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-bold ${statusConfig[b.status].chip}`}
                    >
                      <span className={`size-1.5 rounded-full ${statusConfig[b.status].dot}`} />
                      {statusConfig[b.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelected(b);
                        }}
                        className="rounded-lg px-2.5 py-1.5 text-[10px] font-bold text-brand hover:bg-brand-soft"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        className="rounded-lg px-2.5 py-1.5 text-[10px] font-bold text-muted-foreground hover:bg-surface"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="px-6 py-20 text-center">
              <Search className="mx-auto size-8 text-muted-foreground" />
              <p className="mt-3 text-sm font-extrabold text-navy">No bookings found</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Try a different name, phone number or status filter.
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between bg-surface px-6 py-4">
          <p className="text-[10px] text-muted-foreground">
            Showing <span className="font-bold text-navy">{filtered.length}</span> of{" "}
            <span className="font-bold text-navy">{data.length}</span> bookings
          </p>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-[10px] font-bold text-brand hover:text-navy"
          >
            Export list <ChevronRight className="size-3" />
          </button>
        </div>
      </div>

      {/* Drawer */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-navy-deep/35 backdrop-blur-[2px]"
          onClick={() => setSelected(null)}
        >
          <aside
            className="h-full w-full max-w-[460px] overflow-y-auto bg-white p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand">
                  Booking details
                </p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.04em] text-navy">
                  {selected.id}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setSelected(null)}
                className="flex size-10 items-center justify-center rounded-xl border border-border text-muted-foreground hover:bg-surface"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-6 flex items-center gap-4 rounded-2xl bg-surface p-4">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-soft text-sm font-extrabold text-brand">
                {initials(selected.name)}
              </span>
              <div>
                <p className="font-extrabold text-navy">{selected.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Guest profile</p>
              </div>
              <span
                className={`ml-auto inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-bold ${statusConfig[selected.status].chip}`}
              >
                <span className={`size-1.5 rounded-full ${statusConfig[selected.status].dot}`} />
                {statusConfig[selected.status].label}
              </span>
            </div>

            <div className="mt-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Customer Details
              </p>
              <div className="mt-3 rounded-2xl border border-border p-4">
                {[
                  { label: "Name", value: selected.name },
                  { label: "Phone", value: selected.phone },
                  { label: "WhatsApp", value: selected.whatsapp },
                  { label: "Email", value: selected.email },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between py-2 text-sm">
                    <span className="text-muted-foreground">{r.label}</span>
                    <span className="font-bold text-navy">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Booking Details
              </p>
              <div className="mt-3 rounded-2xl border border-border p-1">
                {[
                  { icon: Calendar, label: "Date", value: formatDate(selected.date) },
                  { icon: Clock, label: "Time", value: selected.time },
                  { icon: Users, label: "Adults", value: `${selected.adults}` },
                  { icon: Users, label: "Children", value: `${selected.children}` },
                  {
                    icon: Users,
                    label: "Total Visitors",
                    value: `${selected.adults + selected.children}`,
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3 rounded-xl px-3 py-3">
                    <Icon className="size-4 text-brand" />
                    <span className="text-sm text-muted-foreground">{label}</span>
                    <span className="ml-auto text-sm font-bold text-navy">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Payment
              </p>
              <div className="mt-3 rounded-2xl border border-border p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-bold text-navy">
                    PKR {selected.amount.toLocaleString()}
                  </span>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">Payment Method</span>
                  <span className="font-bold text-navy">Cash on Arrival</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Payment Status</span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${paymentConfig[selected.payment].chip}`}
                  >
                    {paymentConfig[selected.payment].label}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Timeline
              </p>
              <div className="mt-3 space-y-3">
                {[
                  { t: "Booked", s: "done" },
                  {
                    t: "Confirmed",
                    s:
                      selected.status === "confirmed" || selected.status === "completed"
                        ? "done"
                        : selected.status === "pending"
                          ? "current"
                          : "muted",
                  },
                  { t: "Completed", s: selected.status === "completed" ? "done" : "muted" },
                ].map(({ t, s }) => (
                  <div key={t} className="flex items-center gap-3">
                    <span
                      className={`flex size-5 items-center justify-center rounded-full ${
                        s === "done"
                          ? "bg-emerald-100 text-emerald-600"
                          : s === "current"
                            ? "bg-amber-100 text-amber-600"
                            : "bg-surface text-muted-foreground"
                      }`}
                    >
                      {s === "done" ? (
                        <Check className="size-3" />
                      ) : (
                        <span className="size-1.5 rounded-full bg-current" />
                      )}
                    </span>
                    <span
                      className={`text-sm font-semibold ${
                        s === "done"
                          ? "text-emerald-600"
                          : s === "current"
                            ? "text-amber-600"
                            : "text-muted-foreground"
                      }`}
                    >
                      {t}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {selected.notes && (
              <div className="mt-6 rounded-2xl bg-brand-soft p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
                  Guest note
                </p>
                <p className="mt-2 text-sm leading-5 text-navy">“{selected.notes}”</p>
              </div>
            )}

            <div className="mt-8 grid grid-cols-2 gap-3">
              <a
                href={`https://wa.me/${selected.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 py-3 text-xs font-bold text-white hover:opacity-90"
              >
                <MessageCircle className="size-4" /> WhatsApp
              </a>
              {selected.status === "pending" && (
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-4 py-3 text-xs font-bold text-white hover:bg-navy-deep"
                >
                  <CheckCircle2 className="size-4" /> Confirm
                </button>
              )}
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-xs font-bold text-navy hover:border-brand"
              >
                <CalendarClock className="size-4" /> Reschedule
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-200 px-4 py-3 text-xs font-bold text-rose-500 hover:bg-rose-50"
              >
                <XCircle className="size-4" /> Cancel
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-xs font-bold text-white hover:bg-emerald-600"
              >
                <Check className="size-4" /> Mark Completed
              </button>
            </div>
          </aside>
        </div>
      )}
    </AdminShell>
  );
}
