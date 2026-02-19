import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import { useChat } from "./hooks/useChat";
import "./styles.css";

function App() {
  const { messages, sendMessage, typing } = useChat();

  return (
    <div className="app">
      <ChatWindow messages={messages} typing={typing} />
      <MessageInput onSend={sendMessage} />
    </div>
  );
}

export default App;
