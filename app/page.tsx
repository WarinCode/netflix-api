import Image from "next/image";
import Link from "next/link";
import { stackServerApp } from "@/stack/server";
import { CurrentServerUser } from "@stackframe/react";
import RedButton from "@/components/red-button";

export default async function Home() {
  const user: CurrentServerUser | null = await stackServerApp.getUser();

  return (
    <main
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.6)), url('/netflix-background.jpg')",
      }}
      className="p-12 h-screen w-screen bg-cover bg-center bg-no-repeat"
    >
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

      <div className="text-center my-40 w-3/5 mx-auto">
        <h1 className="text-4xl font-bold tracking-wide leading-12 font-noto">
          เว็บไซต์ให้บริการ{" "}
          <span className="text-red-600 font-mukta">Netflix API</span>{" "}
          สำหรับการให้บริการข้อมูลหนังทั้งหมด{" "}
          <span className="text-amber-300">8800+</span> กว่าเรื่อง
        </h1>
        <h3 className="mt-2 text-2xl font-noto">
          ลงทะเบียนเพื่อเข้าใช้งาน API ได้เลยตอนนี้
        </h3>
        <RedButton
          href="/api-key"
          text="เริ่มต้นการใช้งาน"
          className="w-56 h-14 mx-auto font-noto mt-10 text-lg font-bold"
        />
      </div>
    </main>
  );
}
