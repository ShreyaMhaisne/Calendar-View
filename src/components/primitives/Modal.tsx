import React, { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  // Close on ESC key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div
        className="modal-backdrop"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      <div className="bg-white rounded-xl shadow-modal z-50 p-6 w-full max-w-lg animation-slide-up">
        {title && (
          <h2 className="text-lg font-semibold mb-4 text-neutral-900">
            {title}
          </h2>
        )}

        {children}
      </div>
    </div>,
    document.body
  );
};
