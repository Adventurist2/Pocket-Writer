"use client";
import { useAppContext } from "@/app/provider";
import { useEffect, useState } from "react";
import Post from "./ui/post";

export default function Main() {
    const { post } = useAppContext();
    const [, setRefresh] = useState(false);

    useEffect(() => {
        setRefresh((prev) => !prev);
    }, [post]);

    return (
        <div className="h-[90vh] w-screen relative overflow-x-hidden flex justify-center sm:px-4">
            {post.length === 0 ? (
                <p className="text-gray-500 text-center w-full h-full flex justify-center items-center font-bold">
                    No posts available
                </p>
            ) : (
                <main className="custom w-full max-w-6xl">
                    {post.map((p) => (
                        <Post key={p.id} id={p.id} caption={p.caption} recentFiles={p.recentFiles} />
                    ))}
                </main>
            )}
        </div>
    );
}
