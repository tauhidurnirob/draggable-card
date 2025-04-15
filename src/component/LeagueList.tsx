"use client";
import React, { useState } from "react";
import { DndContext, closestCenter, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DroppableContainer from "./DroppableContainer";
import SortableLeague from "./SortableLeague";
import { ChevronDown } from "lucide-react";

const ACTIVE_ZONE = "active-zone";
const ARCHIVED_ZONE = "archived-zone";

interface ILeague {
  id: number;
  name: string;
  year: number;
  status: string;
  platform: string;
  image: string;
}

const initialLeagues: ILeague[] = [
  {
    id: 1,
    name: "St. Louis Pro Season Points League",
    status: "Draft Live",
    year: 2023,
    platform: "ESPN",
    image: "/images/img1.png",
  },
  {
    id: 2,
    name: "Washington Pro Season Points League",
    status: "Pre-Draft",
    year: 2023,
    platform: "ESPN",
    image: "/images/img2.png",
  },
  {
    id: 3,
    name: "New York Pro H2H Points PPR League",
    status: "Draft Live",
    year: 2023,
    platform: "ESPN",
    image: "/images/img3.png",
  },
  {
    id: 4,
    name: "Washington Pro Season Points League",
    status: "Draft Live",
    year: 2023,
    platform: "ESPN",
    image: "/images/img1.png",
  },
  {
    id: 5,
    name: "New York Pro H2H Points PPR League",
    status: "Post-Draft",
    year: 2023,
    platform: "ESPN",
    image: "/images/img1.png",
  },
];

export default function LeagueList() {
  const [activeLeagues, setActiveLeagues] = useState<ILeague[]>(initialLeagues);
  const [archivedLeagues, setArchivedLeagues] = useState<ILeague[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);

  const findLeagueById = (id: number) =>
    activeLeagues.concat(archivedLeagues).find((l) => l.id === id);

  const handleDragStart = (event: any) => {
    setActiveId(Number(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null)
    if (!over) return;
  
    const activeItem = findLeagueById(Number(active.id));
    if (!activeItem) return;
  
    const isInActive = activeLeagues.some((l) => l.id === activeItem.id);
    const isInArchived = archivedLeagues.some((l) => l.id === activeItem.id);
  
    const overId = over.id;
    if (isInActive && active.id !== over.id && overId !== ARCHIVED_ZONE && overId !== ACTIVE_ZONE) {
      const oldIndex = activeLeagues.findIndex((l) => l.id === activeItem.id);
      const newIndex = activeLeagues.findIndex((l) => l.id === Number(overId));
      setActiveLeagues(arrayMove(activeLeagues, oldIndex, newIndex));
      return;
    }
  
    if (isInArchived && active.id !== over.id && overId !== ARCHIVED_ZONE && overId !== ACTIVE_ZONE) {
      const oldIndex = archivedLeagues.findIndex((l) => l.id === activeItem.id);
      const newIndex = archivedLeagues.findIndex((l) => l.id === Number(overId));
      setArchivedLeagues(arrayMove(archivedLeagues, oldIndex, newIndex));
      return;
    }
    if (overId === ARCHIVED_ZONE && isInActive) {
      setActiveLeagues((prev) => prev.filter((l) => l.id !== activeItem.id));
      setArchivedLeagues((prev) => [...prev, activeItem] as any);
      return;
    }
  
    if (overId === ACTIVE_ZONE && isInArchived) {
      setArchivedLeagues((prev) => prev.filter((l) => l.id !== activeItem.id));
      setActiveLeagues((prev) => [...prev, activeItem]);
      return;
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <section className="mb-10">
        <DroppableContainer
          id={ACTIVE_ZONE}
          className="bg-neutral-900 p-4 rounded-xl space-y-4"
        >
          <SortableContext
            items={activeLeagues.map((l) => l.id)}
            strategy={verticalListSortingStrategy}
          >
            {activeLeagues.map((league) => (
              <SortableLeague key={league.id} league={league} />
            ))}
          </SortableContext>
        </DroppableContainer>
      </section>

      <section>
        <div className="flex items-center gap-0.5 text-neutral-400 mb-5 ">
          <ChevronDown />
          <h3 className="text-xl font-semibold">Archived</h3>
        </div>
        <DroppableContainer
          id={ARCHIVED_ZONE}
          className="bg-neutral-900 p-4 rounded-xl space-y-4 min-h-[107px] border border-dashed border-[#CCCCC5]"
        >
          <SortableContext
            items={archivedLeagues.map((l: ILeague) => l.id)}
            strategy={verticalListSortingStrategy}
          >
            {archivedLeagues?.length === 0 && (
              <p className="text-center text-[#9D9D95] mt-7">
                Drop league here to archive
              </p>
            )}
            {archivedLeagues.map((league: ILeague) => (
              <SortableLeague key={league.id} league={league} />
            ))}
          </SortableContext>
        </DroppableContainer>
      </section>
      <DragOverlay>
  {activeId ? (
    <SortableLeague league={findLeagueById(activeId)!} isOverlay />
  ) : null}
</DragOverlay>
    </DndContext>
  );
}
