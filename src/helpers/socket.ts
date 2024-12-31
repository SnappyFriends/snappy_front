import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";

class SocketService {
  private static instance: Socket | null = null;

  public static getInstance(): Socket {
    if (!this.instance) {
      this.instance = io(`${process.env.NEXT_PUBLIC_API_URL}`, {
        auth: {
          token:
            typeof window !== "undefined" ? Cookies.get("auth_token") : null,
        },

        withCredentials: true,
      });
    }
    return this.instance;
  }
}

export default SocketService;
