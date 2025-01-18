import { Cursor } from "@/components/core/cursor";

import { ProjectCard } from "./project-card";

import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section className="grid grid-cols-1 gap-8">
      {projects.map(({ title, tag, description, images, tags, previewUrl }) => (
        <div key={title} className="overflow-hidden">
          <Cursor
            attachToParent
            variants={{
              initial: { scale: 0.3, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              exit: { scale: 0.3, opacity: 0 },
            }}
            transition={{
              ease: "easeInOut",
              duration: 0.15,
            }}
            className="left-12 top-4"
          >
            <div>
              {/* <MouseIcon className='h-6 w-6' /> */}
              <div className="ml-4 mt-8 rounded-xl bg-black/80 py-2 px-4 text-neutral-50">
                Explore
              </div>
            </div>
          </Cursor>
          <ProjectCard
            images={images}
            title={title}
            tag={tag}
            tags={tags}
            description={description}
            externalLink={previewUrl}
          />
        </div>
      ))}
    </section>
  );
}
