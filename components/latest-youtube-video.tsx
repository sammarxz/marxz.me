import { getLatestVideo } from "@/lib/youtube";

import { LatestVideo } from "./latest-video";
import { Card, CardContent } from "./ui/card";

export async function LatestYouTubeVideo() {
  const video = await getLatestVideo();

  if (!video) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <p className="text-neutral-500">
            Não foi possível carregar o último vídeo do YouTube
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <LatestVideo
      videoId={video.id}
      title={video.title}
      publishedAt={video.publishedAt}
      thumbnailUrl={video.thumbnails.high.url}
    />
  );
}
