import { NextResponse } from "next/server";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "@/lib/firestoreAdapter";

export async function POST(request, { params }) {
  try {
    const data = await request.json();
    const { choirId } = params;

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
    const calendarCollectionRef = collection(db, "choirs", choirId, "calendar");

    console.log({...data})
    
    // Create
    const calendarRefs = await addDoc(calendarCollectionRef, {
      ...  data,
    });

    return NextResponse.json({
      songId: calendarRefs.id,
      status: 200,
      message: "Calendar event created successfully",
    });
  } catch (error) {
    console.error("Error adding document: ", error);
    return NextResponse.json({ status: 500, message: error.message });
  }
}
