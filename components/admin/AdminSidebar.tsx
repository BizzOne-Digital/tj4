import Link from "next/link";
import { cn } from "@/lib/utils/cn";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/homepage", label: "Homepage" },
  { href: "/admin/pages", label: "Pages" },
  { href: "/admin/programs", label: "Programs" },
  { href: "/admin/pricing", label: "Pricing" },
  { href: "/admin/team", label: "Team" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/faqs", label: "FAQs" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/achievements", label: "Achievements" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/sponsors", label: "Sponsors" },
  { href: "/admin/registrations", label: "Registrations" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/newsletter", label: "Newsletter" },
  { href: "/admin/navigation", label: "Navigation" },
  { href: "/admin/footer", label: "Footer" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/users", label: "Users" },
];

export function AdminSidebar({ pathname }: { pathname: string }) {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-charcoal p-4 lg:block">
      <Link href="/" className="mb-6 block text-sm uppercase tracking-widest text-electric">
        ← View Site
      </Link>
      <nav className="space-y-1 text-sm">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "block rounded-lg px-3 py-2 text-steel hover:bg-white/5 hover:text-white",
              pathname === link.href && "bg-electric/20 text-white"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export const adminLinks = links;
