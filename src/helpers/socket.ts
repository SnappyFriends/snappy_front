import { io, Socket } from "socket.io-client";


class SocketService {
    private static instance: Socket | null = null

public static getInstance (): Socket {
    if (!this.instance) {
        this.instance = io(`${process.env.NEXT_PUBLIC_API_URL}/chats`, {
          auth: {
            token: typeof window !== 'undefined' 
              ? localStorage.getItem('token') 
              : null
          },
  
          withCredentials: true
        });
      }
      return this.instance;
    } 
}

export default SocketService

