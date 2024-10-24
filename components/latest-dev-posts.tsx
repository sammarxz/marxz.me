"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DevToArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  published_at: string;
  reading_time_minutes: number;
  tag_list: string[];
}

export const LatestDevPosts = () => {
  const [posts, setPosts] = React.useState<DevToArticle[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://dev.to/api/articles?username=sammarxz&per_page=2"
        );

        if (!response.ok) {
          throw new Error("Falha ao buscar artigos");
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(2)].map((_, i) => (
          <Card key={i} className="w-full">
            <CardContent className="p-6">
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-neutral-800 rounded w-3/4"></div>
                <div className="h-3 bg-neutral-800 rounded w-1/2"></div>
                <div className="h-3 bg-neutral-800 rounded w-1/4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <p className="text-red-400">Erro ao carregar publicações: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 items-baseline">
        <h2 className="text-lg font-semibold text-neutral-200">
          Últimas postagens
        </h2>
        <div className="text-xs text-neutral-500">
          relacionadas a desenvolvimento
        </div>
      </div>
      {posts.map((post) => (
        <Card
          key={post.id}
          className="w-full group hover:border-neutral-700 transition-colors"
        >
          <a href={post.url} target="_blank" rel="noopener noreferrer">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-base text-neutral-200 group-hover:text-white transition-colors">
                  {post.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-neutral-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {format(
                        new Date(post.published_at),
                        "dd 'de' MMMM, yyyy",
                        {
                          locale: ptBR,
                        }
                      )}
                    </span>
                  </div>
                  <span>•</span>
                  <span>{post.reading_time_minutes} min de leitura</span>
                </div>
                <div className="flex gap-2">
                  {post.tag_list.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-full bg-neutral-900 text-neutral-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </a>
        </Card>
      ))}
      <Button asChild variant="secondary" size="lg" className="w-full">
        <a href="https://dev.to/sammarxz" target="blank">
          Ver Mais
        </a>
      </Button>
    </div>
  );
};
