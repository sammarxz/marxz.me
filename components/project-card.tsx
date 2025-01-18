import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogImage,
  DialogSubtitle,
  DialogDescription,
  DialogContainer,
  DialogClose,
} from "@/components/core/dialog";
import { ImageCarousel } from "./image-carousel";
import { ExternalLink, XIcon } from "lucide-react";

interface ProjectCardProps {
  images: string[];
  title: string;
  tag: string;
  tags?: string[];
  description: string;
  externalLink?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  images,
  title,
  tag,
  tags,
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
      <DialogTrigger className="flex w-full flex-col overflow-hidden border border-neutral-950/10 bg-neutral-950">
        <DialogImage
          src={images[0]}
          alt="proej"
          className="h-fit w-full object-cover rounded-2xl"
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
        <DialogContent className="relative flex h-[calc(100vh-24px)] md:h-fit w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl md:rounded-2xl border border-neutral-950/10 bg-neutral-900 mx-auto mt-auto md:mt-0">
          <DialogClose className="absolute right-4 top-4 z-50 p-2 bg-neutral-800/80 backdrop-blur rounded-lg hover:bg-neutral-700 transition-colors">
            <XIcon className="h-5 w-5" />
          </DialogClose>

          <div className="flex-1 overflow-auto">
            <ImageCarousel images={images} className="h-64 md:h-96 w-full" />

            <div className="p-6 md:p-8 space-y-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <DialogTitle className="text-2xl md:text-3xl font-serif font-medium text-neutral-950 dark:text-neutral-50">
                    {title}
                  </DialogTitle>
                  <DialogSubtitle className="text-neutral-700 dark:text-neutral-400 text-sm">
                    {tag}
                  </DialogSubtitle>
                </div>

                {/* Tags */}
                {tags && tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full bg-neutral-800 text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
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
                <p className="mt-2 text-neutral-500 dark:text-neutral-500">
                  {description}
                </p>
              </DialogDescription>

              {/* Preview Button */}
              {externalLink && (
                <div className="pt-4">
                  <a
                    href={externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors"
                  >
                    <span>Ver Preview</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </DialogContainer>
    </Dialog>
  );
};
