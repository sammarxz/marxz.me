import { Cursor } from "@/components/core/cursor";

import { ProjectCard } from "./projectCard";

const projects = [
  {
    title: "My5.me",
    tag: "Projeto Pessoal",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus beatae accusantium voluptate distinctio tenetur nemo atque minus dolore soluta placeat odio sunt",
    imageUrl: "/image-1.avif",
    imageAlt: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    previewUrl: "https://google.com",
  },
  {
    title: "WeTwo Agency",
    tag: "Co-Fundador",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus beatae accusantium voluptate distinctio tenetur nemo atque minus dolore soluta placeat odio sunt",
    imageUrl: "/image-2.avif",
    imageAlt: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    previewUrl: "https://google.com",
  },
];

export function Projects() {
  return (
    <section className="grid md:grid-cols-2 gap-8">
      {projects.map(
        ({ title, tag, description, imageAlt, imageUrl, previewUrl }) => (
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
              imageUrl={imageUrl}
              imageAlt={imageAlt}
              title={title}
              tag={tag}
              description={description}
              externalLink={previewUrl}
            />
          </div>
        )
      )}
    </section>
  );
}
