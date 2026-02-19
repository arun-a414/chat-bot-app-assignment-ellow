import type { Message } from "../types/message";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

interface Props {
  messages: Message[];
  typing: boolean;
}

const ChatWindow = ({ messages, typing }: Props) => {
  return (
    <div className="chat-window">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      {typing && <TypingIndicator />}
    </div>
  );
};

export default ChatWindow;
