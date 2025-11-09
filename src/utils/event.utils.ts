import { CalendarEvent } from "../components/Calendar/CalendarView.types";
import { isSameDay, getEventDuration } from "./date.utils";

/**
 * Group events by date for Month View
 */
export const groupEventsByDay = (events: CalendarEvent[], grid: Date[]) => {
  const map: Record<string, CalendarEvent[]> = {};

  grid.forEach((d) => {
    const key = d.toDateString();
    map[key] = [];
  });

  events.forEach((evt) => {
    grid.forEach((day) => {
      if (isSameDay(day, evt.startDate)) {
        map[day.toDateString()].push(evt);
      }
    });
  });

  return map;
};

/**
 * Check if two events overlap in Week View
 */
export const eventsOverlap = (a: CalendarEvent, b: CalendarEvent) => {
  return a.startDate < b.endDate && b.startDate < a.endDate;
};

/**
 * Sort events by start time for day/week view
 */
export const sortEventsByStart = (events: CalendarEvent[]): CalendarEvent[] => {
  return [...events].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
};

/**
 * Event colors preset
 */
export const EVENT_COLORS = [
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // yellow
  "#ef4444", // red
  "#8b5cf6", // purple
  "#ec4899", // pink
];

/**
 * Sample categories
 */
export const EVENT_CATEGORIES = [
  "Meeting",
  "Work",
  "Personal",
  "Appointment",
  "Other",
];

/**
 * Sample mock events (helpful for storybook)
 */
export const sampleEvents: CalendarEvent[] = [
  {
    id: "evt-1",
    title: "Team Standup",
    description: "Daily sync with team",
    startDate: new Date(2024, 0, 15, 9, 0),
    endDate: new Date(2024, 0, 15, 9, 30),
    color: "#3b82f6",
    category: "Meeting",
  },
  {
    id: "evt-2",
    title: "Design Review",
    description: "UI review",
    startDate: new Date(2024, 0, 15, 14, 0),
    endDate: new Date(2024, 0, 15, 15, 30),
    color: "#10b981",
    category: "Work",
  },
  {
    id: "evt-3",
    title: "Client Call",
    startDate: new Date(2024, 0, 16, 10, 0),
    endDate: new Date(2024, 0, 16, 11, 30),
    color: "#f59e0b",
    category: "Meeting",
  },
];
