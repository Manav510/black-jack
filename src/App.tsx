import "@pixi/events";
import { Stage } from "@pixi/react";

import ErrorBoundary from "./ErrorBoundary";
import "./App.css";
import GameScreen from "./BlackJack/useGame";
import BlackJack from "./BlackJack/BlackJack";
const config = {
  size: { width: window.innerWidth, height: window.innerHeight },
  spring: { mass: 10, tension: 1000, friction: 100 },
  stage: { antialias: true, backgroundColor: 0x1099bb },
};

const App = () => {


  return (
    // <Stage {...config.size} options={config.stage}>
    <ErrorBoundary>
      <BlackJack />
    {/* <GameScreen /> */}
    </ErrorBoundary>
  // </Stage>
  );
};

export default App;
