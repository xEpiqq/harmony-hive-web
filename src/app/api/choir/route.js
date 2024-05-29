import { NextResponse } from "next/server";
import { doc, getDoc, updateDoc, collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firestoreAdapter";

export async function GET(request) {
  // get the choir id from the request
  const data = await request.json();
  const choirId = data.choirId;

  // get the choir document from the firestore
  const choirDocRef = doc(db, "choirs", choirId);
  const choirDoc = await getDoc(choirDocRef);

  if (choirDoc.exists()) {
    return NextResponse.json({
      status: 200,
      message: "Choir found",
      choir: choirDoc.data(),
    });
  } else {
    return NextResponse.json({ status: 404, message: "Choir not found" });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const newChoirName = data.name;

    const choirsCollectionRef = collection(db, "choirs");
    const choirDocRef = await addDoc(choirsCollectionRef, {
      name: newChoirName,
      // ... other choir details
    });

    const userDocRef = doc(db, "users", data.userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const choirs = userDoc.data().choirs || {};
      const newChoirId = choirDocRef.id;
      choirs[newChoirId] = newChoirName;

      await updateDoc(userDocRef, {
        choirs: choirs,
      });

      return NextResponse.json({
        status: 200,
        message: "Choir created successfully",
      });
    } else {
      return NextResponse.json({ status: 404, message: "User not found" });
    }
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
