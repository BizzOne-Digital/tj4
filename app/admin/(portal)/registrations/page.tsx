import { requireAdmin } from "@/lib/auth/session";
import { connectDB, isDbConfigured } from "@/lib/db/mongodb";
import { Registration, type IRegistration } from "@/models/schemas";
import { updateRegistrationStatus } from "@/actions/admin-crud";

export default async function AdminRegistrationsPage() {
  await requireAdmin();
  let rows: IRegistration[] = [];
  if (isDbConfigured()) {
    await connectDB();
    rows = (await Registration.find().sort({ createdAt: -1 }).limit(100).lean()) as IRegistration[];
  }

  return (
    <div>
      <h2 className="mb-6 text-3xl uppercase">Registrations</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-steel">
            <tr>
              <th className="p-2">Athlete</th>
              <th className="p-2">Parent</th>
              <th className="p-2">Program</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={String(row._id)} className="border-t border-white/10">
                <td className="p-2">{row.athleteName}</td>
                <td className="p-2">
                  {row.parentName}
                  <div className="text-xs text-steel">{row.parentEmail}</div>
                </td>
                <td className="p-2">{row.programInterest}</td>
                <td className="p-2">{row.status}</td>
                <td className="p-2">
                  <form action={updateRegistrationStatus} className="flex gap-2">
                    <input type="hidden" name="id" value={String(row._id)} />
                    <select name="status" defaultValue={row.status} className="field !py-1 text-xs">
                      <option value="new">new</option>
                      <option value="reviewing">reviewing</option>
                      <option value="contacted">contacted</option>
                      <option value="enrolled">enrolled</option>
                      <option value="declined">declined</option>
                    </select>
                    <button type="submit" className="text-xs uppercase text-electric">
                      Update
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length && <p className="mt-4 text-steel">No registrations yet.</p>}
      </div>
    </div>
  );
}
