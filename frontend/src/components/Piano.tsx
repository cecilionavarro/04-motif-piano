import Note from "./Note";

const firstNote = 48;
const lastNote = 72;
const noteCount = lastNote - firstNote + 1;
const blackKeys = new Set([1, 3, 6, 8, 10]);

const isBlackKey = (noteId: number) => {
  return blackKeys.has(noteId % 12);
};

const whiteKeyCount = Array.from(
  { length: noteCount },
  (_, i) => firstNote + i
).filter((noteId) => !isBlackKey(noteId)).length;

const pianoWidth = 600;
const whiteKeyWidth = pianoWidth / whiteKeyCount;
const blackKeyWidth = whiteKeyWidth * 0.7;
const blackKeyLeftMargin = blackKeyWidth / 2;
const blackKeyRightMargin = blackKeyWidth / 2;

const Piano = () => {
  return (
    <div className="flex" style={{ width: pianoWidth }}>
      {Array.from({ length: noteCount }, (_, i) => {
        const noteId = firstNote + i;
        const isBlack = isBlackKey(noteId);
        return (
          <Note
            key={noteId}
            width={isBlack ? blackKeyWidth : whiteKeyWidth}
            isBlack={isBlack}
            leftMargin={blackKeyLeftMargin}
            rightMargin={blackKeyRightMargin}
          />
        );
      })}
    </div>
  );
};

export default Piano;
