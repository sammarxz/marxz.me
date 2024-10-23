"use client";

import { useState } from "react";
import { toast } from "sonner";

import { InputSpotlightBorder } from "./core/input-spotlight-border";

import { Checkbox } from "./ui/checkbox";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Submitted email:", email);
    toast("subscribed");
    setEmail("");
  };

  return (
    <form
      onSubmit={handleNewsletterSubmit}
      className="w-full max-w-xl mx-auto flex flex-col items-center justify-center gap-4"
    >
      <div className="w-full flex flex-col md:flex-row gap-4">
        <InputSpotlightBorder
          type="email"
          placeholder="Enter your email address..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-grow w-full flex-2"
        />
        <button
          type="submit"
          className="relative inline-flex h-12 w-full md:max-w-fit items-center justify-center rounded-md bg-white px-6 font-medium text-gray-950 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
        >
          <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur" />
          Download Free chapter
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="subscribe" />
        <label
          htmlFor="subscribe"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I agree to receive newsletter emails
        </label>
      </div>
    </form>
  );
}
