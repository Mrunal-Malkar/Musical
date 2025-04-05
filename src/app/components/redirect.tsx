"use client"
import {useSession } from 'next-auth/react'
import Link from 'next/link';

const Redirect = () => {

    const session=useSession();
    if(!(session.data?.user)){
       return <Link href="/register"/>
    }else{
     return null
    }
}

export default Redirect