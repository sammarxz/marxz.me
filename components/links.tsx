import {
  ArrowUpRight,
  Code2,
  FileAudio,
  Palette,
  UserRound,
} from "lucide-react";

const links = [
  {
    title: "Galeria de trabalhos em UI design",
    url: "https://dribbble.com/sammarxz",
    icon: <Palette className="w-4 h-4" />,
  },
  {
    title: "O Aprendiz Podcast",
    url: "https://o-aprendiz.simplecast.com/episodes",
    icon: <FileAudio className="w-4 h-4" />,
  },
  {
    title: "Meus últimos códigos",
    url: "https://github.com/sammarxz",
    icon: <Code2 className="w-4 h-4" />,
  },
  {
    title: "LinkedIn",
    url: "https://linkedin.com/in/sammarxz",
    icon: <UserRound className="w-4 h-4" />,
  },
];

export function Links() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 items-baseline">
        <h2 className="text-lg font-semibold text-neutral-200">
          Encontre-me pela interwebs
        </h2>
      </div>
      <div className="space-y-3">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between w-full p-4 bg-neutral-900 rounded-xl border border-neutral-800 hover:bg-neutral-900/80 transition-colors duration-300"
          >
            <div className="flex items-center gap-3">
              {link.icon}
              <span className="text-sm text-neutral-300 group-hover:text-neutral-200 transition-colors">
                {link.title}
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-indigo-300 group-hover:text-indigo-400 transition-colors" />
          </a>
        ))}
      </div>
    </div>
  );
}
