import { StackClientApp } from "@stackframe/react";
import { getEnv } from "@/app/_utils";

console.log(getEnv("NEXT_PUBLIC_STACK_PROJECT_ID"))
export const stackClientApp = new StackClientApp({ 
  tokenStore: "nextjs-cookie", 
  projectId: getEnv("NEXT_PUBLIC_STACK_PROJECT_ID"), 
  publishableClientKey: getEnv("NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY"), 
}); 