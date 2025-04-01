import { NextRequest, NextResponse } from "next/server";
import User from "../../../../../models/user.model";
import Stream from "../../../../../models/stream.model";

export async function POST(req: NextRequest) {
  const { streamId, userId } = await req.json();

  const user = await User.findById({ _id: userId });
  const stream = await Stream.findById({ _id: streamId });

  if (!user || !stream) {
    return NextResponse.json(
      {
        message: "No User/stream found!",
      },
      { status: 404 }
    );
  }

  const updateStream = await Stream.findOneAndUpdate(
    { _id: streamId },
    { $pull:{upvotes: userId } }
  );
  if (!updateStream) {
    return NextResponse.json(
      {
        message: "Unable to downvote stream!",
      },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { message: "succesfully downvoted the stream!" },
    { status: 200 }
  );
}
