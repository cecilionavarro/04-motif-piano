import { useState } from "react";
import Note from "./Note";
import { useMIDI } from "../hooks/useMIDI";
import type { PianoMode } from "../modes/types";
import { usePianoModes } from "../hooks/usePianoModes";
import PianoModeSelect from "./PianoModeSelect";

const firstNote = 28;
const lastNote = 105;
const noteCount = lastNote - firstNote + 1;
const blackKeys = new Set([1, 3, 6, 8, 10]);

const isBlackKey = (noteId: number) => {
  return blackKeys.has(noteId % 12);
};

const whiteKeyCount = Array.from(
  { length: noteCount },
  (_, i) => firstNote + i
).filter((noteId) => !isBlackKey(noteId)).length;

const pianoWidth = 1650;
const whiteKeyWidth = pianoWidth / whiteKeyCount;
const blackKeyWidth = whiteKeyWidth * 0.5;
const blackKeyLeftMargin = blackKeyWidth / 2;
const blackKeyRightMargin = blackKeyWidth / 2;

const Piano = () => {
  const [mode, setMode] = useState<PianoMode>("normal");
  const activeMode = usePianoModes(mode, firstNote, lastNote);

  useMIDI(
    activeMode.handleNoteOn,
    activeMode.handleNoteOff,
    activeMode.handleSustainChange
  );

  return (
    // keyboard
    <div className="flex flex-col gap-5">
      <PianoModeSelect value={mode} onChange={setMode}/>
      <div className="flex border rounded-sm" style={{ width: pianoWidth }}>
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
              visual={activeMode.getVisualFor(noteId)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Piano;
