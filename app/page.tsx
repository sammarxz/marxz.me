import { Suspense } from "react";

import { CurrentFocuses } from "@/components/current-focuses";
import { Header } from "@/components/header";
import { Projects } from "@/components/projects";
import { Stats } from "@/components/stats";
import { Loading } from "@/components/ui/loading";
import { CurrentLocationStats } from "@/components/current-location-stats";
import { Divider } from "@/components/ui/divider";
import { BookCTA } from "@/components/book-cta";
import { Newsletter } from "@/components/newsletter";
import { Footer } from "@/components/footer";
import { WeeklySchedule } from "@/components/weekly-schedule";

export default function Home() {
  return (
    <main className="flex flex-col gap-16 md:gap-28">
      <div className="flex flex-col gap-12">
        <Header />
        <Divider />
        <Suspense fallback={<Loading />}>
          <Stats />
        </Suspense>
      </div>
      <Projects />
      <div className="flex flex-col gap-12">
        <CurrentFocuses />
        <Divider />
        <CurrentLocationStats />
      </div>
      <WeeklySchedule />
      <div className="flex flex-col gap-12">
        <BookCTA />
        <Newsletter />
      </div>
      <Footer />
    </main>
  );
}
