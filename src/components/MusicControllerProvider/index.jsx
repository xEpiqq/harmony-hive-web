"use client";
import { createContext } from "react";
import { useState } from "react";

import useMusicController from "@/lib/musicController";

export const MusicControllerContext = createContext({ plzwork: "false" });

export default function MusicControllerProvider({ children }) {
  const musicController = useMusicController();

  return (
    <MusicControllerContext.Provider value={musicController}>
      {children}
    </MusicControllerContext.Provider>
  );
}
