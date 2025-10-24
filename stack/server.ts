import "server-only";
import { StackServerApp } from "@stackframe/stack";
import { getEnv } from "@/app/_utils";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  projectId: getEnv("NEXT_PUBLIC_STACK_PROJECT_ID"),
  publishableClientKey: getEnv("NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY"),
  secretServerKey: getEnv("STACK_SECRET_SERVER_KEY"),
  urls: {
    signIn: "/signin",
    signUp: "/signup",
    signOut: "/signout",
  },
});
