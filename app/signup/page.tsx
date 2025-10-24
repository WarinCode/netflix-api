import Link from "next/link";
import { SignUp } from "@stackframe/stack";

export default function SignUpPage() {
  return (
    <div>
      <SignUp
        fullPage={true}
        automaticRedirect={true}
        extraInfo={<Link href="/signin">Sign In</Link>}
      />
    </div>
  );
}
