
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/app/SessionProvider";
import {MongoDBAdapter} from "@auth/mongodb-adapter";


export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    adapter: MongoDBAdapter(clientPromise),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      })
    ],
  };
  
  const handler = NextAuth(authOptions)
  
  export { handler as GET, handler as POST }
