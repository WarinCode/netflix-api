import JSX from "react";
import { v4 as uuid } from "uuid";
import NetflixContainer from "@/components/netflix-container";
import Navbar from "@/components/navbar";
import RedButton from "@/components/red-button";
import CodeExample, { examples } from "@/components/code-example";
import { CodeExampleProps } from "./_types/propTypes";

export default async function Home() {
  return (
    <NetflixContainer className="h-screen">
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
      <div className="mt-80 font-noto w-full flex flex-col items-center">
        <h1 className="text-center text-3xl font-bold tracking-wide">
          ตัวอย่างโค้ดการใช้งาน API ของเรา
        </h1>
        {examples.map(
          (example: CodeExampleProps): JSX.ReactElement => (
            <CodeExample key={uuid()} {...example} />
          )
        )}
      </div>
    </NetflixContainer>
  );
}
