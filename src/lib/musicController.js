import { useState, useEffect } from "react";

export default function useMusicController(choirId) {
  const [songUrl, setSongUrl] = useState(null);
  const [paused, setPaused] = useState(true);

  return {
    songUrl,
    setSongUrl,
    paused,
    setPaused,
  };
}