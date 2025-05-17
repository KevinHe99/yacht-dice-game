import { useState } from "react";
import { nanoid } from "nanoid";
import Die from "./component/Die.jsx";
import Scoreboard from "./component/Scoreboard.jsx";
import "./App.css";

export default function App() {
  const [diceData, setDiceData] = useState(() => generateDiceData());
  const [scoreData, setScoreData] = useState(() => generateScoreData());

  function generateDiceData() {
    return new Array(5).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function generateScoreData() {
    return {
      upper: {
        score: 0,
        aces: {
          value: 0,
          lock: false,
        },
        twos: {
          value: 0,
          lock: false,
        },
        threes: {
          value: 0,
          lock: false,
        },
        fours: {
          value: 0,
          lock: false,
        },
        fives: {
          value: 0,
          lock: false,
        },
        sixes: {
          value: 0,
          lock: false,
        },
        bonus: {
          value: 0,
          lock: false,
        },
      },
      lower: {
        score: 0,
        chance: {
          value: 0,
          lock: false,
        },
        oak3: {
          value: 0,
          lock: false,
        },
        oak4: {
          value: 0,
          lock: false,
        },
        fhouse: {
          value: 0,
          lock: false,
        },
        straightSM: {
          value: 0,
          lock: false,
        },
        straightLG: {
          value: 0,
          lock: false,
        },
        yacht: {
          value: 0,
          lock: false,
        },
      },
      total: 0,
    };
  }

  function rollDice() {
    setDiceData((prevState) =>
      prevState.map((item) =>
        item.isHeld ? item : { ...item, value: Math.ceil(Math.random() * 6) },
      ),
    );
  }

  function holdDie(id) {
    setDiceData((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, isHeld: !item.isHeld } : item,
      ),
    );
  }

  const diceObjs = diceData.map((item) => (
    <Die
      key={item.id}
      value={item.value}
      held={item.isHeld}
      handleOnClick={() => holdDie(item.id)}
    />
  ));

  return (
    <>
      <h1>Yacht Dice Game</h1>
      <div className={"container"}>
        <div className={"scoreboard"}>
          <Scoreboard scoreData={scoreData} />
        </div>
        <div className={"dice-board"}>
          <h1>Table</h1>
          <div>{diceObjs}</div>
          <button onClick={() => rollDice()}>Roll</button>
        </div>
      </div>
    </>
  );
}
