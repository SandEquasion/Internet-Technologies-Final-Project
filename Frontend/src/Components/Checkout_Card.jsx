import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Input_Field from "./Input_Field";

/**
 * Checkout_Card Component
 *
 * A 3-step checkout flow:
 * Step 1 - View Bag (items + total + coupon)
 * Step 2 - Enter Billing Details (address + card info)
 * Step 3 - View Summary (confirmation + print receipt)
 *
 * @param {Array} cartItems - Array of { name, price } objects
 * @param {function} [onPrintReceipt] - Callback for Print Receipt button
 */

const Checkout_Card = ({ cartItems = [], onCheckoutComplete }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // billing form state
  const [billing, setBilling] = useState({
    name: "",
    cardNumber: "",
    cvc: "",
    addressLine1: "",
    addressLine2: "",
    zipCode: "",
  });

  const updateBilling = (field) => (val) => {
    setBilling((prev) => ({ ...prev, [field]: val }));
  };

  // calculate total from cart items
  const total = cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  
  const printReceipt = () => {
    const receiptElement = document.getElementById("print-receipt");

    if (!receiptElement) {
      console.error("Receipt element not found");
      return;
    }

    const receiptContent = receiptElement.innerHTML;
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    iframe.contentDocument.write(`
      <html>
        <head>
          <title>Vera Beauty: Receipt</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: sans-serif; padding: 20px; font-size: 14px; color: #000; }
            h2 { text-align: center; margin-bottom: 16px; font-size: 18px; }
            h3 { text-align: center; margin-top: 16px; font-size: 14px; }
            .receipt-row { display: flex; justify-content: space-between; padding: 4px 0; }
            .receipt-total { display: flex; justify-content: space-between; padding: 8px 0; border-top: 1px solid #000; margin-top: 4px; font-weight: bold; }
            .receipt-title { text-align: center; font-weight: bold; margin-bottom: 8px; }
          </style>
        </head>
        <body>
          <h2>Vera Beauty</h2>
          <p class="receipt-title">Item List:</p>
          ${cartItems.map(item => `
            <div class="receipt-row">
              <span>${item.name}</span>
              <span>$${item.price.toFixed(2)}</span>
            </div>
          `).join("")}
          <div class="receipt-total">
            <span>Total:</span>
            <span>$${total}</span>
          </div>
          <h3>Thank you for shopping with us!</h3>
        </body>
      </html>
    `);

    iframe.contentDocument.close();

    setTimeout(() => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      document.body.removeChild(iframe);
    }, 500);
  };


  // ── Step Indicator ──────────────────────────────────────────────
  const steps = ["View Bag", "Enter Billing Details", "View Summary"];

  const Step_Indicator = () => (
    <div className="flex items-center justify-between w-full mb-6">
      {steps.map((label, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === currentStep;
        const isComplete = stepNum < currentStep;

        return (
          <div key={label} className="flex flex-col items-center gap-1 w-1/3">
            <div className={`
              w-4 h-4 rounded-full border-2 transition-all duration-300
              ${isActive
                ? "bg-secondary_1 border-secondary_1"
                : isComplete
                ? "bg-zinc-400 border-zinc-400"
                : "bg-zinc-300 border-zinc-300"
              }
            `} />
            <span className={`
              text-[10px] text-center font-medium transition-all duration-300
              ${isActive ? "text-secondary_1" : "text-zinc-400"}
            `}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );


  // ── Main render ─────────────────────────────────────────────────
    return (
        <div className="flex flex-col bg-background rounded-2xl drop_shadow p-6 w-80">

            {/* Step indicator - called as a component since it has no inputs */}
            <Step_Indicator />

            {/* Steps - rendered as JSX directly, not as components */}
            {currentStep === 1 && (
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                <div className="flex justify-between font-bold text-sm text-primary pb-1 border-b border-primary">
                    <span>Item</span>
                    <span>Price</span>
                </div>
                {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm text-secondary_1 py-0.5">
                    <span>{item.name}</span>
                    <span>${item.price.toFixed(2)}</span>
                    </div>
                ))}
                <div className="flex justify-between font-bold text-sm text-primary pt-2 border-t border-primary mt-1">
                    <span>Total</span>
                    <span>${total}</span>
                </div>
                </div>
                <div className="flex justify-center mt-2">
                <Button variant="filled" onClick={() => setCurrentStep(2)} className="px-5 py-3 rounded-xl text-sm">
                    Next
                </Button>
                </div>
            </div>
            )}

            {currentStep === 2 && (
            <div className="flex flex-col gap-3">
                {[
                    { label: "Name:", field: "name" },
                    { label: "Zip Code:", field: "zipCode" },
                    { label: "Address Line 2:", field: "addressLine2" },
                    { label: "Address Line 1:", field: "addressLine1" },
                    { label: "CVC:", field: "cvc" },
                    { label: "Card Number:", field: "cardNumber" }
                ].map(({ label, field }) => (
                <div key={field} className="flex items-center gap-3">
                    <span className="text-sm text-primary font-display w-36 flex-shrink-0">{label}</span>
                    <Input_Field
                    placeholder="..."
                    value={billing[field]}
                    onChange={updateBilling(field)}
                    className="w-full h-8 text-sm placeholder-secondary_1 placeholder-opacity-75"
                    />
                </div>
                ))}
                <div className="flex justify-center gap-4 mt-2">
                <Button variant="outlined" onClick={() => setCurrentStep(1)} className="px-5 py-3 rounded-xl text-sm">Previous</Button>
                <Button 
                    variant="filled" 
                    onClick={() => setCurrentStep(3)} 
                    className="px-5 py-3 rounded-xl text-sm"
                    disabled={!Object.values(billing).every(val => val.trim() !== "")}
                    >Next
                </Button>
                </div>
            </div>
            )}

            {currentStep === 3 && (
                <div className="flex flex-col gap-4">

                    {/* Printable area - given an id so we can target it for printing */}
                    <div id="print-receipt" className="flex flex-col gap-1">
                    <span className="font-bold text-sm text-primary text-center">Item List:</span>

                    {/* item name AND price */}
                    {cartItems.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm text-secondary_1">
                        <span>{item.name}</span>
                        <span>${item.price.toFixed(2)}</span>
                        </div>
                    ))}

                    <div className="flex justify-between font-bold text-sm text-primary pt-2 border-t border-primary mt-1">
                        <span>Total:</span>
                        <span>${total}</span>
                    </div>
                    </div>

                    <div className="text-center">
                    <p className="font-bold text-lg text-primary leading-snug">
                        Thank You For Shopping<br />With Us!
                    </p>
                    </div>

                    <div className="flex justify-center gap-3 mt-1">
                    <Button
                        variant="outlined"
                        onClick={() => printReceipt()}
                        className="px-5 py-3 rounded-xl text-sm"
                    >
                        Print Receipt
                    </Button>
                    <Button
                      variant="filled"
                      onClick={() => {
                        if (onCheckoutComplete) onCheckoutComplete(); // ← clear cart
                        navigate("/");
                      }}
                      className="px-5 py-3 rounded-xl text-sm"
                    >
                      Back to Home
                    </Button>
                    </div>

                </div>
            )}

        </div>
    );
};

export default Checkout_Card;