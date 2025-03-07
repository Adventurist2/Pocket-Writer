"use server";

import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "public", "postArray.json");

interface newPost {
  id :number;
  caption: string;
  recentFiles: string[];
}

export async function readPosts() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    console.log(data);
    const parsedData = JSON.parse(data);
    const flatPosts = parsedData.flat().filter(post => typeof post === "object" && post !== null);
    // console.log(flatPosts);
    return flatPosts;
  } catch (error) {
    console.error("Error reading posts:", error);
    return []; 
  }
}

export async function savePost(newPost:newPost) {
  try {
    const posts = await readPosts(); 
    posts.unshift(newPost); 
    await fs.writeFile(filePath,JSON.stringify([], null, 2), "utf-8");
    await fs.writeFile(filePath, JSON.stringify(posts, null, 2), "utf-8");
    return { success: true, message: "Post saved successfully" };
  } catch (error) {
    console.error("Error saving post:", error);
    return { success: false, message: "Failed to save post" };
  }
}
