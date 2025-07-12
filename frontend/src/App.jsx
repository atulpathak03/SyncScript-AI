import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Editor from "@monaco-editor/react";
import axios from "axios";

const BASE_URL = "http://localhost:5000";
const socket = io(BASE_URL);

const App = () => {
  const [joined, setJoined] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("// start code here");
  const [copySuccess, setCopySuccess] = useState("");
  const [users, setUsers] = useState([]);
  const [typing, setTyping] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    socket.on("userJoined", (users) => setUsers(users));
    socket.on("codeUpdate", (newCode) => setCode(newCode));
    socket.on("userTyping", (user) => {
      setTyping(`${user.slice(0, 8)}... is Typing`);
      setTimeout(() => setTyping(""), 2000);
    });
    socket.on("languageUpdate", (newLanguage) => setLanguage(newLanguage));

    return () => {
      socket.off("userJoined");
      socket.off("codeUpdate");
      socket.off("userTyping");
      socket.off("languageUpdate");
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => socket.emit("leaveRoom");
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const joinRoom = () => {
    if (roomId && userName) {
      socket.emit("join", { roomId, userName });
      setJoined(true);
    }
  };

  const leaveRoom = () => {
    socket.emit("leaveRoom");
    setJoined(false);
    setRoomId("");
    setUserName("");
    setCode("// start code here");
    setLanguage("javascript");
    setAiSuggestion("");
    setShowPopup(false);
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopySuccess("Copied!");
    setTimeout(() => setCopySuccess(""), 2000);
  };

  const copySuggestion = () => {
    navigator.clipboard.writeText(aiSuggestion);
    setCopySuccess("Suggestion copied!");
    setTimeout(() => setCopySuccess(""), 2000);
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit("codeChange", { roomId, code: newCode });
    socket.emit("typing", { roomId, userName });
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    socket.emit("languageChange", { roomId, language: newLanguage });
  };

  const askAISuggestion = async (task) => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/gemini/suggest`, {
        code,
        task,
      });
      setAiSuggestion(response.data.suggestion || "No suggestion received.");
      setShowPopup(true);
    } catch (error) {
      setAiSuggestion("Error while getting AI suggestion.");
      setShowPopup(true);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!joined) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-80 space-y-4">
          <h1 className="text-xl font-bold text-center">Join Code Room</h1>
          <input
            type="text"
            placeholder="Room Id"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white outline-none"
          />
          <input
            type="text"
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white outline-none"
          />
          <button
            onClick={joinRoom}
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded text-white font-semibold"
          >
            Join Room
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <div className="w-72 bg-gray-900 text-white p-4 flex flex-col gap-4 overflow-y-auto">
        <div className="space-y-2">
          <h2 className="text-lg font-bold">Code Room: {roomId}</h2>
          <button
            onClick={copyRoomId}
            className="text-sm bg-blue-600 px-2 py-1 rounded hover:bg-blue-700"
          >
            Copy Id
          </button>
          {copySuccess && <p className="text-green-400 text-sm">{copySuccess}</p>}
        </div>

        <div>
          <h3 className="font-semibold">Users in Room:</h3>
          <ul className="text-sm space-y-1">
            {users.map((user, index) => (
              <li key={index}>{user.slice(0, 8)}...</li>
            ))}
          </ul>
        </div>

        <p className="italic text-yellow-400 text-sm">{typing}</p>

        <select
          value={language}
          onChange={handleLanguageChange}
          className="bg-gray-700 p-2 rounded text-white"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>

        <button
          onClick={leaveRoom}
          className="bg-red-600 hover:bg-red-700 transition py-2 rounded text-white mt-auto"
        >
          Leave Room
        </button>

        <div className="space-y-2">
          <h3 className="font-semibold mt-4">💡 Gemini AI</h3>
          <button
            onClick={() => askAISuggestion("Suggest improvements for this code")}
            className="bg-purple-600 hover:bg-purple-700 py-1 px-2 rounded text-sm"
          >
            ✨ Suggest Code Improvement
          </button>
          <button
            onClick={() => askAISuggestion("Debug this code and explain the issue")}
            className="bg-pink-600 hover:bg-pink-700 py-1 px-2 rounded text-sm"
          >
            🐞 Debug Code
          </button>
        </div>
      </div>

      <div className="flex-1 bg-gray-800">
        <Editor
          height="100%"
          defaultLanguage={language}
          language={language}
          value={code}
          onChange={handleCodeChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
          }}
        />
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg w-11/12 md:w-2/3 lg:w-1/2 max-h-[80vh] p-4 relative overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-xl text-gray-700 hover:text-red-600"
              onClick={() => setShowPopup(false)}
            >
              &times;
            </button>
            <h4 className="text-lg font-bold mb-2">AI Suggestion:</h4>
            {loading ? (
              <p>Loading AI response...</p>
            ) : (
              <pre className="whitespace-pre-wrap text-sm max-h-[60vh] overflow-y-auto p-2 bg-gray-100 rounded border">
                {aiSuggestion}
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
      )}
    </div>
  );
};

export default App;
