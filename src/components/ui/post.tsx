import Image from "next/image";
import { useState } from "react";
import PostViewer from "./post-viewer";

export default function Post({ id,caption, recentFiles }) {
    const [open, setOpen] = useState(false);
    const postDetails = {
        id:id,
        caption:caption,
        recentFiles:recentFiles
    }
    const handleClick = () => {
        console.log(`Post ID: ${id}`);
        setOpen(true);
    };
    return (
        <div onClick={handleClick} key={id} className="relative bg-white p-4 m-4 w-full max-w-lg h-[22rem] rounded-lg overflow-hidden cursor-pointer">
            <Image 
                src={recentFiles[0]} 
                alt="Post image" 
                layout="fill" 
                objectFit="cover" 
                className="rounded-lg"
            />

            {open && (
                <div 
                    className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-lg z-50"
                    onClick={(e) => {e.preventDefault();e.stopPropagation();setOpen(false);console.log("close")}} 
                >
                    <div
                      className="absolute top-6 right-6 bg-white text-black px-4 py-2 rounded-lg shadow-md z-50"
                    onClick={(e)=>{e.preventDefault();e.stopPropagation();setOpen(false);}}>close</div>
                    <div
                     className="relative w-11/12 max-w-4xl h-5/6 rounded-lg overflow-hidden"
                     onClick={(e)=>{e.preventDefault();e.stopPropagation();}}>
                        <PostViewer {...postDetails}/>
                    </div>
                </div>
            )}
        </div>
    );
}
