"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import RedButton from "@/components/red-button";

export default function NotFound() {
  const pathname: string = usePathname();

  return (
    <div className="w-screen h-screen grid place-items-center">
      <div className="m-auto text-center font-noto">
        <Image
          src="/netflix-icon.svg"
          alt="404"
          width={100}
          height={100}
          className="mx-auto"
        />
        <div className="mt-6 tracking-wide">
          <h1 className="text-bold text-3xl">
            <span className="text-red-600">404</span>{" "}
            ไม่พบหน้าที่ต้องการ
          </h1>
          <p className="text-lg my-3">
            ไม่พบเส้นทางปลายทาง <span className="text-stone-400 bg-black/20 px-2 py-1 rounded-lg">{pathname}</span> ของหน้านี้ โปรดกลับไปยังหน้าหลัก
          </p>
          <RedButton href="/" text="กลับ" className="mt-6 mx-auto font-noto" />
        </div>
      </div>
    </div>
  );
}
