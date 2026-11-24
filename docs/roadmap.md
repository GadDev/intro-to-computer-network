# Introduction to Computer Networks — Roadmap

Planning draft · 24 November 2026 · Europe/Luxembourg

The [course repository](https://github.com/GadDev/intro-to-computer-network) is empty. The [coursework progress file](https://github.com/GadDev/binfo-networks-final-project/blob/main/PROGRESS.md) records the TCP and UDP implementations, experiments and figures as complete, with report, slides and final checks ahead. The course can draw on the existing work. The suggested slot for a UDP transfer under loss and reordering is two minutes within a 12-minute talk and three-minute Q&A. The report, slides and code are due 2 December at 23:59 Luxembourg time. The talk is on 3 December. [PDF pp.1–2, 7]

## Milestone 1 — Presentation companion by 30 November

**[ASSUMPTION — confirm] Build one directly accessible Assignment page with one interactive sequence.** Give the TCP baseline a plain-English walkthrough and a single diagram. The full Wireshark walkthrough can follow in a separate exercise or a rehearsed three-minute extended demo. Use the suggested TCP baseline slot for the short explanation and the two-minute demo slot for the real UDP run. [PDF p.7]

### Explain the TCP baseline in plain English

**[ASSUMPTION — confirm] Use one client/server diagram.** Present the flow from top to bottom. Show the connection opening, then the application's label and file in the forward direction, and the application's verdict in the return direction.

| Step | What to say |
| --- | --- |
| 1. Connect | The server waits on a port. The client connects, and the two computers perform the TCP handshake. |
| 2. Send the file label | The client sends the name, size in bytes and SHA-256 fingerprint of the original file. The size tells the server how many file bytes to read. |
| 3. Stream and save | The client sends the file. TCP delivers the bytes in order and handles retries for lost data. The server may read the bytes in smaller pieces, so it keeps reading until it has the announced size. It saves the file under a new name. |
| 4. Check and reply | The server calculates the fingerprint of the saved file. It compares it with the original fingerprint and sends back `OK` or `MISMATCH`, along with the fingerprint it calculated. |

A **TCP ACK** for file data confirms receipt of bytes by the receiving TCP stack. The application's **`OK`** confirms the saved file passed the SHA-256 comparison. In this implementation, the reply is 40 bytes: 8 for the status field and 32 for the raw SHA-256 fingerprint. The client sends the file bytes and the server sends the confirmation back. [PDF pp.2, 5] · [RFC 9293 §§2.2, 3.4–3.5](https://www.rfc-editor.org/rfc/rfc9293.html) · [Client](https://github.com/GadDev/binfo-networks-final-project/blob/main/tcp/tcp_client.py#L46) · [Server](https://github.com/GadDev/binfo-networks-final-project/blob/main/tcp/tcp_server.py#L85) · [Reply format](https://github.com/GadDev/binfo-networks-final-project/blob/main/tcp/protocol.py#L71)

**Learning check.** The client gets a TCP ACK for the last file bytes. What does the server application still need to do before it can report that the saved file matches the original?

### Two-minute walkthrough

| Time | Show | What to explain |
| --- | --- | --- |
| 0:00–0:25 | The app's illustrative sequence. Step from a missing DATA chunk to a retry. | Other chunks can arrive first. The sender tracks acknowledgments per chunk and can resend the missing one. |
| 0:25–1:35 | One rehearsed transfer using the student's existing Python program with Selective Repeat and both impairments enabled. Use a short recording as the default until live execution has been rehearsed on the presentation setup. | Show the settings and point to the evidence of a drop/retry and out-of-order arrival. Identify which observations come from the receiver trace or run outputs. |
| 1:35–2:00 | Original and received SHA-256 shown together with the recorded verdict. | The retry is a step in recovery. Matching hashes verify the reconstructed file for this run. |

[ASSUMPTION — confirm] Choose a small controlled transfer using the existing coursework commands. Try the 100 KB test file with 1,024-byte chunks and an explicit emulator seed as a starting point. Record only after the actual run demonstrates both impairments and matching hashes. Save the settings, receiver trace and verdict alongside a short local recording. Packet capture on the OS interface can still show a datagram that was subsequently dropped or delayed by the in-process emulator. Use the application trace or counters to demonstrate what the receiver actually processed. [PDF pp.4–7] · [Coursework README](https://github.com/GadDev/binfo-networks-final-project#how-to-run) · [UDP design](https://github.com/GadDev/binfo-networks-final-project/blob/main/docs/UDP_DESIGN.md)

### Build and rehearse

1. **24–26 November [ASSUMPTION — confirm] — Gather evidence and sketch one page.** Start by rehearsing the existing transfer and saving the evidence. Done when a single run can be explained from its exact settings, receiver trace and hash verdict and there is a readable still for PDF slides.
2. **27–28 November [ASSUMPTION — confirm] — Prototype the UDP sequence.** Build just the Assignment page with sender and receiver lanes, an event caption, step/replay/pause controls, static event list and an evidence panel. Done when keyboard and motion-free paths show the same steps and a beginner can follow the out-of-order arrival.
3. **29–30 November [ASSUMPTION — confirm] — Rehearse, cut and freeze.** Do two timed passes, one on the usual setup and one with network access disabled. Done when each fits two minutes, the hash can be read from the back of the room or in an equivalent display check, and there is a fallback you can open immediately. Rehearse the full talk against its 12-minute limit separately. [PDF p.7]

**[ASSUMPTION — confirm] Fallback ladder.** If the live transfer stalls, play the local recording. If venue internet is unavailable, use the built site served locally with its assets on the laptop. If the presentation machine only supports the PDF, use embedded stills of the real run and hash verdict. Include those stills in the submitted PDF because the slides are loaded in advance. If the report or slides are at risk, cut the prototype's motion first, then use a static sequence and recording. [PDF pp.2, 7]

### Navigation and reusable parts

| Destination [ASSUMPTION — confirm] | What it contains |
| --- | --- |
| `/assignment/` | First and only required page for the proposed demo. Anchors for Design, Demo and Results. Include the recording or stills, trace excerpt and hash verdict. Link the full results when approved. |
| `/learn/` | Course index and lesson pages. Each lesson links to the glossary and relevant exercise. |
| `/labs/wireshark/` | Guided capture inspection with a download, an annotated still and one trace-reading check. |
| `/glossary/` | Short definitions linked back to lessons. |

[ASSUMPTION — confirm] Reuse an event stepper, static event list, and evidence card. Give the classroom view stable positions, larger labels and one clear frame change per step. Apply Zentry-inspired pacing to short transitions after the teaching flow passes rehearsal. [Zentry](https://zentry.com/)

### Suggested interactions and learning checks

Each interaction and its milestone placement is **[ASSUMPTION — confirm]**.

| Interaction | Control and visual change | Static equivalent and learning check |
| --- | --- | --- |
| **Recover a missing UDP chunk** · first demo | Step, pause or replay. DATA #1 is dropped and DATA #2 arrives. The receiver writes #2 to its position and acknowledges it. With only one later ACK in this example, #1's timer expires and the sender retransmits #1. | Ordered event list with sender and receiver states. Ask “Which chunk is resent, and why can #2 stay where it is?” Feedback points to the missing ACK for #1 and the file position carried by the sequence number. The coursework can also retransmit early when enough later chunks are acknowledged. [Coursework README](https://github.com/GadDev/binfo-networks-final-project#udp-transfer) |
| **Open and close a TCP connection** · first course expansion | Step through SYN, SYN+ACK and ACK, then one example of a FIN/ACK exchange. Highlight the matching Wireshark rows and the direction of each event. | A frame/flag/direction table. Ask “Which frame acknowledges the server's SYN?” Explain the client’s final ACK using the direction and acknowledgment field. [RFC 9293 §§3.4–3.6](https://www.rfc-editor.org/rfc/rfc9293.html) |
| **Reassemble out-of-order chunks** · later assignment lab | Choose arrival-order append or sequence-position write for the same illustrative input (#0, #2, #1). Watch the file slots fill. | A side-by-side file-slot table. Ask “Could these files be the same length and still differ?” Explain that swapping chunks leaves the length intact while changing the bytes. [PDF pp.4–5] |

### Wireshark lab plan

[ASSUMPTION — confirm] After the presentation milestone, capture a small TCP loopback transfer from the existing coursework. Start capturing before the client connects. On macOS select the loopback interface (`lo0`) if both endpoints use `127.0.0.1`. With the coursework default port, use the display filter `tcp.port == 5001`, then isolate the chosen conversation with `tcp.stream == N` using its actual stream index. Inspect source/destination ports, SYN and ACK flags, relative Seq/Ack numbers and TCP payload length. Label the actual opening frames in the capture and show where file bytes follow. Explain how the receiver's log reports the file verdict separately. Include a small controlled capture and a static frame table. [Coursework README](https://github.com/GadDev/binfo-networks-final-project#how-to-run) · [Wireshark TCP fields](https://www.wireshark.org/docs/dfref/t/tcp.html) · [Wireshark display filters](https://www.wireshark.org/docs/wsug_html_chunked/ChWorkBuildDisplayFilterSection.html)

[ASSUMPTION — confirm] An optional second exercise uses `udp.port == 5002` with the coursework default port. Inspect the UDP ports and length first. Use the paper packet layout and annotated trace to identify the coursework's custom sequence number and DATA/ACK types. These application fields need a decoder or manual interpretation of the payload. [Wireshark UDP fields](https://www.wireshark.org/docs/dfref/u/udp.html) · [PDF p.3] · [UDP design](https://github.com/GadDev/binfo-networks-final-project/blob/main/docs/UDP_DESIGN.md)

### Assignment page evidence map

| Topic | What the PDF calls for | Proposed display [ASSUMPTION — confirm] |
| --- | --- | --- |
| Part A | TCP header, stream transfer, new output file, hash reply and transfer logging. [PDF p.2] | The plain-English diagram and, when available, one annotated capture or screenshot paired with the student's terminal verdict. |
| B1–B2 | Compare chunk size and pacing and document the measurements. [PDF p.3] | Link existing coursework plots with their configuration, unit and caption after the demo. |
| B3–B4 | Explain the chosen reliability scheme, measure recovery, and show how placement handles out-of-order arrival. [PDF p.4] | Use the class demonstration for the recovery story. Add a results card linked to the existing B3/B4 figures after source review. |
| Integrity and methodology | SHA-256 comparison, reproducible conditions, at least five runs per configuration and the assigned plots. [PDF pp.5–6] | Show the one demo run as such. Show repeated experiments separately, sourced to CSV and figure paths. [Coursework results summary](https://github.com/GadDev/binfo-networks-final-project/blob/main/plots/figures/summary.md) |

## Later milestones

1. **Transport fundamentals [ASSUMPTION — confirm].** Add client/server endpoints, ports, headers and payload, then TCP versus UDP. Done when the first two lessons each have a worked example, a labeled diagram, a short quiz with feedback and glossary cross-links.
2. **Wireshark and reliability [ASSUMPTION — confirm].** Publish the TCP trace lab, then add retransmission and reassembly exercises. Done when a beginner can isolate the example stream and identify the relevant frame, then explain one lost DATA example using the same vocabulary.
3. **Network path and measurement [ASSUMPTION — confirm].** Add IP addressing, routing, MTU, delay, loss and throughput through worked examples. Connect them to the published coursework findings that have traceable source data. Done when each example states its conditions and the learner can interpret one real plot and its units.

## Open decisions

- [OPEN] Confirm whether the presentation setup allows browser/terminal switching. Use the rehearsed PDF route if it does not.
- [OPEN] Decide which actual captures, clips and plots are suitable for publication.
- [OPEN] Choose public hosting and the ordering of lessons beyond the transport-first proposal.

## Assumptions to confirm

- [ASSUMPTION — confirm] Single-page companion and two-minute UDP-first presentation path, with TCP in the baseline section or the separate lab.
- [ASSUMPTION — confirm] One static TCP diagram and a learning check in the baseline section. Expand the diagram into a capture walkthrough in the Wireshark lab.
- [ASSUMPTION — confirm] Small seeded run and recordings-first rehearsal until live execution is proven on the presentation setup. Gather proof of both impairments and real hashes from that run.
- [ASSUMPTION — confirm] The dated work sequence, test passes, fallback order, proposed routes, shared components, pacing and later milestone scope.
- [ASSUMPTION — confirm] The proposed interaction, quiz, Wireshark lab and coursework evidence placements.
- [ASSUMPTION — confirm] Prototype the recovery stepper below and try the stated beginner learning check.

**First prototype.** A sender/receiver stepper where DATA #1 goes missing and DATA #2 arrives first. Before the retry, ask a beginner to point to the next chunk the sender should transmit and explain why #2 stays in its file slot. Then show a fresh example with different chunk numbers. The first usability signal is an unprompted correct prediction in that fresh example that mentions both the missing ACK and the receiver's use of sequence positions.
