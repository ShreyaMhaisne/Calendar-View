import React, { useState } from "react";
import { CalendarEvent } from "./CalendarView.types";
import { Modal } from "../primitives/Modal";
import { Button } from "../primitives/Button";
import { Select } from "../primitives/Select";
import { EVENT_COLORS, EVENT_CATEGORIES } from "../../utils/event.utils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: CalendarEvent;
  onSave: (event: CalendarEvent) => void;
  onDelete?: () => void;
}

export const EventModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialData,
  onSave,
  onDelete,
}) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [startDate, setStartDate] = useState(
    initialData?.startDate.toISOString().slice(0, 16) ||
      new Date().toISOString().slice(0, 16)
  );
  const [endDate, setEndDate] = useState(
    initialData?.endDate.toISOString().slice(0, 16) ||
      new Date().toISOString().slice(0, 16)
  );
  const [color, setColor] = useState(initialData?.color || EVENT_COLORS[0]);
  const [category, setCategory] = useState(initialData?.category || "");

  const handleSave = () => {
    onSave({
      id: initialData?.id || Date.now().toString(),
      title,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      color,
      category,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Event Details">
      <div className="flex flex-col gap-4">

        {/* Title */}
        <label className="flex flex-col gap-1 text-sm">
          Title
          <input
            className="border border-neutral-300 rounded-lg px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        {/* Description */}
        <label className="flex flex-col gap-1 text-sm">
          Description
          <textarea
            className="border border-neutral-300 rounded-lg px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        {/* Start */}
        <label className="flex flex-col gap-1 text-sm">
          Start Date & Time
          <input
            type="datetime-local"
            className="border border-neutral-300 rounded-lg px-3 py-2"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>

        {/* End */}
        <label className="flex flex-col gap-1 text-sm">
          End Date & Time
          <input
            type="datetime-local"
            className="border border-neutral-300 rounded-lg px-3 py-2"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>

        {/* Color picker */}
        <div className="flex gap-2">
          {EVENT_COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className="w-6 h-6 rounded-full border"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        {/* Category */}
        <Select label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">None</option>
          {EVENT_CATEGORIES.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </Select>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-4">
          {onDelete && (
            <Button variant="danger" onClick={onDelete}>
              Delete
            </Button>
          )}
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </Modal>
  );
};
