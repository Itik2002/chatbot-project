"use client";

import { useState } from "react";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = (text: string) => {
    setMessages((prev) => [...prev, { role: "user", content: text }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "This is a demo response" },
      ]);
    }, 400);
  };

  return (
    <div className="chat-page">
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} text={msg.content} />
        ))}
      </div>

      <ChatInput onSend={handleSend} />
    </div>
  );
}
