"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHeadphones } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const { status } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const currentPath = usePathname();

  return (
    <div className="w-screen p-2 bg-black/60 md:px-18 backdrop:blur-2xl flex justify-between items-center stiky top-0 supports-[backdrop-filter]:bg-black/60 border-black/5 border-2">
      <div className="h-full flex gap-x-1">
        <div className="flex justify-center align-middle items-center">
          <FontAwesomeIcon
            icon={faHeadphones}
            className="text-indigo-500 text-2xl"
          />
        </div>
        <h1 className="font-bold tracking-tight text-white text-xl sm:text-2xl">
          Musical
        </h1>
      </div>

      <div className="font-semibold text-md sm:flex hidden justify-between items-center sm:gap-x-3">
        <Link href="/">
          <span
            className={currentPath == "/" ? "text-indigo-400 scale-110" : "text-white"}
          >
            Home
          </span>
        </Link>
        <Link href="/world">
          <span
            className={
              currentPath == "/world" ? "text-indigo-400 scale-110" : "text-white"
            }
          >
            World
          </span>
        </Link>
        <Link href="/zone">
          <span
            className={
              currentPath == "/zone" ? "text-indigo-400 scale-110" : "text-white"
            }
          >
            Zone
          </span>
        </Link>
      </div>

      <div className="hidden md:block">
        <button
          onClick={() => (status == "authenticated" ? signOut() : signIn())}
          className="bg-gradient-to-br from-violet-700 to-violet-900 text-white md:p-3 rounded-lg font-mono"
        >
          {status == "authenticated" ? <h1>Log-Out</h1> : <h1>Sign-In</h1>}
        </button>
      </div>

      <div className="sm:flex hidden md:hidden">
        <button
          onClick={() => (status == "authenticated" ? signOut() : signIn())}
          className=" bg-gradient-to-br from-violet-700 to-violet-900 text-white p-2 rounded-lg font-mono"
        >
          {status == "authenticated" ? <h1>Log-Out</h1> : <h1>Sign-In</h1>}
        </button>
      </div>

      <div className="sm:hidden flex gap-x-1">
        <button
          onClick={() => (status == "authenticated" ? signOut() : signIn())}
          className=" bg-gradient-to-br from-violet-700 to-violet-900 text-white p-1 px-1.5 text-sm font-semibold rounded-lg font-mono"
        >
          {status == "authenticated" ? <h1>Log-Out</h1> : <h1>Sign-In</h1>}
        </button>

        <button
          className={
            showMenu ? "text-indigo-600 text-2xl" : "text-2xl text-indigo-500"
          }
          onClick={() => setShowMenu(!showMenu)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        {showMenu ? (
          <div className="absolute flex flex-col top-15 z-30 backdrop-blur-2xl bg-black/20">
            <Link href="/" className="p-3 hover:backdrop-blur-none bg-black">
              <span
                className={
                  currentPath == "/" ? "text-indigo-400 scale-110" : "text-white"
                }
              >
                Home
              </span>
            </Link>
            <Link
              href="/world"
              className="p-3 hover:backdrop-blur-none bg-black"
            >
              <span
                className={
                  currentPath == "/world" ? "text-indigo-400 scale-110" : "text-white"
                }
              >
                World
              </span>
            </Link>
            <Link
              href="/zone"
              className="p-3 hover:backdrop-blur-none bg-black"
            >
              <span
                className={
                  currentPath == "/zone" ? "text-indigo-400 scale-110" : "text-white"
                }
              >
                Zone
              </span>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
