import Image from "next/image";
import NetflixContainer from "@/components/netflix-container";
import Navbar from "@/components/navbar";
import RedButton from "@/components/red-button";

export default async function Home() {
  return (
    <NetflixContainer>
      <Navbar />
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
          href="/management"
          text="เริ่มต้นการใช้งาน"
          className="w-56 h-14 mx-auto mt-10 text-lg font-bold"
        />
      </div>
      <div className="mt-60 font-noto w-full flex flex-col items-center space-y-4">
          <h1 className="text-center text-3xl font-bold tracking-wide">ตัวอย่างโค้ดการใช้งาน API ของเรา</h1>
          <div className="flex justify-around items-center">
            <Image src="/code/example1.png" width={700} height={450} alt="example1" />
            <h3 className="text-2xl font-bold">ตั้งค่าสำหรับการใช้งานไลบรารี่ Axios</h3>
          </div>
          <div className="w-full flex flex-row-reverse justify-around items-center">
            <Image src="/code/example2.png" width={700} height={450} alt="example2"/>
            <h3 className="text-2xl font-bold">การดึงข้อมูลหนังด้วย method GET</h3>
          </div>
      </div>
    </NetflixContainer>
  );
}
