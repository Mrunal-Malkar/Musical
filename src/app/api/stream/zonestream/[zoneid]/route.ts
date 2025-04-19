import { NextRequest, NextResponse } from "next/server";
import Stream from "../../../../../../models/stream.model";

export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const segments = url.pathname.split('/');
  const zoneId = segments[segments.length - 1]; // Assumes 'zoneid' is the last segment

  if (!zoneId) {
    return NextResponse.json({ message: "zone id required!" }, { status: 400 });
  }

  try {
    console.log("Zone ID:", zoneId);
    const tracks = await Stream.find({ zone: zoneId }).sort({upvotes:-1});

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
