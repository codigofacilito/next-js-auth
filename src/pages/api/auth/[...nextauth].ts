import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
            CredentialsProvider({
                name: "Credentials",
                credentials: {
                    email: { label: "Email", type: "text", placeholder: "Email" },
                    password: { label: "Password", type: "password" },
                },
                async authorize(credentials) {                   
                    const res = await fetch("http://localhost:3000/api/auth/login", { method: 'POST', body: JSON.stringify(credentials), headers: { "Content-Type": "application/json" } });
                    const result = await res.json();

                    if (res.status === 200 && result.user) {
                        return result.user;
                    } else {
                        return null;
                    }
                }
            }),
       
    ],
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        async jwt({ token, user }: any) {
            return { ...token, ...user };
        },
        async session({ session, token }: any) {
            session.user = token;
            return session;
        },
    },
};

export default NextAuth(authOptions);