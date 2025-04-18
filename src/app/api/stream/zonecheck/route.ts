import { NextRequest, NextResponse } from "next/server";
import Stream from "../../../../../models/stream.model";

export async function POST(req: NextRequest) {
  const { zoneId } = await req.json();

  if (!zoneId) {
    return NextResponse.json(
      { message: "zoneId is required." },
      { status: 400 }
    );
  }

  try {
    const streams = await Stream.findOne({ zone: zoneId });

    if (streams) {
      return NextResponse.json(
        {
          message: `zone ${zoneId} connected!`,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "no zone found!",
        },
        { status: 404 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      {
        message: `some error occured in connecting with the zone:${err}`,
      },
      { status: 411 }
    );
  }
}
