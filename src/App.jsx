import {useState} from "react";
import {nanoid} from "nanoid";

export default function App() {

  const [diceData, setDiceData] = useState(() => generateDice())

  function generateDice() {
    return new Array(5)
      .fill(0)
      .map(() => (
        {
          value: Math.ceil(Math.random() * 6),
          id: nanoid()
        }
      ))
  }

  const diceObjs = diceData.map(item => (
    <button key={item.id}>{item.value}</button>
  ))


  return (
    <>
      <h1>Yacht Dice Game</h1>
      <div>
        {diceObjs}
      </div>
      <button>Roll</button>
    </>
  );
}
