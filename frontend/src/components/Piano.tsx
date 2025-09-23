import { useCallback, useEffect, useRef, useState } from "react";
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
  const [sustainedNotes, setSustainedNotes] = useState<Set<number>>(new Set());
  const [sustainDown, setSustainDown] = useState(false);

  const activeNotesRef = useRef<Set<number>>(activeNotes);
  const sustainDownRef = useRef<Boolean>(sustainDown);

  // log my set
  useEffect(() => {
    console.log("Active notes:", Array.from(activeNotes));
  }, [activeNotes]);

  useEffect(() => {
    sustainDownRef.current = sustainDown;
  }, [sustainDown])

  useEffect(() => {
    console.log("Sustained notes:", Array.from(sustainedNotes));
  }, [sustainedNotes]);

  const handleNoteOn = useCallback((note: number) => {
    // console.log(note)
    setActiveNotes((prev) => {
      const next = new Set(prev);
      next.add(note);
      activeNotesRef.current = next;
      return next;
    });
  }, []);

  const handleNoteOff = useCallback((note: number) => {
    // console.log(note)
    setActiveNotes((prev) => {
      const next = new Set(prev);
      next.delete(note);
      activeNotesRef.current = next;
      return next;
    });
  }, []);

  const handleSustainChange = useCallback((down: boolean) => {
    setSustainDown(down);
    if (down) {
      setSustainedNotes(new Set(activeNotesRef.current));
    } else {
      setSustainedNotes(new Set());
    }
    console.log("Sustain pedal:", down ? "DOWN" : "UP");
  }, []);

  useMIDI(handleNoteOn, handleNoteOff, handleSustainChange);

  return (
    <div className="flex" style={{ width: pianoWidth }}>
      {Array.from({ length: noteCount }, (_, i) => {
        const noteId = firstNote + i;
        const isBlack = isBlackKey(noteId);
        const isActive = activeNotes.has(noteId);
        const isSustained = sustainedNotes.has(noteId);

        return (
          <Note
            key={noteId}
            width={isBlack ? blackKeyWidth : whiteKeyWidth}
            isBlack={isBlack}
            isActive={isActive}
            isSustained={isSustained}
            leftMargin={blackKeyLeftMargin}
            rightMargin={blackKeyRightMargin}
          />
        );
      })}
    </div>
  );
};

export default Piano;
