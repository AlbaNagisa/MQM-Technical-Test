import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="w-full h-full flex items-center justify-evenly text-[1.5em]">
      <Link
        className="p-4 m-4 bg-[#1f115e] rounded-[20px] hover:underline"
        href={"/terminologies"}
      >
        Rechercher des terminologies
      </Link>
      <Link
        className="p-4 m-4 bg-[#1f115e] rounded-[20px] hover:underline"
        href={"/concepts"}
      >
        Rechercher des concepts
      </Link>
    </div>
  );
}
