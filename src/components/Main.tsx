"use client";
import { useAppContext } from "@/app/provider"
import Image from "next/image";
import { useEffect,useState } from "react";
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
                    return <div key={p.id} className="bg-white text-black p-4 m-4">
                        <p>{p.caption}</p>
                        <div className="flex">
                            {p.recentFiles.map((f)=>{
                                return <div key={f} className="m-2">
                                    <Image src={f} alt ="jimagi"width={200} height={200} />
                                </div>
                            })}
                        </div>
                    </div>
                }))}

            </main>
        </div>
    )
}