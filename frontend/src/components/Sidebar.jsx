const Sidebar = ({
  roomId,
  users,
  typing,
  language,
  setLanguage,
  leaveRoom,
  askAISuggestion,
  copyRoomId,
  copySuccess,
}) => {
  return (
    <div className="w-72 bg-gray-900 text-white p-4 flex flex-col gap-6 overflow-y-auto">
      {/* Room ID Section */}
      <div className="text-center flex flex-col gap-2">
        <h2 className="text-xl font-semibold mb-2">Room ID</h2>
        <p className="text-lg bg-gray-800 p-2 rounded">{roomId}</p>
        <button
          onClick={copyRoomId}
          className="mt-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-lg rounded w-full"
        >
          Copy Room ID
        </button>
        {copySuccess && (
          <p className="text-green-400 text-xs mt-1">{copySuccess}</p>
        )}
      </div>

      {/* Users Section */}
      <div className="flex flex-col gap-2 border-white border rounded-2xl">
        <h3 className="text-2xl text-center font-medium mb-1">👥 Users in Room</h3>
        <ul className="text-xl text-center space-y-1 pl-2">
          {users.map((user, idx) => (
            <li key={idx} className="text-gray-300">
              • {user.slice(0, 8)}
            </li>
          ))}
        </ul>
      </div>

      {/* Typing Notification */}
      {typing && (
        <p className="italic text-yellow-400 text-xs">{typing}</p>
      )}

      {/* Language Selection */}
      <div className="flex flex-col gap-2">
        <label className="block text-xl mb-1 text-center">📝Language</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-20px bg-gray-800 text-center text-white text-xl px-3 py-2 rounded"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
      </div>

      {/* AI Suggestions */}
      <div className="mt-2 space-y-6 gap-3 flex flex-col">
        <h3 className="text-xl font-medium text-center ">⚙️Gemini AI Tools</h3>
        <button
          onClick={() => askAISuggestion("Suggest improvements for this code")}
          className="w-20px bg-purple-600 hover:bg-purple-700 text-xl px-3 py-2 rounded"
        >
          Improve Code
        </button>
        <button
          onClick={() => askAISuggestion("Debug this code and explain the issue")}
          className="w-20px bg-pink-600 hover:bg-pink-700 text-xl px-3 py-2 rounded"
        >
          Debug Code
        </button>
      </div>

      {/* Leave Room Button */}
      <button
        onClick={leaveRoom}
        className="mt-auto w-full bg-red-600 hover:bg-red-700 py-2 text-xl rounded"
      >
        Leave Room
      </button>
    </div>
  );
};

export default Sidebar;
