"use client";

import { createContext, useEffect, useState } from "react";
import useChoir from "@/lib/choir";

export const ChoirContext = createContext({songs: []});

export default function ChoirProvider({ children, choirId }) {
  const choir = useChoir(choirId);

  return (
    <ChoirContext.Provider value={choir}>{children}</ChoirContext.Provider>
  );
}
