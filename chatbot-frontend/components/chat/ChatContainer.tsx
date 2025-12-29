"use client";

import { useChatSession } from "@/hooks/useChatSession";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useChatMessages } from "@/hooks/useChatMessages";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

export default function ChatContainer() {
  const { sessionId } = useChatSession();
  const { socket, sendMessage } = useWebSocket(sessionId);
  const { messages, addUserMessage, addAssistantChunk } =
    useChatMessages();

  if (socket) {
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "stream") {
        addAssistantChunk(data.content);
      }
    };
  }

  function handleSend(text: string) {
    addUserMessage(text);
    sendMessage({ message: text });
  }

  return (
    <div className="chat-container">
      <ChatMessages messages={messages} />
      <ChatInput onSend={handleSend} />
    </div>
  );
}
