"use client";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();
    
    const handleClick = () => {
        router.push("/create-post");
    };

    return (
        <div className="z-10 navbar p-4 sm:h-16 flex flex-col sm:flex-row  justify-between sm:justify-around items-center sticky top-0 bg-white shadow-md w-full">
            <div className="text-2xl sm:text-3xl font-bold">Postify</div>
            <button 
                onClick={handleClick} 
                className="cursor-pointer px-6 py-2 bg-white text-black border border-gray-300 rounded-lg text-center flex justify-center items-center h-[2.5rem] hover:bg-gray-200 transition"
            >
                Create a Post
            </button>
        </div>
    );
}
