"use client"
import React, { useEffect } from 'react'

type props={
  videoId:string
}

const YTPlayer = ({videoId}:props) => {

      useEffect(()=>{
        
        const tag=document.createElement("script");
        //@ts-ignore
        tag.scr="https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);

        //@ts-ignore
        window.onYouTubeIframeAPIReady = function() {
          //@ts-ignore
          const player = new window.YT.Player('ytPlayer', {
            height: '390',
            width: '640',
            videoId: videoId,
            events: {
              "onStateChange":(event)=>{
                if(event.data===0){
                  console.log("Video ended")
                }
              },
            }
          });
        }
      },[videoId]);
    

  return (
  <>
    <div className="w-full flex justify-center align-middle items-center h-full" id="ytPlayer">
    </div>
  </>
  )
}

export default YTPlayer
