import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import clientPromise from '@/lib/mongodb'
import { MongoDBAdapter } from '@auth/mongodb-adapter'

const adminEmails = ['jinokrit@gmail.com', '64010022@kmitl.ac.th'];
const INSTITUTION = 'kmitl.ac.th';

const DEFAULT_SCORES = 100;
const DEFAULT_YEAR = new Date().getFullYear();

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET, // Define your secret here
  callbacks: {
    session: async ({session, token, user}) => {
      if (session?.user?.email.split('@')[1] === INSTITUTION || adminEmails.includes(session?.user?.email)) {
        if (user) {
          // If user is present, update user data with default values
          const updatedUser = {
            ...user,
            username: user.email.split('@')[0],
            firstname: user.name.split(' ')[0],
            lastname: user.name.split(' ')[1],
            tel: null,
            year: DEFAULT_YEAR,
            scores: DEFAULT_SCORES,
          };
          
          // Update user data in the database
          await MongoDBAdapter(clientPromise).updateUser(updatedUser);
  
          // Return updated session
          return { ...session, user: updatedUser };
        }
        return session;
      } else {
        return false;
      }
    },
  }
}
