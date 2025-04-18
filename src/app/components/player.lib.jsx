import { useEffect, useRef } from "react";
const YouTubePlayer = ({ videoId, playNext }) => {
  const ytPlayerRef = useRef(null);
  const playerContainerId = "ytPLAYER";


  useEffect(() => {
    const loadScript = () => {
      if (!document.getElementById("yt-frame-api")) {
        const tag = document.createElement("script");
        tag.id = "yt-frame-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }
    };

    loadScript();
    if (!(window._ytCallbackSet)) {
      window._ytCallbackSet = true;
      window.onYouTubeIframeAPIReady = () => {
        console.log("YT API Ready");
      };
    }

    const checkYTReadyAndInit = () => {
      if (window.YT && window.YT.Player) {
        if (ytPlayerRef.current) {
          ytPlayerRef.current.loadVideoById(videoId);
        } else {
          ytPlayerRef.current = new window.YT.Player(playerContainerId, {
            height: "390",
            width: "640",
            videoId: videoId,
            events: {
              onStateChange: (event) => {
                if (event.data === 0) playNext();
              },
              onError: () => {
                setTimeout(() => location.reload(), 2000);
              },
            },
          });
        }
      } else {
        setTimeout(checkYTReadyAndInit, 500);
      }
    };

    checkYTReadyAndInit();

    return () => {
      if (ytPlayerRef.current && ytPlayerRef.current.destroy) {
        ytPlayerRef.current.destroy();
        ytPlayerRef.current = null;
      }
    };
  }, [videoId]);

  return <div id="ytPLAYER" className="w-full h-full"/>;
};

export default YouTubePlayer;
