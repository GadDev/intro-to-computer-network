# Introduction to Computer Networks

A beginner-friendly course and presentation companion for the TCP vs UDP File Transfer project.

The first page explains the TCP file transfer and includes animations for TCP connection and recovery, UDP loss and reordering, and Selective Repeat recovery. The assignment section explains what to build, test, submit, and learn. A glossary links the lessons to short definitions. The course uses Astro, TypeScript, and CSS and works locally after the static build.

## Run locally

Use Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Run `npm run check` for type checks. For an offline rehearsal, run `npm run build` and `npm run preview`, then open the local address printed by Astro.

## Planning

- [Constitution](docs/constitution.md)
- [Roadmap](docs/roadmap.md)
- [Tech stack](docs/techstack.md)

The animations are illustrative. Consult the [coursework repository](https://github.com/GadDev/binfo-networks-final-project) for the transfer programs and measured results.
