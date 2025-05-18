import {useEffect, useRef, useState} from "react";
import {nanoid} from "nanoid";
import Die from "./component/Die.jsx";
import Scoreboard from "./component/Scoreboard.jsx";
import "./App.css";
import {categoryScores, qualifyStraightSm, qualifyStraightLg, upperCategory} from "./constants/constants.js";

export default function App() {
  const [diceData, setDiceData] = useState(() => displayDice());
  const [scoreData, setScoreData] = useState(() => generateScoreData());
  const [gameData, setGameData] = useState(() => generateGameData());

  const gameButtonRef = useRef(null);

  function displayDice() {
    return new Array(5).fill(0).map(() => ({
      value: "X",
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
        fHouse: {
          value: 0,
          lock: false,
        },
        straightSm: {
          value: 0,
          lock: false,
        },
        straightLg: {
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
      round: 1
    };
  }

  useEffect(() => {
    gameButtonRef.current.textContent = "Roll to Begin"
  }, [])

  useEffect(() => {
    if (gameData.round > 13) {
      console.log("End Game")
      console.log(`Congratulations! Final score: ${scoreData.total.total}`)
    }
  }, [gameData.round]);

  useEffect(() => {
    if (!gameData.active) return;

    const newCategory = {...scoreData.category};

    // Calculate Totals from 1 - 6
    for (let i = 1; i <= 6; i++) {
      const count = diceData.filter((d) => d.value === i).length;
      const key = upperCategory[i - 1];

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
    if (!newCategory["fHouse"].lock) {
      const fhCounts = {};
      diceData.forEach((die) => {
        fhCounts[die.value] = (fhCounts[die.value] || 0) + 1;
      });

      const values = Object.values(fhCounts);
      const isFullHouse = values.includes(3) && values.includes(2);

      newCategory["fHouse"].value = isFullHouse ? categoryScores.fHouse : 0;
    }

    // Sm. Straight
    if (!newCategory["straightSm"].lock) {
      const uniqueSortedSM = [...new Set(diceData.map((d) => d.value))].sort(
        (a, b) => a - b,
      );

      const asString = uniqueSortedSM.join("");
      const isSmStraight = qualifyStraightSm.includes(asString);

      newCategory["straightSm"].value = isSmStraight ? categoryScores.straightSm : 0;
    }

    // Lg. Straight
    if (!newCategory["straightLg"].lock) {
      const uniqueSortedLG = [...new Set(diceData.map((d) => d.value))].sort(
        (a, b) => a - b,
      );

      const asString = uniqueSortedLG.join("");
      const isLgStraight = qualifyStraightLg.includes(asString);

      newCategory["straightLg"].value = isLgStraight ? categoryScores.straightLg : 0;
    }

    // Yacht
    if (!newCategory["yacht"].lock) {
      const hasYacht = diceData.some((die) => {
        const count = diceData.filter((d) => d.value === die.value).length;
        return count >= 5;
      });

      newCategory["yacht"].value = hasYacht ? categoryScores.yacht : 0;
    }

    // Update the Score Data
    setScoreData((prevState) => ({
      ...prevState,
      category: newCategory,
      total: prevState.total
    }));
  }, [gameData.rolls]);

  // Dice rolling
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
        round: prevState.round
      }));
    }
  }

  // Dice selection to hold for next dice roll
  function holdDie(id) {
    setDiceData((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, isHeld: !item.isHeld } : item,
      ),
    );
  }

  // Displaying Die objects
  const diceObjs = diceData.map((item) => (
    <Die
      key={item.id}
      value={item.value}
      held={item.isHeld}
      handleOnClick={() => holdDie(item.id)}
    />
  ));

  // Click Handler for Scoreboard to confirm Category Selection for current game round
  function handleSelectCategory(categoryName) {
    if (!gameData.active) return
    if (scoreData.category[categoryName].lock) return;

    const newCategory = scoreData.category
    const newTotal = scoreData.total

    // Lock the Clicked Category
    newCategory[categoryName].lock = true


    // Update Subtotal
    const subtotalValue = upperCategory.reduce((sum, key) => {
      return sum + (scoreData.category[key].lock? scoreData.category[key].value : 0);
    }, 0);

    newTotal["subtotal"] = subtotalValue

    // Update Bonus if subtotal qualifies
    if (scoreData.total.bonus === 0 && subtotalValue >= 63) {
      newTotal["bonus"] = categoryScores.bonus
    }

    // Update Total
    newTotal["total"] = Object.values(scoreData.category).reduce((sum, entry) =>
      sum + (entry.lock ? entry.value : 0), 0
    ) + scoreData.total.bonus

    // Update Score Data
    setScoreData((prevState) => ({
      ...prevState,
      category: newCategory,
      total: newTotal
    }));

    newRound()
  }

  // Reset Data for next round
  function newRound() {
    setGameData(prevState => (
      {
        rolls: 3,
        active: false,
        round: prevState.round + 1
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
            handleSelectCategory={handleSelectCategory}
          />
        </div>
        <div className={"dice-board"}>
          <h1>Your Hand</h1>
          <div>{diceObjs}</div>
          <br/>
          <button ref={gameButtonRef}
            onClick={() => rollDice()}
            disabled={!(gameData.rolls > 0)}
          >{`Roll Dice (${gameData.rolls} rolls left)`}</button>
        </div>
      </div>
    </>
  );
}
