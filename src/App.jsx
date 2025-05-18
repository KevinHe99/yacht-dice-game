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
      value: 1,
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
      total: {
        subtotal: 0,
        bonus:0,
        total:0,
      },
      category: {
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
    };
  }

  function generateGameData() {
    return {
      rolls: 3,
      active: false,
    };
  }

  useEffect(() => {
    console.log("effect pre")
    if (!gameData.active) return;
    console.log("effect post")

    const newCategory = {...scoreData.category};

    // Calculate Totals from 1 - 6
    for (let i = 1; i <= 6; i++) {
      const count = diceData.filter((d) => d.value === i).length;
      const key = ["aces", "twos", "threes", "fours", "fives", "sixes"][i - 1];

      if (!newCategory[key].lock) {
        newCategory[key] = {
          ...newCategory[key],
          value: count * i,
        };
      }
    }

    // SUM
    const sumOfHand = diceData.reduce((sum, die) => sum + die.value, 0);

    // Chance
    if (!newCategory["chance"].lock) {
      newCategory["chance"].value = sumOfHand;
    }

    // Three of a kind
    if (!newCategory["oak3"].lock) {
      const hasThreeOfKind = diceData.some((die) => {
        const count = diceData.filter((d) => d.value === die.value).length;
        return count >= 3;
      });
      newCategory["oak3"].value = hasThreeOfKind ? sumOfHand : 0;
    }

    // Four of a kind
    if (!newCategory["oak4"].lock) {
      const hasFourOfKind = diceData.some((die) => {
        const count = diceData.filter((d) => d.value === die.value).length;
        return count >= 4;
      });
      newCategory["oak4"].value = hasFourOfKind ? sumOfHand : 0;
    }

    // Full House
    if (!newCategory["fhouse"].lock) {
      const fhCounts = {};
      diceData.forEach((die) => {
        fhCounts[die.value] = (fhCounts[die.value] || 0) + 1;
      });

      const values = Object.values(fhCounts);
      const isFullHouse = values.includes(3) && values.includes(2);

      newCategory["fhouse"].value = isFullHouse ? 25 : 0;
    }

    // Sm. Straight
    if (!newCategory["straightSM"].lock) {
      const uniqueSortedSM = [...new Set(diceData.map((d) => d.value))].sort(
        (a, b) => a - b,
      );
      const asString = uniqueSortedSM.join("");

      const smStraights =["1234", "2345", "3456"];
      const isSMStraight = smStraights.includes(asString);

      newCategory["straightSM"].value = isSMStraight ? 30 : 0;
    }

    // Lg. Straight
    if (!newCategory["straightLG"].lock) {
      const uniqueSortedLG = [...new Set(diceData.map((d) => d.value))].sort(
        (a, b) => a - b,
      );
      const asString = uniqueSortedLG.join("");

      const lgStraights = ["12345", "23456"];
      const isLGStraight = lgStraights.includes(asString);

      newCategory["straightLG"].value = isLGStraight ? 30 : 0;
    }

    // Yacht
    if (!newCategory["yacht"].lock) {
      const hasYacht = diceData.some((die) => {
        const count = diceData.filter((d) => d.value === die.value).length;
        return count >= 5;
      });
      newCategory["yacht"].value = hasYacht ? 50 : 0;
    }

    // Change the Data
    setScoreData((prevState) => ({
      ...prevState,
      category: newCategory
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

  // function startGame() {
  //   if (!gameData.active) {
  //     setDiceData(displayDice());
  //     setGameData(generateGameData());
  //     setGameData((prevState) => ({
  //       ...prevState,
  //       active: true,
  //     }));
  //   }
  // }

  const diceObjs = diceData.map((item) => (
    <Die
      key={item.id}
      value={item.value}
      held={item.isHeld}
      handleOnClick={() => holdDie(item.id)}
    />
  ));

  const categoryNames = [
    "aces", "twos","threes", "fours","fives", "sixes", "chance","oak3","oak4","fhouse",
    "straightSM", "straightLG", "yacht"
  ];

  function handleClick(categoryName) {
    const newCategory = scoreData.category
    const newTotal = scoreData.total

    // Lock the Clicked Category
    newCategory[categoryName].lock = true


    // Update Subtotal
    const subtotalName = ["aces", "twos","threes", "fours","fives", "sixes"]

    const subtotalValue = subtotalName.reduce((sum, key) => {
      return sum + (scoreData.category[key].lock? scoreData.category[key].value : 0);
    }, 0);

    console.log(subtotalValue)
    newTotal["subtotal"] = subtotalValue

    if (scoreData.total.bonus === 0 && subtotalValue >= 63) {
      newTotal["bonus"] = 35
    }

    // Update Total
    const totalValue = Object.values(scoreData.category).reduce((sum, entry) =>
      sum + (entry.lock? entry.value : 0), 0
    ) + scoreData.total.bonus

    newTotal["total"] = totalValue


    // Update Score Data
    setScoreData((prevState) => ({
      ...prevState,
      category: newCategory,
      total: newTotal
    }));

    newRound()
  }

  function newRound() {
    setGameData(prevState => (
      {
        ...prevState,
        active: false,
        rolls: 3
      }
    ))
    setDiceData(displayDice())
  }

  return (
    <>
      <h1>Yacht Dice Game</h1>
      <div className={"container"}>
        <div className={"scoreboard"}>
          <Scoreboard
            scoreData={scoreData}
            gameActive={gameData.active}
            handleClick={handleClick}
          />
        </div>
        <div className={"dice-board"}>
          <h1>Dice Table</h1>
          <div>{diceObjs}</div>
          <br/>
          <button
            onClick={() => rollDice()}
            disabled={!(gameData.rolls > 0)}
          >{`Roll Dice (${gameData.rolls} rolls left)`}</button>
          {/*<button onClick={() => startGame()}>Start Game</button>*/}
        </div>
      </div>
    </>
  );
}
