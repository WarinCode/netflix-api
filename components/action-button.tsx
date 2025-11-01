import { ActionButtonProps } from "@/app/_types/propTypes";

export default function ActionButton({
  className,
  handleClick,
  text,
}: ActionButtonProps) {
  return (
    <button
      className={`bg-red-600 font-noto cursor-pointer w-30 h-10 rounded-md grid place-items-center text-white transition delay-150 hover:bg-red-800 ${
        className ? className : ""
      }`}
      onClick={handleClick}
    >
      <p className="select-none">{text}</p>
    </button>
  );
}
