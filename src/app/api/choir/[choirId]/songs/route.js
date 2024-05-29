import { NextResponse } from "next/server";
import { doc, getDoc, updateDoc, collection, addDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/lib/firestoreAdapter";

export async function POST(request, { params }) {
  try {
    const data = request.json();
    const { choirId } = params;
    const { songName } = await data;

    // get the choir document from the firestore
    const choirDocRef = doc(db, "choirs", choirId);
    const choirDoc = await getDoc(choirDocRef);

    if (!choirDoc.exists()) {
      return NextResponse.json({
        status: 404,
        message: "Choir not found",
      });
    }

    // create a collection under the user doc
    const songsCollectionRef = collection(db, "choirs", choirId, "songs");

    // Create 
    const songDocRef = await addDoc(songsCollectionRef, {
      name: songName,
      // ... other song details
    });

    return NextResponse.json({
      songId: songDocRef.id,
      status: 200,
      message: "Song created successfully",
    });
  } catch (error) {
    console.error("Error adding document: ", error);
    return NextResponse.json({ status: 500, message: error.message });
  }
}
