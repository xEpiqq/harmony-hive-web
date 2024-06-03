import { NextResponse } from "next/server";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firestoreAdapter";

export async function PUT(request, { params }) {
  try {
    const { choirId, songId } = params;
    const { newName } = await request.json();

    if (!newName) {
      return NextResponse.json({ status: 400, message: "New name is required" });
    }

    // Get the song document reference
    const songDocRef = doc(db, "choirs", choirId, "songs", songId);
    
    // Check if the song exists
    const songDoc = await getDoc(songDocRef);
    if (!songDoc.exists()) {
      return NextResponse.json({ status: 404, message: "Song not found" });
    }

    // Update the song document with the new name
    await updateDoc(songDocRef, {
      name: newName
    });

    return NextResponse.json({
      status: 200,
      message: "Song renamed successfully",
    });
  } catch (error) {
    console.error("Error renaming song: ", error);
    return NextResponse.json({ status: 500, message: error.message });
  }
}
