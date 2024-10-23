export function Footer() {
  return (
    <footer className="w-full md:max-w-md mx-auto space-y-12">
      <div className="space-y-8">
        <div className="inline-flex flex-wrap gap-2 items-baseline">
          <h2 className="font-serif text-2xl text-neutral-200">Get in Touch</h2>
        </div>
        <p>
          I&apos;m always interested in exploring new opportunities,
          collaborating, or exchanging ideas with like-minded individuals. Feel
          free to email me if you&apos;d like to see my portfolio deck or to
          discuss a potential project.
        </p>
      </div>
      <div className="divide-y divide-neutral-800 border-t border-neutral-800">
        <div className="py-4 flex justify-between items-center flex-wrap">
          <h3 className="text-neutral-200">Availability</h3>
          <p className="flex gap-2 items-center">
            <span className="block w-2 h-2 rounded-full bg-green-400" />{" "}
            Available for projects
          </p>
        </div>
        <div className="py-4 flex justify-between items-center flex-wrap">
          <h3 className="text-neutral-200">Resumé</h3>
          <a href="#" className="underline link">
            Download
          </a>
        </div>
        <div className="py-4 flex justify-between items-center flex-wrap">
          <h3 className="text-neutral-200">Email</h3>
          <a href="#" className="link">
            sam@marxz.me
          </a>
        </div>
      </div>
    </footer>
  );
}
