export type Project = typeof projects[number];


export const projects = [
  {
    title: "WeTwo",
    shortDescription: "Digital automation for local businesses",
    tags: [
      "NextJS",
      "typescript",
      "framer-motion",
      "tailwindCSS",
      "n8n-webhooks",
    ],
    description: `My Agency specializes in digital automation for local businesses,
    offering marketing, design and web development solutions for companies
    seeking to grow their online presence.`,
    image: "/works/wetwo.svg",
    previewUrl: "https://wetwo.digital",
  },
  {
    title: "Urbanus",
    shortDescription: "Buy properties with cashback",
    tags: [
      "NextJS",
      "typescript",
      "framer-motion",
      "tailwindCSS",
      "n8n-webhooks",
    ],
    description: `Complete development of a professional website for Urbanus, 
    a real estate company. The project included responsive design, lead 
    nurturing form and CRM integration via n8n webhooks.`,
    image: "/works/urbanus.svg",
    previewUrl: "https://www.urbanus.imb.br/",
  },
  {
    title: "5:AM",
    shortDescription: "A terminal-inspired morning routine tracker",
    tags: [
      "NextJS", "Zustand", "Typescript", "Radix"
    ],
    description: `A terminal-inspired morning routine tracker built with React, Typescript, and Tailwind CSS. 
    This minimalist application helps you create and maintain a consistent 5 AM morning routine 
    with a unique retro CRT terminal aesthetic.`,
    image: "/works/5am.svg",
    previewUrl: "https://5am.marxz.me/",
  },
  {
    title: "Biblia-365",
    shortDescription: "365-Day Bible Reading Plan",
    tags: [
      "radix",
      "zod",
      "react-hook-form",
      "prisma",
      "next-auth",
      "n8n-webhooks",
    ],
    description: `A web application for daily Bible reading that helps users
    maintain a reading routine through an annual plan with 365 days of Bible texts.`,
    image: "/works/biblia-365.svg",
    previewUrl: "http://biblia-365.com/",
  },
  {
    title: "Inspira",
    shortDescription: "My personal UI inspiration gallery",
    tags: [
      "JavaScript", "Web Components", "Service worker", "Cache Storage"
    ],
    description: `A curated collection of UI design inspiration from around the web, 
    built with vanilla JavaScript and Web Components. Ideal for designers and developers looking for references.`,
    image: "/works/inspira.svg",
    previewUrl: "https://sammarxz.github.io/inspira/",
  },
  {
    title: "Pomerode",
    shortDescription: "Minimalist Pomodoro Timer",
    tags: ["GTK4", "Libadwaita", "Vala", "elementary OS"],
    description: `Minimalist Pomodoro timer app developed for elementary OS. Built with GTK4 and Libadwaita, it offers a native and elegant experience.`,
    image: "/works/pomerode.svg",
    previewUrl: "https://github.com/sammarxz/pomerode",
  },
];
