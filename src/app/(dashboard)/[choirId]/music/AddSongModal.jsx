"use client";
import { useState, useContext } from "react";
import { ChoirContext } from "../ChoirContext";

export default function AddSongModal({ closeModal }) {
  const choir = useContext(ChoirContext);
  const [newSongTitle, setNewSongTitle] = useState("");
  const [newSongSheetMusic, setNewSongSheetMusic] = useState();
  const [newSongAudio, setNewSongAudio] = useState();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Add the new song to the choir
    const newSong = await choir.addSong(newSongTitle);
    const songId = newSong.songId;

    // Add the sheet music and audio files to the song
    const pdfData = new FormData();
    pdfData.append("file", newSongSheetMusic);
    pdfData.append("fileName", "sheet-music.pdf");
    choir.addFile(songId, pdfData);

    const musicData = new FormData();
    musicData.append("file", newSongAudio);
    musicData.append("fileName", "audio.mp3");
    choir.addFile(songId, musicData);

    await pdfData;
    await musicData;

    // Close the modal
    closeModal();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 -mt-36"
      onClick={closeModal}
    >
      <div
        className="bg-white shadow sm:rounded-lg relative px-5 py-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute top-0 left-0 inline-flex items-center justify-center rounded-md p-2 text-sm font-semibold m-1 text-gray-700 hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
          onClick={closeModal}
        >
          X
        </button>
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-semibold leading-6 text-gray-900">
            Add a New Song
          </h3>
          {/* <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>
              Fill in the details for the new song you wish to add to your
              collection.
            </p>
          </div> */}
          <form
            className="mt-5 sm:flex sm:items-center flex-col gap-4"
            onSubmit={handleFormSubmit}
          >
            <div className="w-full">
              <p className="text-sm text-gray-500 ml-1">
                Enter the title of the song.
              </p>
              <input
                type="text"
                name="title"
                placeholder="Title"
                onChange={(e) => setNewSongTitle(e.target.value)}
                value={newSongTitle}
                className="pl-2 focus:outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="w-full">
              <p className="text-sm text-gray-500 ml-1">
                Upload the sheet music pdf file for the song.
              </p>
              <label htmlFor="sheetMusic" className="sr-only">
                Sheet Music
              </label>
              <input
                type="file"
                name="sheetMusic"
                placeholder="Sheet Music"
                onChange={(e) => setNewSongSheetMusic(e.target.files[0])}
                className="pl-2 focus:outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="w-full">
              <p className="text-sm text-gray-500 ml-1">
                Upload the main accompaniment audio file for the song.
              </p>
              <label htmlFor="audio" className="sr-only">
                Audio
              </label>
              <input
                type="file"
                name="audio"
                placeholder="Audio"
                onChange={(e) => setNewSongAudio(e.target.files[0])}
                className="pl-2 focus:outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="mt-5 sm:mt-0 sm:ml-3">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:w-auto"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
