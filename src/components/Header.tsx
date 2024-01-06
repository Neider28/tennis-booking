"use client"
import logo from "../../public/logo.png";
import theme from "@/theme/themeConfig";
import { ConfigProvider } from "antd";
import Image from "next/image";
import Link from "next/link";
import DropdownMenu from "./DropdownMenu";

export default function Header() {
  return (
    <ConfigProvider theme={theme}>
      <header className="w-full shadow-lg shadow-neutral-900 flex justify-center items-center border-solid border-b-2 border-naples-yellow">
        <nav className="w-full flex justify-between items-center sm:w-9/12 lg:w-[60rem] pr-6 sm:pr-0">
          <Link href="/">
            <Image
              src={logo}
              alt="Logo"
              width={150}
              height={150}
              priority
            />
          </Link>
          <DropdownMenu />
        </nav>
      </header>
    </ConfigProvider>
  );
};
