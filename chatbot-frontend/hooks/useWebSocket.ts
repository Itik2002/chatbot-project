import { useEffect, useRef, useState } from "react";

export function useWebSocket(sessionId: string | null) {
  const socketRef = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!sessionId) return;

    const ws = new WebSocket(
      `ws://localhost:8000/ws/chat?session_id=${sessionId}`
    );

    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    ws.onerror = () => setConnected(false);

    socketRef.current = ws;

    return () => ws.close();
  }, [sessionId]);

  function sendMessage(payload: any) {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(payload));
    }
  }

  return { socket: socketRef.current, sendMessage, connected };
}
