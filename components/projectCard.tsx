import { ArrowUpRight } from "lucide-react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogImage,
  DialogSubtitle,
  DialogClose,
  DialogDescription,
  DialogContainer,
} from "@/components/core/dialog";

import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  imageUrl: string;
  imageAlt: string;
  title: string;
  tag: string;
  description: string;
  externalLink: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  imageUrl,
  imageAlt,
  title,
  tag,
  description,
  externalLink,
}) => {
  return (
    <Dialog
      transition={{
        type: "spring",
        bounce: 0.05,
        duration: 0.25,
      }}
    >
      <DialogTrigger className="flex w-full flex-col overflow-hidden border border-zinc-950/10 bg-black">
        <DialogImage
          src={imageUrl}
          alt={imageAlt}
          className="h-72 w-full object-cover rounded-2xl"
        />
        <div className="flex flex-grow flex-row items-center justify-center p-4">
          <div className="space-y-0.5">
            <DialogTitle className="w-full text-white font-serif text-xl text-center font-medium">
              {title}
            </DialogTitle>
          </div>
        </div>
      </DialogTrigger>
      <DialogContainer>
        <DialogContent className="pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border border-zinc-950/10 bg-neutral-900 sm:w-[500px]">
          <DialogImage
            src={imageUrl}
            alt={imageAlt}
            className="h-full w-full"
          />
          <div className="p-6 space-y-4">
            <div className="space-y-1">
              <DialogTitle className="text-2xl font-medium text-zinc-950 dark:text-zinc-50">
                {title}
              </DialogTitle>
              <DialogSubtitle className="text-zinc-700 dark:text-zinc-400 text-sm">
                {tag}
              </DialogSubtitle>
            </div>
            <DialogDescription
              disableLayoutAnimation
              variants={{
                initial: { opacity: 0, scale: 0.8, y: 100 },
                animate: { opacity: 1, scale: 1, y: 0 },
                exit: { opacity: 0, scale: 0.8, y: 100 },
              }}
              className="space-y-4"
            >
              <p className="mt-2 text-zinc-500 dark:text-zinc-500">
                {description}
              </p>
              <a
                href={externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button variant="outline" className="flex gap-2 items-center">
                  Visitar Site <ArrowUpRight className="h-4 w-4" />
                </Button>
              </a>
            </DialogDescription>
          </div>
          <DialogClose className="text-zinc-50" />
        </DialogContent>
      </DialogContainer>
    </Dialog>
  );
};
