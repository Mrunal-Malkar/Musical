"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { status } = useSession();


  return (
    <div className="flex text-black justify-around w-full bg-white">
      <div>Musical</div>
      <div>
        {status === "authenticated" ? (
          <button onClick={() => signOut()}>Log-out</button>
        ) : (
          <button onClick={() => signIn()}>Sign-in</button>
        )}
      </div>
    </div>
  );
}
