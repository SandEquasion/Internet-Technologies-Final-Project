import { useState, useEffect } from "react";
import Add_Button_Link from "./Add_Button";
import Minus_Button_Link from "./Minus_Button";

function Quantity_Selector({ min = 1, max = 99, initialQty = 1, onChange }) {
  const [quantity, setQuantity] = useState(initialQty);

  // ← sync with initialQty if it changes from outside
  useEffect(() => {
    setQuantity(initialQty);
  }, [initialQty]);

  const handleAdd = () => {
    if (quantity < max) {
      const newQty = quantity + 1;
      setQuantity(newQty);
      if (onChange) onChange(newQty);
    }
  };

  const handleMinus = () => {
    if (quantity > min) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      if (onChange) onChange(newQty);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex items-center gap-2">
        <Minus_Button_Link mode="button" onClick={handleMinus} />
        <span className="text-primary font-semibold text-sm min-w-[1.25rem] text-center">
          {quantity}
        </span>
        <Add_Button_Link mode="button" onClick={handleAdd} />
        {quantity === max && (
          <span className="text-xs text-secondary_1 font-medium">Max reached</span>
        )}
      </div>
    </div>
  );
}

export default Quantity_Selector;