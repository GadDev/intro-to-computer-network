"""Receive one small file over TCP on this computer."""

import hashlib
import socket
import struct
from pathlib import Path

ADDRESS = ("127.0.0.1", 5001)
HEADER = struct.Struct("!Q32s")
MAX_BYTES = 1024 * 1024
OUTPUT = Path("received-file.bin")


def read_exact(connection, size):
    """Keep reading until we have the requested number of bytes."""
    data = bytearray()
    while len(data) < size:
        piece = connection.recv(min(4096, size - len(data)))
        if not piece:
            raise EOFError("The client closed before all the bytes arrived.")
        data.extend(piece)
    return data


def main():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as listener:
        listener.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        listener.bind(ADDRESS)
        listener.listen(1)
        print("Waiting on 127.0.0.1:5001", flush=True)

        connection, _ = listener.accept()
        with connection:
            connection.settimeout(15)
            size, expected_hash = HEADER.unpack(read_exact(connection, HEADER.size))
            if size > MAX_BYTES:
                raise ValueError("This lab accepts files up to 1 MiB.")

            data = read_exact(connection, size)
            if hashlib.sha256(data).digest() != expected_hash:
                connection.sendall(b"\x00")
                raise ValueError("MISMATCH. The received bytes were not saved.")

            with OUTPUT.open("xb") as output:
                output.write(data)
            connection.sendall(b"\x01")
            print(f"OK. Saved {size} bytes to {OUTPUT}.")


if __name__ == "__main__":
    try:
        main()
    except (OSError, EOFError, ValueError) as error:
        raise SystemExit(f"Server: {error}") from None
