import { NextRequest, NextResponse } from "next/server";
import Stream from "../../../../../../models/stream.model";

export async function POST(
  request: NextRequest,
  context: { params: Record<string, string> } // ✅ THIS is what Next.js wants
) {
  const zoneId = context.params.zoneid;

  if (!zoneId) {
    return NextResponse.json({ message: "zone id required!" }, { status: 400 });
  }

  try {
    console.log("Zone ID:", zoneId);
    const tracks = await Stream.find({ zone: zoneId });

    if (!tracks?.length) {
      return NextResponse.json(
        { message: "No streams in the zone" },
        { status: 200 }
      );
    }

    return NextResponse.json({ streams: tracks }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: `Error occurred: ${err}` },
      { status: 500 }
    );
  }
}
