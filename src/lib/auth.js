import { FirestoreAdapter } from "@auth/firebase-adapter";
import GoogleProvider from "next-auth/providers/google";
import { firestoreApp } from "./firestoreAdapter";

export const authOptions = {
  adapter: FirestoreAdapter(firestoreApp),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: async ({session, token, user}) => {
      session.user = user;
      return session;
    },
  },
};
