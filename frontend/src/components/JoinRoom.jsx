const JoinRoom = ({ roomId, setRoomId, userName, setUserName, joinRoom }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 text-white ">
      <div className="bg-gray-800/90 h-[50vh] flex flex-col items-center justify-evenly backdrop-blur-sm p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
        <h1 className="text-3xl text-center font-extrabold  mb-8 tracking-wide text-blue-400 drop-shadow">
          🚀 Join Code Room
        </h1>

        <div className="space-y-6 flex flex-col items-center gap-5 justify-evenly ">
          <div>
            <label className="text-sm text-gray-400 ml-1">Room ID</label>
            <input
              type="text"
              placeholder="ROOM-00123"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full text-center text-lg px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 ml-1">Your Name</label>
            <input
              type="text"
              placeholder="Atul"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full text-center text-lg px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
            />
          </div>

          <button
            onClick={joinRoom}
            className="w-[9vw] text-center text-lg px-9 bg-blue-600 hover:bg-blue-700 transition-all duration-200 py-3 rounded-lg text-white font-semibold tracking-wide shadow-lg hover:shadow-xl"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
