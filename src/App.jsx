import { useState } from 'react';
import ImageGenerator from './components/ImageGenerator';
import PromptHistory from './components/PromptHistory';
import frontImage from './assets/font_image.jpg';   // <-- import your default image

function App() {
  // Default image is shown initially
  const [imageUrl, setImageUrl] = useState(frontImage);

  const [promptHistory, setPromptHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateImage = (prompt) => {
    setLoading(true);
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

    const img = new Image();
    img.src = url;

    img.onload = () => {
      setImageUrl(url);
      setPromptHistory((prev) => [prompt, ...prev]);
      setLoading(false);
    };

    img.onerror = () => {
      console.error('Failed to load image');
      setLoading(false);
    };
  };

  const downloadImage = () => {
    fetch(imageUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'ai-image.png';
        link.click();
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20">
          
          <h1 className="text-4xl font-bold mb-4 text-center">✨ AI Image Generator</h1>
          <p className="text-center text-lg text-gray-200 mb-6">
            Type a prompt and watch AI bring it to life.
          </p>

          <ImageGenerator onGenerate={generateImage} />

          {/* Loading Spinner */}
          {loading && (
            <div className="mt-10 flex justify-center">
              <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Image Display */}
          {!loading && imageUrl && (
            <div className="mt-10 flex flex-col items-center gap-4">
              <img
                src={imageUrl}
                alt="Generated or default"
                className="rounded-lg shadow-xl w-full max-w-lg border border-white/20"
              />

              {/* Only show download button when image is from API */}
              {imageUrl !== frontImage && (
                <button
                  onClick={downloadImage}
                  className="bg-green-500 hover:bg-green-600 transition duration-300 px-6 py-2 rounded-full text-white font-semibold shadow-lg"
                >
                  ⬇️ Download Image
                </button>
              )}
            </div>
          )}

          {/* History Section */}
          <PromptHistory history={promptHistory} />

        </div>
      </div>
    </div>
  );
}

export default App;
