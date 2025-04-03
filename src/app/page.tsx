"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Navbar from "./components/navbar";
import {
  faArrowTrendUp,
  faPlay,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  const { status } = useSession();
  const Songs = [
    { index: 1 },
    { index: 2 },
    { index: 3 },
    { index: 4 },
    { index: 5 },
  ];
  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-slate-950 via-slate-800 to-slate-900">
      <Navbar />
      <div className="w-full flex flex-col align-middle items-center justify-center">
        <div className="flex flex-col my-26 sm:my-40 w-full lign-middle items-center justify-center gap-y-3 align-middle">
          <h1 className="md:text-6xl sm:text-6xl text-4xl w-full bg-gradient-to-r text-transparent bg-clip-text from-violet-600 via-indigo-600 font-bold to-blue-500 text-center">
            Listen according to Listeners
          </h1>
          <span className="w-[260px] sm:w-[460px] md:w-[560px] inline-block md:text-[19px] text-[15px] text-gray-300 sm:text-lg text-center backdrop-blur-2xl">
            Discover YouTube music that's truly loved by the community. Upvoted
            by listeners, for listeners.
          </span>
          <div className="flex justify-center gap-y-3 sm:gap-x-4 align-middle flex-col sm:flex-row items-center font-[450]">
            <button className="p-2 px-4  bg-gradient-to-tr from-violet-600 flex items-center justify-center to-violet-800 rounded-md text-gray-100 gap-x-2 ">
              <FontAwesomeIcon icon={faPlay} className="text-gray-300" />
              Start Listening
            </button>
            <button className="p-2 px-4 border-[1px] border-violet-500  bg-gradient-to-tr from-gray-100 flex items-center justify-center to-gray-200 rounded-md  gap-x-2 text-violet-600">
              <FontAwesomeIcon
                icon={faArrowTrendUp}
                className="text-violet-600"
              />
              View Trending
            </button>
          </div>
        </div>
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

          <div className="w-full overflow-scroll sm:overflow-visible flex-wrap bg-tranparent p-2 flex flex-col justify-center items-center align-center gap-y-3">
            {/* start of trending songs */}
            {Songs.map((index) => {
              return (
                <div
                  key={index.index}
                  className="rounded-md inline-flex justify-between p-3 align-middle items-center m-1 min-w-[850px] h-[100px] backdrop-blur-2xl font-serif bg-white/5 border hover:bg-white/10 border-gray-600"
                >
                  <div className="min-w-[120px] overflow-hidden h-[90px] w-[120px] flex p-1 justify-center align-middle items-center">
                    <img
                      className="border border-gray-300"
                      src="https://i.ytimg.com/vi/GhH1QWY6BDc/default.jpg"
                      width="240"
                      height="60"
                      alt="YouTube video thumbnail"
                    />
                  </div>
                  <div className="w-2/6 h-full flex font-medium font-sans justify-center items-start p-1 flex-col overflow-x-auto">
                    <h1 className="text-center text-gray-200 text-lg md:text-xl">
                      title caption
                    </h1>
                    <p className="text-center text-md md:text-lg text-gray-400">
                      channel name
                    </p>
                  </div>
                  <div className="w-2/6 h-full flex justify-around items-center p-1 align-middle overflow-x-auto">
                    <div className="inline">
                      <FontAwesomeIcon
                        className="text-2xl text-indigo-500"
                        icon={faThumbsUp}
                      />
                    </div>
                    <div className="inline text-gray-200">3:00 min</div>
                    <div className="inline text-gray-200">
                      <FontAwesomeIcon
                        className="text-xl text-violet-500"
                        icon={faPlay}
                      />{" "}
                      Play
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* end of trending songs */}
          <button className="p-2 px-4 text-violet-600 font-semibold rounded-md bg-gray-100">
            Load more Tracks
          </button>
        </div>
        <div className="mt-16 sm:p-24 p-14 w-full flex justify-start align-middle text-white bg-amber-400">
          <div className="flex flex-col sm:w-1/2 w-full">
            <h1 className="text-3xl font-bold md:text-4xl">How It Works</h1>
            <h2>
              Our platform is built on the simple idea that the best music
              recommendations come from real people, not algorithms.
            </h2>
            <ul>
              <li>
                <button className="w-10 h-10 rounded-3xl bg-indigo-600 p-4 flex items-center justify-center text-2xl">
                  1
                </button>
                Discover YouTube music videos that others have shared
              </li>
              <li>
                <button className="w-10 h-10 rounded-3xl bg-indigo-600 p-4 flex items-center justify-center text-2xl">
                  2
                </button>
                Upvote the music you love to boost its visibility
              </li>
              <li>
                <button className="w-10 h-10 rounded-3xl bg-indigo-600 p-4 flex items-center justify-center text-2xl">
                  3
                </button>
                Share your own favorite YouTube tracks with the community
              </li>
            </ul>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
