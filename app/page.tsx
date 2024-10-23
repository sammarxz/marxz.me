import { CurrentFocuses } from "@/components/current-focuses";
import { Header } from "@/components/header";
import { Projects } from "@/components/projects";
import { Stats } from "@/components/stats";

export default function Home() {
  return (
    <main className="flex flex-col gap-16 md:gap-28">
      <div className="flex flex-col gap-9">
        <Header />
        <Stats />
      </div>
      <Projects />
      <CurrentFocuses />
    </main>
  );
}
