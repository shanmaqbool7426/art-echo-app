import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Plus, Lock, Ban, Pencil, MoreVertical, CheckCircle2 } from "lucide-react";
import { AdminShell } from "../admin";

export const Route = createFileRoute("/admin/slots")({
  component: AdminSlots,
});

const initialSlots = [
  { time: "05:00 PM – 06:00 PM", capacity: 30, booked: 22, available: 8, status: "open" },
  { time: "06:00 PM – 07:00 PM", capacity: 30, booked: 28, available: 2, status: "open" },
  { time: "07:00 PM – 08:00 PM", capacity: 30, booked: 30, available: 0, status: "full" },
  { time: "08:00 PM – 09:00 PM", capacity: 30, booked: 0, available: 30, status: "closed" },
];

function AdminSlots() {
  const [slots, setSlots] = useState(initialSlots);

  const setStatus = (idx: number, status: string) =>
    setSlots((s) => s.map((slot, i) => (i === idx ? { ...slot, status } : slot)));

  return (
    <AdminShell title="Time Slots" subtitle="Manage your daily pool time-slot capacity.">
      <div className="mb-6 flex justify-end">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-3 text-xs font-bold text-white transition hover:bg-navy-deep"
        >
          <Plus className="size-4 text-brand-soft" /> Create Time Slot
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {slots.map((slot, i) => {
          const pct = (slot.booked / slot.capacity) * 100;
          const isFull = slot.status === "full";
          const isClosed = slot.status === "closed";
          return (
            <div
              key={slot.time}
              className={`rounded-2xl border bg-white p-5 shadow-[0_10px_30px_rgba(24,82,105,0.04)] ${
                isFull
                  ? "border-rose-200"
                  : isClosed
                    ? "border-[#deedf1] opacity-70"
                    : "border-[#deedf1]"
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="flex size-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <Clock className="size-5" />
                </span>
                <button aria-label="More options" className="text-muted-foreground hover:text-navy">
                  <MoreVertical className="size-4" />
                </button>
              </div>
              <h3 className="mt-4 font-extrabold text-navy">{slot.time}</h3>

              <div className="mt-4 flex items-center justify-between rounded-xl bg-surface px-4 py-3">
                <div className="text-center">
                  <p className="text-lg font-extrabold text-navy">{slot.capacity}</p>
                  <p className="text-[10px] text-muted-foreground">Capacity</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-extrabold text-brand">{slot.booked}</p>
                  <p className="text-[10px] text-muted-foreground">Booked</p>
                </div>
                <div className="text-center">
                  <p
                    className={`text-lg font-extrabold ${isFull ? "text-rose-500" : "text-emerald-600"}`}
                  >
                    {slot.available}
                  </p>
                  <p className="text-[10px] text-muted-foreground">Available</p>
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="font-bold text-navy">
                    {slot.booked}/{slot.capacity}
                  </span>
                  <span className={isFull ? "font-bold text-rose-500" : "text-emerald-600"}>
                    {isFull ? "FULLY BOOKED" : `${slot.available} spots available`}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-surface">
                  <div
                    className={`h-full rounded-full ${
                      isFull ? "bg-rose-400" : isClosed ? "bg-muted-foreground" : "bg-brand"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                    isFull
                      ? "bg-rose-50 text-rose-500"
                      : isClosed
                        ? "bg-surface text-muted-foreground"
                        : "bg-emerald-50 text-emerald-600"
                  }`}
                >
                  <span
                    className={`size-1.5 rounded-full ${
                      isFull ? "bg-rose-400" : isClosed ? "bg-muted-foreground" : "bg-emerald-500"
                    }`}
                  />
                  {isFull ? "Full" : isClosed ? "Closed" : "Open"}
                </span>
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-[#dcecf1] py-2 text-[10px] font-bold text-navy hover:border-brand hover:text-brand"
                >
                  <Pencil className="size-3" /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => setStatus(i, isClosed ? "open" : "closed")}
                  className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-[#dcecf1] py-2 text-[10px] font-bold text-muted-foreground hover:text-navy"
                >
                  <Lock className="size-3" /> {isClosed ? "Enable" : "Disable"}
                </button>
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-rose-200 py-2 text-[10px] font-bold text-rose-500 hover:bg-rose-50"
                >
                  <Ban className="size-3" /> Block
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-[#deedf1] bg-white p-6">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="size-5 text-emerald-500" />
          <h2 className="font-extrabold text-navy">Capacity Guide</h2>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Each slot has a maximum capacity of 30 people to keep the pool safe and comfortable. The
          system automatically blocks further bookings once a slot reaches full capacity.
        </p>
      </div>
    </AdminShell>
  );
}
