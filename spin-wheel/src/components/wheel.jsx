import { useState } from "react";
import { motion } from "framer-motion";

const departments = [
  { name: "Ai-ml", display: "AI/ML" },
  { name: "BlockChain", display: "Blockchain" },
  { name: "Competitive_programming", display: "CP" },
  { name: "Hardware", display: "Hardware" },
  { name: "App_dev", display: "App Dev" },
  { name: "Web_dev", display: "Web Dev" },
];

export default function Wheel({ onSelect, disabled }) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const segmentAngle = 360 / departments.length;

const segmentColors = [
    "linear-gradient(135deg, #2b0000 0%, #ff2a2a 100%)",
    "linear-gradient(135deg, #330000 0%, #b71c1c 100%)",
    "linear-gradient(135deg, #240000 0%, #ff4d4d 100%)",
    "linear-gradient(135deg, #2d0000 0%, #e63946 100%)",
    "linear-gradient(135deg, #400000 0%, #ff5a5f 100%)",
    "linear-gradient(135deg, #1a0000 0%, #c92a2a 100%)",
  ];

  function spin() {
    if (spinning || disabled) return;

    const randomDegree = 360 * 5 + Math.floor(Math.random() * 360);
    setRotation((prev) => prev + randomDegree);
    setSpinning(true);

    const selectedIndex =
      Math.floor(((randomDegree % 360) / 360) * departments.length) %
      departments.length;

    setTimeout(() => {
      setSpinning(false);
      onSelect(
        departments[(departments.length - selectedIndex) % departments.length]
          .name
      );
    }, 5000);
  }

  return (
    <div className="relative flex flex-col items-center">
      {/* Wheel */}
      <motion.div
        animate={{ rotate: rotation }}
        transition={{ duration: 5, ease: "easeOut" }}
        className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full border-[6px] border-[#FF5A5F] shadow-[0_0_25px_rgba(255,60,60,0.4)] overflow-hidden"
      >
        {/* Segments */}
        {departments.map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-full origin-center"
            style={{
              transform: `rotate(${i * segmentAngle}deg)`,
            }}
          >
            <div
              className="absolute w-1/2 h-full origin-right"
              style={{
                background: segmentColors[i % segmentColors.length],
                clipPath: "polygon(100% 50%, 0 0, 0 100%)",
              }}
            />
          </div>
        ))}

        {/* Labels */}
        {departments.map((dept, i) => (
          <div
            key={`label-${i}`}
            className="absolute text-white font-semibold text-[13px] sm:text-sm text-center select-none"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${i * segmentAngle + segmentAngle / 2}deg) translate(90px) rotate(-${i * segmentAngle + segmentAngle / 2}deg)`, // ⬅ pulled in from 100px → 90px
              transformOrigin: "center",
              textShadow: "0 0 8px rgba(255,255,255,0.3)",
              width: "70px",
            }}
          >
            {dept.display}
          </div>
        ))}
      </motion.div>

      {/* Pointer */}
      <div className="absolute top-[-18px] w-0 h-0 border-l-[10px] border-r-[10px] border-b-[20px] border-transparent border-b-[#FF5A5F] drop-shadow-[0_0_6px_rgba(255,90,95,0.8)]"></div>

      {/* Spin Button */}
      <button
        onClick={spin}
        disabled={spinning || disabled}
        className="mt-8 px-8 py-3 bg-transparent border-2 border-[#FF5A5F] text-white font-semibold rounded-xl hover:bg-[#FF5A5F]/20 hover:scale-105 transition-all duration-300 disabled:opacity-50"
      >
        {spinning ? "Spinning..." : "Spin"}
      </button>
    </div>
  );
}
