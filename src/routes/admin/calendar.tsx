import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight, UserRound } from "lucide-react";
import { AdminShell } from "../admin";

export const Route = createFileRoute("/admin/calendar")({
  component: AdminCalendar,
});

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const weekEvents: Record<number, { name: string; time: string; people: number; status: string }[]> =
  {
    0: [
      { name: "Ahmed Raza", time: "5–6 PM", people: 6, status: "completed" },
      { name: "Bilal Hussain", time: "6–7 PM", people: 4, status: "confirmed" },
    ],
    1: [
      { name: "Saqib Mehmood", time: "5–6 PM", people: 5, status: "pending" },
      { name: "Family Day", time: "7–8 PM", people: 10, status: "confirmed" },
    ],
    2: [
      { name: "Usman Ghani", time: "7–8 PM", people: 3, status: "pending" },
      { name: "Ali Sher", time: "5–6 PM", people: 8, status: "confirmed" },
    ],
    3: [
      { name: "Fahad Iqbal", time: "7–8 PM", people: 10, status: "confirmed" },
      { name: "Zain Abbas", time: "6–7 PM", people: 3, status: "pending" },
    ],
  };

const statusStyles: Record<string, string> = {
  confirmed: "border-brand bg-brand-soft text-brand",
  pending: "border-amber-300 bg-amber-50 text-amber-700",
  completed: "border-emerald-300 bg-emerald-50 text-emerald-700",
};

const monthDays = Array.from({ length: 30 }, (_, i) => i + 1);

function AdminCalendar() {
  const [view, setView] = useState("week");

  return (
    <AdminShell title="Calendar" subtitle="View bookings across day, week or month.">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            aria-label="Previous"
            className="flex size-9 items-center justify-center rounded-xl border border-[#dcecf1] bg-white text-muted-foreground hover:text-navy"
          >
            <ChevronLeft className="size-4" />
          </button>
          <span className="px-2 text-sm font-extrabold text-navy">August 2026</span>
          <button
            aria-label="Next"
            className="flex size-9 items-center justify-center rounded-xl border border-[#dcecf1] bg-white text-muted-foreground hover:text-navy"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
        <div className="flex gap-1 rounded-xl border border-[#dcecf1] bg-white p-1">
          {["day", "week", "month"].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={`rounded-lg px-4 py-2 text-xs font-bold capitalize transition ${
                view === v ? "bg-navy text-white" : "text-muted-foreground hover:text-navy"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {view === "week" && (
        <div className="overflow-hidden rounded-2xl border border-[#deedf1] bg-white">
          <div className="grid grid-cols-7 border-b border-[#edf3f4]">
            {DAYS.map((d) => (
              <div key={d} className="border-r border-[#edf3f4] p-3 text-center last:border-0">
                <p className="text-[10px] font-bold uppercase text-muted-foreground">{d}</p>
                <p className="mt-1 text-lg font-extrabold text-navy">28</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {DAYS.map((d, i) => (
              <div
                key={d}
                className="min-h-[420px] space-y-2 border-r border-[#edf3f4] p-2 last:border-0"
              >
                {weekEvents[i]?.map((ev) => (
                  <div
                    key={`${ev.name}-${ev.time}`}
                    className={`cursor-pointer rounded-xl border-l-4 bg-white p-2.5 shadow-sm transition hover:shadow-md ${statusStyles[ev.status]}`}
                  >
                    <div className="flex items-center gap-1.5">
                      <UserRound className="size-3" />
                      <p className="truncate text-[11px] font-bold">{ev.name}</p>
                    </div>
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      {ev.time} · {ev.people} ppl
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "month" && (
        <div className="overflow-hidden rounded-2xl border border-[#deedf1] bg-white">
          <div className="grid grid-cols-7 border-b border-[#edf3f4]">
            {DAYS.map((d) => (
              <div
                key={d}
                className="p-3 text-center text-[10px] font-bold uppercase text-muted-foreground"
              >
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {Array.from({ length: 35 }).map((_, i) => {
              const day = monthDays[i - 2];
              return (
                <div
                  key={i}
                  className={`min-h-[120px] border-r border-b border-[#edf3f4] p-2 last:border-r-0 ${
                    i % 7 === 6 ? "border-r-0" : ""
                  }`}
                >
                  {day && (
                    <>
                      <span
                        className={`flex size-7 items-center justify-center rounded-lg text-xs font-bold ${
                          day === 28 ? "bg-brand text-white" : "text-navy"
                        }`}
                      >
                        {day}
                      </span>
                      {day === 28 && (
                        <div className="mt-2 space-y-1">
                          <span className="block rounded bg-brand-soft px-2 py-1 text-[9px] font-bold text-brand">
                            12 bookings
                          </span>
                        </div>
                      )}
                      {day === 29 && (
                        <span className="mt-2 block rounded bg-amber-50 px-2 py-1 text-[9px] font-bold text-amber-600">
                          8 bookings
                        </span>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </AdminShell>
  );
}
