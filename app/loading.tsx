import Image from "next/image";

export default function Loading() {
  return (
    <div className="h-screen w-screen grid place-items-center">
      <div className="animate-pulse cursor-default">
        <Image
          src="/netflix-icon.svg"
          alt="loading"
          width={100}
          height={100}
          className="mx-auto"
          loading="eager"
        />
      </div>
    </div>
  );
}
