import { useState } from "react";
import { motion } from "framer-motion";

const departments = [
  { name: "Ai-ml", display: "🤖 AI/ML" },
  { name: "BlockChain", display: "🪙 Blockchain" },
  { name: "Competitive_programming", display: "⚔️ CP" },
  { name: "Hardware", display: "🔧 Hardware" },
  { name: "App_dev", display: "📱 App Dev" },
  { name: "Web_dev", display: "🌐 Web Dev" },
];

export default function Wheel({ onSelect, disabled }) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const segmentAngle = 360 / departments.length;
  const visualOffset = -90;

  const randomGradient = () => {
    const hues = [0, 10, 350, 5, 15, 360];
    const h = hues[Math.floor(Math.random() * hues.length)];
    const l = Math.floor(Math.random() * 40) + 45;
    return `hsl(${h}, 85%, ${l}%)`;
  };

  const segmentColors = Array.from({ length: departments.length }, () =>
    randomGradient()
  );

  function spin() {
    if (spinning || disabled) return;

    const randomDegree = 360 * 5 + Math.floor(Math.random() * 360);
    const newRotation = rotation + randomDegree;
    setRotation(newRotation);
    setSpinning(true);

    setTimeout(() => {
      setSpinning(false);
      const normalized = ((newRotation % 360) + 360) % 360;
      const pointerAngle = (360 - normalized - visualOffset + 360) % 360;
      const index = Math.floor(pointerAngle / segmentAngle) % departments.length;
      onSelect(departments[index].name);
    }, 5000);
  }

  return (
    <div className="relative flex flex-col items-center mt-12">
      {/* 🔻 Pointer — fixed alignment */}
<div className="absolute -top-[32px] z-30 flex flex-col items-center">
  <div className="w-0 h-0 border-l-[14px] border-r-[14px] border-b-[26px] border-transparent border-b-[#FF5A5F] drop-shadow-[0_0_8px_rgba(255,90,95,0.9)]"></div>
  <div className="w-4 h-4 bg-[#FF5A5F] rounded-full border-2 border-white shadow-[0_0_6px_rgba(255,90,95,0.8)] mt-[-2px]"></div>
</div>


      <div className="flex flex-row items-center justify-center gap-12 sm:gap-20">
        {/* 🌈 Left department list */}
        <motion.div
          className="flex flex-col gap-5 text-right text-white font-semibold"
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          {departments.slice(0, 3).map((dept, i) => (
            <motion.span
              key={dept.name}
              whileHover={{
                scale: 1.2,
                color: "#FF5A5F",
                textShadow: "0 0 15px rgba(255,90,95,0.9)",
                rotate: [-2, 2, 0],
              }}
              transition={{ duration: 0.3 }}
              className="cursor-pointer text-sm sm:text-base tracking-wide drop-shadow-[0_0_6px_rgba(255,255,255,0.4)] hover:drop-shadow-[0_0_10px_rgba(255,90,95,0.8)]"
            >
              {dept.display}
            </motion.span>
          ))}
        </motion.div>

        {/* 🎡 Wheel */}
        <div className="relative">
          <div className="absolute inset-[-10px] rounded-full border-[8px] border-[#FF5A5F] bg-gradient-to-b from-[#1a0000] to-[#330000] shadow-[0_0_25px_rgba(255,60,60,0.4)]"></div>

          <motion.div
            animate={{ rotate: rotation + visualOffset }}
            transition={{ duration: 5, ease: [0.17, 0.67, 0.83, 0.67] }}
            className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden border-[4px] border-[#ff5a5f] shadow-[0_0_20px_rgba(255,60,60,0.4)]"
          >
            {departments.map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-full origin-center"
                style={{
                  background: segmentColors[i],
                  clipPath: "polygon(50% 50%, 100% 0, 100% 100%)",
                  transform: `rotate(${i * segmentAngle}deg) skewY(${
                    90 - segmentAngle
                  }deg)`,
                  transformOrigin: "50% 50%",
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* 🌈 Right department list */}
        <motion.div
          className="flex flex-col gap-5 text-left text-white font-semibold"
          animate={{ y: [0, 3, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          {departments.slice(3).map((dept, i) => (
            <motion.span
              key={dept.name}
              whileHover={{
                scale: 1.2,
                color: "#FF5A5F",
                textShadow: "0 0 15px rgba(255,90,95,0.9)",
                rotate: [2, -2, 0],
              }}
              transition={{ duration: 0.3 }}
              className="cursor-pointer text-sm sm:text-base tracking-wide drop-shadow-[0_0_6px_rgba(255,255,255,0.4)] hover:drop-shadow-[0_0_10px_rgba(255,90,95,0.8)]"
            >
              {dept.display}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* 🌀 Spin Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 20px rgba(255,90,95,0.7)",
        }}
        onClick={spin}
        disabled={spinning || disabled}
        className="mt-8 px-8 py-3 bg-[#1a0000] border-2 border-[#FF5A5F] text-white font-semibold rounded-xl hover:bg-[#FF5A5F]/30 transition-all duration-300 disabled:opacity-50"
      >
        {spinning ? "Spinning..." : "Spin"}
      </motion.button>
    </div>
  );
}
