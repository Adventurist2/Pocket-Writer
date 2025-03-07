import React from "react";
// import { useRecoilState } from "recoil";
// import { handleDeleteAtom } from "@/lib/store/atoms/atoms";

interface FileBoxProps {
  s: string;
  index: number;
}

export default function FileBox({ s,index }: FileBoxProps): React.ReactNode {
    
  return <div key={index} className="bg-gray-200 p-2 m-2 text-black">
    {s.slice(0, 50)}
    <button className=" cursor-pointer bg-gray-400 p-2 m-2 text-black" onClick={()=>{
        // handleDeleteAtom(index);
    }}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>
  </div>;
}
