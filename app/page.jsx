"use client";

import Link from "next/link";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="h-[100vh] flex flex-col">
      <nav className="bg-primary px-10 flex justify-between items-center py-3">
        <div className="flex gap-16 items-center">
          <p className="text-secondary-100 text-3xl font-semibold">L&F Store</p>
          <Link
            href="./products"
            className="relative text-secondary-100 font-semibold text-xl w-fit after:absolute after:transtion-all after:w-0 after:h-0.5 after:bg-secondary-100 after:left-0 after:bottom-0 hover:after:w-full hover:after:transition-all"
          >
            Dashboard
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <Button
            onClick={() => {
              router.push("/login");
            }}
            bgColor={"#F0A824"}
            _hover={{ bgColor: "#FFD993" }}
          >
            Sign In
          </Button>
        </div>
      </nav>
      <main className="flex flex-col justify-center items-center grow bg-cover bg-[url('/bgImg.jpg')] bg-center">
        <h1 className="text-white font-semibold w-3/4 text-center text-5xl">
          Dream of Otakus
        </h1>
        <p className="text-white w-3/4 text-center text-base mt-6">
          Welcome to the administration system, please click Get Started to
          continue to the next step
        </p>
        <Link
          href="/products"
          className="px-4 py-2 rounded-lg bg-accent2-200 hover:bg-accent2-100 text-primary font-semibold text-1xl mt-8"
        >
          Get Started
        </Link>
      </main>
    </div>
  );
}
