import { useState } from "react";
import { nanoid } from "nanoid";
import Die from "./component/Die.jsx";

export default function App() {
  const [diceData, setDiceData] = useState(() => generateDice());

  function generateDice() {
    return new Array(5).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
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
      <div>{diceObjs}</div>
      <button onClick={() => rollDice()}>Roll</button>
    </>
  );
}
