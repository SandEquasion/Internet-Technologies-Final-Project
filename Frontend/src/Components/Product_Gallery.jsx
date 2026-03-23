import { useState } from "react";

/**
 * Product_Gallery Component
 *
 * @param {string[]} images - Array of image URLs
 * @param {string} alt      - Alt text for the images
 */

const Product_Gallery = ({ images = [], alt = "Product image" }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  if (images.length === 0) return null;

  return (
    <div className="flex flex-row gap-4 w-full sm:w-[50vw] lg:w-[30vw] h-64 sm:h-80 lg:h-[50vh] rounded-2xl overflow-hidden bg-background drop_shadow">


      {/* Thumbnail strip - vertical column on the right */}
      <div className="flex flex-col gap-1.5 py-1 pr-1 overflow-y-auto">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`
              w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden
              border-2 transition-all duration-150
              ${selectedImage === image
                ? "border-secondary_1 border-2 opacity-100"     // selected thumbnail
                : "border-transparent opacity-60 hover:opacity-100"  // unselected
              }
            `}
          >
            <img
              src={image}
              alt={`${alt} thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Large main image - takes up most of the space */}
      <div className="flex-1 h-full">
        <img
          src={selectedImage}
          alt={alt}
          className="w-full h-full object-contain transition-all duration-300 drop_shadow"
        />
      </div>

    </div>
  );
};

export default Product_Gallery;