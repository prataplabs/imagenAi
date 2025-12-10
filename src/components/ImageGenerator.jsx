
import { useState } from 'react';

const ImageGenerator = ({ onGenerate }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onGenerate(prompt);
    setPrompt('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-4 items-center justify-center"
    >
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your dream image..."
        className="flex-1 w-full sm:w-auto px-4 py-2 rounded-full bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-md border border-white/30"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 transition duration-300 px-6 py-2 rounded-full font-medium shadow-lg text-white"
      >
        🎨 Generate
      </button>
    </form>
  );
};

export default ImageGenerator;