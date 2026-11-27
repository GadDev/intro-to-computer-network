export interface PacketStep {
  title: string;
  detail: string;
  label: string;
  tone: "neutral" | "loss" | "data" | "ack";
  from: number;
  to: number;
  receiver: string;
  fileSlots?: [boolean, boolean];
}

export const tcpSteps: PacketStep[] = [
  {
    title: "The server is listening",
    detail:
      "The client wants to send a file. First, the two TCP endpoints open a connection.",
    label: "Ready",
    tone: "neutral",
    from: 12,
    to: 12,
    receiver: "Waiting for a connection",
  },
  {
    title: "The client sends SYN",
    detail:
      "The client starts the handshake and announces where its byte numbering begins.",
    label: "SYN",
    tone: "data",
    from: 12,
    to: 88,
    receiver: "Client’s starting number received",
  },
  {
    title: "The server replies SYN + ACK",
    detail:
      "The server acknowledges the client’s SYN and announces its own starting number.",
    label: "SYN + ACK",
    tone: "ack",
    from: 88,
    to: 12,
    receiver: "Waiting for the client’s ACK",
  },
  {
    title: "The client sends ACK",
    detail:
      "The client acknowledges the server’s SYN. The connection is ready to carry file bytes.",
    label: "ACK",
    tone: "ack",
    from: 12,
    to: 88,
    receiver: "Connection open",
  },
  {
    title: "The first piece is lost",
    detail:
      "A TCP segment carrying the first piece of the byte stream drops on the way.",
    label: "First bytes lost",
    tone: "loss",
    from: 12,
    to: 42,
    receiver: "First bytes missing",
  },
  {
    title: "Later bytes arrive early",
    detail:
      "The receiver can hold the later bytes while it waits for the gap to be filled.",
    label: "Later bytes",
    tone: "data",
    from: 12,
    to: 88,
    receiver: "Later bytes waiting · earlier bytes missing",
  },
  {
    title: "TCP fills the gap",
    detail:
      "The sender’s TCP stack retransmits the missing bytes. The receiving application reads the stream in order.",
    label: "Bytes resent",
    tone: "data",
    from: 12,
    to: 88,
    receiver: "First bytes, then later bytes",
  },
  {
    title: "The file transfer program replies",
    detail:
      "In this example, the server saves the file, checks its SHA-256 fingerprint, and sends its own OK verdict.",
    label: "File verdict: OK",
    tone: "ack",
    from: 88,
    to: 12,
    receiver: "The saved file passed the SHA-256 check",
  },
  {
    title: "The client sends FIN",
    detail:
      "The client signals that it has finished sending. The server can still send until it closes its own side.",
    label: "FIN",
    tone: "data",
    from: 12,
    to: 88,
    receiver: "Client has finished sending",
  },
  {
    title: "The server replies FIN + ACK",
    detail:
      "In this example, the server also has nothing left to send. It acknowledges the client’s FIN and sends its own FIN in the same segment.",
    label: "FIN + ACK",
    tone: "ack",
    from: 88,
    to: 12,
    receiver: "Server has finished sending",
  },
  {
    title: "The client sends the final ACK",
    detail:
      "The client confirms it received the server’s FIN. Both sides have finished sending.",
    label: "ACK",
    tone: "ack",
    from: 12,
    to: 88,
    receiver: "Server’s FIN acknowledged",
  },
];

export const udpSteps: PacketStep[] = [
  {
    title: "Three datagrams to send",
    detail:
      "UDP sends individual messages called datagrams. The sender can send #1, #2, then #3 without opening a connection first.",
    label: "Ready",
    tone: "neutral",
    from: 12,
    to: 12,
    receiver: "No datagrams yet",
  },
  {
    title: "Datagram #1 is lost",
    detail:
      "It drops in transit. The missing datagram stays missing unless the application sends it again.",
    label: "#1 dropped",
    tone: "loss",
    from: 12,
    to: 42,
    receiver: "No datagrams yet",
  },
  {
    title: "Datagram #2 is delayed",
    detail:
      "The network takes longer to deliver #2. The later datagram can take less time and arrive first.",
    label: "#2 delayed",
    tone: "neutral",
    from: 12,
    to: 55,
    receiver: "No datagrams yet",
  },
  {
    title: "Datagram #3 arrives first",
    detail:
      "UDP can hand #3 to the receiving program immediately, while #2 is still on the way.",
    label: "#3 arrives",
    tone: "data",
    from: 12,
    to: 88,
    receiver: "#3",
  },
  {
    title: "Datagram #2 arrives next",
    detail:
      "The program sees #3, then #2, and never gets #1 in this example. The datagram numbers are illustrative labels.",
    label: "#2 arrives",
    tone: "data",
    from: 55,
    to: 88,
    receiver: "#3 → #2 · #1 missing",
  },
];

export const udpRecoverySteps: PacketStep[] = [
  {
    title: "Two chunks to send",
    detail: "The receiver has a place for each numbered chunk in the file.",
    label: "Ready",
    tone: "neutral",
    from: 12,
    to: 12,
    receiver: "Waiting for both chunks",
    fileSlots: [false, false],
  },
  {
    title: "DATA #1 is lost",
    detail: "Chunk #1 drops in transit. Its file slot stays empty.",
    label: "#1 dropped",
    tone: "loss",
    from: 12,
    to: 42,
    receiver: "Waiting for both chunks",
    fileSlots: [false, false],
  },
  {
    title: "DATA #2 arrives",
    detail:
      "The receiving program uses the chunk number to place #2 in its own file slot.",
    label: "DATA #2",
    tone: "data",
    from: 12,
    to: 88,
    receiver: "Waiting for chunk #1",
    fileSlots: [false, true],
  },
  {
    title: "The receiver acknowledges #2",
    detail:
      "The file transfer program sends ACK #2. Which chunk still needs to be sent?",
    label: "ACK #2",
    tone: "ack",
    from: 88,
    to: 12,
    receiver: "Waiting for chunk #1",
    fileSlots: [false, true],
  },
  {
    title: "The sender retries DATA #1",
    detail:
      "The program’s timer for #1 expires. It resends #1, which fills the missing file slot.",
    label: "#1 retried",
    tone: "data",
    from: 12,
    to: 88,
    receiver: "Both chunks received",
    fileSlots: [true, true],
  },
  {
    title: "The receiver acknowledges #1",
    detail:
      "Both chunks are in place. A real transfer still compares the saved file’s SHA-256 with the original.",
    label: "ACK #1",
    tone: "ack",
    from: 88,
    to: 12,
    receiver: "Both chunks received · file check comes next",
    fileSlots: [true, true],
  },
];
