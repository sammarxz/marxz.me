"use client";

import React, { useEffect, useState } from "react";
import { Calendar, Clock, Video } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  format,
  parseISO,
  startOfWeek,
  differenceInMinutes,
  addDays,
} from "date-fns";
import { Loading } from "./ui/loading";

interface TimeRange {
  start: string;
  end: string;
  title?: string;
}

interface CalResponse {
  busy: TimeRange[];
  timeZone: string;
  dateRanges: TimeRange[];
  workingHours: {
    days: number[];
    startTime: number;
    endTime: number;
    userId: number;
  }[];
}

interface DaySchedule {
  date: string;
  ranges: {
    start: string;
    end: string;
    duration: number;
    isAvailable: boolean;
  }[];
}

interface ScheduleByDay {
  [key: string]: DaySchedule;
}

const CAL_API_KEY = process.env.NEXT_PUBLIC_CAL_API_KEY;

export const WeeklySchedule = () => {
  const [schedule, setSchedule] = useState<ScheduleByDay>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentWeek] = useState<Date>(new Date());

  const dayMapping: { [key: string]: string } = {
    Mon: "Seg",
    Tue: "Ter",
    Wed: "Qua",
    Thu: "Qui",
    Fri: "Sex",
  };
  const days = ["Seg", "Ter", "Qua", "Qui", "Sex"];

  const removeDuplicateBusySlots = (busySlots: TimeRange[]): TimeRange[] => {
    const uniqueSlots = new Map<string, TimeRange>();

    busySlots.forEach((slot) => {
      const key = `${slot.start}-${slot.end}`;
      if (!uniqueSlots.has(key)) {
        uniqueSlots.set(key, slot);
      }
    });

    return Array.from(uniqueSlots.values());
  };

  const processSchedule = (data: CalResponse): ScheduleByDay => {
    const scheduleByDay: ScheduleByDay = {};
    const startDate = startOfWeek(currentWeek, { weekStartsOn: 1 });

    days.forEach((_, index) => {
      const currentDate = addDays(startDate, index);
      const dateKey = format(currentDate, "yyyy-MM-dd");
      scheduleByDay[days[index]] = {
        date: dateKey,
        ranges: [],
      };
    });

    // Remove duplicate busy slots
    const uniqueBusySlots = removeDuplicateBusySlots(data.busy);

    // Process available ranges
    data.dateRanges.forEach((range) => {
      const startTime = parseISO(range.start);
      const endTime = parseISO(range.end);
      const day = dayMapping[format(startTime, "E")] || format(startTime, "E");

      if (scheduleByDay[day]) {
        scheduleByDay[day].ranges.push({
          start: format(startTime, "HH:mm"),
          end: format(endTime, "HH:mm"),
          duration: differenceInMinutes(endTime, startTime),
          isAvailable: true,
        });
      }
    });

    // Process busy ranges (now using unique slots)
    uniqueBusySlots.forEach((range) => {
      const startTime = parseISO(range.start);
      const endTime = parseISO(range.end);
      const day = format(startTime, "E");

      if (scheduleByDay[day]) {
        scheduleByDay[day].ranges.push({
          start: format(startTime, "HH:mm"),
          end: format(endTime, "HH:mm"),
          duration: differenceInMinutes(endTime, startTime),
          isAvailable: false,
        });
      }
    });

    Object.keys(scheduleByDay).forEach((day) => {
      scheduleByDay[day].ranges.sort((a, b) => a.start.localeCompare(b.start));
    });

    return scheduleByDay;
  };

  const fetchAvailability = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const startDate = startOfWeek(currentWeek, { weekStartsOn: 1 })
        .toISOString()
        .split("T")[0];
      const endDate = addDays(new Date(startDate), 6)
        .toISOString()
        .split("T")[0];

      const response = await fetch(
        `https://api.cal.com/v1/availability?apiKey=${CAL_API_KEY}&username=sammarxz&dateFrom=${startDate}&dateTo=${endDate}&eventTypeId=6&timeZone=America/Sao_Paulo`
      );

      if (!response.ok) {
        throw new Error("Falha ao buscar disponibilidade");
      }

      const data = await response.json();
      const processedSchedule = processSchedule(data);

      setSchedule(processedSchedule);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailability();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSchedule = () => {
    window.open("https://cal.com/sammarxz/30min", "_blank");
  };

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-red-300">
          Erro ao carregar meu horário de disponibilidade:
          <Button
            variant="outline"
            onClick={fetchAvailability}
            className="md:ml-4"
          >
            Tentar novamente
          </Button>
        </div>
      </Card>
    );
  }

  const renderDays = () => (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 items-baseline">
        <h2 className="text-lg font-semibold text-neutral-200">
          Disponibilidade semanal (visão geral)
        </h2>
        <div className="text-xs text-neutral-500">
          *As áreas mais escuras indicam indisponibilidade
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {days.map((day) => {
          const dayRanges = schedule[day]?.ranges || [];

          // Calculate total available and busy minutes
          const availableMinutes = dayRanges
            .filter((range) => range.isAvailable)
            .reduce((acc, range) => acc + range.duration, 0);

          const busyMinutes = dayRanges
            .filter((range) => !range.isAvailable)
            .reduce((acc, range) => acc + range.duration, 0);

          // Convert to hours for display
          const availableHours = Math.round(availableMinutes / 60);

          // Calculate height proportions
          const availableHeight =
            (availableMinutes / (availableMinutes + busyMinutes)) * 100;
          const busyHeight = 100 - availableHeight;

          return (
            <div key={day} className="flex flex-col gap-2">
              <div className="h-60 relative rounded-xl overflow-hidden">
                {/* Busy time block */}
                {busyHeight > 0 && (
                  <div
                    className="absolute top-0 w-full bg-black border border-neutral-800"
                    style={{ height: `${busyHeight}%` }}
                  />
                )}

                {/* Available time block */}
                {availableHeight > 0 && (
                  <button
                    onClick={handleSchedule}
                    className="absolute bottom-0 w-full bg-neutral-900 hover:bg-neutral-900/80 transition-colors border border-neutral-800 flex flex-col items-center justify-end text-neutral-400 p-4"
                    style={{ height: `${availableHeight}%` }}
                  >
                    {availableHours > 0 && (
                      <span className="text-sm font-medium leading-none">
                        {availableHours}{" "}
                        {availableHours === 1 ? "hora" : "horas"}
                      </span>
                    )}
                  </button>
                )}
              </div>
              <div className="text-xs font-medium text-center text-neutral-200">
                {day}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <div className="space-y-12">
        <button
          onClick={handleSchedule}
          className="text-left flex flex-col sm:flex-row justify-between gap-6 rounded-xl bg-neutral-900 hover:bg-neutral-900/80 transition-colors duration-300 p-8 border border-neutral-800"
        >
          <div className="order-2 sm:order-1 flex-1 flex flex-col gap-2">
            <h2 className="text-lg text-neutral-200 font-semibold">
              Vamos conversar sobre uma parceria?
            </h2>
            <p>
              Vamos encontrar um tempo para conversar sobre seu próximo projeto
              ou quem sabe uma mentoria!
            </p>
            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>30 minutos</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4" />
                <span>Google Meets</span>
              </div>
            </div>
          </div>
          <div className="order-1 sm:order-2 flex items-center justify-center h-16 w-16 rounded-full border border-indigo-400">
            <Calendar className="text-indigo-400" />
          </div>

          {/* <div className="flex-1 flex flex-wrap gap-2 items-baseline">
            <div className="text-base">Weekly availability (overview)</div>
            <div className="text-sm text-neutral-500">
              *gray areas indicate unavailability
            </div>
          </div> */}
        </button>

        <div className="">
          {isLoading ? (
            <div className="col-span-5 flex justify-center py-12">
              <Loading />
            </div>
          ) : (
            <>{renderDays()}</>
          )}
        </div>
      </div>
    </>
  );
};
