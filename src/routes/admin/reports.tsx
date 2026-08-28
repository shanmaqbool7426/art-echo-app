import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Wallet,
  CalendarCheck,
  Users,
  XCircle,
  Clock,
  Download,
  CalendarHeart,
  TrendingUp,
} from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { AdminShell } from "../admin";

export const Route = createFileRoute("/admin/reports")({
  component: AdminReports,
});

const daily = [
  { day: "Mon", bookings: 42 },
  { day: "Tue", bookings: 38 },
  { day: "Wed", bookings: 51 },
  { day: "Thu", bookings: 47 },
  { day: "Fri", bookings: 68 },
  { day: "Sat", bookings: 92 },
  { day: "Sun", bookings: 88 },
];

function AdminReports() {
  const [range, setRange] = useState("This Month");

  return (
    <AdminShell title="Reports" subtitle="Analyse bookings, visitors and revenue performance.">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 rounded-xl border border-[#dcecf1] bg-white p-1">
          {["Today", "This Week", "This Month", "Custom Range"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
                range === r ? "bg-navy text-white" : "text-muted-foreground hover:text-navy"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-3 text-xs font-bold text-white transition hover:bg-navy-deep"
        >
          <Download className="size-4 text-brand-soft" /> Export Report
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-5">
        {[
          { icon: CalendarCheck, label: "Total Bookings", value: "642", cls: "text-navy" },
          { icon: Users, label: "Total Visitors", value: "2,048", cls: "text-brand" },
          { icon: Wallet, label: "Revenue", value: "PKR 642,000", cls: "text-emerald-600" },
          { icon: XCircle, label: "Cancelled", value: "38", cls: "text-rose-500" },
          { icon: Clock, label: "Peak Slot", value: "5–6 PM", cls: "text-amber-600" },
        ].map(({ icon: Icon, label, value, cls }) => (
          <div key={label} className="rounded-2xl border border-[#deedf1] bg-white p-5">
            <Icon className={`size-5 ${cls}`} />
            <p className="mt-3 text-[11px] font-semibold text-muted-foreground">{label}</p>
            <p className={`mt-1 text-2xl font-extrabold tracking-tight ${cls}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-[#deedf1] bg-white p-6 xl:col-span-2">
          <h2 className="text-[17px] font-extrabold text-navy">Monthly Bookings Trend</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Daily bookings for {range.toLowerCase()}
          </p>
          <div className="mt-6 h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={daily} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8f1f3" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: "#8aa0aa" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis tick={{ fontSize: 11, fill: "#8aa0aa" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="bookings" name="Bookings" fill="#2aa4c2" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-[#deedf1] bg-white p-6">
          <h2 className="text-[17px] font-extrabold text-navy">Peak Days</h2>
          <p className="mt-1 text-xs text-muted-foreground">Busiest days this period</p>
          <div className="mt-6 space-y-4">
            {[
              { day: "Saturday", pct: 92 },
              { day: "Sunday", pct: 88 },
              { day: "Friday", pct: 68 },
              { day: "Thursday", pct: 55 },
            ].map(({ day, pct }) => (
              <div key={day}>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-navy">{day}</span>
                  <span className="text-muted-foreground">{pct}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface">
                  <div className="h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-emerald-50 p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4 text-emerald-600" />
              <span className="text-xs font-bold text-emerald-700">+22.4% growth this month</span>
            </div>
            <p className="mt-1 text-[11px] text-emerald-600">
              Weekend slots, especially 5–6 PM, drive the most demand.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-[#deedf1] bg-white p-6">
        <div className="flex items-center gap-2">
          <CalendarHeart className="size-5 text-brand" />
          <h2 className="font-extrabold text-navy">Popular Time Slots</h2>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          {[
            { slot: "05–06 PM", pct: 42 },
            { slot: "06–07 PM", pct: 30 },
            { slot: "07–08 PM", pct: 18 },
            { slot: "10–12 PM", pct: 10 },
          ].map(({ slot, pct }) => (
            <div key={slot} className="rounded-xl bg-surface p-4 text-center">
              <p className="text-sm font-extrabold text-navy">{slot}</p>
              <p className="mt-1 text-xs text-muted-foreground">{pct}% of bookings</p>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
