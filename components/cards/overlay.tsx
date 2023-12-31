'use client'

import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
type overlayProps = {
src:string
alt:string


}


function ImageOverlay({ src, alt }:overlayProps) {
    const [isOpen, setIsOpen] = useState(false);
  
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
  
    return (
      <>
      <Image
        src={src}
        alt={alt}
        onClick={handleOpen}
        width={75}
        height={75}
        className="w-full h-full aspect-w-16 aspect-h-9 object-contain border rounded-lg gap-3"
      />
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center border rounded-lg z-30"
          onClick={handleClose}
        >
          <div className="relative">
            <button
              className="absolute top-0 right-0 p-2 text-white"
              onClick={handleClose}
            >
              <X size={15} color="black" />
            </button>
            <Image width={500} height={500} src={src} alt={alt} />
          </div>
        </div>
      )}
    </>
    )    
  }

  export default ImageOverlay;
  