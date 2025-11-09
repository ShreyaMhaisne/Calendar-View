import React from "react";
import { CalendarEvent } from "./CalendarView.types";
import clsx from "clsx";

interface Props {
  date: Date;
  isToday: boolean;
  isCurrentMonth: boolean;
  events: CalendarEvent[];
  onDayClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export const CalendarCell: React.FC<Props> = ({
  date,
  isToday,
  isCurrentMonth,
  events,
  onDayClick,
  onEventClick,
}) => {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${date.toDateString()}. ${events.length} events.`}
      onClick={() => onDayClick(date)}
      className={clsx(
        "border border-neutral-200 h-32 p-2 cursor-pointer calendar-cell-hover",
        {
          "bg-neutral-50": !isCurrentMonth,
        }
      )}
    >
      <div className="flex justify-between items-start mb-1">
        <span
          className={clsx(
            "text-sm font-medium",
            isCurrentMonth ? "text-neutral-900" : "text-neutral-400"
          )}
        >
          {date.getDate()}
        </span>

        {isToday && (
          <span className="w-6 h-6 bg-primary-500 rounded-full text-white text-xs flex items-center justify-center">
            {date.getDate()}
          </span>
        )}
      </div>

      <div className="space-y-1 overflow-hidden">
        {events.slice(0, 3).map((ev) => (
          <div
            key={ev.id}
            onClick={(e) => {
              e.stopPropagation();
              onEventClick(ev);
            }}
            className="text-xs px-2 py-1 rounded truncate text-white"
            style={{ backgroundColor: ev.color }}
          >
            {ev.title}
          </div>
        ))}

        {events.length > 3 && (
          <button className="text-xs text-primary-600 hover:underline">
            +{events.length - 3} more
          </button>
        )}
      </div>
    </div>
  );
};
