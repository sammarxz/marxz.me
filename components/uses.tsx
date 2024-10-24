import React from "react";
import { Computer, Cog, Wrench, Code } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type SetupItem = {
  title: string;
  description: string;
};

type SetupSection = {
  title: string;
  icon: React.ReactNode;
  items: SetupItem[];
};

type SetupData = {
  [key: string]: SetupSection;
};

const setup: SetupData = {
  hardware: {
    title: "Hardware",
    icon: <Computer className="w-5 h-5" />,
    items: [
      {
        title: "Galaxy Book 3 360",
        description: "i7 evo 13th 16Gb RAM 512Gb SSD",
      },
      {
        title: "2 AOC 24b1xhm",
        description: "2 Monitores secundários 24 polegadas",
      },
      {
        title: "Keychron K3 v2",
        description: "Teclado mecânico sem fio com switches red",
      },
      {
        title: "Edifier W830NB",
        description: "Headphone com cancelamento de ruído",
      },
    ],
  },
  software: {
    title: "Software",
    icon: <Cog className="w-5 h-5" />,
    items: [
      {
        title: "VS Code",
        description: "Editor de código principal com tema Tokyo Night",
      },
      {
        title: "Windows 11 + WSL2 + Docker",
        description: "Utilizo a virtualização do Ubuntu 22.04 LTS",
      },
      {
        title: "Zen Browser",
        description: "Navegador principal para desenvolvimento",
      },
      {
        title: "Figma",
        description: "Design e prototipagem rápida",
      },
    ],
  },
  coding: {
    title: "Desenvolvimento",
    icon: <Code className="w-5 h-5" />,
    items: [
      {
        title: "Next.js & React",
        description: "Framework principal para desenvolvimento web",
      },
      {
        title: "TypeScript",
        description: "Para tipagem estática e melhor DX",
      },
      {
        title: "Tailwind CSS",
        description: "Framework CSS para estilização",
      },
      {
        title: "Shadcn/UI",
        description: "Componentes reutilizáveis",
      },
    ],
  },
  productivity: {
    title: "Produtividade",
    icon: <Wrench className="w-5 h-5" />,
    items: [
      {
        title: "Obsidian",
        description: "Notas, diário, documentação e organização geral",
      },
      {
        title: "Claude.ai",
        description: "Minha ferramenta de AI preferida",
      },
      {
        title: "BitWarden",
        description: "Gerenciador de senhas",
      },
      {
        title: "Spotify",
        description: "Música para focar no trabalho",
      },
    ],
  },
};

export default function Uses() {
  return (
    <div className="">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-neutral-200">
            O que utilizo no dia a dia
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(setup).map(([key, section]) => (
            <Card
              key={key}
              className="border-neutral-800 bg-neutral-900/50 backdrop-blur"
            >
              <CardHeader className="flex flex-row items-center gap-2">
                {section.icon}
                <CardTitle className="text-base text-neutral-200">
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {section.items.map((item, index) => (
                    <li key={index} className="space-y-1">
                      <h3 className="text-sm font-medium text-neutral-300">
                        {item.title}
                      </h3>
                      <p className="text-sm text-neutral-500">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
