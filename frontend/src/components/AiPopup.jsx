const AiPopup = ({ show, loading, suggestion, onClose, copySuggestion }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white text-black rounded-lg w-11/12 md:w-2/3 lg:w-1/2 max-h-[80vh] p-4 relative overflow-y-auto">
        <button
          className="absolute top-2 right-2 text-xl text-gray-700 hover:text-red-600"
          onClick={onClose}
        >
          &times;
        </button>
        <h4 className="text-lg font-bold mb-2">AI Suggestion:</h4>
        {loading ? (
          <p>Loading AI response...</p>
        ) : (
          <pre className="whitespace-pre-wrap text-sm max-h-[60vh] overflow-y-auto p-2 bg-gray-100 rounded border">
            {suggestion}
          </pre>
        )}
        <button
          onClick={copySuggestion}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Copy Code
        </button>
      </div>
    </div>
  );
};

export default AiPopup;
