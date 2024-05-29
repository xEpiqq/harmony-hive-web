import React from 'react';
import { getCurrentUser } from "@/lib/session";
import ChoirSelection from './choirselection'

export default async function ChoirSelect() {

  const user = await getCurrentUser();

  return (
    <div className="h-screen w-full flex justify-center items-center bg-blue-100">
      <ChoirSelection user={user}/>
    </div>
  );
}
