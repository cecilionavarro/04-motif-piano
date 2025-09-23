import { useEffect } from "react";

// call back functions called when I use the hook
export const useMIDI = (
    onNoteOn: (note: number) => void,
    onNoteOff: (note: number) => void,
    onSustainChange?: (down: boolean) => void
) => {
    useEffect(() => {
        // request for midi access
        if (navigator.requestMIDIAccess) {
            navigator.requestMIDIAccess().then((midiAccess) => {
                // loop through midiAccess
                // console.log(midiAccess);
                // for (let input of midiAccess.inputs.values()) {
                //     // console.log(input.name)
                //     input.onmidimessage = (message) => {
                //         // console.log(message.data)
                //         //destructure
                //         const [command, note, velocity] = message.data;

                //         if (command == 144 && velocity > 0) {
                //             onNoteOn(note);
                //         }
                //         if (
                //             command == 128 ||
                //             (command == 144 && velocity == 0)
                //         ) {
                //             onNoteOff(note);
                //         }
                //     };
                // }
                const firstInput = midiAccess.inputs.values().next().value;
                if (firstInput) {
                    firstInput.onmidimessage = (message) => {
                        const [command, note, velocity] = message.data;

                        if (command === 144 && velocity > 0) {
                            onNoteOn(note);
                        }
                        if (
                            command === 128 || (command === 144 && velocity === 0)
                        ) {
                            onNoteOff(note);
                        }
                        //sustain pedal
                        if (command === 176 && note === 64) {
                            if (onSustainChange) onSustainChange(velocity < 63);
                            return
                        }
                    };
                }
            });
        } else {
            console.warn("Web MIDI API not supported in this browser.");
        }
    }, [onNoteOn, onNoteOff, onSustainChange]);
};
