import React, { useState } from "react";
import { CalendarViewProps, CalendarEvent } from "./CalendarView.types";
import { Button } from "../primitives/Button";
import { MonthView } from "./MonthView";
import { WeekView } from "./WeekView";
import { EventModal } from "./EventModal";
import { useCalendar } from "../../hooks/useCalendar";

export const CalendarView: React.FC<CalendarViewProps> = ({
  initialView = "month",
  initialDate = new Date(),
  events,
  onEventAdd,
  onEventUpdate,
  onEventDelete,
}) => {
  const {
    currentDate,
    view,
    goToNextMonth,
    goToPreviousMonth,
    goToToday,
    switchView,
  } = useCalendar(initialDate);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const handleDayClick = (date: Date) => {
    setSelectedEvent(null);
    setModalOpen(true);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleSaveEvent = (evt: CalendarEvent) => {
    if (selectedEvent) {
      onEventUpdate(selectedEvent.id, evt);
    } else {
      onEventAdd(evt);
    }
  };

  const handleDelete = () => {
    if (selectedEvent) {
      onEventDelete(selectedEvent.id);
      setModalOpen(false);
    }
  };

  return (
    <div className="space-y-4">

      {/* Navigation Bar */}
      <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-card">
        <div className="flex gap-2">
          <Button variant="secondary" onClick={goToPreviousMonth}>Prev</Button>
          <Button variant="secondary" onClick={goToToday}>Today</Button>
          <Button variant="secondary" onClick={goToNextMonth}>Next</Button>
        </div>

        <h2 className="text-lg font-semibold">
          {currentDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h2>

        <div className="flex gap-2">
          <Button
            variant={view === "month" ? "primary" : "secondary"}
            onClick={() => switchView("month")}
          >
            Month
          </Button>

          <Button
            variant={view === "week" ? "primary" : "secondary"}
            onClick={() => switchView("week")}
          >
            Week
          </Button>
        </div>
      </div>

      {/* View */}
      {view === "month" ? (
        <MonthView
          currentDate={currentDate}
          events={events}
          onDayClick={handleDayClick}
          onEventClick={handleEventClick}
        />
      ) : (
        <WeekView
          currentDate={currentDate}
          events={events}
          onEventClick={handleEventClick}
        />
      )}

      {/* Modal */}
      <EventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={selectedEvent || undefined}
        onSave={handleSaveEvent}
        onDelete={selectedEvent ? handleDelete : undefined}
      />
    </div>
  );
};
