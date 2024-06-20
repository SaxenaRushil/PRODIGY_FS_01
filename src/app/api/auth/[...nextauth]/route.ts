import NextAuth, { NextAuthOptions, Awaitable, User, Account, Profile, Session, JWT } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import UserModel from '@/models/Users'; 
import connect from '@/utils/db';
import dotenv from 'dotenv';
dotenv.config(); 


interface MyToken extends JWT {
  email?: string;
}

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET, 
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await connect();

        const { email, password } = credentials as { email: string; password: string };

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
          throw new Error('Invalid email or password');
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error('Invalid email or password');
        }

        // If the login is successful, return the user object
        return { email: user.email } as MyToken;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: MyToken; user?: User }) {
      // If user exists (login successful), set token properties
      if (user) {
        token.email = (user as MyToken).email;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: MyToken }) {
      // Set session user properties if token exists
      session.user.email = token.email!;
      return session;
    },
  },
  pages: {
    signIn: '/Login',
  },
};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
