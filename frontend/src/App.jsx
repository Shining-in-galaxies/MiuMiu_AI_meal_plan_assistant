import { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import miumiuLogo from "./img/miumiu.png"; // Adjust if the name or path differs
import adobeIcon from "./img/adobe illustrator icon.png";
import womanChefIcon from "./img/WomanChef.png";
import manChefIcon from "./img/ManChef.png";
import poweredByIcon from "./img/POWERED BY.png";
import sfubIcon from "./img/SFBU.png";
import "./App.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

function App() {
  const [messages, setMessages] = useState([
    {
      message:
        "Hi there! I'm MiuMiu, your go-to expert for all things meal planning. Whether you've got some food loves, no-gos, or if you're on a diet journey, I'm all ears! Let's chat about your taste and how we can make your meal plan exciting and just right for you.",
      sentTime: "just now",
      sender: "ChatGPT",
      direction: "incoming",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    const apiMessages = chatMessages.map((messageObject) => ({
      role: messageObject.sender === "ChatGPT" ? "assistant" : "user",
      content: messageObject.message,
    }));

    await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: apiMessages }),
    })
      .then((data) => data.json())
      .then((data) => {
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
            direction: "incoming",
          },
        ]);
        setIsTyping(false);
      });
  }

  return (
    <div className="App">
      <div className="chat-container">
        <div className="chat-header">
          <img src={miumiuLogo} alt="Miu Miu" className="logo" />
          <h1>Chat with</h1>
          <h2>Miu Miu</h2>
        </div>
        <div className="wavy-header">
          Better Meal plan, Better new Life!
          {/* SVG remains unchanged, as it's compatible with JSX */}
        </div>

        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? <TypingIndicator content="MiuMiu is typing" /> : null
              }
            >
              {messages.map((message, i) => (
                <Message key={i} model={message} />
              ))}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
        <div className="chat-footer">
          <img
            src={womanChefIcon}
            alt="WomanChef Icon"
            className="footer-icon2"
          />
          <img src={manChefIcon} alt="ManChef Icon" className="chef_icon" />
        </div>
        <div className="powered-by">
          <img src={poweredByIcon} alt="Powered By" className="powered-icon" />
          <img src={adobeIcon} alt="Adobe Icon" className="ai_button" />
          <img src={sfubIcon} alt="SFBU" className="sfub-icon" />
        </div>
      </div>
    </div>
  );
}

export default App;
