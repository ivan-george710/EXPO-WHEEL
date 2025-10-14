export default function ResultCard({
  topic,
  question,
  userAnswer,
  isCorrect,
  onAnswer,
  onNext
}) {
  if (!topic || !question) return null;

  return (
    <div className="mt-8 p-6 bg-slate-800/70 backdrop-blur rounded-2xl border border-slate-700 shadow-lg w-full max-w-md">
      <h2 className="text-xl font-semibold text-blue-300 mb-3">
        Topic: {topic}
      </h2>
      <p className="text-lg font-medium mb-4 text-slate-100">
        {question.question}
      </p>

      {/* Options */}
      <div className="space-y-2">
        {question.options?.map((opt, i) => (
          <button
            key={i}
            onClick={() => onAnswer(i)}
            disabled={userAnswer !== null}
            className={`w-full text-left px-4 py-2 rounded-md border transition-colors ${
              userAnswer === null
                ? "bg-slate-700 hover:bg-slate-600 border-slate-600"
                : i === question.answerIndex
                ? "bg-green-600 border-green-500 text-white"
                : userAnswer === i
                ? "bg-red-600 border-red-500 text-white"
                : "bg-slate-700 border-slate-700"
            }`}
          >
            {String.fromCharCode(65 + i)}. {opt}
          </button>
        ))}
      </div>

      {/* Feedback */}
      {userAnswer !== null && (
        <div className="mt-4 text-center">
          {isCorrect ? (
            <p className="text-green-400 font-semibold text-lg">✅ Correct!</p>
          ) : (
            <p className="text-red-400 font-semibold text-lg">
              ❌ Wrong! Correct answer:{" "}
              <span className="text-green-400">
                {String.fromCharCode(65 + question.answerIndex)}.
              </span>
            </p>
          )}

          <button
            onClick={onNext}
            className="mt-4 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 font-medium text-white shadow-md"
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  );
}
