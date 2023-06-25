# HistoryOf Mini-Project
## Enter an event, location, group, etc., and learn about its history.
Receive a short and long-form synopsis of the requested history. This project is inspired by a YouTube tutorial that guides you through creating a ChatGPT clone.

### Tutorial source: [https://youtu.be/JJ9fkYX7q4A](https://youtu.be/JJ9fkYX7q4A)
I followed the tutorial closely and made some modifications. Instead of a single API call, I made two calls `onSubmit`, utilizing interpolation to curate specific requests.

## How to Run
To start the front-end portion of the app, use the command: `npm run start:frontend`.
To start the back-end portion, use the command: `npm run start:backend`. Once this command is complete, the webpage will have full functionality.

## Word Repetitions and Improper Grammar
You may notice that some words are repeated in the long-form responses. This is because GPT expects them to be section headings. However, our code currently lacks a mechanism for parsing and styling section headings.
To demonstrate:
The app will return text like this: "The Korean War Following the conclusion of World War II..."
When it should be formatted like this:
### The Korean War 
Following the conclusion of World War II...

### I developed this application using Create React App.
