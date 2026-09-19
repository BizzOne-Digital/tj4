import { requireAdmin } from "@/lib/auth/session";
import { connectDB, isDbConfigured } from "@/lib/db/mongodb";
import { Testimonial, type ITestimonial } from "@/models/schemas";
import { approveTestimonial } from "@/actions/admin-crud";

export default async function AdminTestimonialsPage() {
  await requireAdmin();
  let rows: ITestimonial[] = [];
  if (isDbConfigured()) {
    await connectDB();
    rows = (await Testimonial.find().sort({ createdAt: -1 }).lean()) as ITestimonial[];
  }

  return (
    <div>
      <h2 className="mb-6 text-3xl uppercase">Testimonials</h2>
      <div className="space-y-4">
        {rows.map((row) => (
          <div key={String(row._id)} className="rounded-xl border border-white/10 p-4">
            <p className="text-sm text-steel">&ldquo;{row.content}&rdquo;</p>
            <p className="mt-2 text-xs uppercase tracking-widest">
              {row.name} · {row.approved ? "Approved" : "Pending"}
            </p>
            {!row.approved && (
              <form action={approveTestimonial} className="mt-3">
                <input type="hidden" name="id" value={String(row._id)} />
                <button type="submit" className="text-xs uppercase text-electric">
                  Approve
                </button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
