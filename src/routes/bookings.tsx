import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Bell,
  Calendar,
  CalendarCheck,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Filter,
  LayoutDashboard,
  LifeBuoy,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Settings,
  SlidersHorizontal,
  Sparkles,
  UserRound,
  Users,
  Waves,
  X,
  XCircle,
  Hourglass,
} from "lucide-react";

export const Route = createFileRoute("/bookings")({
  head: () => ({
    meta: [
      { title: "Bookings | Abbasi Farm Swimming Pool" },
      {
        name: "description",
        content: "Manage swimming pool bookings at Abbasi Farm Swimming Pool, Muzaffargarh.",
      },
      { property: "og:title", content: "Bookings | Abbasi Farm Swimming Pool" },
      {
        property: "og:description",
        content: "A calm, clear view of every pool reservation.",
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
  date: string;
  time: string;
  people: number;
  status: BookingStatus;
  notes?: string;
}

const bookings: Booking[] = [
  {
    id: "BK-1042",
    name: "Ahmed Raza",
    phone: "+92 312 9668880",
    date: "2026-08-27",
    time: "4:00 PM – 6:00 PM",
    people: 6,
    status: "confirmed",
    notes: "2 kids, needs life jackets",
  },
  {
    id: "BK-1043",
    name: "Bilal Hussain",
    phone: "+92 334 6014382",
    date: "2026-08-27",
    time: "6:00 PM – 8:00 PM",
    people: 4,
    status: "confirmed",
  },
  {
    id: "BK-1044",
    name: "Usman Ghani",
    phone: "+92 300 1234567",
    date: "2026-08-28",
    time: "8:00 AM – 10:00 AM",
    people: 3,
    status: "pending",
    notes: "First visit",
  },
  {
    id: "BK-1045",
    name: "Ali Sher",
    phone: "+92 301 7654321",
    date: "2026-08-28",
    time: "10:00 AM – 12:00 PM",
    people: 8,
    status: "confirmed",
    notes: "Family group",
  },
  {
    id: "BK-1046",
    name: "Hamza Tariq",
    phone: "+92 333 5556677",
    date: "2026-08-28",
    time: "4:00 PM – 6:00 PM",
    people: 2,
    status: "cancelled",
  },
  {
    id: "BK-1047",
    name: "Saqib Mehmood",
    phone: "+92 345 9871234",
    date: "2026-08-29",
    time: "8:00 AM – 10:00 AM",
    people: 5,
    status: "pending",
  },
  {
    id: "BK-1048",
    name: "Fahad Iqbal",
    phone: "+92 321 4448899",
    date: "2026-08-29",
    time: "6:00 PM – 8:00 PM",
    people: 10,
    status: "confirmed",
    notes: "Birthday group",
  },
  {
    id: "BK-1049",
    name: "Zain Abbas",
    phone: "+92 302 1112233",
    date: "2026-08-30",
    time: "10:00 AM – 12:00 PM",
    people: 3,
    status: "pending",
  },
  {
    id: "BK-1050",
    name: "Kamran Yousaf",
    phone: "+92 313 7776655",
    date: "2026-08-30",
    time: "4:00 PM – 6:00 PM",
    people: 4,
    status: "cancelled",
  },
  {
    id: "BK-1051",
    name: "Naveed Anjum",
    phone: "+92 344 2221100",
    date: "2026-08-31",
    time: "8:00 AM – 10:00 AM",
    people: 7,
    status: "confirmed",
  },
];

const statusStyles: Record<
  BookingStatus,
  { label: string; chip: string; dot: string; icon: typeof CheckCircle2 }
> = {
  confirmed: {
    label: "Confirmed",
    chip: "bg-[#e8f8f1] text-[#18825e]",
    dot: "bg-[#26b47c]",
    icon: CheckCircle2,
  },
  pending: {
    label: "Pending",
    chip: "bg-[#fff6df] text-[#aa761b]",
    dot: "bg-[#e9ad35]",
    icon: Hourglass,
  },
  cancelled: {
    label: "Cancelled",
    chip: "bg-[#fff0f0] text-[#c64d56]",
    dot: "bg-[#db6670]",
    icon: XCircle,
  },
};

const sidebarItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Bookings", icon: CalendarCheck, active: true },
  { label: "Calendar", icon: Calendar },
  { label: "Time slots", icon: Clock },
  { label: "Customers", icon: Users },
];

const managementItems = [
  { label: "Pricing", icon: SlidersHorizontal },
  { label: "Pool content", icon: Waves },
  { label: "Settings", icon: Settings },
];

const slotSchedule = [
  { time: "08:00 – 10:00", booked: 18, capacity: 30, tone: "bg-[#54c4e4]" },
  { time: "10:00 – 12:00", booked: 24, capacity: 30, tone: "bg-[#f2b84b]" },
  { time: "04:00 – 06:00", booked: 12, capacity: 30, tone: "bg-[#54c4e4]" },
  { time: "06:00 – 08:00", booked: 27, capacity: 30, tone: "bg-[#e8838d]" },
];

function formatDate(iso: string) {
  const date = new Date(iso + "T00:00:00Z");
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${weekdays[date.getUTCDay()]}, ${date.getUTCDate()} ${months[date.getUTCMonth()]}`;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function BookingsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<BookingStatus | "all">("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bookings.filter((booking) => {
      const matchesStatus = status === "all" || booking.status === status;
      const matchesQuery =
        !q ||
        booking.name.toLowerCase().includes(q) ||
        booking.phone.replace(/\s/g, "").includes(q.replace(/\s/g, "")) ||
        booking.id.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [query, status]);

  const stats = useMemo(
    () => ({
      total: bookings.length,
      confirmed: bookings.filter((booking) => booking.status === "confirmed").length,
      pending: bookings.filter((booking) => booking.status === "pending").length,
      people: bookings
        .filter((booking) => booking.status !== "cancelled")
        .reduce((sum, booking) => sum + booking.people, 0),
    }),
    [],
  );

  return (
    <div className="min-h-screen bg-[#f6fafb] font-sans text-[#173a5f]">
      <div className="flex min-h-screen">
        <aside className="hidden w-[250px] shrink-0 flex-col bg-[#092c54] px-5 py-6 text-white lg:flex">
          <Link to="/" className="flex items-center gap-3 px-2">
            <span className="flex size-10 items-center justify-center rounded-[13px] bg-[#5bc7e4] text-[#092c54] shadow-lg shadow-[#031c37]/25">
              <Waves className="size-5" strokeWidth={2.5} />
            </span>
            <span className="leading-none">
              <span className="block text-[15px] font-extrabold tracking-[0.01em]">
                ABBASI FARM
              </span>
              <span className="mt-1 block text-[9px] font-medium tracking-[0.28em] text-white/55">
                SWIMMING POOL
              </span>
            </span>
          </Link>

          <div className="mt-12">
            <p className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
              Workspace
            </p>
            <nav className="mt-3 space-y-1">
              {sidebarItems.map(({ label, icon: Icon, active }) => (
                <a
                  key={label}
                  href={active ? "#bookings" : "#"}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-semibold transition ${
                    active
                      ? "bg-white text-[#092c54] shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
                      : "text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className={`size-[17px] ${active ? "text-[#2aafd3]" : "text-white/55"}`} />
                  {label}
                  {label === "Bookings" && (
                    <span
                      className={`ml-auto rounded-full px-2 py-0.5 text-[10px] ${
                        active ? "bg-[#e9f9fc] text-[#209cc0]" : "bg-white/10 text-white/60"
                      }`}
                    >
                      8
                    </span>
                  )}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-9">
            <p className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
              Manage
            </p>
            <nav className="mt-3 space-y-1">
              {managementItems.map(({ label, icon: Icon }) => (
                <a
                  key={label}
                  href="#"
                  className="group flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-semibold text-white/60 transition hover:bg-white/10 hover:text-white"
                >
                  <Icon className="size-[17px] text-white/55" />
                  {label}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.07] p-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-[11px] font-bold text-white/70">
                <span className="size-2 rounded-full bg-[#52d59f] shadow-[0_0_0_4px_rgba(82,213,159,0.12)]" />
                Pool is open
              </span>
              <MoreHorizontal className="size-4 text-white/35" />
            </div>
            <p className="mt-4 text-[12px] leading-5 text-white/45">
              Today’s last available slot is filling up quickly.
            </p>
            <a
              href="#slots"
              className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold text-[#6bd8ed] hover:text-white"
            >
              View capacity <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-40 border-b border-[#dcecf1] bg-white/90 backdrop-blur-xl">
            <div className="flex h-[74px] items-center justify-between px-5 sm:px-8 xl:px-10">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Open navigation"
                  onClick={() => setMobileMenuOpen((open) => !open)}
                  className="flex size-10 items-center justify-center rounded-xl border border-[#dcecf1] text-[#173a5f] lg:hidden"
                >
                  <Menu className="size-5" />
                </button>
                <div className="lg:hidden">
                  <p className="text-[13px] font-extrabold tracking-tight text-[#092c54]">
                    ABBASI FARM
                  </p>
                  <p className="text-[8px] font-medium tracking-[0.24em] text-[#83a0ac]">
                    OPERATIONS
                  </p>
                </div>
                <div className="hidden items-center gap-2 text-xs text-[#8aa0ae] lg:flex">
                  <span>Workspace</span>
                  <ChevronRight className="size-3.5" />
                  <span className="font-semibold text-[#173a5f]">Bookings</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to="/"
                  className="hidden items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-[#688492] transition hover:bg-[#f0f8fa] hover:text-[#092c54] sm:inline-flex"
                >
                  <ArrowLeft className="size-3.5" /> View website
                </Link>
                <button
                  type="button"
                  aria-label="Notifications"
                  className="relative flex size-10 items-center justify-center rounded-xl border border-[#dcecf1] text-[#688492] transition hover:bg-[#f0f8fa]"
                >
                  <Bell className="size-[17px]" />
                  <span className="absolute right-2.5 top-2 size-1.5 rounded-full bg-[#e8838d]" />
                </button>
                <div className="hidden h-8 w-px bg-[#e2eef1] sm:block" />
                <div className="flex items-center gap-2.5">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-[#dff5f8] text-[11px] font-extrabold text-[#1d9bbd]">
                    AF
                  </div>
                  <div className="hidden leading-tight sm:block">
                    <p className="text-xs font-bold text-[#173a5f]">Abbasi Farm</p>
                    <p className="mt-0.5 text-[10px] text-[#91a6b0]">Manager account</p>
                  </div>
                </div>
              </div>
            </div>
            {mobileMenuOpen && (
              <div className="border-t border-[#dcecf1] bg-white px-5 py-4 lg:hidden">
                <nav className="grid grid-cols-2 gap-2">
                  {[...sidebarItems, ...managementItems].map(({ label, icon: Icon, active }) => (
                    <a
                      key={label}
                      href="#"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-2 rounded-xl px-3 py-3 text-xs font-bold ${
                        active ? "bg-[#eaf8fb] text-[#1595b6]" : "text-[#688492] hover:bg-[#f5fafb]"
                      }`}
                    >
                      <Icon className="size-4" />
                      {label}
                    </a>
                  ))}
                </nav>
              </div>
            )}
          </header>

          <main
            id="bookings"
            className="mx-auto max-w-[1480px] px-5 py-8 sm:px-8 xl:px-10 xl:py-10"
          >
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#e9f8fb] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#1697b8]">
                  <Sparkles className="size-3.5" /> Friday, 28 August 2026
                </div>
                <h1 className="text-[32px] font-extrabold tracking-[-0.04em] text-[#092c54] sm:text-[40px]">
                  Good morning, Abbasi Farm
                </h1>
                <p className="mt-2 max-w-xl text-sm leading-6 text-[#76909d]">
                  Here’s the calm, clear view of what’s happening at your pool today.
                </p>
              </div>
              <a
                href="https://wa.me/923129668880"
                className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#092c54] px-5 py-3 text-xs font-bold text-white shadow-lg shadow-[#092c54]/15 transition hover:-translate-y-0.5 hover:bg-[#124577]"
              >
                <Plus className="size-4 text-[#65d1e8]" /> Add new booking
              </a>
            </div>

            <section className="mt-9 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
              {[
                {
                  icon: CalendarCheck,
                  label: "Total bookings",
                  value: stats.total,
                  note: "+12.5% from last week",
                  noteClass: "text-[#1ca676]",
                  iconClass: "bg-[#e7f8fb] text-[#159dbf]",
                },
                {
                  icon: CheckCircle2,
                  label: "Confirmed",
                  value: stats.confirmed,
                  note: "Ready for arrival",
                  noteClass: "text-[#7e9aa5]",
                  iconClass: "bg-[#e8f8f1] text-[#24a274]",
                },
                {
                  icon: Hourglass,
                  label: "Needs attention",
                  value: stats.pending,
                  note: "Pending confirmation",
                  noteClass: "text-[#c28b2f]",
                  iconClass: "bg-[#fff6df] text-[#d49a2d]",
                },
                {
                  icon: Users,
                  label: "Expected swimmers",
                  value: stats.people,
                  note: "Across active bookings",
                  noteClass: "text-[#7e9aa5]",
                  iconClass: "bg-[#f0eafd] text-[#8966c7]",
                },
              ].map(({ icon: Icon, label, value, note, noteClass, iconClass }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[#deedf1] bg-white p-4 shadow-[0_10px_30px_rgba(24,82,105,0.04)] sm:p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`flex size-10 items-center justify-center rounded-xl ${iconClass}`}
                    >
                      <Icon className="size-[18px]" />
                    </span>
                    <MoreHorizontal className="size-4 text-[#c2d1d7]" />
                  </div>
                  <p className="mt-5 text-[11px] font-semibold text-[#8097a2]">{label}</p>
                  <div className="mt-1 flex items-end justify-between gap-2">
                    <p className="text-[28px] font-extrabold leading-none tracking-[-0.04em] text-[#092c54]">
                      {value}
                    </p>
                    <p className={`text-right text-[10px] font-bold ${noteClass}`}>{note}</p>
                  </div>
                </div>
              ))}
            </section>

            <div className="mt-8 grid gap-6 2xl:grid-cols-[minmax(0,1fr)_340px]">
              <section className="min-w-0 rounded-2xl border border-[#deedf1] bg-white shadow-[0_10px_30px_rgba(24,82,105,0.04)]">
                <div className="flex flex-col justify-between gap-4 border-b border-[#e7f0f2] p-5 sm:flex-row sm:items-center sm:px-6 sm:py-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-[17px] font-extrabold tracking-[-0.02em] text-[#092c54]">
                        Recent bookings
                      </h2>
                      <span className="rounded-full bg-[#eef8fa] px-2 py-1 text-[10px] font-bold text-[#2ba2bf]">
                        {filtered.length} shown
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#8aa0aa]">
                      Keep an eye on arrivals and follow-ups.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex w-fit items-center gap-2 text-xs font-bold text-[#258da9] hover:text-[#092c54]"
                  >
                    View calendar <ArrowUpRight className="size-3.5" />
                  </button>
                </div>

                <div className="flex flex-col gap-3 border-b border-[#e7f0f2] bg-[#fbfdfe] p-4 sm:flex-row sm:items-center sm:px-6">
                  <div className="relative min-w-0 flex-1">
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#9bb0b9]" />
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search name, phone or booking ID"
                      aria-label="Search bookings"
                      className="h-10 w-full rounded-xl border border-[#dcecf1] bg-white pl-9 pr-3 text-xs font-medium text-[#173a5f] outline-none transition placeholder:text-[#a3b4ba] focus:border-[#5bc7e4] focus:ring-4 focus:ring-[#5bc7e4]/10"
                    />
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto">
                    <Filter className="size-4 shrink-0 text-[#9bb0b9]" />
                    {(["all", "confirmed", "pending", "cancelled"] as const).map((filter) => (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setStatus(filter)}
                        className={`whitespace-nowrap rounded-lg px-3 py-2 text-[11px] font-bold capitalize transition ${
                          status === filter
                            ? "bg-[#092c54] text-white shadow-sm"
                            : "bg-white text-[#78919d] ring-1 ring-[#dcecf1] hover:text-[#092c54]"
                        }`}
                      >
                        {filter === "all" ? "All" : statusStyles[filter].label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] border-collapse text-left">
                    <thead>
                      <tr className="border-b border-[#edf3f4] text-[10px] font-bold uppercase tracking-[0.14em] text-[#9aadb5]">
                        <th className="px-6 py-4 font-bold">Guest</th>
                        <th className="px-4 py-4 font-bold">Date & time</th>
                        <th className="px-4 py-4 font-bold">Visitors</th>
                        <th className="px-4 py-4 font-bold">Status</th>
                        <th className="px-4 py-4 text-right font-bold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((booking) => {
                        const currentStatus = statusStyles[booking.status];
                        const StatusIcon = currentStatus.icon;
                        return (
                          <tr
                            key={booking.id}
                            onClick={() => setSelectedBooking(booking)}
                            className="group cursor-pointer border-b border-[#edf3f4] transition hover:bg-[#fbfdfe]"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#e8f7fa] text-[10px] font-extrabold text-[#168eae]">
                                  {initials(booking.name)}
                                </span>
                                <div>
                                  <p className="text-xs font-extrabold text-[#173a5f]">
                                    {booking.name}
                                  </p>
                                  <p className="mt-1 text-[10px] text-[#99abb3]">
                                    #{booking.id} · {booking.phone}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <p className="text-xs font-bold text-[#355a73]">
                                {formatDate(booking.date)}
                              </p>
                              <p className="mt-1 text-[10px] text-[#99abb3]">{booking.time}</p>
                            </td>
                            <td className="px-4 py-4">
                              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#355a73]">
                                <Users className="size-3.5 text-[#58bed8]" /> {booking.people}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-bold ${currentStatus.chip}`}
                              >
                                <StatusIcon className="size-3" /> {currentStatus.label}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-right">
                              <button
                                type="button"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  setSelectedBooking(booking);
                                }}
                                className="rounded-lg px-2.5 py-2 text-[10px] font-bold text-[#76a0ad] transition hover:bg-[#eaf8fb] hover:text-[#168eae]"
                              >
                                View details
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {filtered.length === 0 && (
                    <div className="px-6 py-16 text-center">
                      <Search className="mx-auto size-7 text-[#b5c8ce]" />
                      <p className="mt-3 text-sm font-extrabold text-[#173a5f]">
                        No bookings found
                      </p>
                      <p className="mt-1 text-xs text-[#8aa0aa]">
                        Try a different guest, phone number or status.
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between bg-[#fbfdfe] px-6 py-4">
                  <p className="text-[10px] text-[#91a6af]">
                    Showing <span className="font-bold text-[#507085]">{filtered.length}</span> of{" "}
                    <span className="font-bold text-[#507085]">{bookings.length}</span> bookings
                  </p>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-[#218eab] hover:text-[#092c54]"
                  >
                    Export list <ArrowUpRight className="size-3" />
                  </button>
                </div>
              </section>

              <aside id="slots" className="space-y-6">
                <section className="rounded-2xl bg-[#092c54] p-5 text-white shadow-[0_18px_38px_rgba(9,44,84,0.18)] sm:p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#66d2e8]">
                        Today at the pool
                      </p>
                      <h2 className="mt-2 text-[20px] font-extrabold tracking-[-0.03em]">
                        Slot capacity
                      </h2>
                    </div>
                    <span className="flex size-9 items-center justify-center rounded-xl bg-white/10">
                      <LifeBuoy className="size-[18px] text-[#67d5e9]" />
                    </span>
                  </div>
                  <div className="mt-6 flex items-end justify-between">
                    <div>
                      <p className="text-[34px] font-extrabold leading-none tracking-[-0.06em]">
                        81
                      </p>
                      <p className="mt-2 text-[11px] text-white/50">visitors booked</p>
                    </div>
                    <p className="text-right text-[11px] font-bold text-[#6cdbac]">39% remaining</p>
                  </div>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[61%] rounded-full bg-[#5bc7e4]" />
                  </div>
                  <p className="mt-3 flex items-center gap-2 text-[10px] text-white/50">
                    <span className="size-1.5 rounded-full bg-[#6cdbac]" /> 49 spots still open
                    today
                  </p>
                </section>

                <section className="rounded-2xl border border-[#deedf1] bg-white p-5 shadow-[0_10px_30px_rgba(24,82,105,0.04)] sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-[16px] font-extrabold tracking-[-0.02em] text-[#092c54]">
                        Today’s time slots
                      </h2>
                      <p className="mt-1 text-[11px] text-[#8aa0aa]">Friday, 28 August</p>
                    </div>
                    <button
                      type="button"
                      aria-label="More slot options"
                      className="flex size-8 items-center justify-center rounded-lg text-[#9aadb5] hover:bg-[#f3f9fa]"
                    >
                      <MoreHorizontal className="size-4" />
                    </button>
                  </div>
                  <div className="mt-5 space-y-4">
                    {slotSchedule.map(({ time, booked, capacity, tone }) => (
                      <div key={time}>
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-xs font-bold text-[#355a73]">{time}</p>
                          <p className="text-[10px] font-semibold text-[#91a6af]">
                            {booked}/{capacity}
                          </p>
                        </div>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#edf4f5]">
                          <div
                            className={`h-full rounded-full ${tone}`}
                            style={{ width: `${(booked / capacity) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <a
                    href="#"
                    className="mt-6 flex items-center justify-center gap-1 rounded-xl bg-[#f1fafb] py-3 text-[11px] font-bold text-[#208fae] transition hover:bg-[#e7f7fa]"
                  >
                    Manage time slots <ChevronRight className="size-3.5" />
                  </a>
                </section>

                <section className="rounded-2xl border border-[#deedf1] bg-white p-5 shadow-[0_10px_30px_rgba(24,82,105,0.04)] sm:p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-[16px] font-extrabold tracking-[-0.02em] text-[#092c54]">
                      Needs attention
                    </h2>
                    <span className="flex size-7 items-center justify-center rounded-lg bg-[#fff6df] text-[#d49a2d]">
                      <Bell className="size-3.5" />
                    </span>
                  </div>
                  <div className="mt-4 flex gap-3 rounded-xl bg-[#fffaf0] p-3">
                    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#ffefc8] text-[#d49a2d]">
                      <Hourglass className="size-3.5" />
                    </span>
                    <div>
                      <p className="text-[11px] font-bold text-[#7d612b]">
                        3 pending confirmations
                      </p>
                      <p className="mt-1 text-[10px] leading-4 text-[#aa9060]">
                        Confirm before the guests arrive.
                      </p>
                    </div>
                  </div>
                </section>
              </aside>
            </div>
          </main>
        </div>
      </div>

      {selectedBooking && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-[#06243e]/35 backdrop-blur-[2px]"
          onClick={() => setSelectedBooking(null)}
        >
          <aside
            className="h-full w-full max-w-[440px] overflow-y-auto bg-white p-6 shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#2aa4c2]">
                  Booking details
                </p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.04em] text-[#092c54]">
                  {selectedBooking.id}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close booking details"
                onClick={() => setSelectedBooking(null)}
                className="flex size-10 items-center justify-center rounded-xl border border-[#deedf1] text-[#78919d] hover:bg-[#f4fafb]"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-8 flex items-center gap-4 rounded-2xl bg-[#f2fafb] p-4">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-[#d9f3f7] text-sm font-extrabold text-[#168eae]">
                {initials(selectedBooking.name)}
              </span>
              <div>
                <p className="font-extrabold text-[#173a5f]">{selectedBooking.name}</p>
                <p className="mt-1 text-xs text-[#89a1ac]">Guest profile · First visit</p>
              </div>
              <span
                className={`ml-auto rounded-full px-2.5 py-1.5 text-[10px] font-bold ${statusStyles[selectedBooking.status].chip}`}
              >
                {statusStyles[selectedBooking.status].label}
              </span>
            </div>

            <div className="mt-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9aadb5]">
                Reservation
              </p>
              <div className="mt-4 divide-y divide-[#edf3f4] rounded-2xl border border-[#deedf1]">
                {[
                  { label: "Date", value: formatDate(selectedBooking.date), icon: Calendar },
                  { label: "Time", value: selectedBooking.time, icon: Clock },
                  { label: "Visitors", value: `${selectedBooking.people} people`, icon: Users },
                  { label: "Phone", value: selectedBooking.phone, icon: Phone },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-3 px-4 py-3.5">
                    <Icon className="size-4 text-[#54bed8]" />
                    <span className="text-xs text-[#91a6af]">{label}</span>
                    <span className="ml-auto text-right text-xs font-bold text-[#355a73]">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {selectedBooking.notes && (
              <div className="mt-6 rounded-2xl border border-[#dceff2] bg-[#f3fbfc] p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#78a3ae]">
                  Guest note
                </p>
                <p className="mt-2 text-xs leading-5 text-[#527383]">“{selectedBooking.notes}”</p>
              </div>
            )}

            <div className="mt-8 grid grid-cols-2 gap-3">
              <a
                href={`https://wa.me/${selectedBooking.phone.replace(/[^0-9]/g, "")}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#29b977] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#20a569]"
              >
                <MessageCircle className="size-4" /> WhatsApp
              </a>
              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#092c54] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#124577]"
              >
                <Check className="size-4" /> Mark reviewed
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
