export interface noteProps {
  width: number;
  isBlack: boolean;
  isActive?: boolean;
  isSustained?: boolean;
  leftMargin?: number;
  rightMargin?: number;
}
const Note = ({ width, isBlack, isActive, isSustained, leftMargin, rightMargin }: noteProps) => {
  let colorClass = "";
  if (isActive) {
    colorClass = "bg-blue-500";
  } else if (isSustained) {
    colorClass = "bg-blue-200";
  } else {
    colorClass = isBlack ? "bg-black" : "bg-gray-50"
  }
  
  if (isBlack) {
    return (
      <div
        className={`${colorClass} outline z-1 h-40 `}
        style={{
          width,
          marginLeft: `-${leftMargin}px`,
          marginRight: `-${rightMargin}px`
        }}
      />
    )
  }
  return (
    <div
      className={`${colorClass} outline h-70 `}
      style={{
        width,
      }}
    />
  );
};

export default Note;
