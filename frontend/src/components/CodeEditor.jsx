import Editor from "@monaco-editor/react";

const CodeEditor = ({ code, handleCodeChange, language }) => {
  return (
    <div className="flex-1 bg-gray-800">
      <Editor
        height="100%"
        language={language}
        value={code}
        onChange={handleCodeChange}
        theme="vs-dark"
        options={{ minimap: { enabled: false }, fontSize: 14 }}
      />
    </div>
  );
};

export default CodeEditor;
