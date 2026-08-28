import { Link, Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Bell,
  LayoutDashboard,
  CalendarCheck,
  Calendar,
  Clock,
  Users,
  SlidersHorizontal,
  Waves,
  Settings,
  Menu,
  X,
  LogOut,
  ImageIcon,
  FileText,
  ShieldCheck,
  LucideMessageCircleQuestion,
  BarChart3,
  BellRing,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  return <Outlet />;
}

const MENU = [
  {
    section: "Workspace",
    items: [
      { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
      { label: "Bookings", to: "/admin/bookings", icon: CalendarCheck, badge: "8" },
      { label: "Calendar", to: "/admin/calendar", icon: Calendar },
      { label: "Time Slots", to: "/admin/slots", icon: Clock },
      { label: "Customers", to: "/admin/customers", icon: Users },
    ],
  },
  {
    section: "Analytics",
    items: [{ label: "Reports", to: "/admin/reports", icon: BarChart3 }],
  },
  {
    section: "Content",
    items: [
      { label: "Pricing", to: "/admin/settings", icon: SlidersHorizontal },
      { label: "Timings", to: "/admin/settings", icon: Clock },
      { label: "Facilities", to: "/admin/settings", icon: Waves },
      { label: "Gallery", to: "/admin/settings", icon: ImageIcon },
      { label: "Rules & Safety", to: "/admin/settings", icon: ShieldCheck },
      { label: "FAQs", to: "/admin/settings", icon: LucideMessageCircleQuestion },
      { label: "Notifications", to: "/admin/settings", icon: BellRing },
      { label: "Settings", to: "/admin/settings", icon: Settings },
    ],
  },
];

export function AdminShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-[#f6fafb] font-sans text-foreground">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-[258px] shrink-0 flex-col bg-navy-deep px-4 py-6 text-white lg:flex">
          <Link to="/" className="flex items-center gap-3 px-2">
            <span className="flex size-10 items-center justify-center rounded-[13px] bg-brand text-navy shadow-lg shadow-black/20">
              <Waves className="size-5" strokeWidth={2.5} />
            </span>
            <span className="leading-none">
              <span className="block text-[15px] font-extrabold tracking-[0.01em]">
                ABBASI FARM
              </span>
              <span className="mt-1 block text-[9px] font-medium tracking-[0.28em] text-white/55">
                OPERATIONS
              </span>
            </span>
          </Link>

          <div className="mt-10 flex-1 space-y-7 overflow-y-auto">
            {MENU.map((g) => (
              <div key={g.section}>
                <p className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
                  {g.section}
                </p>
                <nav className="mt-3 space-y-1">
                  {g.items.map((item) => {
                    const active = pathname === item.to;
                    return (
                      <Link
                        key={item.label}
                        to={item.to}
                        className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition ${
                          active
                            ? "bg-white text-navy shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
                            : "text-white/60 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <item.icon
                          className={`size-[17px] ${active ? "text-brand" : "text-white/55"}`}
                        />
                        {item.label}
                        {item.badge && (
                          <span
                            className={`ml-auto rounded-full px-2 py-0.5 text-[10px] ${
                              active ? "bg-brand-soft text-brand" : "bg-white/10 text-white/60"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.07] p-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-[11px] font-bold text-white/70">
                <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.15)]" />
                Pool is open
              </span>
              <Settings className="size-4 text-white/35" />
            </div>
            <p className="mt-4 text-[12px] leading-5 text-white/45">
              Today's last available slot is filling up quickly.
            </p>
            <Link
              to="/admin/slots"
              className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold text-brand-soft hover:text-white"
            >
              View capacity →
            </Link>
          </div>
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 border-b border-[#dcecf1] bg-white/90 backdrop-blur-xl">
            <div className="flex h-[72px] items-center justify-between px-5 sm:px-8">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Open navigation"
                  onClick={() => setMobileOpen((o) => !o)}
                  className="flex size-10 items-center justify-center rounded-xl border border-[#dcecf1] text-navy lg:hidden"
                >
                  <Menu className="size-5" />
                </button>
                <div className="lg:hidden">
                  <p className="text-[13px] font-extrabold tracking-tight text-navy">ABBASI FARM</p>
                  <p className="text-[8px] font-medium tracking-[0.24em] text-muted-foreground">
                    OPERATIONS
                  </p>
                </div>
                <div className="hidden items-center gap-2 text-xs text-muted-foreground lg:flex">
                  <span>Workspace</span>
                  <span>›</span>
                  <span className="font-semibold text-navy">{title}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  to="/"
                  className="hidden items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-muted-foreground transition hover:bg-surface hover:text-navy sm:inline-flex"
                >
                  <ArrowLeft className="size-3.5" /> View website
                </Link>
                <button
                  type="button"
                  aria-label="Notifications"
                  className="relative flex size-10 items-center justify-center rounded-xl border border-[#dcecf1] text-muted-foreground transition hover:bg-surface"
                >
                  <Bell className="size-[17px]" />
                  <span className="absolute right-2.5 top-2 size-1.5 rounded-full bg-rose-400" />
                </button>
                <div className="hidden h-8 w-px bg-[#e2eef1] sm:block" />
                <div className="flex items-center gap-2.5">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-brand-soft text-[11px] font-extrabold text-brand">
                    AF
                  </div>
                  <div className="hidden leading-tight sm:block">
                    <p className="text-xs font-bold text-navy">Abbasi Farm</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">Manager account</p>
                  </div>
                  <LogOut className="ml-1 hidden size-4 text-muted-foreground sm:block" />
                </div>
              </div>
            </div>
            {mobileOpen && (
              <div className="border-t border-[#dcecf1] bg-white px-5 py-4 lg:hidden">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-navy">Navigation</span>
                  <button aria-label="Close" type="button" onClick={() => setMobileOpen(false)}>
                    <X className="size-4 text-muted-foreground" />
                  </button>
                </div>
                <nav className="grid grid-cols-2 gap-2">
                  {MENU.flatMap((g) => g.items).map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 rounded-xl bg-surface px-3 py-3 text-xs font-bold text-navy"
                    >
                      <item.icon className="size-4 text-brand" /> {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            )}
          </header>

          <main className="mx-auto w-full max-w-[1500px] flex-1 px-5 py-8 sm:px-8">
            <div className="mb-8">
              <h1 className="text-[30px] font-extrabold tracking-[-0.04em] text-navy sm:text-[36px]">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{subtitle}</p>
              )}
            </div>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
