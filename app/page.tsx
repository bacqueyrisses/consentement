import Link from "next/link";
import Instagram from "@/components/icons/instagram";
import NameDialog from "@/components/name-dialog";
import WheelWrapper from "@/components/wheel-wrapper";

export default function Home() {
  return (
    <div className="z-10 flex w-full max-w-xl flex-col items-center justify-center px-2.5 xl:px-0">
      <Link
        href="https://twitter.com/"
        target="_blank"
        rel="noreferrer"
        className="mx-auto mb-5 flex max-w-fit animate-fade-up items-center justify-center space-x-2 overflow-hidden rounded-full bg-orange-500/20 px-5 py-2 transition-colors hover:bg-orange-200 md:px-7"
      >
        <Instagram className="h-4 w-4 text-orange-500" />
      </Link>
      <h1
        className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-6xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
        style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
      >
        La roue du consentement
      </h1>
      <p
        className="mt-6 animate-fade-up text-center text-lg text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
        style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </p>

      <NameDialog />
      <WheelWrapper />
    </div>
  );
}
