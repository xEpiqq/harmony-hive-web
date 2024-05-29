"use client";
import { useState, useContext } from "react";
import Rendermusic from "./rendermusic";
import { ChoirContext } from "../ChoirContext";
import AddSongModal from "./AddSongModal";
export default function MusicPage() {
  const choir = useContext(ChoirContext);
  const music = choir.songs;
  const [showModal, setShowModal] = useState(false);
  const [newSong, setNewSong] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
    year: "",
  });

  const handleAddMusicClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setNewSong({ ...newSong, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Music Hive
        </h3>
        <div className="mt-3 sm:ml-4 sm:mt-0">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleAddMusicClick}
          >
            Add Music Folder
          </button>
        </div>
      </div>

      <main className="flex flex-col items-center justify-between p-24">
        {music.length === 0 ? (
          <button
            type="button"
            className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-0"
            onClick={handleAddMusicClick}
          >
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
            <span className="mt-2 block text-sm font-semibold text-gray-900">
              Create Your First Music Folder!
            </span>
          </button>
        ) : (
          <div className="gap-4 bg-black">
            {music.map((item, index) => (
              <div className="w-full h-full flex" key={index}>
                <div className="bg-white shadow-sm rounded-lg p-4 w-full h-full">
                  <a
                    href={`/${choir.choirId}/song/${item.songId}`}
                    className="text-lg font-semibold"
                  >
                    {item.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <AddSongModal
          closeModal={handleCloseModal}
        />
      )}
    </>
  );
}
