import { CurrentlyReading } from "./currently-reading";
import { MonthlyCommits } from "./monthly-commits";
import { NowPlaying } from "./now-playing";

export function Stats() {
  return (
    <div className="md:max-w-md mx-auto border-neutral-800">
      <p className="leading-relaxed text-sm text-neutral-500">
        At the moment <NowPlaying /> on Spotify. <MonthlyCommits />{" "}
        <CurrentlyReading />
      </p>
    </div>
  );
}
