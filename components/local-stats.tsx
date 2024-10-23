"use client";
import { getLocalInfo } from "@/lib/weather";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";

function LocalTime() {
  // Client component to handle real-time updates

  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "America/Recife",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="text-white">{time}</span>;
}

export async function LocalStats() {
  const info = await getLocalInfo();

  if (!info) {
    return (
      <div className="flex items-center gap-2">
        <MapPin size={16} />
        <span className="text-lg">Unable to fetch local information</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex items-center gap-2">
        <span className="text-base">
          It&apos;s currently <LocalTime /> in{" "}
          <span className="text-white">
            {info.city}, {info.state}
          </span>
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-base">
          The weather is <span className="text-white">{info.weather}</span> with
          a temperature of{" "}
          <span className="text-white">{info.temperature.toFixed(1)}°C</span>
        </span>
      </div>
    </div>
  );
}
