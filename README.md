This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Description
Postify is a modern and responsive Next.js-based social media post viewer that allows users to browse and interact with image-based posts. It features a smooth carousel-based image viewer and ensures an optimal viewing experience across devices.

## Getting Started

Install the required depencies
```bash
git clone https://github.com/Adventurist2/Pocket-Writer.git
cd Pocket-Writer
npm install  # or yarn install
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000)  with your browser to see the result.

## **Adding Images**  

To create a new post in **Postify**, follow these steps:  

1. **Click on "Create New Post"** – This will open the post creation interface.  
2. **Upload Images or Provide Image Links** – You can either upload photos from your device or enter image URLs to fetch images.  
3. **Add a Caption** – Write a caption to accompany your post.  
4. **Submit the Post** – Click on the submit button to add your post to the feed.  
5. **View Your Post** – Once uploaded, your post will appear in the feed. Click on the image to open a **full-screen viewer**, where you can browse all images in the post along with the caption.  

## **Storage Mechanism**  

**Postify** utilizes both **local storage** and the **local file system** to manage images and related inputs efficiently:  

- **Local Storage**: Stores data such as image URLs, captions, and post details to ensure quick retrieval.  
- **Local Computer Memory**: Handles uploaded images, allowing seamless access and display within the app.  

This approach ensures that posts persist even after a page refresh, providing a smooth user experience.  


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
