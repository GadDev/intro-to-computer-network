"""Send one small file to the lab's TCP server."""

import hashlib
import socket
import struct
import sys
from pathlib import Path

ADDRESS = ("127.0.0.1", 5001)
HEADER = struct.Struct("!Q32s")
MAX_BYTES = 1024 * 1024


def main(path):
    with path.open("rb") as source:
        data = source.read(MAX_BYTES + 1)
    if len(data) > MAX_BYTES:
        raise ValueError("This lab accepts files up to 1 MiB.")

    fingerprint = hashlib.sha256(data).digest()
    header = HEADER.pack(len(data), fingerprint)

    with socket.create_connection(ADDRESS, timeout=15) as connection:
        connection.sendall(header)
        connection.sendall(data)
        reply = connection.recv(1)

    if reply == b"\x00":
        raise ValueError("MISMATCH. The server received different bytes.")
    if reply != b"\x01":
        raise ValueError("The transfer was not confirmed by the server.")
    print(f"OK. The server saved {len(data)} bytes.")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("Usage: python3 client.py FILE")
    try:
        main(Path(sys.argv[1]))
    except (OSError, ValueError) as error:
        raise SystemExit(f"Client: {error}") from None
