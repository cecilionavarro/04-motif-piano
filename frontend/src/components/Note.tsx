import type { NoteVisual } from "../modes/types";

export interface noteProps {
  width: number;
  isBlack: boolean;
  // isActive?: boolean;
  // isSustained?: boolean;
  leftMargin?: number;
  rightMargin?: number;
  visual?: NoteVisual;
}
const Note = ({
  width,
  isBlack,
  leftMargin,
  rightMargin,
  visual = { type: "none" },
}: noteProps) => {
  let colorClass = (() => {
    switch (visual.type) {
      case "active":
        return "bg-blue-500";
      case "sustained":
        return "bg-blue-200";
      case "target":
        return "bg-yellow-500";
      case "correct":
        return "bg-green-500";
      case "wrong":
        return "bg-red-500";
      default:
        return isBlack ? "bg-black" : "bg-gray-50";
    }
  })(); // parentheses invoke it right away

  const common = `${colorClass}`;
  if (isBlack) {
    return (
      <div
        className={`${common} z-1 h-35 border border-t-0 rounded-b-xs`}
        style={{
          width,
          marginLeft: `-${leftMargin}px`,
          marginRight: `-${rightMargin}px`,
        }}
      />
    );
  }
  return (
    <div
      className={`${common} h-60 border-l first:border-l-0 first:rounded-l-xs last:rounded-r-xs`}
      style={{
        width,
      }}
    />
  );
};

export default Note;
