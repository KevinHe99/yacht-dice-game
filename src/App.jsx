import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Die from "./component/Die.jsx";
import Scoreboard from "./component/Scoreboard.jsx";
import "./App.css";

export default function App() {
  const [diceData, setDiceData] = useState(() => displayDice());
  const [scoreData, setScoreData] = useState(() => generateScoreData());
  const [gameData, setGameData] = useState(() => generateGameData());

  function displayDice() {
    return new Array(5).fill(0).map(() => ({
      value: 6,
      isHeld: false,
      id: nanoid(),
    }));
  }

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
        scoreWBonus: 0,
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

  function generateGameData() {
    return {
      rolls: 3,
      active: false,
    };
  }

  useEffect(() => {
    const newUpper = { ...scoreData.upper };
    const newLower = { ...scoreData.lower };

    // Calculate Totals from 1 - 6
    for (let i = 1; i <= 6; i++) {
      const count = diceData.filter((d) => d.value === i).length;
      const key = ["aces", "twos", "threes", "fours", "fives", "sixes"][i - 1];

      if (!newUpper[key].lock) {
        newUpper[key] = {
          ...newUpper[key],
          value: count * i,
        };
      }
    }

    // SUM
    const sumOfHand = diceData.reduce((sum, die) => sum + die.value, 0);

    // Chance
    if (!newLower["chance"].lock) {
      newLower["chance"].value = sumOfHand;
    }

    // Three of a kind
    if (!newLower["oak3"].lock) {
      const hasThreeOfKind = diceData.some((die) => {
        const count = diceData.filter((d) => d.value === die.value).length;
        return count >= 3;
      });
      newLower["oak3"].value = hasThreeOfKind ? sumOfHand : 0;
    }

    // Four of a kind
    if (!newLower["oak4"].lock) {
      const hasFourOfKind = diceData.some((die) => {
        const count = diceData.filter((d) => d.value === die.value).length;
        return count >= 4;
      });
      newLower["oak4"].value = hasFourOfKind ? sumOfHand : 0;
    }

    // Full House
    if (!newLower["fhouse"].lock) {
      const fhCounts = {};
      diceData.forEach((die) => {
        fhCounts[die.value] = (fhCounts[die.value] || 0) + 1;
      });

      const values = Object.values(fhCounts);
      const isFullHouse = values.includes(3) && values.includes(2);

      newLower["fhouse"].value = isFullHouse ? 25 : 0;
    }

    // Sm. Straight
    if (!newLower["straightSM"].lock) {
      const uniqueSortedSM = [...new Set(diceData.map((d) => d.value))].sort(
        (a, b) => a - b,
      );
      const asString = uniqueSortedSM.join("");

      const smStraights = ["12345", "23456"];
      const isSMStraight = smStraights.includes(asString);

      newLower["straightSM"].value = isSMStraight ? 30 : 0;
    }

    // Lg. Straight
    if (!newLower["straightLG"].lock) {
      const uniqueSortedLG = [...new Set(diceData.map((d) => d.value))].sort(
        (a, b) => a - b,
      );
      const asString = uniqueSortedLG.join("");

      const lgStraights = ["1234", "2345", "3456"];
      const isLGStraight = lgStraights.includes(asString);

      newLower["straightSM"].value = isLGStraight ? 30 : 0;
    }

    // Yacht
    if (!newLower["yacht"].lock) {
      const hasYacht = diceData.some((die) => {
        const count = diceData.filter((d) => d.value === die.value).length;
        return count >= 5;
      });
      newLower["yacht"].value = hasYacht ? 50 : 0;
    }

    // Change the Data
    setScoreData((prevState) => ({
      ...prevState,
      upper: newUpper,
      lower: newLower,
    }));
  }, [diceData]);

  function rollDice() {
    if (gameData.rolls > 0) {
      setDiceData((prevState) =>
        prevState.map((item) =>
          item.isHeld ? item : { ...item, value: Math.ceil(Math.random() * 6) },
        ),
      );
      setGameData((prevState) => ({
        ...prevState,
        rolls: prevState.rolls - 1,
        active: true,
      }));
    }
  }

  function holdDie(id) {
    setDiceData((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, isHeld: !item.isHeld } : item,
      ),
    );
  }

  function startGame() {
    if (!gameData.active) {
      setDiceData(displayDice());
      setGameData(generateGameData());
      setGameData((prevState) => ({
        ...prevState,
        active: true,
      }));
    }
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
          <Scoreboard scoreData={scoreData} gameActive={gameData.active} />
        </div>
        <div className={"dice-board"}>
          <h1>Table</h1>
          <div>{diceObjs}</div>
          <button
            onClick={() => rollDice()}
            disabled={!(gameData.rolls > 0)}
          >{`Roll Dice (${gameData.rolls} rolls left)`}</button>
          <button onClick={() => startGame()}>Start Game</button>
        </div>
      </div>
    </>
  );
}
