import { NextRequest, NextResponse } from "next/server";
import Stream from "../../../../../models/stream.model";
import connectDB from "../../../../../db/mongoose";

export async function POST(req: NextRequest) {
  const { url } = await req.json();
  const regex =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;

  const match = url.match(regex);

  if (!match || !url.includes("youtube")) {
    return NextResponse.json(
      { message: "incorrect url of yt" },
      { status: 411 }
    );
  }

  await connectDB();
  const extractedId = match ? match[1] : null;
  const imgUrl = `https://img.youtube.com/vi/${extractedId}/maxresdefault.jpg`;
  const requestingYtApi = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${extractedId}&key=${process.env.YOUTUBE_API_KEY}&part=snippet`
  );
  const ytData = await requestingYtApi.json();
  const title = ytData.item[0].snippet.title;

  if (url && imgUrl && title) {
    await Stream.create({
      url: url,
      imageUrl: imgUrl,
      title: title,
    });
    return NextResponse.json(
      {
        message: "Succesfully created a stream",
      },
      {
        status: 200,
      }
    );
  } else {
    console.log("error while creating a stream!!");
    return NextResponse.json(
      {
        message: "Failed to create a stream",
      },
      {
        status: 504,
      }
    );
  }
}
