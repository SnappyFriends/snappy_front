import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";

class SocketService {
  private static instance: Socket | null = null;

  public static getInstance(): Socket {
    const authToken = Cookies.get("auth_token");
    if (!authToken) {
      console.error("No auth token found in cookies");
    }
    if (!this.instance) {
      this.instance = io(
        `${process.env.NEXT_PUBLIC_API_URL}/chat?token=${authToken}`,
        {
          auth: {
            token: authToken,
          },

          withCredentials: true,
          transports: ["websocket"],
        }
      );
    }
    return this.instance;
  }
}

export default SocketService;
