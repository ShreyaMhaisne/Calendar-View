import React, { useMemo } from "react";
import { CalendarEvent } from "./CalendarView.types";
import { CalendarCell } from "./CalendarCell";
import { getCalendarGrid, isSameDay } from "../../utils/date.utils";
import { groupEventsByDay } from "../../utils/event.utils";

interface Props {
  currentDate: Date;
  events: CalendarEvent[];
  onDayClick: (d: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export const MonthView: React.FC<Props> = ({
  currentDate,
  events,
  onDayClick,
  onEventClick,
}) => {
  const grid = useMemo(() => getCalendarGrid(currentDate), [currentDate]);
  const eventsByDay = useMemo(() => groupEventsByDay(events, grid), [events, grid]);

  const today = new Date();
  const month = currentDate.getMonth();

  return (
    <div className="grid grid-cols-7 border border-neutral-300">
      {/* Days header */}
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div
          key={day}
          className="text-center py-2 font-medium bg-neutral-100 border-b border-neutral-300"
        >
          {day}
        </div>
      ))}

      {/* Calendar grid */}
      {grid.map((date) => (
        <CalendarCell
          key={date.toISOString()}
          date={date}
          isToday={isSameDay(today, date)}
          isCurrentMonth={date.getMonth() === month}
          events={eventsByDay[date.toDateString()] || []}
          onDayClick={onDayClick}
          onEventClick={onEventClick}
        />
      ))}
    </div>
  );
};
