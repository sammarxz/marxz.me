"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface LatestVideoProps {
  videoId: string;
  title: string;
  publishedAt: string;
  thumbnailUrl: string;
}

export function LatestVideo({
  videoId,
  title,
  publishedAt,
  thumbnailUrl,
}: LatestVideoProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 items-baseline">
        <h2 className="text-lg font-semibold text-neutral-200">Último vídeo</h2>
      </div>

      <Card className="w-full group bg-neutral-900 hover:bg-neutral-900/80 transition-all">
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <CardContent className="p-0">
            <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
              <img
                src={thumbnailUrl}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-12 h-12 text-white" />
              </div>
            </div>

            <div className="p-6 space-y-4">
              <h3 className="font-medium text-base text-neutral-200 group-hover:text-white line-clamp-2">
                {title}
              </h3>

              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <Calendar className="w-4 h-4" />
                <time dateTime={publishedAt}>
                  {formatDistanceToNow(new Date(publishedAt), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </time>
              </div>
            </div>
          </CardContent>
        </a>
      </Card>
    </div>
  );
}
