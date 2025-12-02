# QuizApp

A simple, colorful MCQ Quiz built with React. Shows one question at a time, shuffles questions each run, tracks score, times each question, and displays results with a restart option.

## Features
- Name input and friendly welcome screen
- Fisher–Yates shuffle on every start/restart
- Per-question timer and progress bar
- Instant answer lock with correct/wrong highlight
- Final score with Restart button
- Minimal, responsive CSS

## Tech
- React (Vite/CRA compatible)
- Plain CSS (no UI frameworks)

## Requirements
- Node.js (LTS recommended)
- npm

## Getting Started
```sh
git clone https://github.com/rahul200618/QuizApp.git
cd QuizApp
npm install
npm start
```


## Project Structure
```text
QuizApp/
  └─ src/
     ├─ App.jsx               # Main app, timer, score, flow, shuffle
     ├─ components/
     │  └─ Question.jsx       # Renders a question + options
     └─ index.css             # Styles (colorful/minimal)
     └─ data/
        └─ questions.js       # Question bank (array)
```

## How it works (brief)
- useState manages username, started, index, score, finished, selected, timer.
- useEffect decrements timer each second; advances when it hits 0.
- Questions are shuffled on start/restart and read from shuffledQuestions[index].
- Clicking an option locks answers, updates score if correct, then auto-advances.

## Add/Update Questions
Create/edit src/data/questions.js:
```js
export const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  // more…
];
```
