import { useEffect, useRef } from "react";

// call back functions called when I use the hook
export const useMIDI = (
    onNoteOn: (note: number) => void,
    onNoteOff: (note: number) => void,
    onSustainChange?: (down: boolean) => void
) => {
    const onNoteOnRef = useRef(onNoteOn);
    const onNoteOffRef = useRef(onNoteOff);
    const onSustainChangeRef = useRef(onSustainChange);
    useEffect(() => {
        onNoteOnRef.current = onNoteOn;
    }, [onNoteOn]);
    useEffect(() => {
        onNoteOffRef.current = onNoteOff;
    }, [onNoteOff]);
    useEffect(() => {
        onSustainChangeRef.current = onSustainChange;
    }, [onSustainChange]);

    useEffect(() => {
        // request for midi access
        if (!navigator.requestMIDIAccess) {
            console.warn("Web MIDI API not supported in this browser.");
            return;
        }

        // let firstInput: WebMidi.MIDIInput | null = null;

        const handleMessage = (message: WebMidi.MIDIMessageEvent) => {
            const [command, note, velocity] = message.data;

            if (command === 144 && velocity > 0) {
                onNoteOnRef.current?.(note);
                return;
            }

            if (command === 128 || (command === 144 && velocity === 0)) {
                onNoteOffRef.current?.(note);
                return;
            }

            if (command === 176 && note === 64) {
                onSustainChangeRef.current?.(velocity >= 63);
                return;
            }
        };
        navigator.requestMIDIAccess().then((midiAccess) => {
            for (let input of midiAccess.inputs.values()) {
                console.log("Listening to MIDI device:", input.name);
                input.onmidimessage = handleMessage
            }
        })

        // navigator.requestMIDIAccess().then((midiAccess) => {
        //     const it = midiAccess.inputs.values();
        //     firstInput = it.next().value ?? null;
        //     if (firstInput) {
        //         firstInput.onmidimessage = handleMessage;
        //     }
        // });
    }, []);
};

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

// const firstInput = midiAccess.inputs.values().next().value;
// if (firstInput) {
//     firstInput.onmidimessage = (message) => {
//         const [command, note, velocity] = message.data;

//         if (command === 144 && velocity > 0) {
//             onNoteOn(note);
//         }
//         if (
//             command === 128 ||
//             (command === 144 && velocity === 0)
//         ) {
//             onNoteOff(note);
//         }
//         //sustain pedal
//         if (command === 176 && note === 64) {
//             if (onSustainChange) onSustainChange(velocity < 63);
//             return;
//         }
//     };
// }
