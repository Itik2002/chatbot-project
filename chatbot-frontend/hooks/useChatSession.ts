import { useEffect, useState } from "react";

export function useChatSession() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const existing = localStorage.getItem("session_id");
    if (existing) {
      setSessionId(existing);
    } else {
      createSession();
    }
  }, []);

  async function createSession() {
    const res = await fetch("/api/session", { method: "POST" });
    const data = await res.json();
    localStorage.setItem("session_id", data.session_id);
    setSessionId(data.session_id);
  }

  return { sessionId };
}
