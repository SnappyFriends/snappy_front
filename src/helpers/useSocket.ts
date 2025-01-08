/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useCallback, useState } from "react";
import Cookies from "js-cookie";
import SocketService from "./socket";
import { Chats, GroupChats, IGroupMessage, IMessage } from "@/interfaces/types";
import { io, Socket } from "socket.io-client";

interface NotificationPayload {
  type:
    | "friend_request"
    | "message"
    | "post_reaction"
    | "comment"
    | "group_invitation"
    | "system"
    | "purchase";
  content: string;
  userId: string;
  friendRequestId?: string;
  messageId?: string;
  postId?: string;
  commentId?: string;
  groupId?: string;
  purchaseId?: string;
}

export const useSocket = (
  groupChat?: GroupChats | null,
  chat?: Chats | null,
  setMessages?: React.Dispatch<React.SetStateAction<IMessage[]>> | undefined,
  setGroupMessages?:
    | React.Dispatch<React.SetStateAction<IGroupMessage[]>>
    | undefined
) => {
  const token = Cookies.get("auth_token");
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const authToken = Cookies.get("auth_token");

    if (!authToken) {
      console.error("No auth token found in cookies");
      return;
    }

    // Retrasar la conexión del WebSocket
    const timeoutId = setTimeout(() => {
      socketRef.current = io(
        `${process.env.NEXT_PUBLIC_API_URL}/chat?token=${authToken}`,
        {
          auth: {
            token: authToken,
          },
          withCredentials: true,
          transports: ["websocket"],
        }
      );

      socketRef.current.on("connect", () => {
        console.log("WebSocket conectado");
      });

      socketRef.current.on("onlineUsers", (onlineUsersList) => {
        setOnlineUsers(onlineUsersList.map((user: any) => user.id));
      });

      socketRef.current.on("receivePrivateMessage", (newMessage) => {
        if (setMessages) {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      });

      socketRef.current.on("receiveGroupMessage", (newMessage) => {
        if (setGroupMessages) {
          setGroupMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      });

      if (chat) {
        socketRef.current.emit("join_chat", chat);
      }

      if (groupChat) {
        socketRef.current.emit("join_group_chat", groupChat);
      }

      socketRef.current.on("error", (error) => {
        console.error("Error de socket:", error);
      });
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [token, chat, setMessages, groupChat, setGroupMessages]);

  const sendNotification = useCallback((payload: NotificationPayload) => {
    if (socketRef.current) {
      socketRef.current.emit("notification", payload);
    }
  }, []);

  const sendMessage = useCallback((message: any) => {
    if (socketRef.current) {
      socketRef.current.emit("message", message);
    } else {
      console.error("Socket no está disponible");
    }
  }, []);

  const getOnlineUsers = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.emit("getOnlineUsers");
    }
  }, []);

  return { sendNotification, sendMessage, getOnlineUsers, onlineUsers };
};
