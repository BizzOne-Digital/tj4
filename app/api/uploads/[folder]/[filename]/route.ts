import { NextResponse } from "next/server";
import { connectDB, isDbConfigured } from "@/lib/db/mongodb";
import { StoredUpload } from "@/models/schemas";
import { isUploadFolder } from "@/lib/uploads/constants";
import { isSafeFilename } from "@/lib/uploads/stored-upload";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: Promise<{ folder: string; filename: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { folder, filename } = await params;

  if (!isUploadFolder(folder) || !isSafeFilename(filename)) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  if (!isDbConfigured()) {
    return new NextResponse("Service Unavailable", { status: 503 });
  }

  await connectDB();

  const doc = await StoredUpload.findOne({ folder, filename })
    .select("data mimeType size")
    .lean<{ data: Buffer; mimeType: string; size: number }>();

  if (!doc?.data) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const body = Buffer.isBuffer(doc.data) ? doc.data : Buffer.from(doc.data);

  return new NextResponse(new Uint8Array(body), {
    status: 200,
    headers: {
      "Content-Type": doc.mimeType,
      "Content-Length": String(doc.size ?? body.length),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
