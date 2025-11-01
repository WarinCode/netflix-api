import { NetflixContainerProps } from "@/app/_types/propTypes";

export default function NetflixContainer({ children }: NetflixContainerProps) {
  return (
    <section
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.6)), url('/netflix-background.jpg')",
      }}
      className="p-12 min-h-screen w-screen bg-cover bg-center bg-no-repeat font-noto"
    >
      {children}
    </section>
  );
}
