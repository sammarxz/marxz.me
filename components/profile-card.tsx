"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export function ProfileCard() {
  const [showStories, setShowStories] = useState(false);
  const [currentStory, setCurrentStory] = useState(0);
  const [stories, setStories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const storyUrls = Array.from(
      { length: 11 },
      (_, i) => `/stories/${i + 1}.jpeg`
    );
    setStories(storyUrls);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!showStories) return;

    const storyDuration = 5000
    const interval = 100
    const progressIncrement = (interval / storyDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + progressIncrement;

        if (newProgress >= 100) {
      
          if (currentStory < stories.length - 1) {
            setCurrentStory((prev) => prev + 1);
            return 0;
          } else {
        
            setShowStories(false);
            return 0;
          }
        }

        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [showStories, currentStory, stories.length]);

  useEffect(() => {
    if (!showStories) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && currentStory > 0) {
        setCurrentStory((prev) => prev - 1);
        setProgress(0);
      } else if (e.key === "ArrowRight" && currentStory < stories.length - 1) {
        setCurrentStory((prev) => prev + 1);
        setProgress(0);
      } else if (e.key === "Escape") {
        setShowStories(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showStories, currentStory, stories.length]);

  const handleStoryClick = (e: React.MouseEvent) => {
    const { clientX } = e;
    const { innerWidth } = window;

    if (clientX < innerWidth / 2 && currentStory > 0) {
      setCurrentStory((prev) => prev - 1);
      setProgress(0);
    } else if (clientX >= innerWidth / 2 && currentStory < stories.length - 1) {
      setCurrentStory((prev) => prev + 1);
      setProgress(0);
    }
  };

  return (
    <>
      <header className="flex flex-col gap-8">
        <div className="flex items-center justify-between w-full relative z-20">
          <div className="flex items-center gap-4">
            <motion.div
              className="w-12 h-12 rounded-2xl bg-secondary cursor-pointer relative"
              onClick={() => setShowStories(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: .9 }}
            >
              <div className="absolute inset-0 rounded-full -m-0.5 p-0.5 bg-gradient-to-tr from-yellow-500 via-red-500 via-purple-500 to-blue-500 -z-10" />
              <Image
                src="/profile-sammarxz.jpg"
                alt="Sam Marxz profile picture"
                width={32}
                height={32}
                className="w-full h-full object-cover border rounded-full border-black"
              />
            </motion.div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <h1 className="text-lg font-semibold text-white/80">Sam Marxz</h1>
                <Image src="/verified.svg" alt="instagram verified" width={18} height={18} />
              </div>
              <p className="text-sm text-white/60">
                Designer &amp;&amp; Developer
              </p>
            </div>
          </div>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            href="https://linktr.ee/sammarxz" 
            target="_blank" 
            className="group relative flex h-12 w-12 items-center justify-center 
            overflow-hidden rounded-lg p-[6px] 
            transition-shadow ease-out bg-black 
            shadow-lg shadow-inner-shadow-dark-float border border-white/10">
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </div>
        <p className="text-xl leading-relaxed text-white/80">
          I&apos;m Sam Marxz, a brazilian designer and developer with over 6
          years of experience. I specialise in interface design for mobile and
          web-based applications with a focus on simplicity &amp; usability.
        </p>
      </header>

      {/* Stories modal */}
      <AnimatePresence>
        {showStories && (
          <motion.div
            className="fixed inset-0 h-screen z-[999] bg-black/70 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowStories(false)}
          >
            {/* Stories container */}
            <div
              className="relative w-full max-w-md h-[800px] overflow-hidden rounded-2xl"
              onClick={(e) => {
                e.stopPropagation();
                handleStoryClick(e);
              }}
            >
              {/* Progress bars */}
              <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
                {stories.map((_, index) => (
                  <div
                    key={index}
                    className="h-1 bg-white/30 rounded-full flex-1 overflow-hidden"
                  >
                    {index === currentStory && (
                      <motion.div
                        className="h-full bg-white"
                        style={{ width: `${progress}%` }}
                      />
                    )}
                    {index < currentStory && (
                      <div className="h-full bg-white w-full" />
                    )}
                  </div>
                ))}
              </div>

              {/* User info */}
              <div className="absolute top-8 left-4 flex items-center gap-2 z-[999]">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src="/profile-sammarxz.jpg"
                    alt="Sam Marxz"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-white font-medium">Sam Marxz</p>
              </div>

              {/* Story image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStory}
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {!loading && (
                    <Image
                      src={stories[currentStory]}
                      alt={`Story ${currentStory + 1}`}
                      width={640}
                      height={1138}
                      className="w-full h-full object-cover"
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation buttons (invisible but functional) */}
              <div className="absolute inset-0 flex">
                <div
                  className="flex-1 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (currentStory > 0) {
                      setCurrentStory((prev) => prev - 1);
                      setProgress(0);
                    }
                  }}
                />
                <div
                  className="flex-1 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (currentStory < stories.length - 1) {
                      setCurrentStory((prev) => prev + 1);
                      setProgress(0);
                    } else {
                      setShowStories(false);
                    }
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
