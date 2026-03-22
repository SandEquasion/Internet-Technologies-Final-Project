import Button from "./Button";
import Quantity_Selector from "./Quantity_Selector";

/**
 * Cart_Item Component
 *
 * @param {string} image          - Product image URL
 * @param {string} brand          - Brand name
 * @param {string} itemName       - Product name
 * @param {string} description    - Short product description
 * @param {number} [initialQty=1] - Starting quantity
 * @param {number} [maxQty=99]    - Maximum quantity allowed
 * @param {function} [onRemove]   - Callback when Remove is clicked
 * @param {function} [onQuantityChange] - Callback when quantity changes
 */
const Cart_Item = ({
  image,
  brand,
  itemName,
  description,
  initialQty = 1,
  maxQty = 99,
  onRemove,
  onQuantityChange,
}) => {

  return (
    <div className="flex h-min items-center gap-4 bg-background rounded-2xl p-4 drop_shadow">

      {/* Product image */}
      <div className="w-20 h-40 flex-shrink-0">
        <img
          src={image}
          alt={itemName}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Middle content */}
      <div className="flex flex-col flex-1 justify-center">

        <span className="text-h4 text-primary font-display">
          {brand}
        </span>

        <h3 className="text-primary font-display text-h3 leading-tight">
          {itemName}
        </h3>

        <p className="text-primary text-xs leading-relaxed line-clamp-2 mb-3">
          {description}
        </p>

        {/* Reusing your existing Quantity_Selector component */}
        <Quantity_Selector
          min={1}
          max={maxQty}
          initialQty={initialQty}
          onChange={onQuantityChange}
        />

      </div>

      {/* Remove button */}
      <div className="flex-shrink-0 self-center ml-2">
        <Button
          variant="filled"
          onClick={onRemove}
          className="px-5 py-3 rounded-xl text-h4"
        >
          Remove
        </Button>
      </div>

    </div>
  );
};

export default Cart_Item;