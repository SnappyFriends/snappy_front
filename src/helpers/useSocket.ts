import { useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import Cookies from 'js-cookie';

interface NotificationPayload {
  type: 'friend_request' | 'message' | 'post_reaction' | 'comment' | 'group_invitation' | 'system' | 'purchase';
  content: string;
  userId: string;
  friendRequestId?: string;
  messageId?: string;
  postId?: string;
  commentId?: string;
  groupId?: string;
  purchaseId?: string;
}

export const useSocket = () => {
  const  token  = Cookies.get("token");
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (token) {
      socketRef.current = io('http://localhost:3002/chats', {
        auth: { token },
        transports: ['websocket'],
      });

      socketRef.current.on('connect', () => {
        console.log('Conectado al servidor de websockets');
      });

      socketRef.current.on('error', (error: string) => {
        console.error('Error de socket:', error);
      });

      socketRef.current.on('friendRequestNotification', (data) => {
        console.log('Nueva solicitud de amistad:', data);
      });

      socketRef.current.on('messageNotification', (data) => {
        console.log('Nuevo mensaje:', data);
      });

      socketRef.current.on('postReactionNotification', (data) => {
        console.log('Nueva reacci贸n:', data);
      });

      socketRef.current.on('commentNotification', (data) => {
        console.log('Nuevo comentario:', data);
      });

      socketRef.current.on('groupInvitationNotification', (data) => {
        console.log('Nueva invitaci贸n a grupo:', data);
      });

      socketRef.current.on('purchaseNotification', (data) => {
        console.log('Nueva notificaci贸n de compra:', data);
      });

      socketRef.current.on('systemNotification', (data) => {
        console.log('Notificaci贸n del sistema:', data);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [token]);

  const sendNotification = useCallback((payload: NotificationPayload) => {
    if (socketRef.current) {
      socketRef.current.emit('notification', payload);
    }
  }, []);

  return { sendNotification };
}; 