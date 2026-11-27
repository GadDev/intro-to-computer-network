import { useState } from "react";

const message = "HELLO";

export default function ByteReader() {
  const [offset, setOffset] = useState(0);
  const [lastRead, setLastRead] = useState("");
  const remaining = message.length - offset;

  function read() {
    const piece = message.slice(offset, offset + 2);
    setLastRead(piece);
    setOffset(offset + piece.length);
  }

  return (
    <figure className="learning-island">
      <figcaption>
        <h3>Try a short read</h3>
        <p>
          In this simulation, each read returns up to two bytes. Read the
          five-byte file and watch the server’s count.
        </p>
      </figcaption>
      <ol className="byte-slots" aria-label="Five file bytes">
        {Array.from(message, (byte, index) => (
          <li
            key={index}
            data-received={index < offset}
            aria-label={
              index < offset
                ? `Byte ${index + 1}: ${byte}`
                : `Byte ${index + 1}: waiting`
            }
          >
            {index < offset ? byte : "·"}
          </li>
        ))}
      </ol>
      <p className="island-status" role="status">
        {lastRead && (
          <>
            Last read: <code>{lastRead}</code>.{" "}
          </>
        )}
        {remaining
          ? `${remaining} bytes still to read.`
          : "All five bytes arrived. The server can now check the hash."}
      </p>
      <div className="island-controls">
        <button
          type="button"
          className="primary"
          onClick={read}
          disabled={!remaining}
        >
          Read next bytes
        </button>
        <button
          type="button"
          onClick={() => {
            setOffset(0);
            setLastRead("");
          }}
        >
          Reset
        </button>
      </div>
    </figure>
  );
}
