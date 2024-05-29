import { NextResponse } from "next/server";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firestoreAdapter";

export async function POST(request) {

  const data = await request.json();
  const userDocRef = doc(db, "users", data.userId);
  await updateDoc(userDocRef, { current_choir_selected: data.choirId });
  
  return NextResponse.json({ status: 200, message: "User is authenticated" });
}
