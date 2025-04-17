"use client";
import Navbar from "./components/navbar";
import { motion } from "motion/react";
import {
  faArrowTrendUp,
  faHeadphones,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  type streamType = {
    _id: string;
    url: string;
    title: string;
    imageUrl: string;
    creator: string;
    upvotes: Array<string>;
    channelName: string;
    duration: string;
    zone: string;
  };

  const router = useRouter();
  const [streams, setStreams] = useState<streamType[]>([]);

  const fetchStreams = async () => {
    const response = await fetch("http://localhost:3000/api/stream", {
      method: "GET",
    });
    if (response.status == 200) {
      const data = await response.json();
      if (data.streams.lenght > 5) {
        setStreams(data.streams.slice(0, 5));
      } else {
        setStreams(data.streams);
      }
    } else {
      setStreams([]);
    }
  };

  const calculateLikes = (likes: number | Array<string>) => {
    if (typeof likes === "number") {
      return likes;
    }
    let val = 0;
    likes.map(() => {
      return (val += 1);
    });
    return val;
  };

  useEffect(() => {
    fetchStreams();
    const interval=setInterval(()=>{
      fetchStreams();
    },60000)

    return ()=>clearInterval(interval);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-slate-950 via-slate-800 to-slate-900">
      <Navbar />
      <div className="w-full flex flex-col align-middle items-center justify-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col my-26 sm:my-40 w-full items-center justify-center gap-y-3"
        >
          <motion.div
            variants={item}
            className="md:text-6xl sm:text-6xl text-4xl w-full bg-gradient-to-r text-transparent bg-clip-text from-violet-600 via-indigo-600 font-bold to-blue-500 text-center"
          >
            Listen according to Listeners
          </motion.div>

          <motion.span
            variants={item}
            className="w-[260px] sm:w-[460px] md:w-[560px] inline-block md:text-[19px] text-[15px] text-gray-300 sm:text-lg text-center backdrop-blur-2xl"
          >
            Discover YouTube music that&apos;s truly loved by the community.
            Upvoted by listeners, for listeners.
          </motion.span>

          <motion.div
            variants={item}
            className="flex justify-center gap-y-3 sm:gap-x-4 flex-col sm:flex-row items-center font-[450]"
          >
            <button 
            onClick={()=>router.push("/world")}
            className="p-2 px-4 bg-gradient-to-tr from-violet-600 flex items-center justify-center hover:to-violet-600 to-violet-800 rounded-md text-gray-100 gap-x-2 hover:scale-110 transition-all">
              <FontAwesomeIcon icon={faPlay} className="text-gray-300" />
              Start Listening
            </button>
            <button 
              onClick={() => {
                window.scrollBy({
                  top: 500,
                  left: 0,
                  behavior: 'smooth'
                });
              }}
            className="p-2 px-4 border-[1px] border-violet-500 bg-gradient-to-tr from-gray-100 flex items-center justify-center to-gray-200 rounded-md gap-x-2 text-violet-600 hover:to-white hover:scale-110 transition-all">
              <FontAwesomeIcon
                icon={faArrowTrendUp}
                className="text-violet-600"
              />
              View Trending
            </button>
          </motion.div>
        </motion.div>
        <div className="flex flex-col justify-center align-middle items-center pt-5 sm:pt-30 w-full">
          <div className="flex flex-col justify-center align-middle items-center">
            <div className=" flex flex-col gap-x-3 gap-y-1">
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-youtube text-red-700"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
                </svg>
                <div>
                  <h1 className="text-3xl sm:text-5xl font-bold text-gray-200">
                    Top Upvoted Tracks
                  </h1>
                </div>
              </div>
              <div className="sm:p-0 p-4 pt-1 sm:pt-0">
                <p className="text-md text-center font-extralight text-gray-400 tracking-widest">
                  The most loved YouTube videos by our community this week.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full overflow-scroll xl:overflow-visible flex-wrap bg-tranparent p-2 flex flex-col justify-center items-center align-center gap-y-3">
            {/* start of trending songs */}
            {streams ? (
              streams.map((val) => {
                return (
                  <div
                    key={val._id}
                    className="rounded-md inline-flex justify-between p-3 align-middle items-center m-1 min-w-[850px] h-[100px] backdrop-blur-2xl font-serif bg-white/5 border hover:bg-white/10 border-gray-600"
                  >
                    <div className="min-w-[120px] overflow-hidden h-[90px] w-[120px] flex p-1 justify-center align-middle items-center">
                      <img
                        className="border border-gray-300"
                        src={val.imageUrl}
                        width="240"
                        height="60"
                        alt="YouTube video thumbnail"
                      />
                    </div>
                    <div className="w-2/6 h-full thin-scrollbar flex font-medium font-sans justify-center items-start p-1 flex-col overflow-y-auto">
                      <h1 className="text-center text-gray-200 text-lg md:text-xl">
                        {val.title}
                      </h1>
                      <p className="text-center text-md md:text-lg text-gray-400">
                        {val.channelName}
                      </p>
                    </div>
                    <div className="w-2/6 h-full flex justify-around items-center p-1 align-middle overflow-x-auto">
                      <div
                        className="flex flex-col bg-zinc-900 rounded-md items-center justify-center"
                        onClick={() => {
                          router.push("/world");
                        }}
                      >
                        <i className="bi bi-caret-up-fill text-2xl  bg-zinc-900 rounded-xl p-1 text-indigo-500">
                        </i>
                        <p className="text-gray-200">{calculateLikes(val.upvotes)}</p>
                      </div>
                      <div className="inline text-gray-200">{val.duration}</div>
                      <div
                        className="inline text-gray-200"
                        onClick={() => {
                          router.push("/world");
                        }}
                      >
                        <FontAwesomeIcon
                          className="text-xl text-violet-500"
                          icon={faPlay}
                        />
                        Play
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="font-mono text-xl text-orange-700 p-2">
                No Songs Added
              </div>
            )}
          </div>
          {/* end of trending songs */}
          <button
            onClick={() => {
              router.push("/world");
            }}
            className="p-2 px-4 text-violet-600 font-semibold rounded-md bg-gray-100"
          >
            Load more Tracks
          </button>
        </div>
        <div className="mt-16 sm:p-34 p-14 w-full md:flex-row flex-col-reverse flex justify-start align-middle text-gray-300 bg-gradient-to-tr from-slate-800 to-slate-900 ">
          <div className="flex flex-col md:w-1/2 w-full flex-2">
            <h1 className="text-4xl pb-3 font-bold md:text-5xl text-transparent bg-gradient-to-r from-violet-800 to-indigo-900 bg-clip-text">
              How It Works
            </h1>
            <h2 className="text-xl mb-6 md:p-1 md:text-2xl text-gray-300">
              Our platform is built on the simple idea that the best music
              recommendations come from real people, not algorithms.
            </h2>
            <ul className="flex flex-col gap-y-6 sm:gap-y-4 font-bold">
              <li className="flex justify-start gap-2 align-middle items-center">
                <button className="w-10 h-10 rounded-3xl bg-indigo-600 p-4 flex items-center justify-center text-2xl">
                  1
                </button>
                Discover YouTube music videos that others have shared
              </li>
              <li className="flex justify-start gap-2 align-middle items-center">
                <button className="w-10 h-10 rounded-3xl bg-indigo-600 p-4 flex items-center justify-center text-2xl">
                  2
                </button>
                Upvote the music you love to boost its visibility
              </li>
              <li className="flex justify-start gap-2 align-middle items-center">
                <button className="w-10 h-10 rounded-3xl bg-indigo-600 p-4 flex items-center justify-center text-2xl">
                  3
                </button>
                Share your own favorite YouTube tracks with the community
              </li>
            </ul>
          </div>
          <div className="flex flex-1 justify-center md:w-1/2 w-full">
            <div className="md:h-96 h-80 md:m-0 mb-5 w-96 bg-gradient-to-tr items-center flex-col from-violet-800 to-indigo-900 flex justify-center align-middle">
              <FontAwesomeIcon
                icon={faHeadphones}
                className="text-indigo-500 text-3xl"
              />
              <p className="text-gray-400 font-semibold">From Youtube</p>
              <p className="text-gray-400 font-semibold">To Your eare's</p>
            </div>
          </div>
        </div>
        {/* end of first card */}
        <div className="mt-16 sm:p-34 p-14 w-full md:flex-row flex-col-reverse flex justify-start align-middle text-gray-300 bg-gradient-to-tr from-slate-800 to-slate-900 ">
          <div className="flex flex-1 justify-center md:w-1/2 w-full">
            <div className="md:h-96 h-80 md:m-0 mb-5 w-96 bg-gradient-to-tr items-center flex-col from-blue-700 to-green-700 flex justify-center align-middle">
              <img src="earth-globe.png" className="w-3/4 h-3/4" alt="" />
            </div>
          </div>
          <div className="flex flex-col md:w-1/2 w-full flex-2">
            <h1 className="text-4xl pb-3 font-bold md:text-5xl text-transparent bg-gradient-to-r from-violet-800 to-indigo-900 bg-clip-text">
              Welcome to the World -Discover what it is?
            </h1>
            <h2 className="text-xl mb-6 md:p-1 md:text-2xl text-gray-300">
              Explore community-shared music
            </h2>
            <ul className="flex flex-col gap-y-6 sm:gap-y-4 font-bold">
              <li className="flex justify-start gap-2 align-middle items-center">
                <button className="w-10 h-10 rounded-3xl bg-indigo-600 p-4 flex items-center justify-center text-2xl">
                  1
                </button>
                Discover a global feed of YouTube music streams shared by
                everyone
              </li>
              <li className="flex justify-start gap-2 align-middle items-center">
                <button className="w-10 h-10 rounded-3xl bg-indigo-600 p-4 flex items-center justify-center text-2xl">
                  2
                </button>
                Like and upvote your favorite songs to push them up the
                leaderboard
              </li>
              <li className="flex justify-start gap-2 align-middle items-center">
                <button className="w-10 h-10 rounded-3xl bg-indigo-600 p-4 flex items-center justify-center text-2xl">
                  3
                </button>
                Make your music picks heard AND contribute to the global jam
                session
              </li>
            </ul>
          </div>
        </div>

        {/* end of 2nd card */}
        <div className="mt-16 sm:p-34 p-14 w-full md:flex-row flex-col-reverse flex justify-start align-middle text-gray-300 bg-gradient-to-tr from-slate-800 to-slate-900 ">
          <div className="flex flex-col md:w-1/2 w-full flex-2">
            <h1 className="text-4xl pb-3 font-bold md:text-5xl text-transparent bg-gradient-to-r from-violet-800 to-indigo-900 bg-clip-text">
            Dive into a Zone -Discover what it is?
            </h1>
            <h2 className="text-xl mb-6 md:p-1 md:text-2xl text-gray-300">
            Your own private music space
            </h2>
            <ul className="flex flex-col gap-y-6 sm:gap-y-4 font-bold">
              <li className="flex justify-start gap-2 align-middle items-center">
                <button className="w-10 h-10 rounded-3xl bg-indigo-600 p-4 flex items-center justify-center text-2xl">
                  1
                </button>
                Create or join a private zone — a room just for your group
                </li>
              <li className="flex justify-start gap-2 align-middle items-center">
                <button className="w-10 h-10 rounded-3xl bg-indigo-600 p-4 flex items-center justify-center text-2xl">
                  2
                </button>
                Add YouTube music streams together and enjoy collaborative playlists              </li>
              <li className="flex justify-start gap-2 align-middle items-center">
                <button className="w-10 h-10 rounded-3xl bg-indigo-600 p-4 flex items-center justify-center text-2xl">
                  3
                </button>
                Upvote songs within your zone to set the group vibe              </li>
            </ul>
          </div>
          <div className="flex flex-1 justify-center md:w-1/2 w-full">
            <div className="md:h-96 h-80 md:m-0 mb-5 w-96 bg-gradient-to-tr items-center flex-col from-violet-800 to-indigo-900 flex justify-center align-middle">
            <img src="images.png" className="w-2/4 h-2/4" alt="" />
            </div>
          </div>
        </div>
        {/* end of 3rd card */}
      </div>
      <footer className="flex p-3 justify-center gap-y-2 align-middle items-center flex-col">
        <h1 className="bg-gradient-to-tr font-semibold text-xl md:text-2xl from-violet-600 to-indigo-400 bg-clip-text text-transparent">
          Know the developer
        </h1>
        <div className="flex gap-y-4 gap-x-6 md:gap-x-18">
          <a href="https://x.com/Mrunal_Malkar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-twitter-x text-white m-1"
              viewBox="0 0 16 16"
            >
              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
            </svg>
          </a>
          <a href="https://github.com/Mrunal-Malkar?tab=repositories">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-github text-white m-1"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/mrunal-malkar/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-linkedin text-white m-1"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
            </svg>
          </a>
        </div>
        <div className="p-16 sm:p-24 flex justify-center align-middle w-full bg-transparent font-mono text-gray-300">
          Keep up the beats!
        </div>
      </footer>
    </div>
  );
}
