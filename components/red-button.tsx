import Link from "next/link";
import { RedButtonProps } from "@/app/_types/propTypes";

export default function RedButton({ className, href, text }: RedButtonProps) {
  return (
    <Link
      href={href}
      className={`bg-red-600 font-inter cursor-pointer w-30 h-10 rounded-md grid place-items-center text-white transition delay-150 hover:bg-red-800 ${
        className ? className : ""
      }`}
    >
      <p className="select-none">{text}</p>
    </Link>
  );
}
