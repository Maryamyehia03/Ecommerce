import {} from "next-auth"

declare module "next-auth" {
  
    interface User {
        user:{
            name: string;
            email: string;
            role: string;
        },
        token: string;
    }

  interface Session {
        user:{
            name: string;
            email: string;
            role: string;
        },
        token: jwt;
  }
}