"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
// import { useRouter } from "next/router";
import { useEffect } from "react";

const Register = () => {
  const { data: session } = useSession();
  //   const router = useRouter();
  const check = () => {
    if (!session?.user) {
      return signIn();
    } else {
      return <Link href="/" />;
    }
  };

  useEffect(() => {
    check();
  }, []);

  return null;
};

export default Register;




