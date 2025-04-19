# SecretEcho - AI Companion Chat Frontend

SecretEcho is a real-time AI companion messaging web application built with React and Next.js. This repository contains the frontend codebase.

## 🚀 Features

- 🔐 Secure JWT Authentication
- 💬 Real-time messaging with WebSocket
- 🤖 AI companion responses
- 📱 Responsive design (mobile-first approach)
- 🌈 Modern UI with glassmorphism design
- 🔄 Persistent chat history
- ⚡ Real-time message updates
- 🔍 Loading indicators for AI responses

## 🛠️ Tech Stack

- **React 18** - UI Library
- **Next.js 13** - React Framework
- **TailwindCSS** - Styling
- **Socket.io-client** - Real-time communication
- **Ant Design** - UI Components
- **JWT** - Authentication
- **Axios** - HTTP client

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn
- Backend server running (see backend repository)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/shubhankar-mern/PlahouseMediaSecretEchoFrontend.git
cd PlahouseMediaSecretEchoFrontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```




3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## 🏗️ Architecture Overview

### Authentication Flow
1. User signs up/logs in through the authentication forms
2. JWT token is stored in localStorage


### Real-time Communication
1. WebSocket connection established on dashboard mount
2. Socket.io handles real-time message updates
3. Messages are stored in both local state and backend


### State Management
1. Local component state for UI elements
2. Socket events for real-time updates
3. Local storage for persistence

## 🔒 Security Measures

- JWT tokens for authentication
- Secure WebSocket connections
- Input sanitization


