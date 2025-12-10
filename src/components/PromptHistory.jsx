
const PromptHistory = ({ history = [] }) => {
  if (history.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-2 text-white/90">🕘 Prompt History</h2>
      <ul className="text-white/80 list-disc pl-5 space-y-1 max-h-40 overflow-y-auto custom-scrollbar">
        {history.map((prompt, idx) => (
          <li key={idx}>{prompt}</li>
        ))}
      </ul>
    </div>
  );
};

export default PromptHistory;