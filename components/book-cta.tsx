import { CheckCircle } from "lucide-react";

export function BookCTA() {
  return (
    <section className="relative h-auto w-full overflow-hidden rounded-2xl border border-gray-800 p-[1px] backdrop-blur-3xl">
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <div className="inline-flex h-full w-full items-center justify-center rounded-2xl bg-gray-950 p-8 md:p-12 md:py-20 text-sm font-medium text-gray-50 backdrop-blur-3xl">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
            <div className="bg-indigo-500 max-w-[250px] h-[328px] w-full mx-auto rounded-lg shadow-lg" />
          </div>
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl font-serif mb-4">
              Download a Free chapter of my UI design E-book
            </h2>
            <p className="text-base font-sans font-normal text-neutral-300 mb-6">
              I&apos;m putting all my knowledge about UI design in this e-book
              as a way of thanking the internet.
            </p>
            <ul className="space-y-2">
              {[
                "In-depth tutorials",
                "Expert tips and tricks",
                "Real-world examples",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-center lg:justify-start"
                >
                  <CheckCircle className="h-5 w-5 mr-2 text-indigo-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
