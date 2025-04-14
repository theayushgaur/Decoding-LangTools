
import React from "react";

export interface RetroGridProps extends React.HTMLAttributes<HTMLDivElement> {
  gridOpacity?: number;
  children?: React.ReactNode;
}

const RetroGrid = ({
  gridOpacity = 0.2,
  className,
  children,
  ...props
}: RetroGridProps) => {
  return (
    <div className={`relative overflow-hidden ${className}`} {...props}>
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(to right, var(--primary) ${gridOpacity}px, transparent ${gridOpacity}px), linear-gradient(to bottom, var(--primary) ${gridOpacity}px, transparent ${gridOpacity}px)`,
          backgroundSize: "40px 40px",
          backgroundPosition: "center center",
          opacity: gridOpacity,
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
};

export { RetroGrid };
