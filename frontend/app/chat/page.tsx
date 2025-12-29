// "use client";

// import { useState } from "react";

// export default function ChatPage() {
//   const [message, setMessage] = useState("");
//   const [reply, setReply] = useState("");

//   const sendMessage = async () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("Please login first");
//       return;
//     }

//     const payload = {
//       message: message
//     };

//     const res = await fetch("http://localhost:8000/chat", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}` // ⭐ MOST IMPORTANT
//       },
//       body: JSON.stringify(payload),
//     });

//     const data = await res.json();
//     setReply(data.reply);
//   };

//   return (
//     <div>
//       <h1>Chat</h1>

//       <input
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type message"
//       />

//       <button onClick={sendMessage}>Send</button>

//       <p>{reply}</p>
//     </div>
//   );
// }

"use client";

import { useState } from "react";

export default function ChatPage() {
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const payload = {
      request_id: "req_" + Date.now(),
      conversation_id: "conv_123",
      user_id: "user_42",

      message: {
        role: "user",
        content: input
      },

      recent_messages: [
        { role: "user", content: "What is caching?" },
        { role: "assistant", content: "Caching is storing data..." }
      ],

      session: {
        started_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString()
      },

      constraints: {
        max_tokens: 4000,
        response_style: "chat"
      }
    };

    await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // later JWT yahin lagega
        // "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify(payload)
    });

    setInput("");
  };

  return (
    <>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={sendMessage}>Send</button>
    </>
  );
}
