import { useEffect, useState } from "react";
import type { Message } from "../types/message";
import { simulateBotResponse } from "../services/mockApi";
import { MessageQueue } from "../utils/messageQueue";

const queue = new MessageQueue();

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("chat-history");
    if (stored) setMessages(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("chat-history", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = (text: string) => {
    const id = crypto.randomUUID();

    const userMessage: Message = {
      id,
      text,
      sender: "user",
      timestamp: Date.now(),
      status: "sent",
    };

    setMessages((prev) => [...prev, userMessage]);

    queue.enqueue(async () => {
      try {
        setTyping(true);

        const botId = crypto.randomUUID();
        let botText = "";

        setMessages((prev) => [
          ...prev,
          {
            id: botId,
            text: "",
            sender: "bot",
            timestamp: Date.now(),
          },
        ]);

        await simulateBotResponse(text, (chunk) => {
          botText += chunk;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botId ? { ...msg, text: botText } : msg
            )
          );
        });

        setTyping(false);
      } catch {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === id ? { ...msg, status: "failed" } : msg
          )
        );
      }
    });
  };

  return { messages, sendMessage, typing };
};
