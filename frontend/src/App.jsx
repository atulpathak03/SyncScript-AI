import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import axios from "axios";
import JoinRoom from "./components/JoinRoom";
import Sidebar from "./components/Sidebar";
import CodeEditor from "./components/CodeEditor";
import AiPopup from "./components/AiPopup";

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
    socket.on("languageUpdate", (lang) => setLanguage(lang));

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

  const askAISuggestion = async (task) => {
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/gemini/suggest`, { code, task });
      setAiSuggestion(res.data.suggestion || "No suggestion received.");
    } catch (err) {
      setAiSuggestion("Error while getting AI suggestion.");
      console.error(err);
    } finally {
      setShowPopup(true);
      setLoading(false);
    }
  };

  if (!joined) {
    return (
      <JoinRoom
        roomId={roomId}
        setRoomId={setRoomId}
        userName={userName}
        setUserName={setUserName}
        joinRoom={joinRoom}
      />
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar
        roomId={roomId}
        users={users}
        typing={typing}
        language={language}
        setLanguage={(lang) => {
          setLanguage(lang);
          socket.emit("languageChange", { roomId, language: lang });
        }}
        leaveRoom={leaveRoom}
        askAISuggestion={askAISuggestion}
        copyRoomId={copyRoomId}
        copySuccess={copySuccess}
      />
      <CodeEditor code={code} handleCodeChange={handleCodeChange} language={language} />
      <AiPopup
        show={showPopup}
        loading={loading}
        suggestion={aiSuggestion}
        onClose={() => setShowPopup(false)}
        copySuggestion={copySuggestion}
      />
    </div>
  );
};

export default App;
