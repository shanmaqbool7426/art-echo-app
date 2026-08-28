import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarCheck,
  Users,
  Clock,
  Hourglass,
  CalendarHeart,
  Wallet,
  Sparkles,
  ArrowUpRight,
  MoreHorizontal,
  Plus,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { AdminShell } from "../admin";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

const bookingsTrend = [
  { day: "Mon", bookings: 42, visitors: 130 },
  { day: "Tue", bookings: 38, visitors: 105 },
  { day: "Wed", bookings: 51, visitors: 160 },
  { day: "Thu", bookings: 47, visitors: 140 },
  { day: "Fri", bookings: 68, visitors: 210 },
  { day: "Sat", bookings: 92, visitors: 290 },
  { day: "Sun", bookings: 88, visitors: 275 },
];

const popularSlots = [
  { slot: "5–6 PM", value: 42 },
  { slot: "6–7 PM", value: 30 },
  { slot: "7–8 PM", value: 18 },
  { slot: "10–12", value: 10 },
];

const stats = [
  {
    icon: CalendarCheck,
    label: "Today's Bookings",
    value: "24",
    note: "+12.5% vs last week",
    up: true,
    iconCls: "bg-brand-soft text-brand",
  },
  {
    icon: Users,
    label: "Today's Visitors",
    value: "67",
    note: "+8.1% vs last week",
    up: true,
    iconCls: "bg-violet-100 text-violet-600",
  },
  {
    icon: Clock,
    label: "Available Slots",
    value: "12",
    note: "5–6 PM nearly full",
    up: false,
    iconCls: "bg-amber-100 text-amber-600",
  },
  {
    icon: Hourglass,
    label: "Pending Bookings",
    value: "8",
    note: "Needs confirmation",
    up: false,
    iconCls: "bg-rose-100 text-rose-500",
  },
  {
    icon: CalendarHeart,
    label: "Monthly Bookings",
    value: "642",
    note: "+22.4% this month",
    up: true,
    iconCls: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: Wallet,
    label: "Monthly Revenue",
    value: "PKR 642,000",
    note: "+18.2% this month",
    up: true,
    iconCls: "bg-teal-100 text-teal-600",
  },
];

const pieData = [
  { name: "5–6 PM", value: 42, color: "#2aa4c2" },
  { name: "6–7 PM", value: 30, color: "#5bc7e4" },
  { name: "7–8 PM", value: 18, color: "#092c54" },
  { name: "10–12", value: 10, color: "#cfeef5" },
];

