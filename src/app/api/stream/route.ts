import { NextResponse } from "next/server";
import Stream from "../../../../models/stream.model";

export async function GET() {
  try {
    const streams = await Stream.find({}).sort({ upvotes: -1 }).limit(15);
    return NextResponse.json(
      {
        streams:streams,
      },
      { status: 200 }
    );
  } catch (err) {
    NextResponse.json(
      {
        message: `error in fetching the streams:${err}`,
      },
      { status: 411 }
    );
  }
}
