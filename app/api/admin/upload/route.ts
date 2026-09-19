import { NextResponse } from "next/server";

/** @deprecated Use POST /api/upload (MongoDB stored uploads) instead. */
export async function POST() {
  return NextResponse.json(
    {
      error:
        "This endpoint is deprecated. Use POST /api/upload with folder + file while signed in as admin.",
    },
    { status: 410 }
  );
}
