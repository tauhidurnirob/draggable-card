"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

export default function SortableLeague({
  league,
  isOverlay = false,
}: {
  league: any;
  isOverlay?: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: league.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? "transform 200ms ease, box-shadow 200ms ease",
    opacity: isOverlay ? 0.9 : isDragging ? 0.75 : 1,
    boxShadow: isOverlay
      ? "0 20px 30px rgba(0,0,0,0.25)"
      : isDragging
      ? "0 10px 25px rgba(0, 0, 0, 0.2)"
      : "0 4px 6px rgba(0, 0, 0, 0.1)",
    willChange: "transform",
    backgroundImage: "url('/images/bg-lay.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right center",
    scale: isOverlay ? 1.03 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center bg-[#030303] p-0.5 h-[114px] overflow-hidden rounded-lg shadow transition-all duration-200 ease-in-out ${
        isOverlay ? "pointer-events-none scale-[1.03]" : ""
      }`}
    >
      <div className="flex items-center flex-1 p-4">
        <img
          src={league.image}
          alt={league.name}
          className="w-14 h-14 rounded mr-4"
        />
        <div className="flex-1">
          <div className="text-white font-semibold">
            {league.name}{" "}
            <span
              className={`text-xs font-semibold px-2 py-1 rounded border shadow-sm ml-1 ${
                league.status === "Draft Live"
                  ? "border-[#B5FF4D] text-[#B5FF4D] bg-[#B5FF4D]/10 shadow-[#B5FF4D]/20"
                  : league.status === "Pre-Draft"
                  ? "border-[#FFAD33] text-[#FFAD33] bg-[#FFAD33]/10 shadow-[#FFAD33]/20"
                  : "border-[#CCCCC5] text-[#CCCCC5] bg-[#CCCCC5]/10 shadow-[#CCCCC5]/20"
              }`}
            >
              {league.status}
            </span>
          </div>
          <div className="text-xs text-neutral-400 flex items-center gap-1 mt-4">
            <div className="flex items-center">
              <figure className="w-[20px] h-[20px]">
                <img src="/icons/espn-icon.png" alt="League" />
              </figure>
              {league.platform}
            </div>{" "}
            •{" "}
            <div className="flex items-center">
              <figure className="w-[20px] h-[20px]">
                <img src="/icons/calendar-icon.png" alt="League" />
              </figure>
              {league.year}
            </div>
          </div>
        </div>
      </div>

      {!isOverlay && (
        <div
          {...listeners}
          {...attributes}
          className="cursor-grab text-neutral-400 active:cursor-grabbing p-2 h-[100%] bg-[#1f211d] flex items-center transition-opacity duration-200 opacity-0 group-hover:opacity-100"
          title="Drag to re-order or move to Archive"
        >
          <GripVertical size={18} />
        </div>
      )}
    </div>
  );
}