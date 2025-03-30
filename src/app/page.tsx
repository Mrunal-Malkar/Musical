"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const da=useSession();
  console.log("this is the session",session);
  console.log("this is the another session",da);

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
