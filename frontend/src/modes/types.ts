import type { ReactNode } from "react";

export type PianoMode = "normal" | "touch";

export type NoteVisual =
    | { type: "none" }
    | { type: "active" }
    | { type: "sustained" }
    | { type: "target" }
    | { type: "correct" }
    | { type: "wrong" };

export interface ModeAPI {
    handleNoteOn(note: number): void;
    handleNoteOff(note: number): void;
    handleSustainChange(down: boolean): void;
    getVisualFor(note: number): NoteVisual;

    hud?: ReactNode;
}