import { NextRequest } from "next/server";

const createStream=async(req:NextRequest)=>{
    if(req.method=="POST"){
    
        const {url,title}=await req.json();
        

    }else{

    }
}