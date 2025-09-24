import { useMemo } from "react";
import type { ModeAPI, PianoMode } from "../modes/types";
import { useNormalMode } from "../modes/useNormalMode";

export function usePianoModes(mode: PianoMode): ModeAPI {
    const normal = useNormalMode();
    // const touch = useTouch(first)

    const active: ModeAPI = useMemo<ModeAPI>(() => {
        switch (mode) {
            // case PianoMode.Touch: return touch;
            case "normal":
            default:
                return normal;
        }
    }, [mode, normal]);
    return active
}