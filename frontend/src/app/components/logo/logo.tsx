import { ReactNode } from "react";
import Link from "next/link";

export default function Logo(): ReactNode {
  return (
    <Link href="/">
      <div className="ml-8 text-[36px] font-semibold group relative">
        <div className="absolute -z-10 w-40 h-10 top-9 -left-4 bg-gradient-to-br from-pink-400 via-pink-500 to-purple-800 rounded-full p-4 filter blur-sm rotate-[-1.5deg]"></div>
        <div className="absolute -z-10 font-semibold text-secondary text-sm top-11 left-2 rotate-[-1.5deg]">
          We're on Testnet
        </div>
        Retype<span className="group-hover:text-primary">Me</span>
      </div>
    </Link>
  );
}
