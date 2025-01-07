/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useCallback } from "react";
import Cookies from "js-cookie";
import SocketService from "./socket";

export const useSocket = () => {
  const token = Cookies.get("auth_token");
  const socketRef = useRef<ReturnType<typeof SocketService.getInstance> | null>(
    null
  );

  useEffect(() => {
    if (token && !socketRef.current) {
      const socket = SocketService.getInstance();
      socketRef.current = socket;

      socket.on("connect", () => {
        console.log("Conectado al servidor de websockets");
      });

      socket.on("error", (error: string) => {
        console.error("Error de socket:", error);
      });

      socket.on("friendRequestNotification", (data) => {
        console.log("Nueva solicitud de amistad:", data);
      });

      socket.on("messageNotification", (data) => {
        console.log("Nuevo mensaje:", data);
      });

      socket.on("postReactionNotification", (data) => {
        console.log("Nueva reacción:", data);
      });

      socket.on("commentNotification", (data) => {
        console.log("Nuevo comentario:", data);
      });

      socket.on("groupInvitationNotification", (data) => {
        console.log("Nueva invitación a grupo:", data);
      });

      socket.on("purchaseNotification", (data) => {
        console.log("Nueva notificación de compra:", data);
      });

      socket.on("systemNotification", (data) => {
        console.log("Notificación del sistema:", data);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [token]);

  const sendNotification = useCallback((payload: any) => {
    if (socketRef.current) {
      socketRef.current.emit("notification", payload);
    }
  }, []);

  return { sendNotification };
};
