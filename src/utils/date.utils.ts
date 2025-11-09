import { differenceInMinutes, isSameDay as sameDay } from "date-fns";

/**
 * Builds the 42-day grid for month view (6 weeks × 7 days)
 */
export const getCalendarGrid = (date: Date): Date[] => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay(); // Sun = 0, Mon = 1...

  const gridStart = new Date(firstDay);
  gridStart.setDate(firstDay.getDate() - startOffset);

  const days: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    days.push(d);
  }

  return days;
};

/**
 * Check if two dates are same day
 */
export const isSameDay = (d1: Date, d2: Date): boolean => {
  return sameDay(d1, d2);
};

/**
 * Check if date1 is before date2 (ignoring time)
 */
export const isBeforeDate = (d1: Date, d2: Date): boolean => {
  return d1.setHours(0, 0, 0, 0) < d2.setHours(0, 0, 0, 0);
};

/**
 * Check if date1 is after date2 (ignoring time)
 */
export const isAfterDate = (d1: Date, d2: Date): boolean => {
  return d1.setHours(0, 0, 0, 0) > d2.setHours(0, 0, 0, 0);
};

/**
 * Duration of event in minutes
 */
export const getEventDuration = (start: Date, end: Date): number => {
  return differenceInMinutes(end, start);
};

/**
 * Returns true if event falls on this date
 */
export const eventOccursOn = (date: Date, start: Date, end: Date): boolean => {
  return (
    date.getTime() >= new Date(start).setHours(0, 0, 0, 0) &&
    date.getTime() <= new Date(end).setHours(23, 59, 59, 999)
  );
};
