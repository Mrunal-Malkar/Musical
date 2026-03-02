"use client";
import Navbar from "./components/navbar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
    
    console.log("trying to fetch all the stream-frontend1")
    const response = await fetch("https://musical-eosin.vercel.app/api/stream", {
      method: "GET",
    });
    if (response.status == 200) {
      
    console.log("trying to fetch all the stream-backend 2")
      const data = await response.json();
      if (data.streams.length > 5) {
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
    const interval = setInterval(() => {
      fetchStreams();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
   <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">

  {/* Subtle background glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(139,92,246,0.15),transparent_60%)] pointer-events-none" />

  <Navbar />

  {/* ================= HERO ================= */}
  <section className="min-h-[90vh] flex items-center justify-center px-6">
    <div className="max-w-4xl mx-auto text-center space-y-6">

      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
        Music Powered by People
      </h1>

      <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
        Discover YouTube tracks curated and upvoted by real listeners.
        No algorithm manipulation. Just pure community vibe.
      </p>

      <div className="flex justify-center gap-4 pt-4 flex-col sm:flex-row">

        <button
          onClick={() => router.push("/world")}
          className="px-6 py-3 cursor-pointer rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 font-semibold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/60 hover:-translate-y-0.5 transition-all duration-300"
        >
          Start Listening
        </button>

        <button
          onClick={() =>
            window.scrollBy({ top: 800, behavior: "smooth" })
          }
          className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
        >
          View Trending
        </button>

      </div>
    </div>
  </section>

  {/* ================= TRENDING ================= */}
  <section className="py-24 px-6">
    <div className="max-w-6xl mx-auto">

      <div className="text-center mb-16 space-y-3">
        <h2 className="text-4xl md:text-5xl font-bold">
          Top Upvoted Tracks
        </h2>
        <p className="text-gray-400 text-lg">
          The most loved YouTube tracks this week.
        </p>
      </div>

      <div className="space-y-6">
        {streams ? (
          streams.map((val) => (
            <div
              key={val._id}
              className="grid grid-cols-[auto_1fr_auto] gap-6 items-center p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 shadow-lg"
            >
              {/* Thumbnail */}
              <Image
                src={val.imageUrl}
                width={120}
                height={70}
                alt="Thumbnail"
                className="rounded-lg"
              />

              {/* Title & Channel */}
              <div>
                <h3 className="text-lg md:text-xl font-semibold">
                  {val.title}
                </h3>
                <p className="text-gray-400">
                  {val.channelName}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-6">

                <div className="text-center">
                  <div className="text-violet-400 text-xl font-bold">
                    {calculateLikes(val.upvotes)}
                  </div>
                  <div className="text-xs text-gray-400">
                    Upvotes
                  </div>
                </div>

                <button
                  onClick={() => router.push("/world")}
                  className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 transition-all"
                >
                  Play
                </button>

              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            No Songs Added
          </div>
        )}
      </div>

      <div className="text-center mt-12">
        <button
          onClick={() => router.push("/world")}
          className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all"
        >
          Load More
        </button>
      </div>

    </div>
  </section>

  {/* ================= FEATURE SECTION ================= */}
  <section className="py-24 px-6 border-t border-white/10">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

      <div className="space-y-6">
        <h2 className="text-4xl font-bold">
          Community Driven Discovery
        </h2>
        <p className="text-gray-400 text-lg leading-relaxed">
          Every track rises through real listener votes.
          No hidden manipulation. Just collective taste.
        </p>

        <ul className="space-y-4 text-gray-300">
          <li>• Discover shared YouTube music</li>
          <li>• Upvote what resonates</li>
          <li>• Share your favorites globally</li>
        </ul>
      </div>

      <div className="rounded-3xl bg-gradient-to-tr from-violet-700/40 to-indigo-700/40 backdrop-blur-2xl p-16 flex justify-center shadow-2xl">
        <Image
          src="/earth-globe.png"
          width={300}
          height={300}
          alt="Globe"
          className="opacity-90"
        />
      </div>

    </div>
  </section>
  {/* ================= WORLD SECTION ================= */}
<section className="py-28 px-6 border-t border-white/10">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

    {/* Visual First on Desktop */}
    <div className="relative flex justify-center order-1 md:order-none">
      <div className="absolute w-72 h-72 bg-blue-600/20 blur-3xl rounded-full" />
      <div className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-12 shadow-2xl">
        <Image
          src="/earth-globe.png"
          width={280}
          height={280}
          alt="Global Music"
          className="opacity-90"
        />
      </div>
    </div>

    {/* Text */}
    <div className="space-y-6">
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
        Welcome to The World
      </h2>

      <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
        Explore a global stream of community-shared YouTube tracks.
        Every vote shapes the leaderboard. Every listener shapes the vibe.
      </p>

      <ul className="space-y-5 text-gray-300 text-lg">
        <li className="flex gap-3 items-start">
          <span className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-sm">1</span>
          Discover music shared from across the globe
        </li>
        <li className="flex gap-3 items-start">
          <span className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-sm">2</span>
          Upvote tracks to push them up the leaderboard
        </li>
        <li className="flex gap-3 items-start">
          <span className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-sm">3</span>
          Contribute your own favorites to the global feed
        </li>
      </ul>
    </div>

  </div>
</section>

{/* ================= ZONE SECTION ================= */}
<section className="py-28 px-6 border-t border-white/10">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

    {/* Text First */}
    <div className="space-y-6">
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
        Dive Into Your Zone
      </h2>

      <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
        Create private music spaces with your people.
        Control the vibe. Vote together. Build collaborative playlists in real time.
      </p>

      <ul className="space-y-5 text-gray-300 text-lg">
        <li className="flex gap-3 items-start">
          <span className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center text-sm">1</span>
          Create or join private music rooms
        </li>
        <li className="flex gap-3 items-start">
          <span className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center text-sm">2</span>
          Add YouTube tracks collaboratively
        </li>
        <li className="flex gap-3 items-start">
          <span className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center text-sm">3</span>
          Upvote inside your zone to control the group vibe
        </li>
      </ul>
    </div>

    {/* Visual */}
    <div className="relative flex justify-center">
      <div className="absolute w-72 h-72 bg-violet-600/20 blur-3xl rounded-full" />
      <div className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-12 shadow-2xl">
        <Image
          src="/images.png"
          width={260}
          height={260}
          alt="Private Zone"
          className="opacity-90"
        />
      </div>
    </div>

  </div>
</section>

  {/* ================= FOOTER ================= */}
  <footer className="py-16 border-t border-white/10 text-center text-gray-500">
    <p>Built for people who actually care about music.</p>
  </footer>

</div>
  );
}
