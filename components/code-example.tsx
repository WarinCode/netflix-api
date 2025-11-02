import Image from "next/image";
import Link from "next/link";
import Zoom from "react-medium-image-zoom";
import { CodeExampleProps } from "@/app/_types/propTypes";

export default function CodeExample({
  className,
  imagePath,
  text,
  width,
  height,
  alt,
  textElement,
}: CodeExampleProps) {
  return (
    <div className={className}>
      <h3 className="text-2xl font-bold text-center translate-y-8">
        {text} {textElement}
      </h3>
      <Zoom>
        <Image src={imagePath} width={width} height={height} alt={alt} />
      </Zoom>
    </div>
  );
}

export const examples: CodeExampleProps[] = [
  {
    className: "mt-6",
    text: "ตั้งค่าสำหรับการใช้งานด้วยไลบรารี่ ",
    textElement: (
      <Link
        href="https://axios-http.com/docs/intro"
        target="_blank"
        className="text-purple-500 hover:underline"
      >
        Axios
      </Link>
    ),
    imagePath: "/code/example1.svg",
    width: 900,
    height: 450,
    alt: "code-example1",
  },
  {
    text: "การดึงข้อมูลหนัง",
    imagePath: "/code/example2.svg",
    width: 850,
    height: 600,
    alt: "code-example2",
  },
  {
    text: "การค้นหาข้อมูลหนัง",
    imagePath: "/code/example3.svg",
    width: 1000,
    height: 800,
    alt: "code-example3",
  },
  {
    text: "การเพิ่มข้อมูลหนัง",
    imagePath: "/code/example4.svg",
    width: 850,
    height: 500,
    alt: "code-example4",
  },
  {
    text: "การแก้ไขข้อมูลหนัง",
    imagePath: "/code/example5.svg",
    width: 850,
    height: 500,
    alt: "code-example5",
  },
  {
    text: "การลบข้อมูลหนัง",
    imagePath: "/code/example6.svg",
    width: 1200,
    height: 500,
    alt: "code-example6",
  },
];
