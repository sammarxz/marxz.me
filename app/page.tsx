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
import { LatestDevPosts } from "@/components/latest-dev-posts";
import { Links } from "@/components/links";

export default function Home() {
  return (
    <main className="flex flex-col gap-12">
      <Header />
      <Divider />
      <Suspense fallback={<Loading />}>
        <Stats />
      </Suspense>
      <Projects />
      <WeeklySchedule />
      <Divider />
      <LatestDevPosts />
      <Divider />
      <Links />
      <Divider />
      <BookCTA />
      <Newsletter />
      <Divider />
      <Footer />
    </main>
  );
}
