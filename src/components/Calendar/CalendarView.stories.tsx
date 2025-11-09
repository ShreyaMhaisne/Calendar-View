import type { Meta, StoryObj } from "@storybook/react";
import { CalendarView } from "./CalendarView";
import { sampleEvents } from "../../utils/event.utils";
import { useEventManager } from "../../hooks/useEventManager";

const meta: Meta<typeof CalendarView> = {
  title: "Calendar/CalendarView",
  component: CalendarView,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof CalendarView>;

// Helper wrapper for event manager
const Wrapper = ({ initial }: { initial?: any }) => {
  const { events, addEvent, updateEvent, deleteEvent } = useEventManager(initial || []);

  return (
    <div className="p-6 bg-neutral-50 min-h-screen">
      <CalendarView
        events={events}
        onEventAdd={addEvent}
        onEventUpdate={updateEvent}
        onEventDelete={deleteEvent}
      />
    </div>
  );
};

// ✅ Default story
export const Default: Story = {
  render: () => <Wrapper initial={sampleEvents} />,
};

// ✅ Empty state
export const Empty: Story = {
  render: () => <Wrapper initial={[]} />,
};

// ✅ Week View
export const WeekViewStory: Story = {
  render: () => (
    <Wrapper initial={sampleEvents} />
  ),
  parameters: {
    viewMode: "story",
  },
};

// ✅ Large dataset (20+ events)
export const ManyEvents: Story = {
  render: () => {
    const many = Array.from({ length: 25 }).map((_, i) => ({
      id: `evt-${i}`,
      title: `Event ${i}`,
      startDate: new Date(2024, 0, (i % 15) + 1, (i % 8) + 8),
      endDate: new Date(2024, 0, (i % 15) + 1, (i % 8) + 9),
      color: ["#3b82f6", "#10b981", "#f59e0b"][i % 3],
    }));

    return <Wrapper initial={many} />;
  },
};

// ✅ Interactive playground
export const Interactive: Story = {
  render: () => <Wrapper initial={sampleEvents} />,
};
