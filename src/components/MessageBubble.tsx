/**
 * MessageBubble renders individual message.
 * Applies styling based on sender (user or bot).
 * Displays timestamp and optional delivery status.
 */

import type { Message } from "../types/message";

const MessageBubble = ({ message }: { message: Message }) => {
  return (
    <div className={`bubble ${message.sender}`}>
      <p>{message.text}</p>
      <span>
        {new Date(message.timestamp).toLocaleTimeString()}{" "}
        {message.status && `• ${message.status}`}
      </span>
    </div>
  );
};

export default MessageBubble;
