import { getNowPlaying } from "@/lib/spotify";

export async function NowPlaying() {
  const response = await getNowPlaying();

  if (!response.ok || response.status === 204) {
    return <>No momento não estou escutanto nada no Spotify</>;
  }

  const song = await response.json();
  // const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((_artist: any) => _artist.name)
    .join(", ");
  const songUrl = song.item.external_urls.spotify;

  return (
    <a
      href={songUrl}
      target="_blank"
      rel="noopener noreferrer"
      title={`Música ${title} de ${artist}`}
    >
      No momento estou escutando{" "}
      <span className="hover:text-neutral-800 dark:hover:text-neutral-300 transition duration-300">
        {title} de {artist} ↗
      </span>{" "}
      no Spotify.
    </a>
  );
}
