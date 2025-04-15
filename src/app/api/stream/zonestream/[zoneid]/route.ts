import { NextResponse } from "next/server";
import Stream from "../../../../../../models/stream.model";
import { NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { zoneid: string } } // <-- correctly use `context`
) {
  const theParams = await params;
  const zoneId=theParams.zoneid;

  if (!zoneId) {
    return NextResponse.json({ message: "zone id required!" }, { status: 404 });
  }

  try {
    console.log("this is the zone:",zoneId);
    const tracks = await Stream.find({ zone: zoneId });

    if (!tracks || tracks.length === 0) {
      return NextResponse.json(
        { message: "No stream in the zone" },
        { status: 200 }
      );
    }

    return NextResponse.json({ streams:tracks }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: `error occurred: ${err}` },
      { status: 500 }
    );
  }
}
