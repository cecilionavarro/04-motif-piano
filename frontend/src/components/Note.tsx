export interface noteProps {
  width: number;
  isBlack: boolean;
  isActive?: boolean;
  leftMargin?: number;
  rightMargin?: number;
}
const Note = ({ width, isBlack, isActive, leftMargin, rightMargin }: noteProps) => {
  if (isBlack) {
    return (
      <div
        className={`${isActive ? "bg-blue-500 " : "bg-black"} outline z-1 h-40 `}
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
      className={`${isActive ? "bg-blue-500" : "bg-gray-50" } outline h-70 `}
      style={{
        width,
      }}
    />
  );
};

export default Note;
