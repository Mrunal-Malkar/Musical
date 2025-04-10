import { NextRequest, NextResponse } from "next/server";
import User from "../../../../../models/user.model";
import Stream from "../../../../../models/stream.model";

export async function POST(req: NextRequest) {
  const { streamId, userEmail } = await req.json();
  if (!streamId || !userEmail) {
    return NextResponse.json(
      {
        message: "please provide all info",
      },
      {
        status: 404,
      }
    );
  }
  const user = await User.findOne({ email: userEmail });
  const stream = await Stream.findById({ _id: streamId });

  if (user && stream) {
    await Stream.findOneAndUpdate(
      { _id: stream._id },
      { $addToSet: { upvotes: user.email } }
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
      message: "erro:no user or stream found",
      status: 404,
    });
  }
}
