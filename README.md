# Pianiso
Pianiso (https://www.pianiso.com) is a browser-based keyboard piano app built with React (Vite + TypeScript + Tailwind) on the frontend. It connects to MIDI devices using the Web MIDI API and allows users to play, practice, and take note quizzes either by clicking keys on the screen or using their physical keyboard.

The goal is to make an accessible, fun, and modular piano experience that can later be extended with different modes and backend support.

## Features
* Virtual Piano – Clickable keys and keyboard input.
* MIDI Support – Detects connected MIDI devices and listens for note on / note off events.
* Multiple Modes – Modular hooks to support:
    * Normal Mode (useNormalMode)
    * Touch Typing Mode (useTouchMode)
    * Extendable via usePianoModes hook
* Note Quiz – Random target notes appear, and users must find them.
* Sustain Pedal – Supports sustain logic with color-coded active/sustained states.
* UI – Built with Tailwind, optimized for accessibility and clarity.

## Tech Stack
* Frontend: React + Vite + TypeScript + TailwindCSS
* Hooks: Custom React hooks for piano logic (useMIDI, usePianoModes)
* MIDI API: Web MIDI API with TypeScript types
* Deployment: Vercel
* Domain: pianiso.com (via Porkbun)
* Planned Backend: Java + Spring Boot

## Installation & Development
Clone the repository:
```
git clone https://github.com/cecilionavarro/04-pianiso.git
cd 04-pianiso/frontend
```
Install dependencies:
```
npm install
```
Run the development server:
```
npm run dev
```
Build for production:
```
npm run build
```
Serve production build locally:
```
npm run preview
```

## Deployment
Deployed with Vercel:
* Root Directory: frontend/
* Build Command: npm run build
* Output Directory: dist

Domain managed via Porkbun, using Vercel’s nameservers:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```
### Development Notes (Hackathon Log)
This project was built during a self-hackathon (Sept 23). Notes captured throughout the build:
- Frontend First: Started with React + Vite + Tailwind, later will add backend (Spring Boot).
- Core Piano: Built piano with white & black keys using dynamic calculations for widths and positions.
- Modes System: Created modular hooks (useNormalMode, useTouchMode, usePianoModes).
- UI/UX: Added mode selector component, tweaked UI for better presentation.
- Note Quiz: Implemented random note target generation with useEffect and useRef for accuracy.
- MIDI Integration: Used Web MIDI API, storing active notes in a Set, handling velocity, sustain pedal.
- Sustain Logic: Fixed sustain logic to prioritize active > sustained > default colors.
- Domain Setup: Bought pianiso.com via Porkbun, switched to Vercel DNS, site now live.

## Goals
- Build a working piano visualizer in the browser. (done)
- Add support for MIDI devices and sustain pedal. (done)
- Deploy live to pianiso.com. (done)
- Improve note quiz and user experience. (in progress)
- Explore user onboarding & sharing. (planned)
- Add backend with Java + Spring Boot for persistence and advanced features. (planned)

## Contributing
This is an early-stage prototype. Contributions, ideas, and feedback are welcome!
Open issues or PRs in the GitHub repo: https://github.com/cecilionavarro/04-pianiso.git

## License
MIT License © 2025 Cecilio Navarro