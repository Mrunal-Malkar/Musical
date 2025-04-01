import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "../../../../../models/user.model";
import connectDB from "../../../../../db/mongoose";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user }) {
      console.log("this is the user",user);
      await connectDB();
      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        await User.create({
          username: user.name,
          email: user.email,
        });
      }
      return true;
    },
    async jwt({token,user}){
      if(user){
        token.id=user.id
      }
      return token
    },
  },
});

export { handler as GET, handler as POST };
