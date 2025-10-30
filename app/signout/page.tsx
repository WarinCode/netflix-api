"use client";

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useUser, CurrentUser, CurrentInternalUser } from "@stackframe/stack";
import ActionButton from "@/components/action-button";

export default function SignOutPage() {
  const user: CurrentUser | CurrentInternalUser | null = useUser();

  useEffect(() => {
    if (!user) {
      redirect("/signin");
    }
  }, []);

  const handleSignOut = async (): Promise<void> => {
    await user?.signOut({ redirectUrl: "/" });
  };

  if (!user) {
    return (
      <div className="h-screen w-screen grid place-items-center">
        <h1 className="text-center text-4xl font-noto font-bold">
          คุณยังไม่ได้เข้าสู่ระบบ!
        </h1>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen grid place-items-center">
      <div className="mx-auto text-center flex flex-col items-center">
        <Image
          src={user.profileImageUrl as string}
          alt="user profile"
          width={200}
          height={200}
          className="rounded-full border-4 border-slate-50/30"
        />
        <div className="font-mukta text-start my-6 text-lg">
          <h1>{user.displayName}</h1>
          <h3>{user.primaryEmail}</h3>
        </div>
        <div>
          <ActionButton
            text="Sign Out"
            handleClick={handleSignOut}
            className="font-mukta w-46 h-12 mb-6"
          />
          <Link
            href="/"
            className="cursor-pointer hover:border-2 border-slate-50 rounded-lg block w-46 h-12"
          >
            <p className="translate-y-2.5">Back</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
