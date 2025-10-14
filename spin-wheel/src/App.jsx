import { useState } from "react";
import Wheel from "./components/Wheel.jsx";
import ResultCard from "./components/ResultCard.jsx";
import { motion } from "framer-motion";

export default function App() {
  const [topic, setTopic] = useState(null);
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [canSpin, setCanSpin] = useState(true);

  // 🌀 When wheel stops spinning
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
    } catch (err) {
      console.error("Error loading questions:", err);
      setQuestion({ question: "Could not load questions for this topic." });
    }
  }

  // ✅ When user selects an answer
  function handleAnswer(selectedIndex) {
    if (userAnswer !== null) return;
    setUserAnswer(selectedIndex);
    if (selectedIndex === question.answerIndex) setIsCorrect(true);
    else setIsCorrect(false);
    setCanSpin(true); // Enable next spin
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-black via-[#1a0000] to-[#330000] text-white overflow-hidden font-sans p-4 relative">
      
      {/* Main container */}
      <div className="relative flex flex-col items-center text-center space-y-6 z-10">
        {/* Hack Club Logo */}
        <img
          src="/hc logo.png"
          alt="Hack Club Logo"
          className="w-14 h-14 sm:w-16 sm:h-16 object-contain mb-2 opacity-90 drop-shadow-[0_0_10px_rgba(255,90,95,0.5)]"
        />

        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl text-white/80 font-medium tracking-wide">
            Hack Club Presents
          </h2>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[#ff5a5f] to-white bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,60,60,0.4)]">
            Spin the Wheel
          </h1>
        </div>

        {/* The wheel */}
        <div className="mt-4">
          <Wheel onSelect={handleSelect} disabled={!canSpin} />
        </div>

        {/* Result Card (question + answer display) */}
        <ResultCard
          topic={topic}
          question={question}
          userAnswer={userAnswer}
          isCorrect={isCorrect}
          onAnswer={handleAnswer}
        />

        {/* “Spin again” message */}
        {userAnswer !== null && (
          <p className="mt-6 text-sm text-slate-400 italic">
            Press <span className="text-red-400 font-semibold">“Spin”</span> to play again!
          </p>
        )}
      </div>
    </div>
  );
}
