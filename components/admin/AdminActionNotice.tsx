export function AdminActionNotice({
  saved,
  deleted,
  error,
}: {
  saved?: boolean;
  deleted?: boolean;
  error?: string;
}) {
  if (error === "db") {
    return (
      <p className="mb-6 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
        MongoDB is not configured. Set <code className="text-white">MONGODB_URI</code> in your environment.
      </p>
    );
  }
  if (saved) {
    return (
      <p className="mb-6 rounded-lg border border-green-400/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
        Saved successfully. Public pages will show your updates.
      </p>
    );
  }
  if (deleted) {
    return (
      <p className="mb-6 rounded-lg border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
        Deleted successfully.
      </p>
    );
  }
  return null;
}
