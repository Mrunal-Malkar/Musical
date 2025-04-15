import { useEffect, useRef } from "react";

const YouTubePlayer = ({ videoId, playNext }) => {
  const ytPlayerRef = useRef<any>(null);
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

    if (!(window as any)._ytCallbackSet) {
      (window as any)._ytCallbackSet = true;
      (window as any).onYouTubeIframeAPIReady = () => {
        console.log("YT API Ready");
      };
    }

    const checkYTReadyAndInit = () => {
      if ((window as any).YT && (window as any).YT.Player) {
        if (ytPlayerRef.current) {
          ytPlayerRef.current.loadVideoById(videoId);
        } else {
          ytPlayerRef.current = new (window as any).YT.Player(playerContainerId, {
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
