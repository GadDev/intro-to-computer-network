"""Send three practice datagrams between two sockets on this computer."""

from socket import AF_INET, SOCK_DGRAM, socket


def main():
    with socket(AF_INET, SOCK_DGRAM) as client, socket(AF_INET, SOCK_DGRAM) as server:
        server.bind(("127.0.0.1", 5002))
        client.bind(("127.0.0.1", 40001))
        client.settimeout(3)
        server.settimeout(3)

        client.sendto(b"PING", server.getsockname())
        message, sender = server.recvfrom(1024)
        print(f"Server received {message.decode()} from port {sender[1]}")
        server.sendto(b"PONG", sender)
        reply, sender = client.recvfrom(1024)
        print(f"Client received {reply.decode()} from port {sender[1]}")

        client.sendto(b"BYE", server.getsockname())
        message, sender = server.recvfrom(1024)
        print(f"Server received {message.decode()} from port {sender[1]}; no reply")


if __name__ == "__main__":
    main()
