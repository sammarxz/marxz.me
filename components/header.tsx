"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const socialLinks = [
  {
    title: "X/Twitter",
    url: "",
  },
  {
    title: "Linkedin",
    url: "",
  },
  {
    title: "Github",
    url: "",
  },
];

export function Header() {
  const [buttonText, setButtonText] = useState("Copiar Email");
  const [isHovered, setIsHovered] = useState(false);

  const email = "sam@marxz.me";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setButtonText("Email Copiado!");
      toast("Email Copiado!");

      setTimeout(() => setButtonText("Copiar Email"), 2000);
    } catch {
      setButtonText("Erro ao copiar email");
      toast("Erro ao copiar email!");
      setTimeout(() => setButtonText("Copiar Email"), 2000);
    }
  };

  return (
    <motion.header className="flex flex-col gap-8">
      <motion.div className="flex justify-between items-center">
        <motion.div className="flex gap-4 items-center">
          <Avatar className="w-14 h-14 rounded-xl">
            <AvatarImage src="/profile-sammarxz.jpg" />
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
        </motion.div>
      </motion.div>

      <motion.div className="space-y-4">
        <h1 className="text-xl leading-relaxed font-medium">
          <span className="text-neutral-200">
            Olá, meu nome é Samuel Marxz.
          </span>{" "}
          Sou um designer e Desenvolvedor Web com +8 anos de experiência.
          Apaixonado por tecnologia, viajens, café e leitura...
        </h1>
        <h2 className="text-xl leading-relaxed font-medium mb-4">
          Minha especialidade é no desenvolvimento front-end com tecnologias
          ReactJS, construindo interfaces de usuário responsivas para empresas
          de todos os portes.
        </h2>
      </motion.div>

      <LayoutGroup>
        <motion.div layout className="flex items-center flex-wrap gap-6">
          <motion.div
            layout
            transition={{ duration: 0.5 }}
            className="w-full sm:w-auto"
          >
            <motion.button
              layout
              onClick={handleCopy}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-full sm:w-auto font-sans relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-50"
            >
              <motion.span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <motion.span
                layout
                className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-zinc-950 px-8 py-1 text-sm font-medium text-neutral-50 backdrop-blur-3xl"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    layout
                    key={isHovered ? email : buttonText}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isHovered ? email : buttonText}
                  </motion.span>
                </AnimatePresence>
              </motion.span>
            </motion.button>
          </motion.div>
          <div className="flex items-center flex-wrap gap-6">
            {socialLinks.map(({ title, url }) => (
              <motion.div layout key={title}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans link"
                >
                  {title}
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </LayoutGroup>
    </motion.header>
  );
}
