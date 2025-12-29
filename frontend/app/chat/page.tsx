"use client";

import { useState } from "react";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const sendMessage = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    const payload = {
      message: message
    };

    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // ⭐ MOST IMPORTANT
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setReply(data.reply);
  };

  return (
    <div>
      <h1>Chat</h1>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message"
      />

      <button onClick={sendMessage}>Send</button>

      <p>{reply}</p>
    </div>
  );
}
