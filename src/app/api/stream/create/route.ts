import { NextRequest, NextResponse } from "next/server";
import Stream from "../../../../../models/stream.model";
import connectDB from "../../../../../db/mongoose";

export async function POST(req: NextRequest) {
  try {
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
    const extractedId = (await match) ? match[1] : null;
    console.log("the extracted id is:", extractedId);
    const requestingYtApi = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${extractedId}&key=${process.env.YOUTUBE_API_KEY}&part=snippet`
    );
    const ytData = await requestingYtApi.json();
    const title = ytData.items[0].snippet.title;
    const imgUrl = ytData.items[0].snippet.thumbnails.default.url;

    if (url && imgUrl && title) {
      const findStream = await Stream.findOne({ url: url });
      if (findStream) {
        console.log(`the stream of url ${url} is already present`);
        return NextResponse.json(
          {
            message: "the stream is already added!",
          },
          { status: 411 }
        );
      }

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
  } catch (e) {
    console.log("error while creating a stream:", e);
    return NextResponse.json(
      {
        message: `failed in creating a stream${e}`,
      },
      { status: 411 }
    );
  }
}
