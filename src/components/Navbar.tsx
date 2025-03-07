"use client";
import { useRouter } from "next/navigation";
export default function Navbar() {
    const router = useRouter();
    const handleClick = ()=>{
        router.push("/create-post");
    }
    return (
        <div className="z-10 navbar p-2 h-16 flex justify-around gap-[35rem] items-center sticky top-0 overflow-hidden">
            <div className="flex items-center">
            <span className="text-3xl font-bold ">Postify</span>
            </div>
            <button onClick={handleClick} className=" cursor-pointer p-4 bg-white text-black rounded-lg text-center flex justify-center items-center h-[2.5rem]">Create a post</button>
        </div>
    )
}