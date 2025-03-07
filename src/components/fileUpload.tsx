"use client"
import { useState,useRef } from "react";
import storingImages from "@/lib/serve";
import { useAppContext } from "@/app/provider";
import { useRouter } from "next/navigation";
import { getImage } from "@/lib/serve";
interface FileBoxProps {
    s: string;
    index: number;
  }
export default function FileUpload() {

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
    
        const handleCaptionChange = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
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
        
              <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
                <button
                    className="cursor-pointer fixed top-10 right-10 bg-red-600 hover:bg-red-500 text-white font-semibold p-2 rounded-full w-10 h-10 flex justify-center items-center shadow-md transition duration-300 ease-in-out transform hover:scale-110"
                    onClick={(e) => {
                        e.preventDefault();
                        router.push("/");
                    }}
                    >
                    ✖
                    </button>

                <div className="w-full max-w-2xl bg-gray-800 rounded-xl p-6 shadow-lg">
                  <h2 className="text-lg font-semibold mb-4 text-center">Upload Files</h2>
                  <form onSubmit={fetchImage} className="flex m-3 items-center gap-4 mt-4">
                        <label className="text-white font-semibold">Image URL</label>
                        <input
                            value={imageURL}
                            type="text"
                            placeholder="Enter image URL"
                            onChange={handleImageURL}
                            className="w-64 p-2 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-lg cursor-pointer bg-green-600 hover:bg-green-500 text-white font-semibold shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Fetch
                        </button>
                        </form>
                    <p className="w-full text-center m-1">or</p>
                  <div className="flex gap-4">
                    
                    {/* Drag and Drop Box */}
                    <div
                     className="w-1/2 h-[15rem] border-2 border-dashed border-gray-500 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700"
                     onDrop={(e)=>{handleDrop(e)}}
                        onDragOver={(e)=>{e.preventDefault()}}
                     >
                        <input className="h-[25rem] w-[25rem] bg-blue-300 " type="file"
                            style={{display: "none"}}
                             ref = {fileInputRef}
                             onChange={handleFileChange}/>
                      <svg className="w-12 h-12 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V12M17 16V12M3 12l9-9 9 9M4 21h16" />
                      </svg>
                      <p className="mt-2 text-sm">Drag and Drop the files</p>
                      <p className="text-xs text-gray-400">or</p>
                      <button className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm" onClick={handleUploadButtonClick}>Upload Files</button>
                    </div>
                    
                    {/* Uploaded Files List */}
                    <div className="w-1/2 h-[15rem] bg-gray-700 rounded-lg p-6 flex items-center justify-center overflow-y-scroll overflow-x-hidden">
                            {(files.length>0)? <div>{files.map((file,index)=>{
                            return <FileBox key={index} index = {index} s={file.name ?? "Untitled"} />
                            })} </div>: <p className="text-gray-400">No Files Uploaded Yet</p>}
                    </div>
                  </div>
                  
                  {/* Caption Input Field */}
                  <div className="mt-4">
                    <div className="flex gap-4 items-center">
                    <label className="block text-sm ">Caption</label>
                    {(caption)? <p className="text-xs text-green-500">Caption Submitted</p>: null}
                    </div>
                    <textarea value = {captionInput} className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24 overflow-y-auto" placeholder="Enter caption..." onChange={handleCaptionChange}></textarea>
                    <button
                        className="cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={handleCaptionSubmit}
                        >
                            Submit Caption
                            </button>
                  </div>
                  
                  {/* Save Button */}
                  {error && <p className="w-full text-center text-red-500">{error}</p>}
                  <form onSubmit={handleSubmit} className="mt-4 flex justify-center">
                    <button className="cursor-pointer px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm">Submit</button>
                  </form>
                </div>
              </div>
            );
          
    
  }
  