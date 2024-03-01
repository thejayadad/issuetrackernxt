
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from 'bcrypt'

import CredentialsProvider from "next-auth/providers/credentials";


connectDB()

export const authOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email", required: true },
          password: { label: "Password", type: "password", required: true }
        },
        async authorize(credentials, req) {
          const { email, password } = credentials;
  
          const user = await signInWithCredentials({email, password})
          return user;
        }
      })
    ],
    pages: {
      signIn: '/signin', // app/signin
      error: '/errors' // app/errors
    },
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        if(account.type === 'oauth'){
          return await signInWithOAuth({account, profile})
        }
  
        return true;
      },
      async jwt({token, trigger, session}){
        
        if(trigger === 'update'){
          token.user.name = session.name;
          token.user.image = session.image;
        }else{
          const user = await getUserByEmail({email: token.email})
          token.user = user;
        }
  
        return token;
      },
      async session({session, token}){
        session.user = token.user;
        return session;
      }
    }
  }
  
  const handler = NextAuth(authOptions);
  
  export { handler as GET, handler as POST }
  
  /*----------------------------------------------*/
  async function signInWithOAuth({account, profile}){
    const user = await User.findOne({email: profile.email})
    if(user) return true; // signin
  
    //if !user => sign up => sign in
    const newUser = new User({
      name: profile.name,
      email: profile.email,
      image: profile.picture,
      provider: account.provider,
    })
  
    await newUser.save();
  
    return true;
  }
  
  async function getUserByEmail({email}){
    const user = await User.findOne({email}).select('-password')
    if(!user) throw new Error('Email does not exist!');
  
    return {...user._doc, _id: user._id.toString()}
  }
  
  async function signInWithCredentials({email, password}){
    const user = await User.findOne({email})
    if(!user) throw new Error('Email does not exist!')
  
    const compare = await bcrypt.compare(password, user.password)
    if(!compare) throw new Error('Password does not match!')
  
    return {...user._doc, _id: user._id.toString()}
  }