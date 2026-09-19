import { NextResponse } from "next/server";
import { connectDB, isDbConfigured } from "@/lib/db/mongodb";
import { StoredUpload, ActivityLog } from "@/models/schemas";
import {
  ALLOWED_UPLOAD_MIMES,
  MAX_UPLOAD_BYTES,
  isUploadFolder,
} from "@/lib/uploads/constants";
import {
  buildUploadPublicUrl,
  deleteStoredUploadByUrl,
  generateUploadFilename,
  parseStoredUploadUrl,
} from "@/lib/uploads/stored-upload";
import { requireAdminApi } from "@/lib/uploads/require-admin-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { session, error } = await requireAdminApi();
  if (error) return error;

  if (!isDbConfigured()) {
    return NextResponse.json({ success: false, error: "MongoDB not configured" }, { status: 503 });
  }

  const formData = await req.formData();
  const file = formData.get("file");
  const folderRaw = String(formData.get("folder") || "").trim();

  if (!isUploadFolder(folderRaw)) {
    return NextResponse.json({ success: false, error: "Invalid folder" }, { status: 400 });
  }

  if (!(file instanceof File)) {
    return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
  }

  if (!ALLOWED_UPLOAD_MIMES.includes(file.type as (typeof ALLOWED_UPLOAD_MIMES)[number])) {
    return NextResponse.json({ success: false, error: "Invalid file type" }, { status: 400 });
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ success: false, error: "File too large (max 8MB)" }, { status: 400 });
  }

  const replaceUrl = String(formData.get("replaceUrl") || "").trim();
  if (replaceUrl) {
    await deleteStoredUploadByUrl(replaceUrl);
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = generateUploadFilename(file.type);

  await connectDB();

  try {
    await StoredUpload.create({
      folder: folderRaw,
      filename,
      mimeType: file.type,
      size: buffer.length,
      data: buffer,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Failed to store upload" }, { status: 500 });
  }

  const url = buildUploadPublicUrl(folderRaw, filename);

  await ActivityLog.create({
    userId: session!.user.id,
    userEmail: session!.user.email,
    action: "Uploaded stored image",
    entity: "StoredUpload",
    details: `${folderRaw}/${filename}`,
  });

  return NextResponse.json({
    success: true,
    url,
    filename,
    size: buffer.length,
    folder: folderRaw,
  });
}

export async function DELETE(req: Request) {
  const { session, error } = await requireAdminApi();
  if (error) return error;

  if (!isDbConfigured()) {
    return NextResponse.json({ success: false, error: "MongoDB not configured" }, { status: 503 });
  }

  let url = "";
  try {
    const body = await req.json();
    url = String(body.url || "");
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }

  if (!parseStoredUploadUrl(url)) {
    return NextResponse.json({ success: false, error: "Not a stored upload URL" }, { status: 400 });
  }

  const deleted = await deleteStoredUploadByUrl(url);

  if (deleted) {
    await ActivityLog.create({
      userId: session!.user.id,
      userEmail: session!.user.email,
      action: "Deleted stored image",
      entity: "StoredUpload",
      details: url,
    });
  }

  return NextResponse.json({ success: true, deleted });
}
