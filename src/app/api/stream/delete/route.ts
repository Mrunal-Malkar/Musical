import { NextRequest, NextResponse } from "next/server";
import Stream from "../../../../../models/stream.model";

export async function POST(req: NextRequest) {
  const { streamId } = await req.json();

  if(!streamId){
    return NextResponse.json({
        message:"No stream id found!"
    },{
        status:404
    })
  }

   const deleteStream= await Stream.findOneAndDelete({ _id: streamId });

  if (!deleteStream) {
    return NextResponse.json(
      {
        message: "Error in deleting the stream!",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(
    {
      message: "succesfully deleted the stream",
    },
    {
      status: 200,
    }
  );
}
