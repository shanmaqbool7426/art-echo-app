import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Users, ChevronRight } from "lucide-react";
import { AdminShell } from "../admin";

export const Route = createFileRoute("/admin/customers")({
  component: AdminCustomers,
});

const customers = [
  {
    name: "Ahmed Raza",
    phone: "+92 312 9668880",
    email: "ahmed@mail.com",
    bookings: 6,
    last: "27 Aug, 2026",
    spent: 7200,
    status: "regular",
  },
  {
    name: "Bilal Hussain",
    phone: "+92 334 6014382",
    email: "bilal@mail.com",
    bookings: 3,
    last: "27 Aug, 2026",
    spent: 3600,
    status: "regular",
  },
  {
    name: "Usman Ghani",
    phone: "+92 300 1234567",
    email: "usman@mail.com",
    bookings: 1,
    last: "28 Aug, 2026",
    spent: 750,
    status: "new",
  },
  {
    name: "Ali Sher",
    phone: "+92 301 7654321",
    email: "ali@mail.com",
    bookings: 8,
    last: "28 Aug, 2026",
    spent: 9600,
    status: "vip",
  },
  {
    name: "Fahad Iqbal",
    phone: "+92 321 4448899",
    email: "fahad@mail.com",
    bookings: 5,
    last: "29 Aug, 2026",
    spent: 6100,
    status: "regular",
  },
  {
    name: "Naveed Anjum",
    phone: "+92 344 2221100",
    email: "naveed@mail.com",
    bookings: 4,
    last: "31 Aug, 2026",
    spent: 5400,
    status: "regular",
  },
];

const statusStyle: Record<string, { label: string; cls: string }> = {
  regular: { label: "Regular", cls: "bg-brand-soft text-brand" },
  vip: { label: "VIP", cls: "bg-amber-100 text-amber-700" },
  new: { label: "New", cls: "bg-emerald-100 text-emerald-700" },
};

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function AdminCustomers() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return customers.filter(
      (c) => !q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <AdminShell title="Customers" subtitle="Your visitors' profiles and booking history.">
      <div className="mb-6 flex items-center gap-2 rounded-2xl border border-[#deedf1] bg-white px-4 py-3">
        <Users className="size-4 text-muted-foreground" />
        <p className="text-sm font-bold text-navy">{customers.length} total customers</p>
      </div>

      <div className="relative mb-6">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or email..."
          className="h-11 w-full rounded-xl border border-[#dcecf1] bg-white pl-10 pr-3 text-sm font-medium text-navy outline-none placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/10"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#deedf1] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-[#edf3f4] text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                <th className="px-6 py-4">Customer</th>
                <th className="px-4 py-4">Email</th>
                <th className="px-4 py-4">Total Bookings</th>
                <th className="px-4 py-4">Last Visit</th>
                <th className="px-4 py-4">Total Spent</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr
                  key={c.email}
                  className="cursor-pointer border-b border-[#edf3f4] transition hover:bg-surface"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 items-center justify-center rounded-xl bg-brand-soft text-[10px] font-extrabold text-brand">
                        {initials(c.name)}
                      </span>
                      <div>
                        <p className="text-xs font-extrabold text-navy">{c.name}</p>
                        <p className="mt-0.5 text-[10px] text-muted-foreground">{c.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-xs text-muted-foreground">{c.email}</td>
                  <td className="px-4 py-4 text-xs font-bold text-navy">{c.bookings}</td>
                  <td className="px-4 py-4 text-xs text-muted-foreground">{c.last}</td>
                  <td className="px-4 py-4 text-xs font-bold text-navy">
                    PKR {c.spent.toLocaleString()}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyle[c.status].cls}`}
                    >
                      {statusStyle[c.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <ChevronRight className="ml-auto size-4 text-muted-foreground" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
