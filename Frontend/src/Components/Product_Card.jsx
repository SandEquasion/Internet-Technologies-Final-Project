import {useNavigate } from "react-router-dom";
import { useState } from "react";
import Stars from "./Stars";
import Button from "./Button";

const Product_Card = ({
  image,
  brand,
  name,
  price,
  rating = 0,
  reviewCount = 0,
  onAddToBag,
  onClick,
  stock = 0,
  productId,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();
  const handleCardClick = () => {
    if (productId) navigate(`/product/${productId}`);
  };

  
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      className={`
        flex flex-col bg-background rounded-md overflow-hidden
        w-full cursor-pointer transition-all duration-150
        border-2 drop_shadow
        ${isHovered ? "border-secondary_1 shadow-lg" : "border-transparent shadow-sm "}
        active:scale-95
      `}
    >
      {/* Product image */}
      <div className="w-full h-48 bg-background p-4">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 p-3">

        <span className="text-primary text-xs font-medium">
          {brand}
        </span>

        <h3 className="text-primary font-bold text-sm leading-tight">
          {name}
        </h3>

        <span className="text-primary font-semibold text-sm">
          ${price}
        </span>

        {/* Stars + review count OR Add to Bag button on hover */}
        {isHovered ? (
          stock === 0 ? (
            // ← show out of stock instead of button
            <span className="text-center text-xs font-medium text-zinc-400 mt-1 py-2">
              Out of Stock
            </span>
          ) : (
            <Button
              variant="filled"
              onClick={(e) => {
                e.stopPropagation();
                if (onAddToBag) onAddToBag();
              }}
              className="w-full rounded-xl py-2 text-xs mt-1"
            >
              Add To Bag
            </Button>
          )
        ) : (
          <div className="flex items-center gap-1 mt-1">
            <Stars rating={rating} size={16} />
            <span className="text-neutral_3 text-xs">({reviewCount})</span>
          </div>
        )}

      </div>
    </div>
  );
};

export default Product_Card;