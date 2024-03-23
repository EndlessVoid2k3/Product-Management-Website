"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SidebarOpt = ({text, bgColor, textColor, link, children }) => {
  const router = useRouter()
  return (
    <div
      onClick={() => {router.push(link)}}
      className={`flex items-center w-full gap-3 px-4 py-2 rounded-md ${bgColor}`}
    >
      {children}
      <Link
        href={link}
        className={`select-none text-xl cursor-default ${textColor}`}
      >
        {text}
      </Link>
    </div>
  );
};

export default SidebarOpt;
