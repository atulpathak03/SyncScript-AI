const AiPopup = ({ show, loading, suggestion, onClose, copySuggestion }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white text-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden relative">
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-red-600 transition"
            onClick={onClose}
          >
            &times;
          </button>

          {/* Title */}
          <h4 className="text-2xl font-semibold mb-4 text-center text-gray-800">
            🤖 AI Suggestion
          </h4>

          {/* Content */}
          {loading ? (
            <div className="text-center text-lg text-gray-600 animate-pulse">
              Loading AI response...
            </div>
          ) : (
            <pre className="whitespace-pre-wrap text-sm bg-gray-100 border border-gray-300 rounded-lg p-4 max-h-[50vh] overflow-y-auto font-mono text-gray-800 shadow-inner">
              {suggestion}
            </pre>
          )}

          {/* Copy Button */}
          <div className="mt-6 text-center">
            <button
              onClick={copySuggestion}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition text-white font-semibold px-6 py-2 rounded-full shadow-lg"
            >
              📋 Copy Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiPopup;
