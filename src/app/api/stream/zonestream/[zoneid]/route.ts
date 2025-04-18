import { NextRequest, NextResponse } from "next/server";
import Stream from "../../../../../../models/stream.model";

export async function POST(
  request: NextRequest,
  context: { params: { zoneid: string } }
) {
  const { zoneid } = context.params;

  if (!zoneid) {
    return NextResponse.json({ message: "zone id required!" }, { status: 404 });
  }

  try {
    console.log("this is the zone:", zoneid);
    const tracks = await Stream.find({ zone: zoneid });

    if (!tracks || tracks.length === 0) {
      return NextResponse.json(
        { message: "No stream in the zone" },
        { status: 200 }
      );
    }

    return NextResponse.json({ streams: tracks }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: `error occurred: ${err}` },
      { status: 500 }
    );
  }
}
