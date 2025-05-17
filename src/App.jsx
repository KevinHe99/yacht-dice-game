import {useState} from "react";
import {nanoid} from "nanoid";
import Die from "./component/Die.jsx";

export default function App() {

  const [diceData, setDiceData] = useState(() => generateDice())

  function generateDice() {
    return new Array(5)
      .fill(0)
      .map(() => (
        {
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()
        }
      ))
  }

  const diceObjs = diceData.map(item => (
    <Die key={item.id} value={item.value} held={item.isHeld}/>
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
