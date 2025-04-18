"use client";
import React, { useEffect, useRef } from "react";
import Navbar from "../components/navbar";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const ZoneId = () => {
  const input1 = useRef<HTMLInputElement>(null);
  const input2 = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const joinRoom = async () => {
    const zoneId = input1.current?.value.trim();

    if (!zoneId || zoneId.length < 6) {
      return toast.error("Minimum 6 characters required!");
    }

    if (/\s/.test(zoneId)) {
      return toast.error("Zone ID should not contain spaces.");
    }

    try {
      const exist=await fetch("api/stream/zonecheck",{
        method:"POST",
        headers:{
          content:"apllication/json",
        },
        body:JSON.stringify({zoneId:zoneId})
      });
      if(exist.status==200){
        localStorage.setItem("zoneId", zoneId);
        router.push("/zone");
      }else if(exist.status==411){
        toast.error("some error occured while connecting with zone!")
      }else{
        toast.error(`No zone found with name:${zoneId}`)
      }
    } catch (err) {
      toast.error(`Something went wrong while joining:${err}.`);
    }
  };

  const createRoom = async () => {
    const newZone = input2.current?.value.trim();

    if (!newZone || newZone.length < 6) {
      return toast.error("Minimum 6 characters required!");
    }

    if (/\s/.test(newZone)) {
      return toast.error("Zone name should not contain spaces.");
    }

    try {
      localStorage.setItem("zoneId", newZone);
      router.push("/zone");
    } catch (err) {
      toast.error(`Failed to create zone:${err}.`);
    }
  };

  useEffect(()=>{
    if(localStorage.getItem("zoneId")){
      router.push("/zone");
    }
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [])

  return (
    <div className="w-screen flex items-center flex-col min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />
      <ToastContainer/>
      <div className="mt-[18vh] p-1 self-center md:w-2/4 sm:w-8/12 w-full flex flex-col justify-center align-middle">
        <div className="border-2 p-2 gap-y-3 bg-gray-800 border-blue-800 backdrop-blur-2xl flex justify-center flex-col">
          <div className="bg-gray-800 p-3 border-2 rounded-br-4xl w-fit border-indigo-600">
            <h1 className="text-3xl font-bold font-mono text-cyan-500">
              Join a Zone?
            </h1>
          </div>
          <input
            ref={input1}
            className="w-full md:w-1/2 text-gray-300 text-xl border-2 p-2 border-gray-300 rounded-lg self-center"
            type="text"
            placeholder="Enter the zone Name"
          />
          <button
            onClick={joinRoom}
            className="p-2 rounded-md bg-cyan-700 text-gray-900 font-extrabold"
          >
            Join
          </button>
        </div>

        <h3 className="text-center text-2xl text-gray-200 font-bold p-10">
          OR
        </h3>

        <div className="p-2 flex gap-y-3 justify-center bg-gray-800 border-2 border-blue-800 backdrop-blur-2xl flex-col">
          <div className="bg-gray-800 p-3 border-2 rounded-br-4xl w-fit border-indigo-600">
            <h1 className="text-3xl font-bold font-mono text-cyan-500">
              Create a new Zone!
            </h1>
          </div>
          <input
            ref={input2}
            className="w-full md:w-1/2 border-2 text-xl text-gray-300 p-2 border-gray-300 rounded-lg self-center"
            type="text"
            placeholder="Enter the new zone Name"
          />
          <button
            onClick={createRoom}
            className="p-2 rounded-md bg-cyan-700 text-gray-900 font-extrabold"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default ZoneId;
