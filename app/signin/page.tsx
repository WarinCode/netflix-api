import Link from "next/link";
import { SignIn } from "@stackframe/stack";

export default function SignInPage() {
  return (
    <div className="font-mukta">
      <SignIn
        fullPage
        automaticRedirect
        extraInfo={<Link href="/signup">Sign Up</Link>}
      />
    </div>
  );
}
