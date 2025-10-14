import { motion } from "framer-motion";

export default function ResultCard({
  topic,
  question,
  userAnswer,
  isCorrect,
  onAnswer,
}) {
  if (!topic || !question) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#1a0000]/90 to-[#330000]/80 backdrop-blur-md border border-[#FF5A5F]/30 shadow-[0_0_25px_rgba(255,60,60,0.3)] w-full max-w-lg text-center"
    >
      {/* Title */}
      <h2 className="text-2xl font-bold text-[#FF5A5F] drop-shadow-[0_0_10px_rgba(255,90,95,0.6)] mb-4 uppercase tracking-wide">
        🎯 Topic:{" "}
        <span className="text-white font-extrabold">{topic.replace(/_/g, " ")}</span>
      </h2>

      {/* Question */}
      <p className="text-lg sm:text-xl font-semibold text-white mb-6 leading-relaxed">
        {question.question}
      </p>

      {/* Options */}
      <div className="space-y-3 text-left">
        {question.options?.map((opt, i) => {
          const isSelected = userAnswer === i;
          const isAnswer = i === question.answerIndex;
          let bgColor = "bg-[#1a0000]/70 border-[#ff5a5f]/30 hover:bg-[#ff5a5f]/20";
          let glow = "";

          if (userAnswer !== null) {
            if (isAnswer) {
              bgColor = "bg-green-600/70 border-green-500 text-white";
              glow = "shadow-[0_0_15px_rgba(0,255,100,0.6)]";
            } else if (isSelected) {
              bgColor = "bg-red-600/70 border-red-500 text-white";
              glow = "shadow-[0_0_15px_rgba(255,0,0,0.6)]";
            } else {
              bgColor = "bg-[#330000]/50 border-[#441111]";
            }
          }

          return (
            <motion.button
              key={i}
              onClick={() => onAnswer(i)}
              disabled={userAnswer !== null}
              whileHover={{ scale: userAnswer === null ? 1.03 : 1 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full px-4 py-3 rounded-lg border font-medium text-white transition-all duration-300 ${bgColor} ${glow}`}
            >
              <span className="mr-2 text-[#FF5A5F] font-bold">
                {String.fromCharCode(65 + i)}.
              </span>
              {opt}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback */}
      {userAnswer !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mt-6 text-lg font-semibold"
        >
          {isCorrect ? (
            <p className="text-green-400 drop-shadow-[0_0_10px_rgba(0,255,100,0.6)]">
              ✅ Woohoo! You got it right!
            </p>
          ) : (
            <p className="text-red-400 drop-shadow-[0_0_10px_rgba(255,90,95,0.6)]">
              ❌ Oops! Correct answer:
              <br />
              <span className="text-green-400 font-bold text-xl">
                {String.fromCharCode(65 + question.answerIndex)}.{" "}
                {question.options[question.answerIndex]}
              </span>
            </p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
