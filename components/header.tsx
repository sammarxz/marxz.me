"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MeetButton } from "@/components/core/meet-button";

const transition = { duration: 1, ease: [0.25, 0.1, 0.25, 1] };
const variants = {
  hidden: { filter: "blur(10px)", transform: "translateY(20%)", opacity: 0 },
  visible: { filter: "blur(0)", transform: "translateY(0)", opacity: 1 },
};

export function Header() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const textHighlightColor = "hsla(229.7 93.5% 85.8%)";

  const actualYear = new Date().getFullYear();
  const age = actualYear - 1996;
  const xpInYears = actualYear - 2018;

  return (
    <motion.header
      initial="hidden"
      whileInView="visible"
      transition={{ staggerChildren: 0.04 }}
      className="md:max-w-lg mx-auto flex flex-col gap-12"
    >
      <motion.div
        transition={transition}
        variants={variants}
        className="flex gap-4 items-center"
      >
        <Avatar className="w-12 h-12">
          <AvatarImage src="/profile-sammarxz.jpg" />
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-semibold">Sam Marxz</h1>
          <p className="text-zinc-40 text-sm">UI/UX Engineer</p>
        </div>
      </motion.div>

      <div ref={ref}>
        <RoughNotationGroup show={isInView}>
          <div className="flex flex-col gap-6">
            <div className="leading-relaxed space-y-6">
              <motion.p transition={transition} variants={variants}>
                Natural de Caruaru/PE, Brasil, {age} anos, sou um{" "}
                <strong className="font-semibold">
                  Designer e Desenvolvedor de software
                </strong>{" "}
                com mais de {xpInYears} anos de experiência trabalhando em
                projetos baseados na web. Minha especialidade é no{" "}
                <RoughNotation type="highlight" color={textHighlightColor}>
                  desenvolvimento front-end com tecnologias React
                </RoughNotation>
                , construindo interfaces de usuário responsivas para empresas de
                todos os portes.
              </motion.p>
              <motion.p transition={transition} variants={variants}>
                Em todas as atividades me empenho com bastante atenção aos
                detalhes para reduzir problemas complexos em soluções
                inteligentes que equilibrem{" "}
                <RoughNotation type="underline" color="hsla(238.7 83.5% 66.7%)">
                  acessiblidade
                </RoughNotation>
                ,{" "}
                <RoughNotation type="underline" color="hsla(238.7 83.5% 66.7%)">
                  simplicidade
                </RoughNotation>{" "}
                e{" "}
                <RoughNotation type="underline" color="hsla(238.7 83.5% 66.7%)">
                  funcionalidade
                </RoughNotation>
                . Sou{" "}
                <RoughNotation type="underline" color="hsla(238.7 83.5% 66.7%)">
                  apaixonado pela intersecção do design e tecnologia
                </RoughNotation>{" "}
                onde minha experiência permite que participe no processo de
                desenvolvimento de software,{" "}
                <RoughNotation type="box" color="hsla(238.7 83.5% 66.7%)">
                  desde o design até a implementação do código final.
                </RoughNotation>
              </motion.p>
              <motion.p transition={transition} variants={variants}>
                No meu tempo livre aproveito para saborear um bom café, ler,
                estudar, praticar exercícios, passear com meus cachorros,
                meditar, ouvir músicas e podcasts, ou estar na companhia da
                família e amigos, independentemente da atividade.
              </motion.p>
            </div>
          </div>
        </RoughNotationGroup>
      </div>

      <div className="flex items-center flex-wrap gap-6">
        <motion.div transition={transition} variants={variants}>
          <MeetButton></MeetButton>
        </motion.div>
        <motion.div transition={transition} variants={variants}>
          <span className="text-sm flex items-center gap-2 text-neutral-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Disponível para trabalhos Full-time.
          </span>
        </motion.div>
      </div>
    </motion.header>
  );
}
