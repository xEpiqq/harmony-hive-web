"use client";

import { Fragment, useState, useContext } from "react";

import { Dialog, Transition } from "@headlessui/react";

import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { MusicControllerContext } from "@/components/MusicControllerProvider";

export default function MusicPlayer() {
  const { songUrl, setSongUrl, paused, setPaused } = useContext(
    MusicControllerContext
  );
  return (
    <div className="mx-2.5 p-4 bg-slate-200 rounded-lg sticky bottom-3">
      <div className="flex items-start">
        <audio
          controls
          src={songUrl}
          onPlay={() => setPaused(false)}
          onPause={() => setPaused(true)}
        />
      </div>
    </div>
  );
}
