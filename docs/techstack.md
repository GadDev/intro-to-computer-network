# Introduction to Computer Networks — Tech Stack

Planning draft · 24 November 2026 · Europe/Luxembourg

Fixed constraints are static course content, browser-side interactions and no database. Use the public course examples for practice and record your own coursework results. See [constitution.md](constitution.md) and [roadmap.md](roadmap.md).

## Compare the course architectures

Astro already uses Vite for development and builds. The choice is between Astro's content and routing conventions and assembling the site directly with Vite. Choose animation tooling separately. [Astro Vite configuration](https://docs.astro.build/en/reference/configuration-reference/#vite)

The site architecture remains **[OPEN]**. Resn's Zentry case study credits Nuxt/Vue with Vite and describes how the team built layered transitions with DOM elements, CSS and JavaScript. For this course, a useful reference is how the scene reveals one layer at a time and guides the reader's attention. [Resn interview about Zentry](https://www.commarts.com/project/37553/zentry)

| Need | Astro with TypeScript and CSS | Vite with vanilla TypeScript and CSS |
| --- | --- | --- |
| Fast first page | File-based pages and reusable page layouts. Add a TypeScript script to the affected component. [Astro pages](https://docs.astro.build/en/basics/astro-pages/) · [Astro scripts](https://docs.astro.build/en/guides/client-side-scripts/) | Start with one HTML entry and TypeScript module. As pages grow, define additional HTML build entries and maintain shared layout and navigation. [Vite multi-page build](https://vite.dev/guide/build.html#multi-page-app) |
| Lesson and glossary authoring | Built-in Markdown. Build-time content collections can add validation once content repeats. [Astro Markdown](https://docs.astro.build/en/guides/markdown-content/) · [Astro content collections](https://docs.astro.build/en/guides/content-collections/) | HTML is enough for the demo. If Markdown becomes a requirement here, choose a build-time renderer and assemble the lesson pages and index around it. [Vite production build](https://vite.dev/guide/build.html) |
| Packet diagrams and interactions | Render semantic HTML event lists and CSS-styled lanes. One small TypeScript enhancement handles the stepper. Astro supports client islands if richer interaction later earns a framework. [Astro scripts](https://docs.astro.build/en/guides/client-side-scripts/) · [Astro islands](https://docs.astro.build/en/concepts/islands/) | Use the same HTML, CSS and stepper logic as a plain module. Wire it to the relevant page with standard DOM events. The multi-page setup gives each chapter its own HTML entry. [Vite multi-page build](https://vite.dev/guide/build.html#multi-page-app) |
| Rich motion and shared state | Scope an optional GSAP timeline to a single scene. Astro can also mount a React component for a more involved lab. If adding Astro's client router, verify animation cleanup and initialization on route changes. [Astro islands](https://docs.astro.build/en/concepts/islands/) · [Astro navigation lifecycle](https://docs.astro.build/en/guides/view-transitions/#lifecycle-events) | Reuse the same timeline on a Vite page. React with Vite is a candidate if one persistent workspace must coordinate a simulator, packet inspector and exercises across views. That option needs its own decisions for routing and content authoring. [Vite build guide](https://vite.dev/guide/build.html) · [GSAP Timeline](https://gsap.com/docs/v3/GSAP/Timeline/) |
| Accessibility | Native controls, keyboard focus, motion preference, event captions and a static step list. | Use the same browser primitives and the same manual checks. [W3C pause guidance](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) · [MDN reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion) |
| Hosting and offline rehearsal | Static output can be deployed on GitHub Pages or served locally for rehearsal. A project site needs its repository base path configured. [Astro GitHub Pages](https://docs.astro.build/en/guides/deploy/github/) | Vite also produces static output. Its static deployment guide covers the project-site base path and local build preview. [Vite static deployment](https://vite.dev/guide/static-deploy.html) |

## Recommended stack for the first milestone

- **Astro static output [ASSUMPTION — confirm].** Use one Assignment page first. Astro supplies Markdown and routing for the course as it grows, while the initial demo uses a single page and one script. A vanilla Vite page is also viable if the scope becomes a single standalone companion. [Astro Markdown](https://docs.astro.build/en/guides/markdown-content/) · [Astro pages](https://docs.astro.build/en/basics/astro-pages/)
- **Vanilla TypeScript [ASSUMPTION — confirm].** Keep a fixed sequence of illustrated events and a small set of UI states for stepping, play, pause and reset. The same events produce the visible diagram caption and the static transcript. Use a quiz with explicit feedback when the lesson needs it. Consider React only when several interactions need the same complex state and repeated vanilla DOM wiring starts making them harder to maintain. [Astro scripts](https://docs.astro.build/en/guides/client-side-scripts/)
- **Semantic HTML and CSS [ASSUMPTION — confirm].** Lay out the sender and receiver as stable lanes with text labels and arrows. Use short transitions for the packet or the current highlight. The event index controls what the learner sees, so stepping works even with motion disabled. Compare this with a scoped timeline for the signature scene below. [MDN reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)
- **Local assets and static hosting [ASSUMPTION — confirm].** Build once, verify the intended deploy base path, then serve the output locally for an offline rehearsal. Keep the recording and PDF stills available as standalone files for the classroom route. GitHub Pages is a candidate public host. [Astro GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
- **Wireshark and existing Python tools [ASSUMPTION — confirm].** Use Wireshark to inspect the controlled trace and the existing Python coursework to produce real transfer evidence. Store only approved excerpts and settings in the app. A browser interaction reads the illustrative event sequence or displays recorded evidence without needing to start the transfer program. [Wireshark user guide](https://www.wireshark.org/docs/wsug_html_chunked/ChWorkBuildDisplayFilterSection.html)

## Zentry-inspired motion and prototype criteria

**[ASSUMPTION — confirm] One signature scene for the 30 November rehearsal.** Begin with both endpoint lanes visible. Send DATA #1 and briefly mark its drop on the path. Let DATA #2 reach the receiver, reveal its file slot, and show its ACK traveling back. Hold the frame with slot #1 still empty so the presenter can ask what happens next. End by highlighting the retry and filling the gap. This is an illustrative sequence whose pacing can be adjusted to the explanation. Keep the recorded transfer and its actual verdict as separate evidence.

| Candidate [OPEN] | When it serves the scene |
| --- | --- |
| CSS transitions with TypeScript, optionally using the Web Animations API | Start here if a few coordinated changes cover each teaching step. The browser API provides playback controls if a transition needs a real pause or restart. [MDN Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) |
| GSAP Timeline on the scene | Use if the packet, ACK, file slot and callout benefit from one playhead and named checkpoints for stepping and replay. Keep the event data and controls independent of the animation library. [GSAP Timeline](https://gsap.com/docs/v3/GSAP/Timeline/) |
| GSAP ScrollTrigger for a later course intro | Consider if scrolling through labeled stages helps self-paced reading. Keep the classroom view button-driven so the presenter can stop on the exact teaching moment. [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) |

**[ASSUMPTION — confirm] Use the same event sequence to judge both motion approaches.** Pause mid-flight, step both ways and replay. In each mode, the packet position, file slot and caption should agree at each checkpoint. The reduced-motion version should reach the same checkpoints instantly and offer the static sequence. Rehearse locally with internet access disabled and confirm the critical frame is legible at projector scale. Try it with a beginner: stop before the retry and see whether they can predict which chunk should be resent and why. Retain the approach that meets those checks with the simpler timing code.

**[ASSUMPTION — confirm] Revisit standalone Vite with React if the product becomes an interactive lab spanning several views with a shared live simulation and playhead.** Try a single React island in Astro if the persistent workspace fits on one route. Reconsider site architecture only if the prototype shows the majority of navigation needs that shared session. A richer timeline on one page fits either architecture. [Astro islands](https://docs.astro.build/en/concepts/islands/) · [Astro navigation lifecycle](https://docs.astro.build/en/guides/view-transitions/#lifecycle-events)

## Content organization

The paths and introduction order below are **[ASSUMPTION — confirm]**. Start with the Assignment page, one stepper sequence and the approved local evidence bundle. Introduce folders as their first content arrives.

| Proposed location | Format and purpose |
| --- | --- |
| `src/pages/assignment/index.astro` | Assignment page with links to design, demo and results. |
| `src/content/lessons/` | Markdown with title, objective, prerequisites, glossary references and source links. Add a schema once lessons share a stable pattern. |
| `src/content/glossary/` | One entry per concept with a plain-English definition, example and related lesson. |
| `src/content/quizzes/` | Local typed data with a prompt, choices or expected explanation, feedback and lesson reference. |
| `src/components/packet-stepper/` | Renderer and deterministic teaching scenarios. Each event supplies a direction, label, active chunk, state change and text caption. |
| `src/assets/diagrams/` | Static labeled diagrams for lessons and the motion-free view, with a figure caption or text equivalent. |
| `src/content/assignment/` | Evidence notes with run settings, capture interface and filter, frame or trace references, hash outcome and source paths. Commit a source revision alongside copied coursework figures. |
| `public/evidence/` | Files cleared for the intended audience, such as a small controlled capture, still or figure. Keep classroom-only clips beside the local presentation copy. |

## Verification for the proposed stack

**[ASSUMPTION — confirm]** For the first milestone, check the page directly on its deployed base path or equivalent local host, then serve the build over loopback with internet access disabled. Verify that resetting restores the first event, stepping never skips a state, and the static list conveys the same sequence. Run a keyboard and reduced-motion pass. Check that viewing the UDP evidence requires no external request on the chosen presentation setup. Compare displayed hashes and trace fragments to the actual run assets before adding them to slides.

## Open decisions

- [OPEN] Choose Astro's static course architecture or a standalone Vite application.
- [OPEN] Choose the public host and base path once publication scope is agreed.
- [OPEN] Confirm which recordings, captures and plots can be published.
- [OPEN] Choose CSS with optional browser animation controls or a scoped GSAP timeline after the signature scene comparison. Decide separately whether a later course intro needs scroll-driven motion.

## Assumptions to confirm

- [ASSUMPTION — confirm] Astro, TypeScript, semantic HTML and CSS as the recommended first setup, with richer client tooling added only when justified.
- [ASSUMPTION — confirm] The one-page content structure, static event data, local rehearsal path and staged file layout.
- [ASSUMPTION — confirm] The proposed evidence bundle, audience-specific asset placement and first-milestone verification checks.
- [ASSUMPTION — confirm] One Zentry-inspired packet scene for the rehearsal, with a pause at the missing file slot and the same checkpoints in each motion mode.
- [ASSUMPTION — confirm] Compare timing complexity, projector legibility and the learner's prediction before adding animation tooling. Revisit site architecture if most navigation needs one persistent simulation session.
