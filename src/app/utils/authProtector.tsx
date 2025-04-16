"use client"
import { signIn, useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';

export function AuthProtector({children}:{children:ReactNode}){
  const { status } =useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn();
    }
  }, [status]);

  return <>
  {children};
  </>
};
