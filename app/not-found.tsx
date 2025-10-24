"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname: string = usePathname();

  return (
    <div className="m-auto text-center bg-black text-white">
      <h1><span className="text-bold">404</span> ไม่พบหน้าที่เรียกหา</h1>
      <p>{pathname} ไม่พบเส้นทางของหน้านี้โปรดกลับไปยังหน้าหลัก</p>
      <Link href="/">กลับ</Link>
    </div>
  );
}
