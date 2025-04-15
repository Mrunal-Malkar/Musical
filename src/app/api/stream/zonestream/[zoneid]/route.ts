import { NextResponse } from "next/server";
import Stream from "../../../../../../models/stream.model";

export async function POST(
  request: Request,
  {params}: { params: { zoneid: string } }
) {
  const zoneId =await params.zoneid;

  if (!zoneId) {
    return NextResponse.json(
      { message: "zone id required!" },
      { status: 404 }
    );
  }

  try {
    const tracks = await Stream.find({ zone: zoneId });

    if (!tracks) {
      return NextResponse.json(
        { message: "No stream in the zone" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { tracks },
      { status: 200 }
    );

  } catch (err) {
    return NextResponse.json(
      { message: `error occurred: ${err}` },
      { status: 500 }
    );
  }
}
