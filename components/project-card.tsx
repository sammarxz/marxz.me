import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogImage,
  DialogSubtitle,
  DialogDescription,
  DialogContainer,
} from "@/components/core/dialog";
import { ImageCarousel } from "./image-carousel";
import { ExternalLink } from "lucide-react";

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
        <DialogContent className="rounded-2xl pointer-events-auto relative flex h-fit w-full flex-col overflow-hidden border border-neutral-950/10 bg-neutral-900 max-w-3xl">
          <ImageCarousel images={images} className="h-full w-full" />
          <div className="p-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <DialogTitle className="text-3xl font-serif font-medium text-neutral-950 dark:text-neutral-50">
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
        </DialogContent>
      </DialogContainer>
    </Dialog>
  );
};
