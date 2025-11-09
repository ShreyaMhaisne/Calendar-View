import { useState, useCallback } from "react";
import { CalendarEvent } from "../components/Calendar/CalendarView.types";

const STORAGE_KEY = "calendar-events";

export const useEventManager = (initialEvents: CalendarEvent[] = []) => {
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).map((e: any) => ({
      ...e,
      startDate: new Date(e.startDate),
      endDate: new Date(e.endDate),
    })) : initialEvents;
  });

  const persist = (updated: CalendarEvent[]) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        updated.map((e) => ({
          ...e,
          startDate: e.startDate.toISOString(),
          endDate: e.endDate.toISOString(),
        }))
      )
    );
  };

  const addEvent = useCallback(
    (event: CalendarEvent) => {
      setEvents((prev) => {
        const updated = [...prev, event];
        persist(updated);
        return updated;
      });
    },
    []
  );

  const updateEvent = useCallback(
    (id: string, updates: Partial<CalendarEvent>) => {
      setEvents((prev) => {
        const updated = prev.map((evt) =>
          evt.id === id ? { ...evt, ...updates } : evt
        );
        persist(updated);
        return updated;
      });
    },
    []
  );

  const deleteEvent = useCallback((id: string) => {
    setEvents((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      persist(updated);
      return updated;
    });
  }, []);

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
  };
};
