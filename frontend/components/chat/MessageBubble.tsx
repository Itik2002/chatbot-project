export default function MessageBubble({
  role,
  text,
}: {
  role: "user" | "assistant";
  text: string;
}) {
  return (
    <div className={`message-row ${role}`}>
      <div className="message-bubble">{text}</div>
    </div>
  );
}
