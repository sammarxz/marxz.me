"use client";

import { getLocalInfo } from "@/lib/weather";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function LocalHour() {
  const [hora, setHora] = useState("");

  useEffect(() => {
    const atualizarHora = () => {
      const agora = new Date();
      setHora(
        agora.toLocaleTimeString("pt-BR", {
          timeZone: "America/Recife",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };

    atualizarHora();
    const intervalo = setInterval(atualizarHora, 1000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <span className="font-medium text-neutral-200">
      {hora || <Skeleton className="h-4 w-16 inline-block" />}
    </span>
  );
}

export async function LocalStats() {
  const info = await getLocalInfo();

  if (!info) {
    return (
      <Card className="border-neutral-800 bg-neutral-900/50">
        <CardContent className="p-0">
          <div className="flex items-center gap-2 text-neutral-400">
            <MapPin className="w-4 h-4" />
            <span>Não foi possível obter as informações locais</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-neutral-900 p-8 border border-neutral-800 backdrop-blur">
      <CardContent className="p-0 space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-neutral-400">
            Agora são <LocalHour /> em{" "}
            <span className="font-medium text-neutral-200">
              {info.cidade}, {info.estado}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-neutral-400">
            O clima está{" "}
            <span className="font-medium text-neutral-200">{info.clima}</span>{" "}
            com temperatura de{" "}
            <span className="font-medium text-neutral-200">
              {info.temperaturaFormatada}
            </span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
