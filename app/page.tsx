import { Header } from "@/components/header";
import { Projects } from "@/components/projects";

export default function Home() {
  return (
    <main className="flex flex-col gap-16 md:gap-28">
      <Header />
      <Projects />
    </main>
  );
}
