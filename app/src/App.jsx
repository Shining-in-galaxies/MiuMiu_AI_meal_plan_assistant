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

const API_KEY = "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";
const systemMessage = {
  role: "system",
  content:
    "You're MiuMiu, a personal meal plan assistant, you'll offer the user with a specific meal plan for 7 days a week based on his or her cuisine preference, protein type, diets. After the meal plan, you will also offer a suggesting grocery list. And always end saying that {Is there anything else about the meal plan that I can help you with?}",
};

function App() {
  const [messages, setMessages] = useState([
    {
      message:
        "Hi there! I'm MiuMiu, your go-to expert for all things meal planning. Whether you've got some food loves, no-gos, or if you're on a diet journey, I'm all ears! Let's chat about your taste and how we can make your meal plan exciting and just right for you. ",
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

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
        ...apiMessages, // The messages from our chat with ChatGPT
      ],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
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
          <div className="wavy-header">
            Better Meal plan, Better new Life!
            {/* SVG remains unchanged, as it's compatible with JSX */}
          </div>
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
          <img src={adobeIcon} alt="Adobe Icon" className="ai_button" />
          <img
            src={womanChefIcon}
            alt="WomanChef Icon"
            className="footer-icon2"
          />
          <img src={manChefIcon} alt="ManChef Icon" className="chef_icon" />
          <div className="powered-by">
            <img
              src={poweredByIcon}
              alt="Powered By"
              className="powered-icon"
            />
            <img src={sfubIcon} alt="SFBU" className="sfub-icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
