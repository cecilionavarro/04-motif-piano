import type { ReactNode } from "react";

export type PianoMode = "normal" | "touch";

export type VisualType = "none" | "active" | "sustained" | "target" | "correct" | "wrong";

export type NoteVisual = { type: VisualType }

export interface ModeAPI {
    handleNoteOn(note: number): void;
    handleNoteOff(note: number): void;
    handleSustainChange(down: boolean): void;
    getVisualFor(note: number): NoteVisual;

    hud?: ReactNode;
}