import { useState, useRef, useEffect, KeyboardEvent } from "react";

interface Props {
  onSend: (text: string) => void;
}

const MessageInput = ({ onSend }: Props) => {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto expand textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }, [text]);

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="input-container-advanced">
      <textarea
        ref={textareaRef}
        className="chat-textarea"
        placeholder="Type a message..."
        value={text}
        rows={1}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button
        className={`send-btn ${text.trim() ? "active" : ""}`}
        onClick={handleSend}
        disabled={!text.trim()}
        aria-label="Send message"
      >
        ➤
      </button>
    </div>
  );
};

export default MessageInput;
