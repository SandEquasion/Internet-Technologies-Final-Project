import { useState } from "react";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Instagram_Icon_Link from "./Instagram_Icon_Link";
import Facebook_Icon_Link from "./Facebook_Icon_Link";
import Twitter_Icon_Link from "./Twitter_Icon_Link";
import TikTok_Icon_Link from "./TikTok_Icon_Link";
import Logo_Icon_Link from "./Logo_Icon_Link";
import Input_Field from "./Input_Field";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);



  
  const customerServiceLinks = [
    "Email: customerservice@vera.com",
    "Call Us: +1 (234) 567-890",
    "Terms of Use",
    "Privacy Policy",
    "Return Policy",
    "Frequently Asked Questions",
    "Order Status",
  ];

  const helpLinks = [
    "Billing",
    "Shipping",
    "Store Locations",
    "Payment Plans",
  ];

  return (
    <footer className="w-full bg-background px-10 py-8 top_shadow">
      <div className="flex flex-col md:flex-row justify-between gap-8">

        {/* ── Column 1: Newsletter signup ── */}
        <div className="flex flex-col gap-4 w-full md:w-[30%]">

          {/* Heading */}
          <div className="flex flex-col">
            <h2 className="font-display text-h3 text-secondary_1">
              Keep Up With the Newest Deals
            </h2>
            <p className="font-sans text-b2 text-secondary_1">
              Sign up to receive exclusive deals
            </p>
          </div>

          {/* Email input */}
          <Input_Field
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={setEmail}
            className="placeholder:text-secondary_2 text-b2 w-full"
          />

          {/* Phone input */}
          <Input_Field
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={setPhone}
            className="placeholder:text-secondary_2 text-b2 w-full"
          />
          

          {/* Checkbox + legal text */}
          <div className="flex flex-row items-start gap-2">
            <div className="mt-0.5 flex-shrink-0">
              <Checkbox checked={agreed} onChange={setAgreed} />
            </div>
            <p className="text-secondary_1 font-sans text-b3 leading-relaxed">
              By subscribing to <span className="font-display text-secondary_1 text-h4">Vera</span>, you agree to our{" "}
              <span className="underline cursor-pointer">Terms of Use</span> and{" "}
              <span className="underline cursor-pointer">Privacy Policy</span>. You consent to receive a varying
              number of marketing messages via email and text. Consent is not required for purchase.
              Message and data rates may apply. Text HELP for help or STOP to cancel.
            </p>
          </div>

          {/* Submit button */}
          <div className="flex">
            <Button
              variant="filled"
              disabled={!agreed}
              className="px-5 py-2 rounded-xl text-h3"
            >
              Submit
            </Button>
          </div>

        </div>

        {/* ── Column 2: Customer Service ── */}
        <div className="flex flex-col gap-3">
          <h3 className="font-display text-h3 text-secondary_1 font-bold">
            Customer Service
          </h3>
          {customerServiceLinks.map((link) => (
            <button
              key={link}
              onClick={() => {}}
              className="
                text-left font-display text-b2 text-primary
                hover:text-secondary_1
                active:text-secondary_3 active:scale-95
                transition-all duration-150 inline-block
                w-fit
              "
            >
              {link}
            </button>
          ))}
        </div>

        {/* ── Column 3: Help ── */}
        <div className="flex flex-col gap-3">
          <h3 className="font-display text-h3 text-secondary_1 font-bold">
            Help
          </h3>
          {helpLinks.map((link) => (
            <button
              key={link}
              onClick={() => {}}
              className="
                text-left font-display text-b2 text-primary
                hover:text-secondary_1
                active:text-secondary_3 active:scale-95
                transition-all duration-150 inline-block
                w-fit
              "
            >
              {link}
            </button>
          ))}
        </div>

        {/* ── Column 4: Logo + social icons ── */}
        <div className="flex flex-col items-center justify-between">

          {/* Logo + tagline */}
          <div className="flex flex-col items-center gap-1">
            <Logo_Icon_Link/>
          </div>

          {/* Social icons */}
          <div className="flex flex-row items-center lg:gap-3 sm:gap-2 md:gap-3 mt-6">
            <Instagram_Icon_Link />
            <Facebook_Icon_Link />
            <Twitter_Icon_Link />
            <TikTok_Icon_Link />
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
