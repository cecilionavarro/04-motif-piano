import { useCallback, useEffect, useRef, useState } from "react";
import type { ModeAPI, NoteVisual } from "./types";

const randomNote = (firstNote: number, lastNote: number) => {
    return Math.floor(Math.random() * (firstNote - lastNote + 1) + lastNote)
};

export function useTouchMode(firstNote: number, lastNote: number): ModeAPI {
    const [target, setTarget] = useState<number>();
    const targetRef = useRef<number | undefined>(target);

    useEffect(() => {
        targetRef.current = target;
    }, [target])

    const getNewTarget = useCallback((previous?: number) => {
        let lower: number = firstNote
        let upper: number = lastNote
        if (previous) {
            lower = previous - 10
            upper = previous + 10
            if (lower < firstNote) lower = firstNote
            if (upper > lastNote) upper = lastNote
        }
        let next = randomNote(lower, upper)
        while (next === previous) {
            next = randomNote(lower, upper)
        }
        setTarget(next)
    }, [firstNote, lastNote])
    
    useEffect(() => {
        getNewTarget();
    }, [])


    const handleNoteOn = useCallback((note: number) => {
        const current = targetRef.current
        console.log("note: ", note)
        // console.log("target: ", current)
        if (current != null && note === current) {
            console.log("hey you found the note!", note, "===", current)
            getNewTarget(current);
        }
    }, [getNewTarget]);

    const handleNoteOff = () => {
        // console.log("off");
    };

    const handleSustainChange = () => {
        // console.log("sus");
    };

    const getVisualFor = useCallback((note: number): NoteVisual => {
        if (target === note) return { type: "target" }
        // console.log("visual");
        return { type: "none" };
    }, [target]);

    return { handleNoteOn, handleNoteOff, handleSustainChange, getVisualFor };
}
