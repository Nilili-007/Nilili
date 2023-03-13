import { useState, useEffect } from "react";

interface ProgressiveImgType {
  className: string;
  src: string;
  placeholderSrc: string;
  alt: string;
}

const ProgressiveImg = ({
  placeholderSrc,
  src,
  ...props
}: ProgressiveImgType) => {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
  const customClass =
    placeholderSrc && imgSrc === placeholderSrc ? "loading" : "loaded";

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
    };
  }, [src]);

  return (
    <img
      {...{ src: imgSrc }}
      alt={props.alt || ""}
      className={`${props.className} image ${customClass}`}
    />
  );
};
export default ProgressiveImg;
