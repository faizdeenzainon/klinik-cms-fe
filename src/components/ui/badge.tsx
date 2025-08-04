import { cn } from "@/lib/utils";
import React from 'react';

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold transition-colors',
        className
      )}
      {...props}
    />
  );
}