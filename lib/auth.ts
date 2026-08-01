import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { admin } from "better-auth/plugins";

const appUrl = process.env.BETTER_AUTH_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const trustedOrigins = Array.from(
  new Set(
    [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://192.168.1.38:3000",
      process.env.BETTER_AUTH_URL,
      process.env.NEXT_PUBLIC_APP_URL,
      "https://grocery-red-ten.vercel.app",
    ].filter(Boolean) as string[]
  )
);

export const auth = betterAuth({
  baseURL: appUrl,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins,
  plugins: [admin()],
});

