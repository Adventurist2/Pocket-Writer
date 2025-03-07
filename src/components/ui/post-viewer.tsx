import React from "react";
import { Carousel } from "./Carousel";
import Image from "next/image";

interface newPost {
    id :number;
    caption: string;
    recentFiles: string[];}

export default function PostViewer({ id, caption, recentFiles = [] }:newPost) {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen transparent z-10 flex justify-center items-center">
            <div className="view-div">
                <div className="h-16 w-full overflow-y-scroll overflow-x-hidden flex-wrap">
                    <span className="font-bold">{caption}</span>
                </div>
            <div key={id} className="z-20 flex justify-center items-center w-[35rem] h-[35rem]">
                    <Carousel>
                    {recentFiles.map((src, index) => {
                        
                             return (
                                <Image
                                key={index}
                                    src={src}
                                    alt="Post image"
                                    width={700}
                                    height={700}
                                    className="object-contain max-w-full max-h-full"
                                />
                            )
                    })}
                    </Carousel>
            </div>
            </div>
            
        </div>
    );
}
