import React, { useEffect } from "react";
import Button from "./Button";

const Cart_Confirmation_Modal = ({ isOpen, onClose, productName }) => {
  // auto close after 3 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-background rounded-2xl p-8 drop_shadow flex flex-col items-center gap-4 w-80">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-green-600 text-2xl">✓</span>
        </div>
        <h3 className="font-display text-primary text-h4 font-bold text-center">
          Added to Bag!
        </h3>
        <p className="font-sans text-secondary_1 text-b2 text-center">
          {productName} has been added to your bag
        </p>
        <div className="flex gap-3 w-full">
          <Button
            variant="outlined"
            onClick={onClose}
            className="flex-1 py-2 rounded-xl text-sm"
          >
            Continue Shopping
          </Button>
          <Button
            variant="filled"
            onClick={() => window.location.href = "/cart"}
            className="flex-1 py-2 rounded-xl text-sm"
          >
            View Bag
          </Button>
        </div>
      </div>
    </>
  );
};

export default Cart_Confirmation_Modal;