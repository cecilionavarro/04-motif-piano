import { useCallback, useEffect, useRef, useState } from "react";
import type { ModeAPI, NoteVisual } from "./types";

export function useNormalMode(): ModeAPI {
    const [activeNotes, setActiveNotes] = useState<Set<number>>(new Set());
    const [sustainedNotes, setSustainedNotes] = useState<Set<number>>(
        new Set()
    );
    const [sustainDown, setSustainDown] = useState(false);

    const activeNotesRef = useRef<Set<number>>(activeNotes);
    const sustainDownRef = useRef<Boolean>(sustainDown);

    // log my set
    useEffect(() => {
        // console.log("Active notes:", Array.from(activeNotes));
    }, [activeNotes]);

    useEffect(() => {
        sustainDownRef.current = sustainDown;
    }, [sustainDown]);

    useEffect(() => {
        // console.log("Sustained notes:", Array.from(sustainedNotes));
    }, [sustainedNotes]);

    const handleNoteOn = useCallback((note: number) => {
        // console.log(note)
        setActiveNotes((prev) => {
            const next = new Set(prev);
            next.add(note);
            activeNotesRef.current = next;
            return next;
        });

        setSustainedNotes((prev) => {
            if (!sustainDownRef.current) return prev;
            const next = new Set(prev);
            next.add(note);
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
        // console.log("Sustain pedal:", down ? "DOWN" : "UP");
    }, []);

    const getVisualFor = useCallback((note: number): NoteVisual => {
        if (activeNotes.has(note)) return { type: "active" };
        if (sustainedNotes.has(note)) return { type: "sustained" };
        return { type: "none" };
    }, [activeNotes, sustainedNotes]);

    return { handleNoteOn, handleNoteOff, handleSustainChange, getVisualFor };
}
