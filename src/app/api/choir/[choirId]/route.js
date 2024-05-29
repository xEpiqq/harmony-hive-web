import { NextResponse } from "next/server";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firestoreAdapter";

export async function GET(request, { params }) {
  // get the choir id from the request
  const choirId = params.choirId;

  // get the choir document from the firestore
  const choirDocRef = doc(db, "choirs", choirId);
  const choirDoc = await getDoc(choirDocRef);

  // get the songs collection from the firestore
  const songsCollectionRef = collection(db, "choirs", choirId, "songs");
  const songRefs = await getDocs(songsCollectionRef);
  const songsCollection = songRefs.docs.map((doc) => ({
    songId: doc.id,
    ...doc.data(),
  }));

  // get the calendar collection from the firestore
  const calendarCollectionRef = collection(db, "choirs", choirId, "calendar");
  const calendarRefs = await getDocs(calendarCollectionRef);
  const calendarCollection = calendarRefs.docs.map((doc) => ({
    eventId: doc.id,
    ...doc.data(),
  }));

  // get the user documents from the firestore
  // Create an array to store promises of fetching user documents
  const memberIds = choirDoc.data().members;
  const usersCollectionRef = collection(db, "users");

  const userDocPromises = memberIds.map((memberId) => {
    const userDocRef = doc(usersCollectionRef, memberId);
    return getDoc(userDocRef);
  });
  // Wait for all user documents to be fetched
  const userDocs = await Promise.all(userDocPromises);
  // Create an array of user data
  const members = userDocs.map((doc) => {
    console.log(doc.data());
    const userData = doc.data();
    return {
      userId: doc.id,
      ...userData,
    };
  });

  if (choirDoc.exists()) {
    const choirData = { ...choirDoc.data(), songs: songsCollection, members, calendar: calendarCollection};
    return NextResponse.json({
      status: 200,
      message: "Choir found",
      choir: choirData,
    });
  } else {
    return NextResponse.json({ status: 404, message: "Choir not found" });
  }
}
