import { useDroppable } from "@dnd-kit/core";

export default function DroppableContainer({
  id,
  children,
  className = "",
}: {
  id: string | number;
  children: React.ReactNode;
  className?: string;
}) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className={className}>
      {children}
    </div>
  );
}