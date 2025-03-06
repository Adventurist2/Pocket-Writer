"use client";
import { useAppContext } from "@/app/provider"
import Image from "next/image";
import { useEffect,useState } from "react";
import Post from "./ui/post";
export default function Main(){
    const {post} = useAppContext();
    const [,setRefresh] = useState<boolean>(false);
    useEffect(()=>{
        setRefresh((prev:boolean)=>!prev);
    },[post]);

    return (
        <div className="h-[90vh] w-screen relative overflow-x-hidden flex justify-center">
            <main className="h-full w-2/3 custom ">
                {post.length===0 ? (
                     <p className="text-gray-500 text-center">No posts available</p>
                ):(post.map((p)=>{
                    return <Post key={p.id} id={p.id} caption={p.caption} recentFiles={p.recentFiles}/>
                }))}

            </main>
        </div>
    )
}