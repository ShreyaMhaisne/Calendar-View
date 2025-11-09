import React from "react";
import ReactDOM from "react-dom/client";
import "../styles/globals.css";
import { CalendarView } from "../components/Calendar/CalendarView";
import { useEventManager } from "../hooks/useEventManager";

const Demo = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useEventManager([]);

  return (
    <div className="p-6 bg-neutral-100 min-h-screen">
      <CalendarView
        events={events}
        onEventAdd={addEvent}
        onEventUpdate={updateEvent}
        onEventDelete={deleteEvent}
      />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Demo />);
