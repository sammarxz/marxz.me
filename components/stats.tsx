import { NowPlaying } from "./now-playing";

export function Stats() {
  return (
    <div className="md:max-w-md mx-auto pt-8 border-t border-neutral-800">
      <p className="leading-relaxed text-sm text-neutral-500">
        At the moment <NowPlaying /> on Spotify.
      </p>
    </div>
  );
}
