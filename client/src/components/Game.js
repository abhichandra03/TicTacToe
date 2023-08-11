import React, { useState } from "react";
import { Window, MessageList, MessageInput } from "stream-chat-react";
import Board from "./Board";
import "./Chat.css";

const Game = ({ channel, setChannel }) => {
  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );

  const [result, setResult] = useState({ winner: "none", state: "none" });

  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2);
  });

  if (!playersJoined) {
    return <div className="waiting">Waiting for other players to join...</div>;
  } else {
    return (
      <div className="gameContainer">
        <Board result={result} setResult={setResult} />
        <Window>
          <MessageList
            hideDeletedMessages
            disableDateSeparator
            closeReactionSelectorOnClick
            messageActions={["react"]}
          />
          <MessageInput noFiles />
        </Window>

        {result.state === "won" && (
          <div className="result">{result.winner} Won the game</div>
        )}
        {result.state === "tie" && <div className="result"> Game Tied</div>}
        <button
          className="leaveGame"
          onClick={async () => {
            await channel.stopWatching();
            setChannel(null);
          }}
        >
          Leave Game
        </button>
      </div>
    );
  }
};

export default Game;