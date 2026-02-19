/**
 * Represents possible delivery states of a user message.
 */
export type MessageStatus = "sent" | "delivered" | "failed";

/**
 * Core message model used throughout the chat application.
 * 
 * - id: Unique identifier for reconciliation and streaming updates
 * - text: Message content
 * - sender: Identifies whether message is from user or bot
 * - timestamp: Unix timestamp for display
 * - status: Optional delivery state (only for user messages)
 */
export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: number;
  status?: MessageStatus;
}
