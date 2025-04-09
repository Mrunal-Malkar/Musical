"use client";
import Navbar from "../components/navbar";
import {
  faPlay,
  faShareNodes,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { signIn, useSession } from "next-auth/react";

const Zone = () => {
  type stream = {
    _id: string;
    url: string;
    title: string;
    imageUrl: string;
    creator: string;
    upvotes: number;
    channelName: string;
    duration: string;
  };

  const ytPlayerRef = useRef<any>(null);
  const { data: session } = useSession();
  const [streams, setStreams] = useState<stream[]>([]);
  const [currentStream, setCurrentStream] = useState();
  const [URL, setURL] = useState("");
  const [videoId, setVideoId] = useState<string>("");

  useEffect(() => {
    console.log("This is the url", URL);
    const regex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
    const match = URL.match(regex);
    if (match) {
      const extractedId = match[1];
      setVideoId(extractedId);
    } else if (URL != "") {
      toast.error("Invalid YouTube URL");
    }
  }, [URL]);

  const YTPlayer = () => {
    if (!document.getElementById("yt-frame-api")) {
      const tag = document.createElement("script");
      //@ts-ignore
      tag.id = "yt-frame-api";
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
    console.log("i am the player running with video id:", videoId);

    //@ts-ignore
    window.onYouTubeIframeAPIReady = function () {
      if (ytPlayerRef.current) {
        ytPlayerRef.current.destroy();
      }
      //@ts-ignore
      ytPlayerRef.current = new window.YT.Player("ytPlayer", {
        height: "390",
        width: "640",
        videoId: videoId,
        events: {
          onStateChange: (event) => {
            if (event.data === 0) {
              console.log("Video ended");
            }
          },
        },
      });
    };
  };

  useEffect(() => {
    if (ytPlayerRef.current && ytPlayerRef.current.loadVideoById) {
      ytPlayerRef.current.loadVideoById(videoId);
    } else {
      YTPlayer();
    }
  }, [videoId]);

  const fetchStreams = async () => {
    const streams = await fetch("http://localhost:3000/api/stream", {
      method: "GET",
    });
    if (streams.status == 200) {
      const tracks = await streams.json();
      console.log(tracks.streams);
      if (streams != tracks.streams) {
        return setStreams(tracks.streams);
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  const calculateLikes = (likes: number | Array<object>) => {
    if (typeof likes === "number") {
      return likes;
    }
    let val = 0;
    likes.map(() => {
      return (val += 1);
    });
    return val;
  };

  const addSong = async () => {
    if (!session?.user?.email) {
      toast.error("Please login to add songs to queue");
      return signIn();
    }
    const regex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
    const match = URL.match(regex);
    if (!match) {
      toast.error("incorrect url");
    }
    await fetch("/api/stream/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ url: URL, userEmail: session?.user?.email }),
    });
    await fetchStreams();
  };

  const addLike = async (id: string, user: string) => {
    try {
      const response = await fetch("api/stream/upvote", {
        method: "POST",
        headers: {
          content: "application/json",
        },
        body: JSON.stringify({ streamId: id, userEmail: user }),
      });
      if (response.status == 200) {
        toast.success("upvotes the stream sucessfully!");
        fetchStreams();
      } else {
        toast.error("error in upvoting the stream");
      }
    } catch (err: unknown) {
      toast.error(`error in upvoting the stream:${err}`);
    }
  };

  useEffect(() => {
    fetchStreams();
  }, []);

  return (
    <>
      <div className="w-screen min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <Navbar />
        <ToastContainer />
        <div className="w-full flex md:flex-row flex-col justify-center align-middle">
          <div className="xl:pt-25 xl:pe-25 xl:ps-25 xl:w-11/12 w-full flex xl:flex-row flex-col-reverse items-center justify-center align-middle">
            <div className="xl:w-1/2  xl:mt-0 xl:mb-0 mt-4 mb-4 md:w-11/12 w-full flex flex-col justify-start">
              <div className="text-2xl sm:text-3xl m-2 md:text-4xl text-white font-bold font-sans">
                <h1>Currently playing</h1>
              </div>
              {currentStream ? (
                <div className="rounded-md inline-flex p-3 align-middle items-center m-1 min-w-[250px] h-[110px] backdrop-blur-2xl font-serif bg-white/5 border hover:bg-white/10 border-gray-600 justify-between">
                  <div className="min-w-[120px] overflow-hidden h-[90px] w-[120px] flex p-1 justify-center align-middle items-center">
                    <img
                      className="border border-gray-300"
                      src={currentStream.thumbnail}
                      width="240"
                      height="60"
                      alt="YouTube video thumbnail"
                    />
                  </div>
                  <div className="w-6/12 flex-wrap h-full flex font-medium font-sans justify-center items-start p-1 flex-col overflow-x-auto">
                    <h1 className="text-center text-wrap flex-wrap flex justify-between w-full text-gray-200 text-lg md:text-xl">
                      title caption <span className="sm:hidden block">|</span>
                      <span className="text-center text-md md:text-lg text-gray-400">
                        title
                      </span>
                    </h1>
                    <div className="w-full text-gray-200 flex justify-between">
                      3:00min
                      <div className="inline text-gray-200">
                        <FontAwesomeIcon
                          className="text-xl text-violet-500"
                          icon={faPlay}
                        />
                        Play
                      </div>
                    </div>
                  </div>
                  <div className="justify-self-end">
                    <FontAwesomeIcon
                      className="text-2xl text-indigo-500"
                      icon={faThumbsUp}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full ms-4 text-red-600 font-bold text-2xl">
                  No songs added!
                </div>
              )}
              <div className="text-xl sm:text-2xl font-semibold tracking-tighter font-sans text-white m-2 mt-5">
                Up Nexts-
              </div>
              {streams.length >= 1 ? (
                streams.map((val) => {
                  return (
                    <div
                      key={val._id}
                      className="rounded-md inline-flex p-3 align-middle items-center m-1 min-w-[250px] h-[100px] scale-95 backdrop-blur-2xl font-serif bg-white/5 border hover:bg-white/10 border-gray-600 justify-between"
                    >
                      <div className="min-w-[120px] overflow-hidden h-[90px] w-[120px] flex p-1 justify-center align-middle items-center">
                        <img
                          className="border border-gray-300"
                          src={val.imageUrl}
                          width="240"
                          height="50"
                          alt="YouTube video thumbnail"
                        />
                      </div>
                      <div className="w-6/12 md:w-8/12 flex-wrap h-full flex font-medium font-sans justify-center items-start p-1 flex-col ">
                        <h1 className="text-center flex justify-between w-full text-gray-200 text-lg md:text-xl overflow-x-auto scroolbar-none ">
                          {val.title}
                          <span className="sm:hidden block">|</span>
                          <span className="text-center text-md md:text-lg text-gray-400">
                            {val.channelName}
                          </span>
                        </h1>
                      </div>
                      <div className="flex md:flex-row flex-col md:gap-x-3 gap-x-2 overflow-x-auto justify-self-end">
                        <div className="text-gray-200 flex flex-col justify-center items-center">
                          <p className="md:block hidden">{val.duration}</p>
                          <div className="inline text-gray-200">
                            <FontAwesomeIcon
                              className="text-xl text-violet-500"
                              icon={faPlay}
                            />
                            <span className="md:blok hidden">Play</span>
                          </div>
                        </div>
                        <div
                          className="flex flex-col justify-center items-center"
                          onClick={() => {
                            addLike(val._id,session?.user?.email as string);
                          }}
                        >
                          <FontAwesomeIcon
                            className="text-2xl  bg-zinc-900 rounded-xl p-1 text-indigo-500"
                            icon={faThumbsUp}
                          />
                          <p className="text-gray-100">
                            {calculateLikes(val.upvotes)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="w-full ms-4 text-red-600 font-bold text-2xl">
                  No songs added!{" "}
                </div>
              )}
            </div>
            <div className="xl:w-1/2 xl:mt-0 xl:mb-0 mt-4 mb-4 xl:justify-self-start justify-self-auto self-auto xl:self-start md:w-11/12 w-full flex flex-col-reverse xl:flex-col">
              <div className="w-full flex flex-col items-center xl:block">
                <div className="w-10/12 md:w-3/4 sm:w-3/4 flex justify-between items-end p-2">
                  <h1 className="font-bold p-1 text-white text-2xl">
                    Add a song
                  </h1>
                  <button className="p-2 text-lg justify-center align-middle items-center gap-x-1 bg-violet-600 text-gray-200 flex px-4 rounded-sm">
                    <FontAwesomeIcon
                      icon={faShareNodes}
                      className="font-extralight"
                    />
                    <p>Share</p>
                  </button>
                </div>
                <div className="flex flex-col border-none w-10/12 md:w-3/4 sm:w-3/4">
                  <input
                    type="text"
                    onChange={(e) => setURL(e.target.value)}
                    placeholder="enter the URL here"
                    className="bg-gray-700 m-0.5 focus:border-[1px] focus:border-gray-400 rounded-md outline-none text-gray-100 text-xl p-2"
                  />
                  <button
                    onClick={() => addSong()}
                    className="bg-violet-600 rounded-md p-2 text-lg text-white"
                  >
                    Add to Queue
                  </button>
                </div>
              </div>
              <div className="w-full flex flex-col items-center xl:block">
                <div className="p-1 pt-3">
                  <h1 className="text-lg font-semibold text-gray-300 md:text-xl">
                    Now Playing
                  </h1>
                </div>
                <div className="p-2 bg-gray-700 rounded-md md:h-56 h-48 w-full max-w-80 md:w-96 md:m-2 flex justify-center align-middle items-center">
                  <div
                    className="w-full flex justify-center align-middle items-center h-full"
                    id="ytPlayer"
                  ></div>
                </div>
                <button className="px-4 gap-x-2 text-gray-300 flex justify-center items-center m-2 w-10/12 sm:w-6/12 md:w-4/12 p-2 bg-violet-700">
                  <FontAwesomeIcon className="text-xl" icon={faPlay} />
                  Play Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Zone;
