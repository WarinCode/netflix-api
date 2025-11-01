"use client";

import { IconButtonProps } from "@/app/_types/propTypes";

export default function IconButton({
  className,
  icon,
  handleClick,
  text,
}: IconButtonProps) {
  return (
    <button
      className={`bg-red-600 font-noto cursor-pointer w-30 h-10 rounded-md flex items-center justify-center space-x-1 text-white transition delay-150 hover:bg-red-800 ${
        className ? className : ""
      }`}
      onClick={handleClick}
    >
      {icon}
      <p className="select-none">{text}</p>
    </button>
  );
}
