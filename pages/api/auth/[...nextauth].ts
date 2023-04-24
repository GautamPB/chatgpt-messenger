import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// configure one or more auth options as objects
export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
    ],
};

export default NextAuth(authOptions);
