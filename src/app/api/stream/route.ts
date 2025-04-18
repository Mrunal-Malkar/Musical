import { NextResponse } from "next/server";
import Stream from "../../../../models/stream.model";

export async function GET() {
  try {
    console.log("trying to fetch all the stream-backend")
    const streams = await Stream.find({}).sort({ upvotes: -1 }).limit(10);
    return NextResponse.json(
      {
        streams:streams,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log("error in fetching all streams", err);
    NextResponse.json(
      {
        message: `error in fetching the streams:${err}`,
      },
      { status: 411 }
    );
  }
}
