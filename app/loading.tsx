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
        />
        <h1 className="font-mukta text-4xl font-bold tracking-wider mt-5 text-center text-red-600">
          Netflix API
        </h1>
      </div>
    </div>
  );
}
