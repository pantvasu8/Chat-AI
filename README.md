# Chat-AI

Welcome to Chat-AI, it enables users to have conversations with an AI model using prompts. This project is built using NestJS and TypeScript in the backend and React in the frontend and clickhouse Database. It utilizes the OpenAI API for generating responses to user prompts. Additionally, the project includes a dashboard where users can view the analysis of previous requests, including latency, token count, the number of requests in the last X time period, success/failure counts, and more using different charts. 

## Features

- **Chat with AI:** Users can engage in conversations with an AI model by typing prompts.
![Screenshot 2024-02-07 102910](https://github.com/pantvasu8/Chat-AI/assets/96621003/d7fd71cd-a22a-4d32-967c-2f5995c0275e)

- **Dashboard:** Provides an interface to view analysis of previous requests, including latency, token count, number of requests in a specified time period, success/failure counts, and other relevant metrics.
![Screenshot 2024-02-07 103214](https://github.com/pantvasu8/Chat-AI/assets/96621003/b92fdc14-59fc-47d5-bf88-57c4e64b4e1e)

- **Requests Page:** Displays all previous requests with filter options for easier navigation and analysis.
![Screenshot 2024-02-07 103052](https://github.com/pantvasu8/Chat-AI/assets/96621003/655eae9f-3b0b-4db3-8522-2a9e214549c6)


## Prerequisites

Before getting started, ensure you have the following installed:

- Node.js
- npm or yarn
- NestJS
- React

## Run the Project Locally

1. Clone the repository:

```bash
git clone https://github.com/your-username/chat-ai.git
```

2. Navigate to the project directory:

```bash
cd chat-ai
```

3. Install backend dependencies:

```bash
cd backend/nestjs-app
npm install
```

4. Install frontend dependencies:

```bash
cd ../frontend/my-app
npm install
```

5. Set up environment variables:

   - In the `backend` directory, create a `.env` file with the necessary configurations for the OpenAI API key and Clickhouse credentials to connect to database.

6. Start the backend server:

```bash
cd ../backend/nestjs-app
npm start
```
If TypeScript is unable to find type definitions for some of the Node.js modules being imported in your code run the following command:
```bash
npm i --save-dev @types/node
```

7. Start the frontend:

```bash
cd ../frontend/my-app
npm start
```

8. Open your browser and navigate to `http://localhost:3000` to access the Chat-AI application.

## Usage

1. On the homepage, users can type prompts to engage in conversations with the AI model.

2. Navigate to the dashboard to view analytics of previous requests.

3. Access the requests page to see a list of all previous requests with filter options.


 
