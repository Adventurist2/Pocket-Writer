"use client";
import { RecoilRoot } from "recoil";
import Navbar from "@/components/Navbar";
import Main from "@/components/Main";
import { Upload } from  "@/components/upload";
export default function Home() {
  return (
    <RecoilRoot>
    <div className="h-screen w-screen relative overflow-x-hidden justify-center">
      <Navbar/>
      <Main></Main>
      {/* <Upload></Upload> */}
    </div>
    </RecoilRoot>
  );
}
