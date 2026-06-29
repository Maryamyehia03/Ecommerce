import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  pages: {
    signIn: '/auth/login',
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

    credentials: {
      email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
      password: { label: "Password", type: "password" }
    },

    authorize: async (
      credentials: Record<"email" | "password", string> | undefined,) => {
        const res = await fetch(`${process.env.API_BASE_URL}/api/v1/auth/signin`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password
            })
        })

        const data = await res.json();
        if(res?.ok){
            return {id:data?.user?.email , user:data?.user , token:data?.token};
        }
        else{
            throw new Error(data?.message);
        }
    }
  })
],
  callbacks:{
    async jwt({ token, user }) {
        if(user){
          token.user = user?.user;
          token.token = user?.token;
        }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token?.user as {
          name: string;
          email: string;
          role: string;
        };
        session.token = token?.token;
      }
      // console.log(session);
      return session;
    }

  }
})

export { handler as GET, handler as POST }