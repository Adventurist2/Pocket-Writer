"use server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";

//storingImages function is used to store images in the public/uploaded directory
export default async function storingImages(formData: FormData) {
    const recentFiles: string[] = [];
    const files = formData.getAll("files") as File[];
    const caption = formData.get("caption") as string;
    

    const num = Date.now(); 

    for (const file of files) {
        if (!file) continue;

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadDir = path.join(process.cwd(), "public/uploaded");
        await mkdir(uploadDir, { recursive: true });

        const uniqueFileName = `${num}-${file.name}`; 
        const filePath = path.join(uploadDir, uniqueFileName);

        await writeFile(filePath, buffer);
        recentFiles.push(`/uploaded/${uniqueFileName}`);
    }
    const uploadedObj = { caption, recentFiles }; 

    return uploadedObj; 
}

//getImage function is used to get the image from the url
export async function getImage(url: string) {
    const uploadDir = path.join(process.cwd(), "public", "uploaded");

    const timestamp = Date.now();

    async function downloadImage(url: string, dest: string) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch the image");
        }

        const file = await response.blob();
        const buffer = await file.arrayBuffer();
        const bufferData = Buffer.from(buffer);

        const fileExtension = path.extname(url).split("?")[0] || ".jpg"; 
        const filename = `${timestamp}${fileExtension}`;
        const filepath = path.join(dest, filename);

        await writeFile(filepath, bufferData);

        return `/uploaded/${filename}`; 
    }

    return await downloadImage(url, uploadDir);
}
