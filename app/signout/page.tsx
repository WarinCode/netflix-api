"use client";
import { useUser } from "@stackframe/stack";

export default function SignOutPage() {
  const user = useUser();
  
  return user ? (
    <button onClick={() => user.signOut({ redirectUrl: "/" })}>Sign Out</button>
  ) : (
    <p>ยังไม่ได้เข้าสู่ระบบ</p>
  );
}
