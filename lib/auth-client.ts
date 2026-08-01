import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

const getClientAppUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
};

export const { signIn, signOut, signUp, useSession, admin } = createAuthClient({
  baseURL: getClientAppUrl(),
  plugins: [adminClient()],
});