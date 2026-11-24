# Introduction to Computer Networks — Constitution

Planning draft · 24 November 2026 · Europe/Luxembourg

## Purpose and constraints

1. **Teach beginners.** Each lesson states one observable learning objective, introduces terms in plain English, and includes a worked example, a labeled diagram, and a short check with an explanation. Link new terms to the glossary where they first matter.
2. **Support the TCP vs UDP File Transfer presentation.** Keep a dedicated assignment area for the student's own design, packet captures and measurements with citations. Work toward the 30 November internal demo target. The assignment has a 2 December submission deadline at 23:59 Luxembourg time and a 3 December presentation. [PDF pp.1–2]
3. **Keep the application static.** Course content and evidence are files, interactions run in the browser, and the course has no database.
4. **Use motion to explain packet behavior.** Every interactive sequence exposes pause, replay and step controls. Provide a motion-free rendering of the same event sequence and feedback. Use Zentry as a reference for pacing and short transitions, while using original visual design and course assets. [Zentry](https://zentry.com/)
5. **Protect projector readability and keyboard access.** Key labels, directions and outcomes must be legible during rehearsal. Communicate loss, retransmission and success with text or shapes as well as color. Use keyboard-operable controls and visible focus. Honor the reduced-motion preference. [W3C pause guidance](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) · [MDN reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)

## Networking accuracy

- **Show which layer is acting.** In TCP, SYN, ACK and FIN are transport flags. A TCP ACK acknowledges progress in the byte stream. In this coursework, the UDP ACK identifies an application chunk. The file hash verdict is computed by the receiving application. Keep these labels visible in diagrams and exercises. [PDF pp.2–5] · [RFC 9293 §§3.4–3.6](https://www.rfc-editor.org/rfc/rfc9293.html) · [RFC 768](https://www.rfc-editor.org/rfc/rfc768.html) · [Coursework UDP design](https://github.com/GadDev/binfo-networks-final-project/blob/main/docs/UDP_DESIGN.md)
- **Keep the TCP stream and UDP datagram models accurate.** Teach application framing above TCP and preserve datagram boundaries in UDP examples. Review every simplified animation against the source protocol or the student's documented design. [PDF pp.2–4] · [RFC 9293 §3.9](https://www.rfc-editor.org/rfc/rfc9293.html#section-3.9) · [RFC 768](https://www.rfc-editor.org/rfc/rfc768.html)
- **Teach how to verify an interpretation.** Wireshark exercises name the filter, identify the packet fields that support the answer, and link each annotated observation to a frame in the controlled capture. [Wireshark display filtering](https://www.wireshark.org/docs/wsug_html_chunked/ChWorkBuildDisplayFilterSection.html)

## Assignment evidence

| What the app presents | What must be visible to the reader |
| --- | --- |
| Illustrative animation | An “Illustration” label and any simplification that changes how to interpret the sequence. |
| Real packet capture | A “Capture” label, capture interface and filter, and the frame numbers behind the key observations. Show receiver logs for drops or delivery order simulated inside the coursework application. |
| Recorded transfer | A “Recorded run” label, actual run settings and the observed hash verdict. If the run demonstrates loss and reordering, include evidence that both happened. [PDF pp.5, 7] |
| Measured results | The source run or configuration, units, sample count and error-bar definition where applicable, plus any relevant failure outcomes. Use the student's own runs. [PDF pp.5–6, 10] |

Use the assignment PDF to identify graded requirements. Cite the applicable page beside each requirement. For coursework that uses AI or online references, cite them in the report and be prepared to explain the code during Q&A. The student's own evidence supplies every measurement. [PDF pp.7, 10]

## Open decisions

- [OPEN] Confirm which clips, captures and plots will be approved for public publication. The demo can be rehearsed locally before this is decided.
- [OPEN] Confirm whether the presentation machine will allow a browser or terminal switch. The assignment's suggested recording is an available presentation route. [PDF p.7]

## Assumptions to confirm

- [ASSUMPTION — confirm] Use the course app as a presentation companion and keep the app build subordinate to the report, PDF slides and source submission. The smallest viable version is one presentation page with a UDP sequence and the student's real evidence. See [roadmap.md](roadmap.md).
