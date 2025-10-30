import Link from "next/link";
import { SignUp } from "@stackframe/stack";

export default function SignUpPage() {
  return (
    <div className="font-mukta">
      <SignUp
        fullPage
        automaticRedirect
        extraInfo={<Link href="/signin">Sign In</Link>}
      />
    </div>
  );
}
