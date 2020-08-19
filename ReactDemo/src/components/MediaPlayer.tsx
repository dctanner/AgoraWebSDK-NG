import { ILocalVideoTrack, IRemoteVideoTrack } from "agora-rtc-sdk-ng";
import React, { useRef, useEffect } from "react";

export interface VideoPlayerProps {
  videoTrack: ILocalVideoTrack | IRemoteVideoTrack | undefined;
}

const MediaPlayer = (props: VideoPlayerProps) => {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!container.current) return;
    props.videoTrack?.play(container.current);
    return () => {
      props.videoTrack?.stop();
    };
  }, [container, props.videoTrack]);
  return (
    <div ref={container}  className="video-player" style={{ width: "320px", height: "240px"}}></div>
  );
}

export default MediaPlayer;