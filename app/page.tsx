'use client';

import { motion } from "framer-motion";

import { CardStack } from "@/components/card-stack";
import { ProfileCard } from "@/components/profile-card";
import { PulsatingCircle } from "@/components/pulsating-circle";

export default function Home() {
  return (
    <motion.main
      className="flex min-h-screen items-center justify-center relative px-4"
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="w-full space-y-2">
        {/* ProfileCard centralizado */}
        <div className="max-w-lg mx-auto relative">
          <ProfileCard />
          <div className="w-full flex items-baseline justify-between mt-8">
            <h2 className="font-mono uppercase text-xs text-white/60 tracking-wider">
              Selected Projects
            </h2>
            <div className="flex items-center gap-2">
              <PulsatingCircle />
              <h3 className="text-white/40 text-sm">Available for work</h3>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[550px] mx-auto h-[150px]">
          <CardStack />
        </div>
      </div>
    </motion.main>
  );
}
