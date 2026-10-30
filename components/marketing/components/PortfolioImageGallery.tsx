"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { X, Maximize2 } from "lucide-react";
import styles from "./Portfolio.module.css";

export function PortfolioImageGallery({ images, projectName }: { images: string[]; projectName: string }) {
  const [activeImage, setActiveImage] = useState(images[0]);
  const dialog = useRef<HTMLDialogElement>(null);

  return <>
    <div className={styles.gallery} data-count={images.length}>
      {images.map((image, index) => <button className={styles.galleryTile} type="button" key={image} aria-label={`Perbesar gambar ${index + 1} proyek ${projectName}`} aria-haspopup="dialog" onClick={() => { setActiveImage(image); dialog.current?.showModal(); }}>
        <Image src={image} alt={`Detail tampilan ${projectName}, gambar ${index + 1}`} fill sizes="(max-width: 700px) 90vw, 50vw" unoptimized={image.startsWith('/api/')} /><span><Maximize2 size={17} aria-hidden="true" /></span>
      </button>)}
    </div>
    <dialog ref={dialog} className={styles.lightbox} aria-label={`Preview gambar proyek ${projectName}`} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <button className={styles.close} onClick={() => dialog.current?.close()} type="button" aria-label="Tutup preview gambar"><X size={22} aria-hidden="true" /></button>
      <div className={styles.lightboxImage}><Image src={activeImage} alt={`Tampilan lengkap proyek ${projectName}`} fill sizes="95vw" unoptimized={activeImage.startsWith('/api/')} /></div>
    </dialog>
  </>;
}
