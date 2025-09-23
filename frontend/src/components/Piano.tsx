import { useCallback, useEffect, useState } from "react";
import Note from "./Note";
import { useMIDI } from "../hooks/useMIDI";

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
  const [activeNotes, setActiveNotes] = useState<Set<number>>(new Set());

  // log my set
  // useEffect(() => {
  //   console.log("Active notes:", Array.from(activeNotes));
  // }, [activeNotes]);

  const handleNoteOn = useCallback((note: number) => {
    console.log(note)
    setActiveNotes((prev) => new Set(prev).add(note));
  }, []);

  const handleNoteOff = useCallback((note: number) => {
    console.log(note)
    setActiveNotes((prev) => {
      const newSet = new Set(prev);
      newSet.delete(note);
      return newSet;
    });
  }, []);

  useMIDI(handleNoteOn, handleNoteOff);

  return (
    <div className="flex" style={{ width: pianoWidth }}>
      {Array.from({ length: noteCount }, (_, i) => {
        const noteId = firstNote + i;
        const isBlack = isBlackKey(noteId);
        const isActive = activeNotes.has(noteId);
        return (
          <Note
            key={noteId}
            width={isBlack ? blackKeyWidth : whiteKeyWidth}
            isBlack={isBlack}
            isActive={isActive}
            leftMargin={blackKeyLeftMargin}
            rightMargin={blackKeyRightMargin}
          />
        );
      })}
    </div>
  );
};

export default Piano;
