import "./App.css";
import { useEffect, useMemo, useState } from "react";
import Start from "./components/Start";
import Timer from "./components/Timer";
import Millionaire from "./components/Millionaire";

const data = [
  {
    id: 1,
    question: "на производсте чего специализируется компания Rolex?",
    answers: [
      {
        text: "смартфонов",
        correct: false,
      },
      {
        text: "часов",
        correct: true,
      },
      {
        text: "питания",
        correct: false,
      },
      {
        text: "косметики",
        correct: false,
      },
    ],
  },
  {
    id: 2,
    question: "Когда впервые запустили социальную сеть `Facebook`?",
    answers: [
      {
        text: "2004",
        correct: true,
      },
      {
        text: "2005",
        correct: false,
      },
      {
        text: "2006",
        correct: false,
      },
      {
        text: "2007",
        correct: false,
      },
    ],
  },
  {
    id: 3,
    question: "Как зовут актера, который играл роль Гарри Поттера?",
    answers: [
      {
        text: "Джони Деп",
        correct: false,
      },
      {
        text: "Leonardo Di Caprio",
        correct: false,
      },
      {
        text: "Denzel Washington",
        correct: false,
      },
      {
        text: "Daniel Red Cliff",
        correct: true,
      },
    ],
  },
];

function App() {
  const [username, setUsername] = useState(null);
  const [timeOut, setTimeOut] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [earned, setEarned] = useState("$ 0");

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "$ 100" },
        { id: 2, amount: "$ 200" },
        { id: 3, amount: "$ 300" },
        { id: 4, amount: "$ 500" },
        { id: 5, amount: "$ 1.000" },
        { id: 6, amount: "$ 2.000" },
        { id: 7, amount: "$ 4.000" },
        { id: 8, amount: "$ 8.000" },
        { id: 9, amount: "$ 16.000" },
        { id: 10, amount: "$ 32.000" },
        { id: 11, amount: "$ 64.000" },
        { id: 12, amount: "$ 125.000" },
        { id: 13, amount: "$ 250.000" },
        { id: 14, amount: "$ 500.000" },
        { id: 15, amount: "$ 1.000.000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(
        moneyPyramid.find((level) => level.id === questionNumber - 1).amount
      );
  }, [questionNumber, moneyPyramid]);

  return (
    <div className="app">
      {!username ? (
        <Start setUsername={setUsername} />
      ) : (
        <>
          <div className="main">
            {timeOut ? (
              <h1 className="endText">You earned: {earned}</h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer
                      setTimeOut={setTimeOut}
                      questionNumber={questionNumber}
                    />
                  </div>
                </div>
                <div className="bottom">
                  <Millionaire
                    data={data}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    setTimeOut={setTimeOut}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid.map((level) => (
                <li
                  className={
                    questionNumber === level.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                >
                  <span className="moneyListItemNumber">{level.id}</span>
                  <span className="moneyListItemAmount">{level.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
