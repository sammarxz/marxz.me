import { AnimatedCheckIcon } from "./core/animated-checkmark-icon";

const focusList = [
  {
    name: "Finish my personal portfolio",
    done: true,
  },
  {
    name: "Start a newsletter",
    done: true,
  },
  {
    name: "Create WeTwo Landing Page",
    done: false,
  },
  {
    name: "Create Webnautas Landing Page",
    done: false,
  },
  {
    name: "Finish the 'Par Perfeito' e-commerce",
    done: false,
  },
];

export function CurrentFocuses() {
  return (
    <section className="md:max-w-md w-full mx-auto space-y-8">
      <div className="inline-flex flex-wrap gap-2 items-baseline">
        <h2 className="font-serif text-xl text-neutral-200">Current Focuses</h2>
        <p className="text-sm text-neutral-500">
          (I like TO DO&apos;s lists😌)
        </p>
      </div>
      <ul className="space-y-4">
        {focusList.map(({ name, done }, i) => (
          <li key={name} className="flex items-center gap-4">
            <div className="relative w-6 h-6 rounded-lg bg-neutral-800">
              {done ? (
                <AnimatedCheckIcon
                  delay={i * 0.05}
                  className="text-indigo-300"
                />
              ) : null}
            </div>
            {name}
          </li>
        ))}
      </ul>
    </section>
  );
}
