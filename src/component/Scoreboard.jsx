export default function Scoreboard({ scoreData, gameActive }) {
  function displayScore(gameActiveState, lock, score) {
    return gameActiveState || lock ? score : "";
  }

  return (
    <>
      <h1>Scoreboard</h1>
      <table>
        <tbody>
          <tr>
            <th colSpan={2}>Upper Section</th>
          </tr>
          <tr>
            <td>Aces</td>
            <td className={"score"}>
              {displayScore(
                gameActive,
                scoreData.upper.aces.lock,
                scoreData.upper.aces.value,
              )}
            </td>
          </tr>
          <tr>
            <td>Twos</td>
            <td className={"score"}>
              {displayScore(
                gameActive,
                scoreData.upper.twos.lock,
                scoreData.upper.twos.value,
              )}</td>
          </tr>
          <tr>
            <td>Threes</td>
            <td className={"score"}>
              {displayScore(
                gameActive,
                scoreData.upper.threes.lock,
                scoreData.upper.threes.value,
              )}</td>
          </tr>
          <tr>
            <td>Fours</td>
            <td className={"score"}>
              {displayScore(
                gameActive,
                scoreData.upper.fours.lock,
                scoreData.upper.fours.value,
              )}</td>
          </tr>
          <tr>
            <td>Fives</td>
            <td className={"score"}>
              {displayScore(
                gameActive,
                scoreData.upper.fives.lock,
                scoreData.upper.fives.value,
              )}</td>
          </tr>
          <tr>
            <td>Sixes</td>
            <td className={"score"}>
              {displayScore(
                gameActive,
                scoreData.upper.sixes.lock,
                scoreData.upper.sixes.value,
              )}</td>
          </tr>
          <tr>
            <td>Total Score</td>
            <td className={"score"}>
              {scoreData.upper.score}
              <span style={{ fontWeight: "bold" }}>/63</span>
            </td>
          </tr>
          <tr>
            <td>Bonus</td>
            <td className={"score"}>
              {scoreData.upper.bonus.lock
                ? `+${scoreData.upper.bonus.value}`
                : ""}
            </td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>Upper Score</td>
            <td className={"score"}>
              <span style={{ fontWeight: "bold" }}>
                {scoreData.upper.scoreWBonus}
              </span>
            </td>
          </tr>
          <tr>
            <td className="seperator" colSpan={2}></td>
          </tr>
          <tr>
            <th colSpan={2}>Lower Section</th>
          </tr>
          <tr>
            <td>Chance</td>
            <td className={"score"}>
              {displayScore(
                gameActive,
                scoreData.lower.chance.lock,
                scoreData.lower.chance.value,
              )}</td>
          </tr>
          <tr>
            <td>3 of a Kind</td>
            <td className={"score"}>
              {displayScore(
                gameActive,
                scoreData.lower.oak3.lock,
                scoreData.lower.oak3.value,
              )}</td>
          </tr>
          <tr>
            <td>4 of a Kind</td>
            <td className={"score"}>
              {displayScore(
                gameActive,
                scoreData.lower.oak4.lock,
                scoreData.lower.oak4.value,
              )}</td>
          </tr>
          <tr>
            <td>Full House</td>
            <td className={"score"}>
              {displayScore(
                gameActive,
                scoreData.lower.fhouse.lock,
                scoreData.lower.fhouse.value,
              )}</td>
          </tr>
          <tr>
            <td>Sm. Straight</td>
            <td className={"score"}>
              {displayScore(
                gameActive,
                scoreData.lower.straightSM.lock,
                scoreData.lower.straightSM.value,
              )}</td>
          </tr>
          <tr>
            <td>Lg. Straight</td>
            <td className={"score"}>
              {displayScore(
                gameActive,
                scoreData.lower.straightLG.lock,
                scoreData.lower.straightLG.value,
              )}</td>
          </tr>
          <tr>
            <td>Yacht</td>
            <td className={"score"}>
              {displayScore(
                gameActive,
                scoreData.lower.yacht.lock,
                scoreData.lower.yacht.value,
              )}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>Lower Score</td>
            <td className={"score"}>
              <span style={{ fontWeight: "bold" }}>
                {scoreData.lower.score}
              </span>
            </td>
          </tr>
          <tr>
            <td className="seperator" colSpan={2}></td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>Total Score</td>
            <td className={"score"}>
              <span style={{ fontWeight: "bold" }}>{scoreData.total}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
