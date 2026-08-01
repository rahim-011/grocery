import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const { signIn, signOut, signUp, useSession, admin } = createAuthClient({
  baseURL: appUrl,
  plugins: [adminClient()],
});