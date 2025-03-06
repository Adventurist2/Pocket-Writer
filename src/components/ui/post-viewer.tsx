import React from "react";
import { Carousel } from "./Carousel";
import Image from "next/image";

export default function PostViewer({ id, caption, recentFiles = [] }) {
    return (
        <div className="view-div fixed top-0 left-0 w-screen h-screen transparent z-10 flex justify-center items-center">
            <p>{caption}</p>
            <div className="z-20 flex justify-center items-center w-[35rem] h-[35rem]">
                    <Carousel>
                    {recentFiles.map((src, index) => {
                        
                             return (
                                <Image
                                key={index}
                                    src={src}
                                    alt="Post image"
                                    width={800}
                                    height={700}
                                    className="object-contain max-w-full max-h-full"
                                />
                            )
})}
                    </Carousel>
            </div>
        </div>
    );
}
