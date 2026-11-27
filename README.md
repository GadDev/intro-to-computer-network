# Introduction to Computer Networks

A beginner-friendly course and presentation companion for the TCP vs UDP File Transfer project.

The first page explains the TCP file transfer and includes animations for TCP connection and recovery, UDP loss and reordering, and Selective Repeat recovery. The assignment section explains what to build, test, submit, and learn. A glossary links the lessons to short definitions. The course uses Astro, TypeScript, and CSS and works locally after the static build.

The Wireshark lab at `/labs/wireshark/` includes a downloadable nine-frame capture, a frame-by-frame reference table, and questions with feedback. The TCP sample records a controlled five-byte exchange using the smoltcp TCP stack. The UDP lab at `/labs/wireshark/udp/` includes a constructed practice capture and a downloadable loopback script. Both labs show how to capture and interpret your own traffic.

The Python lab at `/labs/tcp-file-transfer/` walks through a local transfer using downloadable client and server scripts. It explains the TCP stream, exact-length reads, and the application's file receipt.

The demo series at `/tutorials/tcp-demo/` links to separate guides for a two-minute rehearsal, a phone-hotspot transfer, Docker, a client dashboard, and a private remote server.

The reliability comparison uses the [component catalog pattern](https://daily-ai-pulse-db253.web.app/guides/generative-ui-architecture-map/). A typed local lesson specification lists the comparison table and packet replays. Astro renders those approved components at build time. The lesson has no runtime model dependency and works offline.

## Run locally

Use Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Run `npm run check` for type checks. For an offline rehearsal, run `npm run build` and `npm run preview`, then open the local address printed by Astro.

Run `npm run lint` for Astro and TypeScript linting, `npm run format` to format frontend source, or `npm run format:check` to check formatting.

## Claude Code skills

The project includes [Grill Me and Grilling](https://github.com/mattpocock/skills/tree/6f7f7831a625f040a8e06a0e7954826b87ce775a/skills/productivity) for design decisions, [Frontend Design](https://github.com/anthropics/skills/tree/e4bb5d960d87126ff3b3a8af1a104b7db67560ba/skills/frontend-design) for visual implementation, and [Web Design Guidelines](https://github.com/vercel-labs/agent-skills/tree/5a37a6329fbad3666c3207392a6a7c0110e92efb/skills/web-design-guidelines) for accessibility and UX reviews. The pinned project copies live in `.claude/skills/`.

## Planning

- [Constitution](docs/constitution.md)
- [Roadmap](docs/roadmap.md)
- [Tech stack](docs/techstack.md)

The animations are illustrative. The course examples are for practice.
