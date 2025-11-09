import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  children,
  ...props
}) => {
  const base =
    "px-3 py-2 rounded-lg text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:opacity-50 transition";

  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700",
    secondary: "bg-neutral-200 text-neutral-900 hover:bg-neutral-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "text-neutral-700 hover:bg-neutral-100",
  };

  return (
    <button
      className={clsx(base, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};
