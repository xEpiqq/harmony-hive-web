import { useState, useEffect } from "react";

export default function useChoir(choirId) {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState(null);
  const [members, setMembers] = useState([]);
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    loadChoir();
  }, [choirId]);

  const addFile = async (songId, formData) => {
    const response = await fetch(
      "/api/choir/" + choirId + "/songs/" + songId + "/addFile",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();

    if (data.status !== 200) {
      console.error("Error adding file: ", data.message);
      return data;
    }

    loadChoir();

    return data;
  };

  const addCalendarEvent = async (event) => {
    const response = await fetch("/api/choir/" + choirId + "/calendar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    const data = await response.json();

    if (data.status !== 200) {
      console.error("Error adding event: ", data.message);
      return data;
    }

    loadChoir();

    return data;
  };

  const addSong = async (songName) => {
    setSongs([...songs, songName]);
    const addSongRequest = await fetch("/api/choir/" + choirId + "/songs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ songName: songName }),
    });

    if (addSongRequest.status !== 200) {
      console.error("Error adding song: ", addSongRequest.message);
      return addSongRequest;
    }

    const data = await addSongRequest.json();
    // TODO: probably should create a reload songs method
    loadChoir();
    return data;
  };

  const loadChoir = async () => {
    if (choirId) {
      const response = await fetch("/api/choir/" + choirId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status !== 200) {
        return <div>Choir not found</div>;
      }
      setSongs(data.choir.songs);
      setName(data.choir.name);
      setMembers(data.choir.members);
      setCalendar(data.choir.calendar);
      setLoading(false);
      setError(null);
    }
  };

  return {
    choirId,
    songs,
    loading,
    error,
    name,
    members,
    calendar,
    addSong,
    reloadChoir: loadChoir,
    addFile,
    addCalendarEvent,
  };
}
