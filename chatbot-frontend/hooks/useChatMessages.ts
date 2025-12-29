import { useState } from "react";
import { ChatMessage } from "@/types/chat";
import { v4 as uuid } from "uuid";

export function useChatMessages() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  function addUserMessage(text: string) {
    setMessages((prev) => [
      ...prev,
      { id: uuid(), role: "user", content: text },
    ]);
  }

  function addAssistantChunk(chunk: string) {
    setMessages((prev) => {
      const last = prev[prev.length - 1];
      if (last?.role === "assistant") {
        return [
          ...prev.slice(0, -1),
          { ...last, content: last.content + chunk },
        ];
      }
      return [...prev, { id: uuid(), role: "assistant", content: chunk }];
    });
  }

  return { messages, addUserMessage, addAssistantChunk };
}
