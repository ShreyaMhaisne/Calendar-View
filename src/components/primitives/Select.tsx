import React from "react";

interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  className,
  children,
  ...props
}) => {
  return (
    <label className="flex flex-col gap-1 text-sm text-neutral-700">
      {label && <span>{label}</span>}

      <select
        className={
          "border border-neutral-300 rounded-lg px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 text-neutral-900 " +
          className
        }
        {...props}
      >
        {children}
      </select>
    </label>
  );
};
