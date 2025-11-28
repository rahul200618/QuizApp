import { useState, useEffect } from "react";
import Question from "./components/Question";
import { questions } from "./data/questions";
import "./App.css";

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function App() {
  const [username, setUsername] = useState("");
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);
  const [timer, setTimer] = useState(15);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  useEffect(() => {
    if (!started || finished || timer === 0) {
      if (timer === 0) nextQuestion();
      return;
    }
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, started, finished]);

  const nextQuestion = () => {
    if (index + 1 < shuffledQuestions.length) {
      setIndex(index + 1);
      setSelected(null);
      setTimer(15);
    } else {
      setFinished(true);
    }
  };

  const handleAnswer = (option) => {
    setSelected(option);
    if (option === shuffledQuestions[index].answer) setScore(score + 1);
    setTimeout(nextQuestion, 700);
  };

  const startQuiz = () => {
    if (username.trim()) {
      setShuffledQuestions(shuffleArray(questions));
      setStarted(true);
    }
  };

  const restart = () => {
    setIndex(0);
    setScore(0);
    setFinished(false);
    setTimer(15);
    setSelected(null);
    setShuffledQuestions(shuffleArray(questions));
  };

  if (!started) {
    return (
      <div className="container">
        <h1>Welcome to Quizoro 🎯</h1>
        <p>Enter your name to begin</p>
        <input
          type="text"
          placeholder="Your Name..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="option"
        />
        <div className="actions">
          <button className="btn" onClick={startQuiz}>
            Start Quiz 🚀
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="container result">
        <h1>🎉 Great Job, {username}!</h1>
        <p><strong>You scored {score} / {shuffledQuestions.length}</strong></p>
        <div className="actions">
          <button className="btn" onClick={restart}>Restart Quiz 🔁</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Hi, {username}! 👋</h2>
      <div className="progress">
        <span style={{ "--value": `${((index + 1) / shuffledQuestions.length) * 100}%` }} />
      </div>
      <p>⏳ Time Left: {timer}s</p>
      <Question data={shuffledQuestions[index]} onAnswer={handleAnswer} selected={selected} />
    </div>
  );
}

export default App;