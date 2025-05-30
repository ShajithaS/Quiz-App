import React, { useRef, useState } from "react";
import "./Quiz.css";
import { data } from "../../assets/data";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[0]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [userName, setUserName] = useState("");
  const [isStarted, setIsStarted] = useState(false);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const option_array = [Option1, Option2, Option3, Option4];

  const checkAns = (e, ans) => {
    if (!lock) {
      data[index].selected = ans;

      if (question.ans === ans) {
        e.target.classList.add("correct");
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        option_array[question.ans - 1].current.classList.add("correct");
      }

      setLock(true);
    }
  };

  const next = () => {
    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
        // Submit score to backend
        fetch("https://quiz-app-z4k6.onrender.com/api/score/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName, score }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Score submitted:", data);
          })
          .catch((err) => {
            console.error("Error submitting score:", err);
          });

        return 0;
      }

      setIndex(index + 1);
      setQuestion(data[index + 1]);
      setLock(false);

      option_array.forEach((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
    setReviewMode(false);
    setIsStarted(false);
    setUserName("");
    data.forEach((q) => (q.selected = null)); // clear previous answers
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />

      {!isStarted ? (
        <>
          <h2>Welcome! Please enter your name to start the quiz.</h2>
          <input
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button
            onClick={() => {
              if (userName.trim()) setIsStarted(true);
              else alert("Please enter your name.");
            }}
          >
            Start Quiz
          </button>
        </>
      ) : result ? (
        reviewMode ? (
          <>
            <h2>Review Answers</h2>
            {data.map((q, idx) => (
              <div key={idx} className="review-question">
                <h3>
                  {idx + 1}. {q.question}
                </h3>
                <ul>
                  <li
                    className={
                      q.ans === 1 ? "correct" : q.selected === 1 ? "wrong" : ""
                    }
                  >
                    {q.option1}
                  </li>
                  <li
                    className={
                      q.ans === 2 ? "correct" : q.selected === 2 ? "wrong" : ""
                    }
                  >
                    {q.option2}
                  </li>
                  <li
                    className={
                      q.ans === 3 ? "correct" : q.selected === 3 ? "wrong" : ""
                    }
                  >
                    {q.option3}
                  </li>
                  <li
                    className={
                      q.ans === 4 ? "correct" : q.selected === 4 ? "wrong" : ""
                    }
                  >
                    {q.option4}
                  </li>
                </ul>
                <p>
                  <strong>Your answer:</strong>{" "}
                  {q[`option${q.selected}`] || "Not Answered"}
                </p>
                <p>
                  <strong>Correct answer:</strong> {q[`option${q.ans}`]}
                </p>
                <hr />
              </div>
            ))}
            <button onClick={reset}>Play Again</button>
          </>
        ) : (
          <>
            <h2>
              Hi {userName}! You scored {score} out of {data.length} 🎉
            </h2>
            <button onClick={reset}>Play Again</button>
            <button onClick={() => setReviewMode(true)}>Review Answers</button>
          </>
        )
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li ref={Option1} onClick={(e) => checkAns(e, 1)}>
              {question.option1}
            </li>
            <li ref={Option2} onClick={(e) => checkAns(e, 2)}>
              {question.option2}
            </li>
            <li ref={Option3} onClick={(e) => checkAns(e, 3)}>
              {question.option3}
            </li>
            <li ref={Option4} onClick={(e) => checkAns(e, 4)}>
              {question.option4}
            </li>
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
