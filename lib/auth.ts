import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import {admin} from 'better-auth/plugins'

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword:{
    enabled:true
  },
    trustedOrigins: [
    "http://localhost:3000",
    "http://192.168.1.38:3000",
    "https://grocery-red-ten.vercel.app"
  ],
  plugins:[
    admin()
  ]
});

