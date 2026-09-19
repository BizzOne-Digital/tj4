"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { connectDB, isDbConfigured } from "@/lib/db/mongodb";
import { Program, Coach, Testimonial, BlogPost, FAQ, Registration, ContactMessage } from "@/models/schemas";
import { requireAdmin } from "@/lib/auth/session";
import { slugify } from "@/lib/utils/cn";
import { revalidatePublicSite } from "@/lib/revalidate/public-site";

export async function upsertProgram(formData: FormData) {
  await requireAdmin();
  if (!isDbConfigured()) redirect("/admin/programs?error=db");
  await connectDB();
  const title = String(formData.get("title") || "");
  const slug = String(formData.get("slug") || slugify(title));
  await Program.findOneAndUpdate(
    { slug },
    {
      title,
      slug,
      shortDescription: String(formData.get("shortDescription") || ""),
      fullDescription: String(formData.get("fullDescription") || ""),
      ageRange: String(formData.get("ageRange") || ""),
      skillLevel: String(formData.get("skillLevel") || ""),
      featuredImage: String(formData.get("featuredImage") || ""),
      active: formData.get("active") === "on",
      featured: formData.get("featured") === "on",
    },
    { upsert: true }
  );
  revalidatePublicSite({ programSlug: slug });
  redirect("/admin/programs?saved=1");
}

export async function deleteProgram(formData: FormData) {
  await requireAdmin();
  if (!isDbConfigured()) redirect("/admin/programs?error=db");
  await connectDB();
  const slug = String(formData.get("slug"));
  await Program.deleteOne({ slug });
  revalidatePublicSite({ programSlug: slug });
  redirect("/admin/programs?deleted=1");
}

export async function approveTestimonial(formData: FormData) {
  await requireAdmin();
  if (!isDbConfigured()) return;
  await connectDB();
  await Testimonial.findByIdAndUpdate(String(formData.get("id")), { approved: true });
  revalidatePublicSite();
}

export async function updateRegistrationStatus(formData: FormData) {
  await requireAdmin();
  if (!isDbConfigured()) return;
  await connectDB();
  await Registration.findByIdAndUpdate(String(formData.get("id")), {
    status: String(formData.get("status")),
    adminNotes: String(formData.get("adminNotes") || ""),
  });
  revalidatePath("/admin/registrations");
}

export async function markMessageRead(formData: FormData) {
  await requireAdmin();
  if (!isDbConfigured()) return;
  await connectDB();
  await ContactMessage.findByIdAndUpdate(String(formData.get("id")), { read: true });
  revalidatePath("/admin/messages");
}

export async function upsertCoach(formData: FormData) {
  await requireAdmin();
  if (!isDbConfigured()) redirect("/admin/team?error=db");
  await connectDB();
  const id = String(formData.get("id") || "");
  const payload = {
    name: String(formData.get("name") || ""),
    title: String(formData.get("title") || ""),
    bio: String(formData.get("bio") || ""),
    photo: String(formData.get("photo") || ""),
    published: formData.get("published") === "on",
    featured: formData.get("featured") === "on",
  };
  if (id) await Coach.findByIdAndUpdate(id, payload);
  else await Coach.create(payload);
  revalidatePublicSite();
  redirect("/admin/team?saved=1");
}

export async function upsertBlogPost(formData: FormData) {
  await requireAdmin();
  if (!isDbConfigured()) redirect("/admin/blog?error=db");
  await connectDB();
  const title = String(formData.get("title") || "");
  const slug = String(formData.get("slug") || slugify(title));
  await BlogPost.findOneAndUpdate(
    { slug },
    {
      title,
      slug,
      excerpt: String(formData.get("excerpt") || ""),
      content: String(formData.get("content") || ""),
      author: String(formData.get("author") || "Central PA Lions Staff"),
      published: formData.get("published") === "on",
      featured: formData.get("featured") === "on",
      publishedAt: new Date(),
    },
    { upsert: true }
  );
  revalidatePublicSite({ blogSlug: slug });
  redirect("/admin/blog?saved=1");
}

export async function upsertFaq(formData: FormData) {
  await requireAdmin();
  if (!isDbConfigured()) redirect("/admin/faqs?error=db");
  await connectDB();
  await FAQ.create({
    question: String(formData.get("question") || ""),
    answer: String(formData.get("answer") || ""),
    categorySlug: String(formData.get("categorySlug") || "registration"),
    visible: true,
  });
  revalidatePublicSite();
  redirect("/admin/faqs?saved=1");
}
