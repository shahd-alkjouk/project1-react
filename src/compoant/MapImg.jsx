import React from "react";

const MapImage = ({ imageSrc }) => {
  const handleMouseMove = (e) => {
    const zoom = 1.25
    const img = e.currentTarget.querySelector("img");
    const { offsetX, offsetY } = e.nativeEvent;

    const moveX = (offsetX - img.clientWidth / 2) / 12;
    const moveY = (offsetY - img.clientHeight / 2) / 12;

    img.style.transform = `scale(${zoom}) translate(${moveX}px, ${moveY}px)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.querySelector("img").style.transform =
      "scale(1) translate(0, 0)";
  };

  return (
    <div
      className="map-image-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img src={imageSrc} alt="Map Design" />
    </div>
  );
};

export default MapImage;