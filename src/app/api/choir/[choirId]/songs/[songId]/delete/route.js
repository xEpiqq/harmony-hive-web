import { NextResponse } from "next/server";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { db, storage } from "@/lib/firestoreAdapter";
import { ref, listAll, deleteObject } from "firebase/storage";

export async function DELETE(request, { params }) {
  try {
    const { choirId, songId } = params;

    // Get the song document reference
    const songDocRef = doc(db, "choirs", choirId, "songs", songId);
    
    // Check if the song exists
    const songDoc = await getDoc(songDocRef);
    if (!songDoc.exists()) {
      return NextResponse.json({ status: 404, message: "Song not found" });
    }
 
    // Get a reference to the storage folder
    const folderRef = ref(storage, `${choirId}/songs/${songId}`);
    
    // List all items (files) in the folder
    const { items } = await listAll(folderRef);

    // Delete all files in the folder
    for (const itemRef of items) {
      await deleteObject(itemRef);
    }

    // Delete the song document from Firestore
    await deleteDoc(songDocRef);

    return NextResponse.json({
      status: 200,
      message: "Song deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting song: ", error);
    return NextResponse.json({ status: 500, message: error.message });
  }
}
