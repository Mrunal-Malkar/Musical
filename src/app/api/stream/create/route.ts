import { NextRequest, NextResponse } from "next/server";
import Stream from "../../../../../models/stream.model";
import connectDB from "../../../../../db/mongoose";

export async function POST(req: NextRequest) {
  try {
    const { url, userEmail } = await req.json();
    const { zoneId } = await req.json();
    console.log("user email is", userEmail);
    console.log("url is", url);
    const regex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
    const match = url.match(regex);

    if (!match || !userEmail) {
      console.log("not a valid youtube url");
      return NextResponse.json(
        { message: "incorrect url of yt/or no userEmail" },
        { status: 411 }
      );
    }

    await connectDB();
    const extractedId = (await match) ? match[1] : null;
    console.log("the extracted id is:", extractedId);
    const requestingYtApi = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${extractedId}&key=${process.env.YOUTUBE_API_KEY}&part=snippet,contentDetails`
    );
    const ytData = await requestingYtApi.json();
    const title = ytData.items[0].snippet.title;
    const channelName = ytData.items[0].snippet.channelTittle;
    const imgUrl = ytData.items[0].snippet.thumbnails.default.url;
    const videoDuration = ytData.items[0].contentDetails.duration;

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

      function convertDuration(iso: string) {
        const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
        const h = parseInt(match?.[1] || "0");
        const m = parseInt(match?.[2] || "0");
        const s = parseInt(match?.[3] || "0");

        if (h)
          return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(
            2,
            "0"
          )}`;
        else return `${m}:${String(s).padStart(2, "0")}`;
      }

      const duration = convertDuration(videoDuration);
      if (!zoneId) {
        await Stream.create({
          url: url,
          imageUrl: imgUrl,
          duration: duration,
          creator: userEmail,
          title: title,
          channelName: channelName,
        });
      } else {
        await Stream.create({
          url: url,
          imageUrl: imgUrl,
          duration: duration,
          creator: userEmail,
          title: title,
          channelName: channelName,
          zone: zoneId,
        });
      }
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
