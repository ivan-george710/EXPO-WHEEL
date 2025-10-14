import { useState } from "react";
import Wheel from "./components/Wheel.jsx";
import ResultCard from "./components/ResultCard.jsx";

export default function App() {
  const [topic, setTopic] = useState(null);
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [canSpin, setCanSpin] = useState(true);

  async function handleSelect(topicName) {
    setTopic(topicName);
    setUserAnswer(null);
    setIsCorrect(null);
    setCanSpin(false);

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
    if (userAnswer !== null) return;
    setUserAnswer(selectedIndex);
    if (selectedIndex === question.answerIndex) setIsCorrect(true);
    else setIsCorrect(false);
    setCanSpin(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#1a0000] to-[#330000] text-white flex flex-col items-center justify-center font-sans p-6">
      {/* Title */}
      <img
        src="/hc logo.png"
        alt="Hack Club Logo"
        className="w-14 h-14 sm:w-16 sm:h-16 mb-2 drop-shadow-[0_0_10px_rgba(255,90,95,0.5)]"
      />
      <h2 className="text-lg sm:text-xl text-white/80 font-medium tracking-wide">
        Hack Club Presents
      </h2>
      <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-[#ff5a5f] to-white bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,60,60,0.4)] mb-8">
        Spin the Wheel
      </h1>

      {/* Wheel */}
      <Wheel onSelect={handleSelect} disabled={!canSpin} />

      {/* Result Card */}
      {question && (
        <ResultCard
          topic={topic}
          question={question}
          userAnswer={userAnswer}
          isCorrect={isCorrect}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
}
