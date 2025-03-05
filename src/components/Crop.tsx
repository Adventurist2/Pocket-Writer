"use client";
import React,{ useState,useRef } from "react";
import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
    PixelCrop,
    convertToPixelCrop,
  } from 'react-image-crop';

  function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
  ) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        aspect,
        mediaWidth,
        mediaHeight,
      ),
      mediaWidth,
      mediaHeight,
    )
  }

  export function ImageCrop(){
    const [src,setSrc]  =useState<string>("");
    const [crop,setCrop] = useState<Crop>();
    const [completedCrop,setCompletedCrop] = useState<PixelCrop>();
    const [rotate,setRotate] = useState<number>(0);
    const [aspect,setAspect] = useState<number>(16/9);

    function onSelectedFile(e){
        if(e.target.files&&e.target.files.length>0){
            setCrop(undefined);
            const reader = new FileReader();
            reader.addEventListener("load",()=>{
                setSrc(reader.result as string||"");
            })
            //previewing the selected image;
            reader.readAsDataURL(e.target.files[0]);
        }

    }

    const onImageLoaded = (e)=>{
        if(aspect){
            const {width,height} = e.currentTarget;
            setCrop(centerAspectCrop(width,height,aspect));
        }
    }

    
  }
