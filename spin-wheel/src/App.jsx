import { useState } from "react";
import Wheel from "./components/wheel.jsx";
import ResultCard from "./components/ResultCard.jsx";

export default function App() {
  const [topic, setTopic] = useState(null);
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  async function handleSelect(topicName) {
    setTopic(topicName);
    setUserAnswer(null);
    setIsCorrect(null);

    const file = topicName.replace(/\s+/g, "_").replace(/\//g, "-") + ".json";
    try {
      const res = await fetch(`/${file}`);
      const data = await res.json();
      const list = data.questions || [];
      const randomQuestion = list[Math.floor(Math.random() * list.length)];
      setQuestion(randomQuestion);
    } catch {
      setQuestion({ question: "Could not load questions for this topic." });
    }
  }

  function handleAnswer(selectedIndex) {
    if (userAnswer !== null) return; // prevent multiple clicks
    setUserAnswer(selectedIndex);
    if (selectedIndex === question.answerIndex) setIsCorrect(true);
    else setIsCorrect(false);
  }

  function handleNextQuestion() {
    setUserAnswer(null);
    setIsCorrect(null);
    handleSelect(topic); // fetch another random question
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-blue-400 mb-6">🎯 Spin the Wheel</h1>
      <Wheel onSelect={handleSelect} />
      <ResultCard
        topic={topic}
        question={question}
        userAnswer={userAnswer}
        isCorrect={isCorrect}
        onAnswer={handleAnswer}
        onNext={handleNextQuestion}
      />
    </div>
  );
}
