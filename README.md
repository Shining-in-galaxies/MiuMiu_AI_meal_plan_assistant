# MiuMiu - Your Personal Meal Plan Assistant

Welcome to MiuMiu, your next-generation personal meal plan assistant designed to make meal planning simple, personalized, and fun! Based on the robust React framework and utilizing the @chatscope/chat-ui-kit-react for a seamless chat interface, MiuMiu offers users a unique way to discover meal plans and grocery lists tailored to their dietary preferences and needs.

## Features

- **Personalized Meal Planning**: Get a 7-day meal plan that matches your cuisine preferences, protein types, and diet.
- **Interactive Chat Interface**: Engage with MiuMiu through a friendly and intuitive chat interface for a personalized meal planning experience.
- **Suggesting Grocery Lists**: After finalizing the meal plan, MiuMiu provides a suggested grocery list to make your shopping easier.
- **Highly Customizable**: From dietary preferences to meal types, MiuMiu can adapt to a wide range of user needs and preferences.

## Presentation

View presentation [PDF file](https://drive.google.com/file/d/1EV-LGqunIA-GyOcwRaE1jhMnB7u5u7nJ/view?usp=share_link)

## Getting Started

To get started with MiuMiu, follow these simple steps:

### Prerequisites

Ensure you have Node.js and npm installed on your machine. If you don't have them installed, follow the instructions on the [Node.js website](https://nodejs.org/).

### Installation

1. Clone the repo
2. Install NPM packages
   ```sh
   npm create vite@latest app -- -- react
   ```
   ```sh
   npm install
   ```
   ```sh
   npm install @chatscope/chat-ui-kit-react
   ```
3. Enter your [OpenAI API key](https://beta.openai.com/account/api-keys) in `app.jsx`
   ```jsx
   const API_KEY = "ENTER YOUR API KEY";
   ```

### Running the Application

After installation, you can run the application locally:

```sh
npm run dev
```

This will start the application and open it in your default web browser.

## Technology Stack

- **Frontend Framework**: React
- **UI Toolkit**: @chatscope/chat-ui-kit-react
- **OpenAI API**: Natural language processing and generation.

## Acknowledgments

- [ChatScope](https://chatscope.io/) for providing the chat UI toolkit.
- Special thanks to the YouTube tutorial [Build A Chatbot With The ChatGPT API In React](https://www.youtube.com/watch?v=Lag9Pj_33hM&t=979s)

Thank you for exploring MiuMiu. Let's embark on a journey to healthier eating habits together!
