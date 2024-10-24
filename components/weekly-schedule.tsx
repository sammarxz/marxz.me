"use client";

import React, { useEffect, useState } from "react";
import { Clock, Video, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  format,
  parseISO,
  startOfWeek,
  differenceInMinutes,
  addDays,
} from "date-fns";

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

  const days: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];

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
      const day = format(startTime, "E");

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

  // const handlePreviousWeek = () => {
  //   setCurrentWeek((prev) => subWeeks(prev, 1));
  // };

  // const handleNextWeek = () => {
  //   setCurrentWeek((prev) => addWeeks(prev, 1));
  // };

  const handleSchedule = () => {
    window.open("https://cal.com/sammarxz/30min", "_blank");
  };

  // const WeekNavigator = () => (
  //   <div className="flex items-center justify-between mb-4">
  //     <Button
  //       variant="outline"
  //       size="sm"
  //       onClick={handlePreviousWeek}
  //       className="flex items-center gap-2"
  //     >
  //       <ChevronLeft className="w-4 h-4" />
  //       Previous
  //     </Button>
  //     <div className="font-medium">
  //       {format(startOfWeek(currentWeek, { weekStartsOn: 1 }), "MMM d")} -
  //       {format(endOfWeek(currentWeek, { weekStartsOn: 1 }), " MMM d, yyyy")}
  //     </div>
  //     <Button
  //       variant="outline"
  //       size="sm"
  //       onClick={handleNextWeek}
  //       className="flex items-center gap-2"
  //     >
  //       Next
  //       <ChevronRight className="w-4 h-4" />
  //     </Button>
  //   </div>
  // );

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-red-300">
          Error loading availability: {error}
          <Button
            variant="outline"
            onClick={fetchAvailability}
            className="md:ml-4"
          >
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="border border-neutral-800 rounded-2xl p-8 md:p-12">
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl text-neutral-200 font-serif max-w-sm">
            I enjoy helping people who love technology get started in the field.
          </h2>
          {/* <WeekNavigator /> */}

          <div className="flex-1 flex flex-wrap gap-2 items-baseline">
            <div className="text-base">Weekly availability (overview)</div>
            <div className="text-sm text-neutral-500">
              *gray areas indicate unavailability
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {isLoading ? (
            <div className="col-span-5 flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
            </div>
          ) : (
            days.map((day) => {
              const dayRanges = schedule[day]?.ranges || [];

              return (
                <div key={day} className="flex flex-col gap-2">
                  <div className="h-60 flex flex-col gap-3">
                    {dayRanges.map((range, idx) => (
                      <button
                        key={`${day}-${idx}`}
                        onClick={range.isAvailable ? handleSchedule : undefined}
                        className={`
                        w-full rounded-2xl p-4 transition-all
                        ${
                          range.isAvailable
                            ? "bg-indigo-400 hover:bg-indigo-500 cursor-pointer"
                            : "bg-neutral-800 cursor-default"
                        }
                        ${dayRanges.length === 1 ? "h-full" : "flex-1"}
                      `}
                        title={`${range.start} - ${range.end} (${range.duration} minutes)`}
                      />
                    ))}
                  </div>
                  <div className="text-sm font-medium text-center">{day}</div>
                </div>
              );
            })
          )}
        </div>

        <div className="flex flex-wrap gap-4 items-center justify-between pt-4 border-t border-neutral-800">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4" />
              <span>30 minutes</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Video className="w-4 h-4" />
              <span>Google Meets</span>
            </div>
          </div>

          <Button
            onClick={handleSchedule}
            className="bg-neutral-800 text-white hover:bg-neutral-700 transition-colors duration-300"
          >
            Schedule a call
          </Button>
        </div>
      </div>
    </div>
  );
};
