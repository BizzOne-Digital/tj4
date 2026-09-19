import bcrypt from "bcryptjs";
import { connectDB } from "../lib/db/mongodb";
import { AdminUser } from "../models/schemas";

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env");
  }
  await connectDB();
  const passwordHash = await bcrypt.hash(password, 12);
  await AdminUser.findOneAndUpdate(
    { email: email.toLowerCase() },
    { email: email.toLowerCase(), passwordHash, name: "Site Admin", role: "super_admin" },
    { upsert: true }
  );
  console.log("Admin user ready:", email.toLowerCase());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
