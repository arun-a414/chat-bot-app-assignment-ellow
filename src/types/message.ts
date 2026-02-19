export type MessageStatus = "sent" | "delivered" | "failed";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: number;
  status?: MessageStatus;
}
