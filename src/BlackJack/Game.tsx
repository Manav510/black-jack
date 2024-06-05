import { Container } from "@pixi/react-animated";

import GameContext from "./context";
import { useContext } from "react";
import useGame from "./useGame";

import StartGame from "./components/StartGame";
import Dealer_cards from "./components/Dealer_cards";
import PlayerTurn from "./components/PlayerTurn";
import Popup from "./components/Popup";
const GameComp = () => {
  const { game_started,reset_game,show_popup,result } = useContext(GameContext);
    const handleClosePopup = () => {
    reset_game();
  };
  return (
    <Container sortableChildren={true}>
      {!game_started && <StartGame />}
      {!show_popup && <Dealer_cards />}
      {!show_popup && <PlayerTurn />}
      {show_popup && <Popup result={result} onClose={handleClosePopup} />}
    </Container>
  );
};

const Game = ({ textures }) => {
  const value = useGame({ textures });
  return (
    <GameContext.Provider value={value}>
      <GameComp />
    </GameContext.Provider>
  );
};

export default Game;