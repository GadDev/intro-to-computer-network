import { useState } from "react";

export default function ChunkOrder() {
  const [byNumber, setByNumber] = useState(false);

  return (
    <figure className="learning-island">
      <figcaption>
        <h3>Rebuild the file</h3>
        <p>
          The original file is <code>ABC</code>. Chunks arrive as{" "}
          <code>A, C, B</code>. Choose how the receiver writes them.
        </p>
      </figcaption>
      <div
        className="island-controls"
        role="group"
        aria-label="File reconstruction method"
      >
        <button
          type="button"
          aria-pressed={!byNumber}
          onClick={() => setByNumber(false)}
        >
          By arrival order
        </button>
        <button
          type="button"
          aria-pressed={byNumber}
          onClick={() => setByNumber(true)}
        >
          By chunk number
        </button>
      </div>
      <p className="island-status" role="status">
        Received file:{" "}
        <strong>
          <code>{byNumber ? "ABC" : "ACB"}</code>
        </strong>
        .{" "}
        {byNumber
          ? "Each chunk goes into its original slot."
          : "The file has the right length, but the bytes are in the wrong order."}
      </p>
    </figure>
  );
}
