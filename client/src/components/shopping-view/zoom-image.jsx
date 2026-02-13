import React from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

function ZoomImage({ imageUrl }) {
  return (
    <div className="flex justify-center">
      <InnerImageZoom
        src={imageUrl}
        zoomSrc={imageUrl}
        zoomScale={2} // Adjust zoom level
        zoomType="hover" // Change to "click" for click zoom
        className="rounded-lg shadow-lg"
      />
    </div>
  );
}

export default ZoomImage;
