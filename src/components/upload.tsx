"use client";
import { useState,useRef } from "react";
import storingImages from "@/lib/serve";
import { useAppContext } from "@/app/provider";
import { useRouter } from "next/navigation";
import { getImage } from "@/lib/serve";
interface FileBoxProps {
    s: string;
    index: number;
  }

export function Upload(){
    const router = useRouter();
    const [files,setFiles] = useState<File[]>([]);
    const [error,setError] = useState<string>("");
    const {post,setPost} = useAppContext();
    const [captionInput,setCaptionInput] = useState<string>("");
    const [caption,setCaption] = useState<string>("");
    const [imageURL,setImageURL] = useState<string>("");
    const acceptedFileTypes:string[] = ["jpeg","png","jpg"];
    const regexFileTypes = acceptedFileTypes.join("|");
    const fileRegex = new RegExp(`^.*\\.(${regexFileTypes})$`, "i");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleUploadButtonClick  = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        fileInputRef.current?.click();
                   
    }
    let hasError = false;
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return; 
    
        const newFiles: File[] = Array.from(e.target.files);
    
        validation(newFiles);
        if (hasError) return;
    
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        setError("");
    };
    

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(files.length > 0){
            if(!caption){
                setError("Caption cannot be empty");
                hasError = true;
                return;
            }
            const formData = new FormData();
            files.forEach((file)=>{
                formData.append("files",file);
            })
            formData.append("caption",caption);
            const result = await storingImages(formData);
            const newPost = {
                id: post.length + 1, // ✅ Sequential ID
                caption:result.caption,
                recentFiles:result.recentFiles,
              };
            setPost(newPost);
            console.log(newPost);
        }  
        else{
            setError("No files selected");
            hasError = true;
            return;
        }
        setFiles([]);
        router.push("/");
    }


    async function fetchImage(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(!caption){
            setError("Caption cannot be empty");
            setImageURL("");
            hasError = true;
            return;
        }
        const resp = await getImage(imageURL);
        console.log(resp);
        const newPostURL = {
            id: post.length + 1, 
            caption:caption,
            recentFiles:[resp],
          };
        setPost(newPostURL);
        setImageURL("");
        router.push("/");
    }
    
    const handleImageURL = (e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        setImageURL(e.target.value);
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const newFiles:File[] = Array.from(e.dataTransfer.files);
        validation(newFiles);
        if(hasError) return;
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        setError(""); 
    }

    const validation = (newfilearray:File[])=>{
        newfilearray.forEach((file)=>{
            if(file.size > 1024 * 1024){
                setError("File size should be less than 1MB");
                hasError = true;
                return;}

            if(!fileRegex.test(file.name)){
                setError("File type not supported , use jpeg,png,jpg"); 
                hasError = true;
                return;
            }
            files.some((f)=>{
                if(f.name === file.name){
                    setError("File already exists");
                hasError = true;
                    return;
                }
            })
        });
        
        
    }

    const handleCaptionChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        setCaptionInput(e.target.value);
    }

    const handleCaptionSubmit = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        setCaption(captionInput);
        setCaptionInput("");

    }

    function FileBox({ s,index }: FileBoxProps): React.ReactNode {
        const handleDelete= (index:number) => {
            files.splice(index,1);
            setFiles([...files]);
        }
        
      return <div className="bg-gray-200 p-2 m-2 text-black">
        
        {s.slice(0, 50)}
        <button className=" cursor-pointer bg-gray-400 p-2 m-2 text-black" onClick={()=>{
            handleDelete(index);
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
      </div>;
    }

    return (
        <div>
            <div className="flex ">
            <h1>Upload</h1>
            <button 
            className="cursor-pointer bg-white text-black p-4"
            onClick={(e)=>{
                e.preventDefault();
                router.push("/");
            }}>X</button>
            </div>
            
            <div className="flex bg-teal-300 ">
            <div
             className="flex bg-slate-400 h-68 w-96  justify-center items-center"
             onDrop={(e)=>{handleDrop(e)}}
             onDragOver={(e)=>{e.preventDefault()}}
             >
                <input className="h-[25rem] w-[25rem] bg-blue-300 " type="file"
                    style={{display: "none"}}
                    ref = {fileInputRef}
                 onChange={handleFileChange}/>
                {error && <p>{error}</p>}
                <button className="bg-white text-black p-4 cursor-pointer h-10 w-20 flex justify-centre items-center" onClick={handleUploadButtonClick}>Upload</button>
            </div>
            <div className="flex ">
                {(files.length>0)? <div>{files.map((file,index)=>{
                    return <FileBox key={index} index = {index} s={file.name ?? "Untitled"} />
                })} </div>: <p className="text-black">No files selected</p>}
            </div>
                <div>
                    <input value = {captionInput}className="bg-black" type="text" placeholder="input caption" onChange={handleCaptionChange}></input>
                </div>
                <button className="cursor-pointer bg-gray-500" onClick={handleCaptionSubmit}>Submit Caption</button>
            </div>
            
            <form onSubmit={handleSubmit}>
                <button 
                    className="bg-white text-black p-4 cursor-pointer h-10 w-20 flex justify-center items-center"
                    type="submit"
                >
                    Submit
                </button>
            </form>
            <form onSubmit={fetchImage}>    
                <label>Image URL</label>
                <input value = {imageURL} type="text" placeholder="Enter image URL" onChange={handleImageURL}></input>
                <button className="cursor-pointer" type="submit">Fetch</button>
            </form>
        </div>
    )

}