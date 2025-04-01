import { NextRequest, NextResponse } from "next/server";
import User from "../../../../../models/user.model";
import Stream from "../../../../../models/stream.model";

export async function POST(req: NextRequest) {
  const { streamId, userId } = await req.json();
  if (!streamId || !userId) {
    return NextResponse.json(
      {
        message: "please provide all info",
      },
      {
        status: 404,
      }
    );
  }
  const user = await User.findOne({ _id: userId });
  const stream = await Stream.findOne({ _id: streamId });

  if (user && stream) {
    await Stream.findOneAndUpdate(
      { _id: stream },
      { $addToSet: { upvotes: userId } }
    );
    return NextResponse.json(
      {
        message: "Sucessfully upvoted!",
      },
      {
        status: 200,
      }
    );
  } else {
    return NextResponse.json({
      message: "error data cannot upvote",
      status: 404,
    });
  }
}
