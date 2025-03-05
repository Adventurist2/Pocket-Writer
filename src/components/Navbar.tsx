"use client";
import { useRouter } from "next/navigation";
export default function Navbar() {
    const router = useRouter();
    const handleClick = ()=>{
        router.push("/create-post");
    }
    return (
        <div className="z-10 bg-amber-400 p-2 h-16 flex  items-center sticky top-0">
            <div className="flex items-center">
            this is navbar
            </div>
            <button onClick={handleClick} className=" cursor-pointer p-4 bg-white text-black">Create a post</button>
        </div>
    )
}