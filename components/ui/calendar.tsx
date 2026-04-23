"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, ...props }: CalendarProps) {
    return (
        <DayPicker
            className={cn("p-3", className)}
            classNames={{
                months: "flex flex-col sm:flex-row gap-2",
                month: "flex flex-col gap-4",
                month_caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium text-gray-900",
                nav: "flex items-center gap-1",
                button_previous:
                    "absolute left-1 top-0 inline-flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 bg-transparent p-0 text-gray-500 opacity-50 hover:opacity-100 transition-opacity",
                button_next:
                    "absolute right-1 top-0 inline-flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 bg-transparent p-0 text-gray-500 opacity-50 hover:opacity-100 transition-opacity",
                month_grid: "w-full border-collapse",
                weekdays: "flex",
                weekday:
                    "text-gray-500 rounded-md w-9 font-normal text-[0.8rem]",
                week: "flex w-full mt-2",
                day: "h-9 w-9 text-center text-sm p-0 relative",
                day_button:
                    "inline-flex h-9 w-9 items-center justify-center rounded-md p-0 font-normal transition-colors hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 aria-selected:opacity-100",
                selected:
                    "bg-blue-600 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white [&>button]:bg-blue-600 [&>button]:text-white [&>button]:hover:bg-blue-700 [&>button]:hover:text-white",
                today: "[&>button]:bg-gray-100 [&>button]:text-gray-900",
                outside:
                    "text-gray-400 opacity-50 aria-selected:bg-gray-100/50 aria-selected:text-gray-400",
                disabled: "text-gray-400 opacity-50",
                hidden: "invisible",
                ...classNames,
            }}
            components={{
                Chevron: ({ orientation }) =>
                    orientation === "left" ? (
                        <ChevronLeft className="h-4 w-4" />
                    ) : (
                        <ChevronRight className="h-4 w-4" />
                    ),
            }}
            {...props}
        />
    );
}
Calendar.displayName = "Calendar";

export { Calendar };
export type { CalendarProps };
