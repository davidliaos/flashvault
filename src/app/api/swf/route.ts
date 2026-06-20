import { NextResponse } from "next/server";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(
    { error: "This endpoint is disabled in static export. Use direct archive URLs instead." },
    { status: 410 },
  );
}
