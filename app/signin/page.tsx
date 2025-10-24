import Link from "next/link";
import { SignIn } from "@stackframe/stack";

export default function SignInPage() {
  return (
    <div>
      <SignIn
        fullPage={true}
        automaticRedirect={true}
        extraInfo={<Link href="/signup">Sign Up</Link>}
      />
    </div>
  );
}
