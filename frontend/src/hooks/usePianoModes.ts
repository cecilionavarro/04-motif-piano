import { useMemo } from "react";
import type { ModeAPI, PianoMode } from "../modes/types";
import { useNormalMode } from "../modes/useNormalMode";
import { useTouchMode } from "../modes/useTouchMode";

export function usePianoModes(mode: PianoMode, firstNote: number, lastNote: number): ModeAPI {
    const normal = useNormalMode();
    const touch = useTouchMode(firstNote, lastNote);

    const active: ModeAPI = useMemo<ModeAPI>(() => {
        switch (mode) {
            case "touch":
                return touch
            case "normal":
            default:
                return normal;
        }
    }, [mode, normal, touch]);
    return active
}