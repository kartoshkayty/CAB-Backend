import { Server } from "socket.io";
import { Server as HttpServer } from "http";

class Socket {
  private static io: Server | undefined;

  public static start(server: HttpServer) {
    this.io = new Server(server);

    this.io.on("connection", (socket: Socket) => {});
  }

  public static send(name: string, ...args: any) {
    if (!this.io) return;

    this.io.emit(name, ...args);
  }
}

export default Socket;