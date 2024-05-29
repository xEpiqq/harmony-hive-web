"use server";

import SideBarlayout from "./SideBarLayout";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import UserProvider from "./UserContext";
import ChoirProvider from "./ChoirContext";
import MusicControllerProvider from "@/components/MusicControllerProvider";

export default async function Layout({ children, params }) {
  const user = await getCurrentUser();

  const { choirId } = params;

  // Protect the route if no user is logged in
  // TODO: prettier redirect page
  if (!user) {
    redirect("/login");
    return <div>Redirecting...</div>;
  }

  return (
    <MusicControllerProvider>
      <UserProvider user={user}>
        <ChoirProvider choirId={choirId}>
          <SideBarlayout>{children}</SideBarlayout>
        </ChoirProvider>
      </UserProvider>
    </MusicControllerProvider>
  );
}
