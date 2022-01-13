import React, { useState } from 'react';
import Image from 'next/image';

interface ImageFallbackProps {
  src: string
  alt: string
  fallbackSrc: string
  layout?: "fixed" | "fill" | "intrinsic" | "responsive"
  objectFit?: NonNullable<JSX.IntrinsicElements['img']['style']>['objectFit']
  height?: number
  width?: number
  className?: string
}

const ImageFallback = (props: ImageFallbackProps) => {
  const { src, fallbackSrc, className, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(false);
  const [oldSrc, setOldSrc] = useState(src);

  if (oldSrc !== src) {
    setImgSrc(false);
    setOldSrc(src);
  }

  return (
    <Image
      {...rest}
      src={imgSrc ? fallbackSrc : src}
      onError={() => {
        fallbackSrc && setImgSrc(true);
      }}
      className={className}
    />
  );
};

export default ImageFallback;