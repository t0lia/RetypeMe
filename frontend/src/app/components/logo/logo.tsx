import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/assets/logo.webp";

export default function Logo(): ReactNode {
  return (
    <Link href="/">
      <div className="flex ml-8 text-[36px] font-semibold group relative">
        <div className="absolute -z-10 w-40 h-10 top-9 left-10 bg-gradient-to-br from-pink-400 via-pink-500 to-purple-800 rounded-full p-4 filter blur-sm rotate-[-1.5deg]"></div>
        <div className="absolute -z-10 font-semibold text-secondary text-sm top-11 left-16 rotate-[-2.4deg]">
          We're on Testnet
        </div>
        <Image
          className="scale-[0.8]"
          width={50}
          height={50}
          alt="retypeme logo"
          src={logo}
        />
        Retype<span className="group-hover:text-primary">Me</span>
      </div>
    </Link>
  );
}
