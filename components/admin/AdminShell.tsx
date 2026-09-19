"use client";

import { signOut } from "next-auth/react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminMobileNav } from "@/components/admin/AdminMobileNav";
import { usePathname } from "next/navigation";

export function AdminShell({ children, title }: { children: React.ReactNode; title?: string }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip bg-midnight text-white">
      <div className="flex min-w-0">
        <AdminSidebar pathname={pathname} />
        <div className="min-w-0 flex-1 overflow-x-clip">
          <header className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-4 lg:px-8">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <AdminMobileNav pathname={pathname} />
              <h1 className="truncate text-lg uppercase tracking-wide sm:text-xl">{title || "Admin"}</h1>
            </div>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="text-xs uppercase tracking-widest text-steel hover:text-white"
            >
              Logout
            </button>
          </header>
          <div className="p-4 lg:p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
