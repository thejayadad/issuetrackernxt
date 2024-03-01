
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/app/SessionProvider";
import {MongoDBAdapter} from "@auth/mongodb-adapter";
import connectDB from "@/lib/db";

await connectDB()
export const authOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      })
    ],
  };
  
  const handler = NextAuth(authOptions)
  
  export { handler as GET, handler as POST }
