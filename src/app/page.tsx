"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Navbar from "./components/navbar";

export default function Home() {
  const { status } = useSession();


  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-slate-950 via-slate-800 to-slate-900">
      <Navbar/>
    </div>
  );
}
