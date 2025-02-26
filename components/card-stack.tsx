"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";

import useClickOutside from "@/hooks/useClickOutside";

import { Project, projects } from "@/data/projects";

const cardVariants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};

const cardItemsVariants = {
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.05,
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  }),
  hidden: {
    opacity: 0,
    y: 100,
    transition: {
      when: "afterChildren",
    },
  },
};

export function CardStack() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Set isClient to true after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Usar useClickOutside para o container de cards, excluindo o botão
  useClickOutside(cardsRef, (e) => {
    // Verificar se o clique foi no botão ou dentro dele
    if (
      buttonRef.current &&
      (buttonRef.current === e.target ||
        buttonRef.current.contains(e.target as Node))
    ) {
      return;
    }

    if (!selectedProject) {
      setIsExpanded(false);
    }
  });

  // Usar useClickOutside para o modal
  useClickOutside(modalRef, () => {
    if (selectedProject) {
      setSelectedProject(null);
    }
  });

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (selectedProject) {
          setSelectedProject(null);
          return;
        }
        setIsExpanded(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedProject]);

  const calculateStyles = (index: number) => {
    const totalSections = projects.length;

    const baseZIndex = totalSections;
    const baseTranslateY = totalSections * 100;
    const baseScale = 1;

    const zIndexDecrement = 1;
    const translateYDecrement = 100;
    const scaleDecrement = 0.03;

    const zIndex = baseZIndex - index * zIndexDecrement;
    const translateY = Math.max(
      0,
      baseTranslateY - index * translateYDecrement
    );
    const scale = baseScale - index * scaleDecrement;

    return {
      transformedState: {
        y: `${translateY}%`,
        scale: scale.toFixed(2),
        zIndex: zIndex * 30,
        filter: `blur(${index}px)`,
      },
      defaultState: {
        y: 0,
        scale: 1,
        zIndex: zIndex * 30,
        filter: "blur(0px)",
      },
    };
  };

  const calculateDelay = (index: number, isExpanding: boolean) => {
    const totalItems = projects.length;

    if (isExpanding) {
      return index * 0.05;
    } else {
      return (totalItems - 1 - index) * 0.05;
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.section className="w-full flex flex-col items-center justify-end gap-4 h-[150px]">
      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            className="bg-black/70 backdrop-blur-sm absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.3 } }}
            whileInView={{
              zIndex: 30,
            }}
          />
        ) : null}
      </AnimatePresence>
      <motion.div
        ref={cardsRef}
        className={`w-full `}
        animate={{
          zIndex: isExpanded ? 30 : 10,
          transition: {
            delay: isExpanded ? 0 : 1,
          },
        }}
      >
        <motion.div
          animate={{
            y: isExpanded ? 140 : 0,
          }}
        >
          <motion.div className="w-full relative space-y-4">
            {projects.map((project, index) => {
              const styles = calculateStyles(index);
              return (
                <motion.article
                  key={project.title}
                  className="relative w-full border border-white/10 
              bg-black flex items-center justify-between
              rounded-2xl p-4 shadow-xl cursor-pointer hover:border-white/20 transition-colors"
                  initial={styles.transformedState}
                  animate={
                    isExpanded ? styles.defaultState : styles.transformedState
                  }
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    bounce: 0.3,
                    stiffness: 280,
                    damping: 18,
                    delay: calculateDelay(index, isExpanded),
                  }}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative flex items-center justify-between w-full">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden">
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                      <div>
                        <motion.h1 className="text-white/80 font-medium">
                          {project.title}
                        </motion.h1>
                        <motion.h2 className="text-white/60 text-xs sm:text-sm truncate max-w-[210px] sm:max-w-[400px]">
                          {project.shortDescription}
                        </motion.h2>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {selectedProject ? (
          <>
            <motion.div
              className="bg-black/70 backdrop-blur-sm fixed inset-0 z-[999]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <div className="fixed inset-0 flex flex-col items-center justify-center z-[1000] p-4">
              <motion.div
                ref={modalRef}
                className="rounded-2xl bg-black border border-white/10 p-6 w-full max-w-2xl max-h-[80vh] overflow-hidden"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={cardVariants}
              >
                <div className="flex flex-col gap-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-5">
                      <div className="relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden">
                        <motion.img
                          variants={cardItemsVariants}
                          custom={1}
                          src={selectedProject.image}
                          alt={selectedProject.title}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                      <div>
                        <motion.h1
                          variants={cardItemsVariants}
                          custom={2}
                          className="text-white/90 font-medium text-xl"
                        >
                          {selectedProject.title}
                        </motion.h1>
                        <motion.p
                          variants={cardItemsVariants}
                          custom={3}
                          className="text-white/60 text-sm mt-1"
                        >
                          {selectedProject.shortDescription}
                        </motion.p>
                      </div>
                    </div>
                    <motion.a
                      href={selectedProject.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={cardItemsVariants}
                      custom={4}
                      className="flex items-center gap-2 text-white/70 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg text-sm"
                    >
                      <span>Visit</span>
                      <ExternalLink size={14} />
                    </motion.a>
                  </div>

                  <div className="mt-2">
                    <motion.h2
                      variants={cardItemsVariants}
                      custom={5}
                      className="text-white/70 text-sm uppercase tracking-wider mb-2"
                    >
                      Description
                    </motion.h2>
                    <motion.p
                      variants={cardItemsVariants}
                      custom={6}
                      className="text-white/80 leading-relaxed"
                    >
                      {selectedProject.description}
                    </motion.p>
                  </div>
                  <div>
                    <motion.h2
                      variants={cardItemsVariants}
                      custom={7}
                      className="text-white/70 text-sm uppercase tracking-wider mb-2"
                    >
                      Tech
                    </motion.h2>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, index) => (
                        <motion.span
                          key={tag}
                          variants={cardItemsVariants}
                          custom={index + 7}
                          className="px-3 py-1 rounded-full bg-white/5 text-white/70 text-xs"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        <motion.button
          ref={buttonRef}
          layout
          onClick={toggleExpand}
          className="rounded-full border border-white/20 px-6 py-2 flex items-center gap-2 z-[200] text-white/80 hover:text-white hover:border-white/30 transition-colors"
          transition={{
            duration: 0.3,
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          animate={{
            opacity: isExpanded ? 0 : 1,
            transition: {
              delay: isExpanded ? -0.5 : 0.5
            }
          }}
        >
          {isClient ? (
            <AnimatePresence mode="wait">
              <motion.span
                key={isExpanded ? "hide" : "show"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {isExpanded ? "Hide" : "Show all"}
              </motion.span>
            </AnimatePresence>
          ) : (
            <span>{isExpanded ? "Hide" : "Show all"}</span>
          )}
          <motion.div
            layoutId="arrow"
            initial={false}
            animate={{
              rotate: isExpanded ? 180 : 0,
              y: isExpanded ? -1 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="group-hover:scale-110"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.button>
      </AnimatePresence>
    </motion.section>
  );
}
