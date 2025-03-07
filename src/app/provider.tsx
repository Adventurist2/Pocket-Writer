"use client";

import { createContext, useContext, useState, ReactNode,useEffect } from "react";
const STORAGE_KEY:string = "storage:post";

interface PostObject {
  id:number;
  caption: string;
  recentFiles: string[];
}

interface AppContextType {
  post: PostObject[];  
  setPost: (newPost: PostObject) => void; 
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [post, setPost] = useState<PostObject[]>([]);

  useEffect(()=>{
      const savedPost = localStorage.getItem(STORAGE_KEY);
      if (savedPost) {
        setPost(JSON.parse(savedPost));
      }
   
  },[]);

  useEffect(() => {
    if (post.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(post));
    }
    console.log(post);
  }, [post]);

  const addPost = (newPost: PostObject) => {
    setPost((prevPosts) => [newPost, ...prevPosts]); //Pushing  the new post at the front of the array
  };

  return (
    <AppContext.Provider value={{ post, setPost: addPost }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
