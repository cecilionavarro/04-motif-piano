export interface noteProps {
  width: number;
  isBlack: boolean;
  leftMargin?: number;
  rightMargin?: number;
}
const Note = ({ width, isBlack, leftMargin, rightMargin }: noteProps) => {
  if (isBlack) {
    return (
      <div
        className={"h-40 bg-black z-1"}
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
      className={"outline h-70 bg-gray-50"}
      style={{
        width,
      }}
    />
  );
};

export default Note;
