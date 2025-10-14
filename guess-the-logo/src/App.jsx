import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// 👇 Full pool (add/remove freely). Place matching files in /public/logos/<name>.png
const allLogos = [
  "nike", "apple", "microsoft", "amazon", "google", "adidas", "tesla",
  "samsung", "facebook", "twitter", "instagram", "spotify", "youtube",
  "netflix", "puma", "intel", "coca_cola", "pepsi", "toyota", "starbucks",
  "ibm", "oracle", "dell", "hp", "lenovo", "asus", "nvidia", "amd",
  "cisco", "zoom", "slack", "discord", "dropbox", "github", "linkedin",
  "reddit", "snapchat", "paypal", "uber"
];

export default function App() {
  const [activeLogos, setActiveLogos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

  const startNewGame = () => {
    const random20 = shuffle(allLogos).slice(0, 20);
    setActiveLogos(random20);
    setCurrentIndex(0);
    setScore(0);
    setTime(30);
    setSelected(null);
    setFinished(false);
    setStarted(true);
    generateOptions(0, random20);
  };

  const generateOptions = (index, list = activeLogos) => {
    const correct = list[index];
    const wrongs = shuffle(allLogos.filter((n) => n !== correct)).slice(0, 3);
    setOptions(shuffle([...wrongs, correct]));
  };

  useEffect(() => {
    if (!started || finished) return;
    if (time <= 0) {
      setFinished(true);
      return;
    }
    const t = setTimeout(() => setTime((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [time, started, finished]);

  const handleAnswer = (choice) => {
    if (selected !== null || finished) return;
    setSelected(choice);

    const correct = activeLogos[currentIndex];
    if (choice === correct) setScore((s) => s + 1);

    setTimeout(() => {
      const next = currentIndex + 1;
      if (next < activeLogos.length) {
        setCurrentIndex(next);
        setSelected(null);
        generateOptions(next);
      } else {
        setFinished(true);
      }
    }, 700);
  };

  const LogoCard = ({ name }) => (
    <motion.div
  key={name}
  className="flex justify-center items-center bg-white rounded-2xl shadow-lg mb-6 overflow-hidden"
  style={{
    width: "220px",       // fixed width of card
    height: "220px",      // fixed height of card
  }}
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.3 }}
>
  <img
    src={`/logos/${name}.png`}
    alt="logo"
    draggable={false}
    style={{
      width: "150px",      // fixed logo width
      height: "150px",     // fixed logo height
      objectFit: "contain",
    }}
  />
</motion.div>


  );

  const topBar = (
    <div className="mb-4 text-lg flex items-center gap-4 bg-slate-800/70 px-4 py-2 rounded-full shadow-inner">
      <div>⏱ <span className="font-semibold text-orange-400">{time}s</span></div>
      <div>✅ <span className="font-semibold text-green-400">{score}</span></div>
      <div>📦 <span className="font-semibold text-pink-400">
        {Math.max(0, (activeLogos.length || 0) - currentIndex)}
      </span></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D1117] via-[#0B0F14] to-black text-white flex flex-col items-center p-6 font-sans">
      {/* HEADER */}
      <h1 className="text-5xl font-extrabold tracking-tight mb-1 bg-gradient-to-r from-white to-[#FF5A5F] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,90,95,0.5)]">
        🧩 Guess the Logo
      </h1>
      <p className="text-slate-400 text-sm mb-6">Powered by <span className="text-[#FF5A5F] font-semibold">Hack Club</span></p>

      {!started ? (
        <button
          onClick={startNewGame}
          className="mt-4 px-8 py-3 bg-gradient-to-r from-[#FF5A5F] to-[#FF7849] hover:scale-105 transition-transform rounded-xl font-semibold text-white shadow-lg"
        >
          Start Game
        </button>
      ) : finished ? (
        <div className="text-center mt-6">
          <h2 className="text-3xl font-semibold mb-3 bg-gradient-to-r from-[#FF5A5F] to-[#FF7849] bg-clip-text text-transparent">
            🏁 Game Over
          </h2>
          <p className="text-lg mb-4">
            Score: <span className="font-bold text-[#FF5A5F]">{score}</span> / {activeLogos.length || 20}
          </p>
          <button
            onClick={startNewGame}
            className="px-8 py-3 bg-gradient-to-r from-[#FF5A5F] to-[#FF7849] hover:scale-105 transition-transform rounded-xl font-semibold text-white shadow-lg"
          >
            Play Again
          </button>
        </div>
      ) : (
        <>
          {topBar}

          {activeLogos.length > 0 && (
            <LogoCard name={activeLogos[currentIndex]} />
          )}

          {/* Options */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-md">
            {options.map((opt, i) => {
              const correct = activeLogos[currentIndex];
              const chosen = selected !== null;
              let styles = "bg-slate-800/80 text-slate-100 hover:bg-[#FF5A5F]/30 border border-slate-700";
              if (chosen) {
                if (opt === correct) styles = "bg-green-600 text-white";
                else if (opt === selected && opt !== correct) styles = "bg-red-600 text-white";
                else styles = "bg-slate-700 text-slate-400";
              }
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  disabled={chosen || finished}
                  className={`px-4 py-3 rounded-xl font-semibold shadow transition-all duration-200 ${styles}`}
                >
                  {opt.replace(/_/g, " ")}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
