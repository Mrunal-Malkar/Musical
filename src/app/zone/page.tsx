import React from "react";
import Navbar from "../components/navbar";
import {
  faPlay,
  faShareNodes,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Register from "../register/page";

const Zone = () => {
  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />
      <Register />
      <div className="w-full flex md:flex-row flex-col justify-center align-middle">
        <div className="xl:pt-25 xl:pe-25 xl:ps-25 xl:w-11/12 w-full flex xl:flex-row flex-col-reverse items-center justify-center align-middle">
          <div className="xl:w-1/2  xl:mt-0 xl:mb-0 mt-4 mb-4 md:w-11/12 w-full flex flex-col justify-start">
            <div className="text-2xl sm:text-3xl m-2 md:text-4xl text-white font-bold font-sans">
              <h1>Currently playing</h1>
            </div>
            <div className="rounded-md inline-flex p-3 align-middle items-center m-1 min-w-[250px] h-[110px] backdrop-blur-2xl font-serif bg-white/5 border hover:bg-white/10 border-gray-600 justify-between">
              <div className="min-w-[120px] overflow-hidden h-[90px] w-[120px] flex p-1 justify-center align-middle items-center">
                <img
                  className="border border-gray-300"
                  src="https://i.ytimg.com/vi/GhH1QWY6BDc/default.jpg"
                  width="240"
                  height="60"
                  alt="YouTube video thumbnail"
                />
              </div>
              <div className="w-6/12 flex-wrap h-full flex font-medium font-sans justify-center items-start p-1 flex-col overflow-x-auto">
                <h1 className="text-center flex justify-between w-full text-gray-200 text-lg md:text-xl">
                  title caption <span className="sm:hidden block">|</span>
                  <span className="text-center text-md md:text-lg text-gray-400">
                    title
                  </span>
                </h1>
                <div className="w-full text-gray-200 flex justify-between">
                  3:00 min
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
            <div className="text-xl sm:text-2xl font-semibold tracking-tighter font-sans text-white m-2 mt-5">
              Up Nexts-
            </div>
            <div className="rounded-md inline-flex p-3 align-middle items-center m-1 min-w-[250px] h-[100px] scale-95 backdrop-blur-2xl font-serif bg-white/5 border hover:bg-white/10 border-gray-600 justify-between">
              <div className="min-w-[120px] overflow-hidden h-[90px] w-[120px] flex p-1 justify-center align-middle items-center">
                <img
                  className="border border-gray-300"
                  src="https://i.ytimg.com/vi/GhH1QWY6BDc/default.jpg"
                  width="240"
                  height="50"
                  alt="YouTube video thumbnail"
                />
              </div>
              <div className="w-6/12 flex-wrap h-full flex font-medium font-sans justify-center items-start p-1 flex-col overflow-x-auto">
                <h1 className="text-center flex justify-between w-full text-gray-200 text-lg md:text-xl">
                  title caption <span className="sm:hidden block">|</span>
                  <span className="text-center text-md md:text-lg text-gray-400">
                    title
                  </span>
                </h1>
                <div className="w-full text-gray-200 flex justify-between">
                  3:00 min
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
                  placeholder="enter the URL here"
                  className="bg-gray-700 m-0.5 focus:border-[1px] focus:border-gray-400 rounded-md outline-none text-gray-100 text-xl p-2"
                />
                <button className="bg-violet-600 rounded-md p-2 text-lg text-white">
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
              <div className="p-2 bg-black rounded-md md:h-56 h-48 w-full max-w-80 md:w-96 md:m-2 flex justify-center align-middle items-center">
                <div className="w-full h-full bg-zinc-800">ad</div>
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
  );
};

export default Zone;
