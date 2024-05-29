import React from 'react';
import { getCurrentUser } from "@/lib/session";
import Bigboi from './bigboi'

export default async function Login() {

  const user = await getCurrentUser();

  return (
    <div className="h-screen w-screen">
      <Bigboi user={user}/>
    </div>
  );
}
