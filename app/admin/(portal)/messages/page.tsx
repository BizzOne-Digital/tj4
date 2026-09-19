import { requireAdmin } from "@/lib/auth/session";
import { connectDB, isDbConfigured } from "@/lib/db/mongodb";
import { ContactMessage, type IContactMessage } from "@/models/schemas";
import { markMessageRead } from "@/actions/admin-crud";

export default async function AdminMessagesPage() {
  await requireAdmin();
  let rows: IContactMessage[] = [];
  if (isDbConfigured()) {
    await connectDB();
    rows = (await ContactMessage.find().sort({ createdAt: -1 }).limit(100).lean()) as IContactMessage[];
  }

  return (
    <div>
      <h2 className="mb-6 text-3xl uppercase">Messages</h2>
      <div className="space-y-4">
        {rows.map((row) => (
          <div key={String(row._id)} className="rounded-xl border border-white/10 p-4">
            <div className="flex items-center justify-between gap-4">
              <p className="font-semibold">
                {row.subject} · {row.name}
              </p>
              {!row.read && (
                <form action={markMessageRead}>
                  <input type="hidden" name="id" value={String(row._id)} />
                  <button type="submit" className="text-xs uppercase text-electric">
                    Mark Read
                  </button>
                </form>
              )}
            </div>
            <p className="mt-2 text-sm text-steel">{row.message}</p>
          </div>
        ))}
        {!rows.length && <p className="text-steel">No messages yet.</p>}
      </div>
    </div>
  );
}
