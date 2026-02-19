import { useEffect, useState } from "react";
import type { Message } from "../types/message";
import { simulateBotResponse } from "../services/mockApi";
import { MessageQueue } from "../utils/messageQueue";

/**
 * Shared queue instance ensures sequential processing
 * across all sent messages.
 */
const queue = new MessageQueue();

/**
 * Custom hook responsible for:
 * - Managing chat state
 * - Handling message sending
 * - Streaming bot responses
 * - Persisting messages in localStorage
 */
export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);

  /**
   * Load persisted chat history on mount.
   */
  useEffect(() => {
    const stored = localStorage.getItem("chat-history");
    if (stored) setMessages(JSON.parse(stored));
  }, []);

  /**
   * Persist chat history whenever messages update.
   */
  useEffect(() => {
    localStorage.setItem("chat-history", JSON.stringify(messages));
  }, [messages]);

  /**
   * Handles sending a user message.
   * Adds message optimistically, then enqueues bot response.
   */
  const sendMessage = (text: string) => {
    const id = crypto.randomUUID();

    const userMessage: Message = {
      id,
      text,
      sender: "user",
      timestamp: Date.now(),
      status: "sent",
    };

    // Optimistically add user message
    setMessages((prev) => [...prev, userMessage]);

    // Enqueue bot response to ensure sequential streaming
    queue.enqueue(async () => {
      try {
        setTyping(true);

        const botId = crypto.randomUUID();
        let botText = "";

        // Insert empty bot message to progressively update
        setMessages((prev) => [
          ...prev,
          {
            id: botId,
            text: "",
            sender: "bot",
            timestamp: Date.now(),
          },
        ]);

        // Stream response chunk-by-chunk
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
        // Mark user message as failed if streaming fails
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
