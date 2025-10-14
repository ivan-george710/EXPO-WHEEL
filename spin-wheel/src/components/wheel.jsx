import { useState } from "react";
import { motion } from "framer-motion";

const COLORS = ["#5B8BF7", "#59C9A5", "#FFD166", "#EF767A", "#9B5DE5", "#43C7F4"];
const topics = [
  "BlockChain",
  "Web dev",
  "App dev",
  "Ai/ml",
  "Hardware",
  "Competitive programming"
];

export default function Wheel({ onSelect, disabled }) 
 {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const degPerSlice = 360 / topics.length;

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    const index = Math.floor(Math.random() * topics.length);
    const spins = 4 + Math.random() * 3;
    const stopAt = 360 - (index * degPerSlice + degPerSlice / 2);
    const targetRotation = spins * 360 + stopAt;

    setRotation(targetRotation);
    setTimeout(() => {
      setSpinning(false);
      onSelect(topics[index]);
    }, 4200);
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* pointer */}
      <div className="absolute -top-6 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[30px] border-l-transparent border-r-transparent border-b-blue-400 z-20"></div>

      {/* wheel */}
      <motion.div
        animate={{ rotate: rotation }}
        transition={{ duration: 4, ease: [0.17, 0.67, 0.83, 0.67] }}
        className="rounded-full border-[8px] border-slate-300 shadow-2xl overflow-hidden"
        style={{ width: 360, height: 360, position: "relative" }}
      >
        <svg viewBox="0 0 200 200" width="100%" height="100%">
          {topics.map((topic, i) => {
            const start = (i * 360) / topics.length - 90;
            const end = ((i + 1) * 360) / topics.length - 90;
            const largeArc = end - start > 180 ? 1 : 0;

            const x1 = 100 + 100 * Math.cos((Math.PI * start) / 180);
            const y1 = 100 + 100 * Math.sin((Math.PI * start) / 180);
            const x2 = 100 + 100 * Math.cos((Math.PI * end) / 180);
            const y2 = 100 + 100 * Math.sin((Math.PI * end) / 180);

            const path = `M100,100 L${x1},${y1} A100,100 0 ${largeArc},1 ${x2},${y2} z`;

            const textAngle = start + degPerSlice / 2;

            return (
              <g key={i}>
                {/* colored slice */}
                <path d={path} fill={COLORS[i % COLORS.length]} stroke="white" strokeWidth="0.5" />
                {/* topic text */}
                <text
                  x="100"
                  y="100"
                  fill="white"
                  fontSize="10"
                  fontWeight="600"
                  stroke="black"
                  strokeWidth="0.3"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  transform={`rotate(${textAngle} 100 100) translate(65 0) rotate(90)`}
                >
                  {topic}
                </text>
              </g>
            );
          })}
        </svg>
      </motion.div>

      <button
  onClick={spin}
  disabled={spinning || disabled}
  className="mt-6 px-6 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-60 font-semibold text-white shadow-md transition-all"
>
  {spinning ? "Spinning..." : "🎡 Spin"}
</button>

    </div>
  );
}
