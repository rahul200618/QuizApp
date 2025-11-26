import { useState, useEffect } from "react";
import Question from "./components/Question";
import { questions } from "./data/questions";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [startQuiz, setStartQuiz] = useState(false);

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const [selected, setSelected] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const [timer, setTimer] = useState(15);

  useEffect(() => {
    if (!startQuiz || finished) return;

    if (timer === 0) {
      nextQuestion();
      return;
    }

    const interval = setInterval(() => setTimer(timer - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, startQuiz, finished]);

  const handleStart = () => {
    if (username.trim() !== "") {
      setStartQuiz(true);
    }
  };

  const nextQuestion = () => {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setSelected(null);
      setTimer(15);
    } else {
      setFinished(true);
    }
  };

  const handleAnswer = (option) => {
    setSelected(option);

    if (option === questions[index].answer) {
      setScore(score + 1);
    }

    setTimeout(() => nextQuestion(), 700);
  };

  const restart = () => {
    setIndex(0);
    setScore(0);
    setFinished(false);
    setTimer(15);
    setSelected(null);
    setStartQuiz(false);
  };

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
      
      <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Username Screen */}
      {!startQuiz && !finished && (
        <>
          <h1>Welcome to Quizoro 🎯</h1>
          <p>Enter your name to begin</p>

          <input
            type="text"
            placeholder="Your Name..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "12px",
              border: "none",
              marginTop: "12px",
              fontSize: "16px",
            }}
          />

          <button
            className="restart-btn"
            style={{ marginTop: "20px" }}
            onClick={handleStart}
          >
            Start Quiz 🚀
          </button>
        </>
      )}

      {/* Quiz Screen */}
      {startQuiz && !finished && (
        <>
          <h2>Hi, {username}! 👋</h2>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((index + 1) / questions.length) * 100}%` }}
            />
          </div>

          <div className="timer">⏳ Time Left: {timer}s</div>

          <Question
            data={questions[index]}
            onAnswer={handleAnswer}
            selected={selected}
          />
        </>
      )}

      {/* Result Screen */}
      {finished && (
        <>
          <h1>🎉 Great Job, {username}!</h1>
          <p className="score-text">
            You scored {score} / {questions.length}
          </p>

          <button className="restart-btn" onClick={restart}>
            Play Again 🔁
          </button>
        </>
      )}
    </div>
  );
}

export default App;
