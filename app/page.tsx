import { Header } from "@/components/header";
import { Projects } from "@/components/projects";
import { Stats } from "@/components/stats";

export default function Home() {
  return (
    <main className="flex flex-col gap-16 md:gap-28">
      <div className="space-y-8">
        <Header />
        <Stats />
      </div>
      <Projects />
    </main>
  );
}
