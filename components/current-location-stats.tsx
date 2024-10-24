import { Suspense } from "react";

import { LocalStats } from "./local-stats";
import { Loading } from "./ui/loading";

export async function CurrentLocationStats() {
  return (
    <div className="w-full">
      <Suspense fallback={<Loading />}>
        <LocalStats />
      </Suspense>
    </div>
  );
}
