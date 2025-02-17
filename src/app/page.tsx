"use client"

import Image from "next/image";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Home() {

  return (
    <div>
      <header>
        <Image src="/logo.png" alt="Logo" width={180} height={38} priority />
      </header>
    </div> 
  );
}
