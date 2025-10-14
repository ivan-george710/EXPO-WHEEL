import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import './style.css';

const allLogos = [
  "nike", "apple", "microsoft", "amazon", "google", "adidas", "tesla",
  "samsung", "facebook", "twitter", "instagram", "spotify", "youtube",
  "netflix", "puma", "intel", "coca_cola", "pepsi", "toyota", "starbucks",
  "ibm", "oracle", "dell", "hp", "lenovo", "asus", "nvidia", "amd",
  "cisco", "zoom", "slack", "discord", "dropbox", "github", "linkedin",
  "reddit", "snapchat", "paypal", "uber"
];

export default function App() {
  const [started, setStarted] = useState(false);
  const [activeLogos, setActiveLogos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);
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
      style={{ width: "220px", height: "220px" }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={`/logos/${name}.png`}
        alt="logo"
        draggable={false}
        style={{ width: "150px", height: "150px", objectFit: "contain" }}
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

if (!started) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-black via-[#1a0000] to-[#330000] text-white relative overflow-hidden font-sans">

      {/* Red glow background */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-gradient-radial from-red-800/40 via-red-900/20 to-transparent blur-3xl"
        animate={{ opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Top logo */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-full flex justify-center">
        <img
          src="/hc logo.png"
          alt="Hack Club Logo"
          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain opacity-90 drop-shadow-[0_0_8px_rgba(255,0,0,0.5)]"
        />
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 flex flex-col items-center justify-center text-center px-6 sm:px-8 md:px-12 w-full max-w-3xl space-y-6"
      >
        <h1 className="text-lg sm:text-xl md:text-2xl font-medium text-white/90 tracking-wide">
          Hack Club Presents
        </h1>

        <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent leading-tight drop-shadow-[0_0_15px_rgba(255,100,100,0.4)]">
          Guess the Logo Challenge
        </h2>

        <motion.button
          onClick={startNewGame}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95, backgroundColor: "#b30000", color: "#fff" }}
          className="mt-4 px-8 sm:px-10 py-3 text-sm sm:text-base md:text-lg font-semibold rounded-xl border-2 border-red-500 text-white 
                     bg-transparent transition-all duration-300 hover:bg-red-600 hover:border-red-600 
                     focus:ring-2 focus:ring-red-700 focus:ring-offset-2 focus:ring-offset-black"
        >
          Start Game
        </motion.button>
      </motion.div>
    </div>
  );
}


  // ✅ Game screen UI
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D1117] via-[#0B0F14] to-black text-white flex flex-col items-center p-6 font-sans">
      <h1 className="text-5xl font-extrabold tracking-tight mb-1 bg-gradient-to-r from-white to-[#FF5A5F] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,90,95,0.5)]">
        🧩 Guess the Logo
      </h1>
      <p className="text-slate-400 text-sm mb-6">Powered by <span className="text-[#FF5A5F] font-semibold">Hack Club</span></p>

      {finished ? (
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
          {activeLogos.length > 0 && <LogoCard name={activeLogos[currentIndex]} />}

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