function AdminDashboard() {
  return (
    <AdminShell
      title="Dashboard"
      subtitle="A calm, clear view of what's happening at the pool today."
    >
      <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
        <Sparkles className="size-3.5" /> Friday, 28 August 2026
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6 xl:gap-4">
        {stats.map(({ icon: Icon, label, value, note, up, iconCls }) => (
          <div
            key={label}
            className="rounded-2xl border border-[#deedf1] bg-white p-4 shadow-[0_10px_30px_rgba(24,82,105,0.04)] sm:p-5"
          >
            <span className={`flex size-10 items-center justify-center rounded-xl ${iconCls}`}>
              <Icon className="size-[18px]" />
            </span>
            <p className="mt-4 text-[11px] font-semibold text-muted-foreground">{label}</p>
            <div className="mt-1 flex items-end justify-between gap-2">
              <p className="text-[22px] font-extrabold leading-none tracking-[-0.04em] text-navy xl:text-[26px]">
                {value}
              </p>
              <span
                className={`flex items-center gap-0.5 text-[10px] font-bold ${
                  up ? "text-emerald-600" : "text-amber-600"
                }`}
              >
                {up ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
              </span>
            </div>
            <p className="mt-2 text-[10px] text-muted-foreground">{note}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-[#deedf1] bg-white p-6 shadow-[0_10px_30px_rgba(24,82,105,0.04)] xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[17px] font-extrabold tracking-[-0.02em] text-navy">
                Weekly Bookings & Visitors
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">Total across this week</p>
            </div>
            <button
              type="button"
              aria-label="More options"
              className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-surface"
            >
              <MoreHorizontal className="size-4" />
            </button>
          </div>
          <div className="mt-6 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={bookingsTrend} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="book" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2aa4c2" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#2aa4c2" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="visit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#092c54" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#092c54" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8f1f3" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: "#8aa0aa" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis tick={{ fontSize: 11, fill: "#8aa0aa" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #deedf1",
                    fontSize: 12,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="bookings"
                  name="Bookings"
                  stroke="#2aa4c2"
                  strokeWidth={2.5}
                  fill="url(#book)"
                />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  name="Visitors"
                  stroke="#092c54"
                  strokeWidth={2.5}
                  fill="url(#visit)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-[#deedf1] bg-white p-6 shadow-[0_10px_30px_rgba(24,82,105,0.04)]">
          <h2 className="text-[17px] font-extrabold tracking-[-0.02em] text-navy">
            Popular Time Slots
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">Booking distribution</p>
          <div className="mt-4 h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={75}
                  paddingAngle={3}
                >
                  {pieData.map((d) => (
                    <Cell key={d.name} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center gap-2 text-xs">
                <span className="size-2.5 rounded-full" style={{ background: d.color }} />
                <span className="text-muted-foreground">{d.name}</span>
                <span className="ml-auto font-bold text-navy">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue / slots */}
      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl bg-navy-deep p-6 text-white shadow-[0_18px_38px_rgba(9,44,84,0.18)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-soft">
                Today at the pool
              </p>
              <h2 className="mt-2 text-[20px] font-extrabold tracking-[-0.03em]">Slot Capacity</h2>
            </div>
            <span className="flex size-9 items-center justify-center rounded-xl bg-white/10">
              <Clock className="size-[18px] text-brand-soft" />
            </span>
          </div>
          <div className="mt-6 flex items-end justify-between">
            <div>
              <p className="text-[34px] font-extrabold leading-none tracking-[-0.06em]">81</p>
              <p className="mt-2 text-[11px] text-white/50">visitors booked</p>
            </div>
            <p className="text-right text-[11px] font-bold text-emerald-300">39% remaining</p>
          </div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[61%] rounded-full bg-brand" />
          </div>
          <p className="mt-3 flex items-center gap-2 text-[10px] text-white/50">
            <span className="size-1.5 rounded-full bg-emerald-300" /> 49 spots still open today
          </p>
        </div>

        <div className="rounded-2xl border border-[#deedf1] bg-white p-6 shadow-[0_10px_30px_rgba(24,82,105,0.04)] xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[17px] font-extrabold tracking-[-0.02em] text-navy">
                Revenue Trend
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">This week vs last week</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-600">
              +18.2%
            </span>
          </div>
          <div className="mt-6 h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={bookingsTrend.map((d) => ({
                  day: d.day,
                  revenue: d.bookings * 250,
                  last: d.bookings * 250 * 0.85,
                }))}
                margin={{ top: 5, right: 5, left: -15, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e8f1f3" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: "#8aa0aa" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#8aa0aa" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `PKR ${v / 1000}k`}
                />
                <Tooltip
                  formatter={(v: number) => `PKR ${v.toLocaleString()}`}
                  contentStyle={{ borderRadius: 12, fontSize: 12 }}
                />
                <Bar dataKey="revenue" name="This week" fill="#2aa4c2" radius={[6, 6, 0, 0]} />
                <Bar dataKey="last" name="Last week" fill="#cfeef5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-[#deedf1] bg-white p-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-[17px] font-extrabold tracking-[-0.02em] text-navy">
            Need to add a manual booking?
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Create a booking on behalf of a walk-in customer.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-3 text-xs font-bold text-white transition hover:bg-navy-deep"
        >
          <Plus className="size-4 text-brand-soft" /> Add new booking
        </button>
      </div>
    </AdminShell>
  );
}
