import type { PacketStep } from "./packet-lessons";

type ProtocolId = "stop-and-wait" | "go-back-n" | "selective-repeat";

type Protocol = {
  id: ProtocolId;
  name: string;
  summary: string;
  analogy: string;
  inFlight: string;
  receiver: string;
  resend: string;
  extraResends: string;
  tradeoff: string;
  timeline: PacketStep[];
};

function step(
  title: string,
  detail: string,
  label: string,
  tone: PacketStep["tone"],
  receiver: string,
): PacketStep {
  return {
    title,
    detail,
    label,
    tone,
    receiver,
    from: tone === "ack" ? 88 : 12,
    to: tone === "loss" ? 42 : tone === "ack" || tone === "neutral" ? 12 : 88,
  };
}

const lost = step(
  "Packet #5 is lost",
  "The first attempt drops in transit.",
  "#5 lost",
  "loss",
  "Packets #1–4 delivered",
);

export const protocols: Protocol[] = [
  {
    id: "stop-and-wait",
    name: "Stop-and-Wait",
    summary:
      "Send one packet and wait for its acknowledgement (ACK). If the ACK does not arrive before the timeout, resend the packet. The sender moves on after receiving the ACK.",
    analogy: "Send a text and wait for “received” before sending the next one.",
    inFlight: "1",
    receiver: "Accepts the expected packet",
    resend: "5. Packets 6–8 have not been sent yet.",
    extraResends: "0",
    tradeoff: "Simple. Idle while waiting for each round trip.",
    timeline: [
      step(
        "One slot is available",
        "The sender can have one unacknowledged packet at a time.",
        "Ready",
        "neutral",
        "Packets #1–4 delivered",
      ),
      lost,
      step(
        "The sender waits",
        "#6–8 stay queued at the sender because #5 has no ACK yet.",
        "Wait for ACK",
        "neutral",
        "Still waiting for #5",
      ),
      step(
        "Timeout: resend #5",
        "The retry arrives. #6–8 are still queued until the recovery ACK comes back.",
        "Retry #5",
        "data",
        "#5 delivered",
      ),
      step(
        "ACK #5 opens the next slot",
        "The sender can now send #6. It will handle #7 and #8 the same way.",
        "ACK #5",
        "ack",
        "#5 delivered · #6 is next",
      ),
    ],
  },
  {
    id: "go-back-n",
    name: "Go-Back-N",
    summary:
      "Keep up to N packets unacknowledged. The receiver accepts packets in order and acknowledges the last packet received in order. When the oldest unacknowledged packet times out, the sender resends the packets it has already sent that remain unacknowledged.",
    analogy:
      "A teacher discards pages 6–8 while page 5 is missing. You hand in pages 5–8 again.",
    inFlight: "Up to N",
    receiver: "Discards out-of-order packets in the textbook model",
    resend: "5–8, the outstanding packets",
    extraResends: "3 · packets 6–8",
    tradeoff: "Keeps the link busy. A loss can cause extra retransmissions.",
    timeline: [
      step(
        "Four slots are available",
        "The sender can transmit #5 through #8 before it gets another ACK.",
        "Window: 4",
        "neutral",
        "Packets #1–4 delivered",
      ),
      lost,
      step(
        "Packets #6–8 arrive",
        "The receiver discards them because it is still expecting #5.",
        "#6–8 arrive",
        "data",
        "#6–8 discarded",
      ),
      step(
        "The receiver repeats ACK #4",
        "This is a cumulative ACK. It confirms delivery through #4 without advancing the sender’s window.",
        "ACK #4",
        "ack",
        "Still waiting for #5",
      ),
      step(
        "Timeout: resend #5–8",
        "Each outstanding packet is retried in order. #6–8 travel again even though the first copies arrived.",
        "Retry #5–8",
        "data",
        "#5–8 delivered in order",
      ),
    ],
  },
  {
    id: "selective-repeat",
    name: "Selective Repeat",
    summary:
      "Keep up to N packets unacknowledged. The receiver holds out-of-order packets within its window and acknowledges them individually. The sender tracks each outstanding packet and retries it if its timer expires.",
    analogy:
      "A teacher holds onto pages 6–8 while you find page 5, then puts everything in order.",
    inFlight: "Up to N",
    receiver: "Holds out-of-order packets within its window",
    resend: "5. The receiver kept 6–8.",
    extraResends: "0",
    tradeoff:
      "Saves retransmissions in this scenario. Needs more receiver storage and sender bookkeeping.",
    timeline: [
      step(
        "Four slots are available",
        "The sender can transmit #5 through #8 before it gets another ACK.",
        "Window: 4",
        "neutral",
        "Packets #1–4 delivered",
      ),
      lost,
      step(
        "Packets #6–8 arrive",
        "The receiver holds them until the gap is filled.",
        "#6–8 arrive",
        "data",
        "#6–8 buffered",
      ),
      step(
        "The receiver ACKs each packet",
        "Individual ACKs for #6, #7 and #8 tell the sender which packets were received.",
        "ACKs #6–8",
        "ack",
        "#6–8 buffered",
      ),
      step(
        "Timeout: resend #5",
        "#5 is the only packet still waiting for an ACK. Its arrival fills the gap so #5–8 can be delivered in order.",
        "Retry #5",
        "data",
        "#5–8 delivered in order",
      ),
    ],
  },
];

type LessonBlock =
  | { component: "ProtocolComparison" }
  | { component: "PacketReplay"; protocol: ProtocolId };

// The lesson spec can only name components and protocol data owned by the course.
export const reliabilityLesson: LessonBlock[] = [
  { component: "ProtocolComparison" },
  { component: "PacketReplay", protocol: "stop-and-wait" },
  { component: "PacketReplay", protocol: "go-back-n" },
  { component: "PacketReplay", protocol: "selective-repeat" },
];
