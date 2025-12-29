"use client";

export default function ChatHome() {
  return (
    <div className="chat-home">
      <div className="chat-center">
        <h1>Hello, how can I help you?</h1>
      </div>

      <div className="chat-input">
        <input placeholder="Ask anything" disabled />
        <button disabled>➤</button>
      </div>
    </div>
  );
}
