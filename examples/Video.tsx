/**
 * Simple workaround to pause the video
 * when the player is not on the screen
 * and play it when it is.
 * It is not supposed to be in your production code, only for demo purposes.
 */

import React from "react";
import { useRef } from "react";
import { useOnScreen } from "../lib/useOnScreen";

type VideoProps = {
  src: string;
};

export const Video = ({ src }: VideoProps) => {
  const ref = useRef<HTMLVideoElement>(null);
  const { isOnScreen } = useOnScreen({ ref, threshold: 0.5 });

  const stopVideo = React.useCallback(() => {
    ref.current && ref.current.pause();
  }, [ref]);

  const playVideo = React.useCallback(() => {
    ref.current && ref.current.play();
  }, [ref]);

  React.useEffect(() => {
    if (isOnScreen) {
      playVideo();
    } else {
      stopVideo();
    }
  }, [isOnScreen, stopVideo, playVideo]);

  return <video ref={ref} src={src} autoPlay loop />;
};
