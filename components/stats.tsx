import { CurrentlyReading } from "./currently-reading";
import { MonthlyCommits } from "./monthly-commits";
import { NowPlaying } from "./now-playing";

export function Stats() {
  return (
    <div className="">
      <p className="leading-relaxed text-sm text-neutral-500">
        <NowPlaying /> <MonthlyCommits /> e <CurrentlyReading />
      </p>
    </div>
  );
}
