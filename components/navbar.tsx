"use client";

import Link from "next/link";
import Image from "next/image";
import RedButton from "./red-button";
import { useUser, CurrentUser, CurrentInternalUser } from "@stackframe/stack";

export default function Navbar() {
  const user: CurrentUser | CurrentInternalUser | null = useUser();

  return (
    <nav className="w-full">
      <div className="flex items-center justify-between px-20">
        <Image
          src="/netflix-wordmark.svg"
          alt="Netflix-wordmark"
          width={140}
          height={50}
        />
        <div>
          {user ? (
            <div className="flex items-center justify-evenly">
              <Link href="/account-settings">
                <div className="flex items-center space-x-2">
                  <Image
                    src={user.profileImageUrl as string}
                    alt="profile image"
                    className="rounded-full border-slate-50/30 border-4"
                    height={55}
                    width={55}
                  />
                  <div className="text-sm w-36 font-inter">
                    <p>{user.displayName}</p>
                    <p className="text-gray-400 mt-1 text-ellipsis overflow-hidden">
                      {user.primaryEmail}
                    </p>
                  </div>
                </div>
              </Link>
              <RedButton
                href="/signout"
                text="ออกจากระบบ"
                className="ms-3 font-noto"
              />
            </div>
          ) : (
            <RedButton
              href="/signin"
              text="เข้าสู่ระบบ"
              className="font-noto"
            />
          )}
        </div>
      </div>
    </nav>
  );
}
