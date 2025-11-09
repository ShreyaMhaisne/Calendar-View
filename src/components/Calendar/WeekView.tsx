import React, { useMemo } from "react";
import { CalendarEvent } from "./CalendarView.types";
import { isSameDay, getEventDuration } from "../../utils/date.utils";
import { sortEventsByStart } from "../../utils/event.utils";

interface Props {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick: (ev: CalendarEvent) => void;
}

export const WeekView: React.FC<Props> = ({
  currentDate,
  events,
  onEventClick,
}) => {
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });

  const eventsByDay = days.map((day) =>
    sortEventsByStart(events.filter((ev) => isSameDay(ev.startDate, day)))
  );

  return (
    <div className="grid grid-cols-7 border border-neutral-300 min-h-[600px]">
      {/* Header */}
      {days.map((d) => (
        <div
          key={d.toDateString()}
          className="text-center py-2 font-medium bg-neutral-100 border-b border-neutral-300"
        >
          {d.toLocaleDateString("en-US", { weekday: "short", day: "numeric" })}
        </div>
      ))}

      {/* Body */}
      {days.map((day, dayIndex) => (
        <div
          key={dayIndex}
          className="relative border-l border-neutral-200 h-full"
        >
          {/* 24-hour grid */}
          {Array.from({ length: 24 }).map((_, hour) => (
            <div
              key={hour}
              className="border-b border-neutral-200 h-16 text-[10px] px-1 text-neutral-400"
            >
              {hour}:00
            </div>
          ))}

          {/* Events */}
          {eventsByDay[dayIndex].map((ev) => {
            const top =
              ev.startDate.getHours() * 64 +
              (ev.startDate.getMinutes() / 60) * 64; // 64px = 1 hour height

            const height = (getEventDuration(ev.startDate, ev.endDate) / 60) * 64;

            return (
              <div
                key={ev.id}
                onClick={() => onEventClick(ev)}
                className="absolute left-1 right-1 text-xs p-1 rounded text-white cursor-pointer"
                style={{
                  backgroundColor: ev.color,
                  top,
                  height,
                }}
              >
                {ev.title}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
