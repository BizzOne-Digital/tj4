import { requireAdmin } from "@/lib/auth/session";
import { connectDB, isDbConfigured } from "@/lib/db/mongodb";
import { getPrograms } from "@/lib/data/queries";
import { deleteProgram, upsertProgram } from "@/actions/admin-crud";
import { LocalImageField } from "@/components/admin/LocalImageField";
import { AdminActionNotice } from "@/components/admin/AdminActionNotice";

type Props = { searchParams: Promise<{ saved?: string; deleted?: string; error?: string }> };

export default async function AdminProgramsPage({ searchParams }: Props) {
  await requireAdmin();
  const programs = await getPrograms(false);
  const params = await searchParams;

  if (isDbConfigured()) await connectDB();

  return (
    <div>
      <h2 className="mb-6 text-3xl uppercase">Programs</h2>
      <AdminActionNotice saved={params.saved === "1"} deleted={params.deleted === "1"} error={params.error} />
      <form action={upsertProgram} className="mb-10 grid max-w-3xl gap-3 rounded-xl border border-white/10 p-6">
        <input name="title" placeholder="Title" className="field" required />
        <input name="slug" placeholder="slug (optional)" className="field" />
        <textarea name="shortDescription" placeholder="Short description" className="field" />
        <textarea name="fullDescription" placeholder="Full description" className="field" rows={4} />
        <LocalImageField name="featuredImage" folder="products" label="Featured image" />
        <input name="ageRange" placeholder="Age range" className="field" />
        <input name="skillLevel" placeholder="Skill level" className="field" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="active" defaultChecked /> Active
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" /> Featured
        </label>
        <button type="submit" className="rounded-lg bg-electric px-4 py-2 text-sm uppercase">
          Save Program
        </button>
      </form>
      <div className="space-y-3">
        {programs.map((p) => (
          <div key={p.slug} className="flex items-center justify-between rounded-lg border border-white/10 p-4">
            <div>
              <p className="font-semibold">{p.title}</p>
              <p className="text-xs text-steel">{p.slug}</p>
            </div>
            <form action={deleteProgram}>
              <input type="hidden" name="slug" value={p.slug} />
              <button type="submit" className="text-xs uppercase text-red-400">
                Delete
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
