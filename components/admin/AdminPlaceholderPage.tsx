import { requireAdmin } from "@/lib/auth/session";

export default async function AdminPlaceholderPage({ title }: { title: string }) {
  await requireAdmin();
  return (
    <div>
      <h2 className="text-3xl uppercase">{title}</h2>
      <p className="mt-4 max-w-2xl text-sm text-steel">
        Manage {title.toLowerCase()} content here. Use related collection pages (programs, settings, blog) for full
        editing workflows. Extend this screen with list tables and forms as needed.
      </p>
    </div>
  );
}
