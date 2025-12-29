import { ChatMessage } from "@/types/chat";

export default function ChatMessages({
  messages,
}: {
  messages: ChatMessage[];
}) {
  return (
    <div>
      {messages.map((m) => (
        <div key={m.id} className={m.role}>
          {m.content}
        </div>
      ))}
    </div>
  );
}
