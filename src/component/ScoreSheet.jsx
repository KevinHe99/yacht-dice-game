import {categoryNames} from "../constants/constants.js";

export default function ScoreSheet({ scoreData, gameActive, handleSelectCategory }) {
  function displayScore(gameActiveState, lock, score) {
    return gameActiveState || lock ? score : "";
  }


  const scoreBoxStyle = (gameActiveState, lock) => {
    return {
      textAlign: "right",
      width: "50px",
      fontWeight: lock? "bold" : "",
      backgroundColor: gameActiveState && !lock ? "#EDBF85" : "",
    };
  };

  return (
    <>
      <h1>Score Sheet</h1>
      <table>
        <tbody>
          <tr>
            <th style={{backgroundColor:"#495057", color:"#E9ECEF"}}>Categories</th>
            <th style={{backgroundColor:"#495057", color:"#E9ECEF"}}>Scores</th>
          </tr>
          <tr>
            <td>Aces</td>

            <td style={scoreBoxStyle(gameActive,scoreData.category.aces.lock)} className={"score no-select"} onClick={() =>handleSelectCategory(categoryNames[0])}>
              {displayScore(
                gameActive,
                scoreData.category.aces.lock,
                scoreData.category.aces.value,
              )}
            </td>
          </tr>
          <tr>
            <td>Twos</td>
            <td style={scoreBoxStyle(gameActive,scoreData.category.twos.lock)} className={"score no-select"} onClick={() =>handleSelectCategory(categoryNames[1])}>
              {displayScore(
                gameActive,
                scoreData.category.twos.lock,
                scoreData.category.twos.value,
              )}
            </td>
          </tr>
          <tr>
            <td>Threes</td>
            <td style={scoreBoxStyle(gameActive,scoreData.category.threes.lock)} className={"score no-select"} onClick={() =>handleSelectCategory(categoryNames[2])}>
              {displayScore(
                gameActive,
                scoreData.category.threes.lock,
                scoreData.category.threes.value,
              )}
            </td>
          </tr>
          <tr>
            <td>Fours</td>
            <td style={scoreBoxStyle(gameActive,scoreData.category.fours.lock)} className={"score no-select"} onClick={() =>handleSelectCategory(categoryNames[3])}>
              {displayScore(
                gameActive,
                scoreData.category.fours.lock,
                scoreData.category.fours.value,
              )}
            </td>
          </tr>
          <tr>
            <td>Fives</td>
            <td style={scoreBoxStyle(gameActive,scoreData.category.fives.lock)} className={"score no-select"} onClick={() =>handleSelectCategory(categoryNames[4])}>
              {displayScore(
                gameActive,
                scoreData.category.fives.lock,
                scoreData.category.fives.value,
              )}
            </td>
          </tr>
          <tr>
            <td>Sixes</td>
            <td style={scoreBoxStyle(gameActive,scoreData.category.sixes.lock)} className={"score no-select"} onClick={() =>handleSelectCategory(categoryNames[5])}>
              {displayScore(
                gameActive,
                scoreData.category.sixes.lock,
                scoreData.category.sixes.value,
              )}
            </td>
          </tr>
          <tr>
            <td style={{backgroundColor:"#495057", color:"#E9ECEF"}}>Subtotal</td>
            <td style={{backgroundColor:"#ADB5BD", color:"#E9ECEF"}} className={"score"}>
              {scoreData.total.subtotal}
              <span style={{ fontWeight: "bold" }}>/63</span>
            </td>
          </tr>
          <tr>
            <td style={{backgroundColor:"#495057", color:"#E9ECEF"}}>+35 Bonus</td>
            <td style={{backgroundColor:"#ADB5BD", color:"#E9ECEF"}} className={"score"}>
              {scoreData.total.bonus !== 0
                ? `+${scoreData.total.bonus}`
                : ""}
            </td>
          </tr>

          {/**/}

          <tr>
            <td className="seperator" colSpan={2}></td>
          </tr>

          <tr>
            <td>Chance</td>
            <td style={scoreBoxStyle(gameActive,scoreData.category.chance.lock)} className={"score no-select"} onClick={() =>handleSelectCategory(categoryNames[6])}>
              {displayScore(
                gameActive,
                scoreData.category.chance.lock,
                scoreData.category.chance.value,
              )}
            </td>
          </tr>

          <tr>
            <td className="seperator" colSpan={2}></td>
          </tr>
          <tr>
            <td>3 of a Kind</td>
            <td style={scoreBoxStyle(gameActive,scoreData.category.oak3.lock)} className={"score no-select"} onClick={() =>handleSelectCategory(categoryNames[7])}>
              {displayScore(
                gameActive,
                scoreData.category.oak3.lock,
                scoreData.category.oak3.value,
              )}
            </td>
          </tr>
          <tr>
            <td>4 of a Kind</td>
            <td style={scoreBoxStyle(gameActive,scoreData.category.oak4.lock)} className={"score no-select"} onClick={() =>handleSelectCategory(categoryNames[8])}>
              {displayScore(
                gameActive,
                scoreData.category.oak4.lock,
                scoreData.category.oak4.value,
              )}
            </td>
          </tr>
          <tr>
            <td>Full House</td>
            <td style={scoreBoxStyle(gameActive,scoreData.category.fHouse.lock)} className={"score no-select"} onClick={() =>handleSelectCategory(categoryNames[9])}>
              {displayScore(
                gameActive,
                scoreData.category.fHouse.lock,
                scoreData.category.fHouse.value,
              )}
            </td>
          </tr>
          <tr>
            <td>Sm. Straight</td>
            <td style={scoreBoxStyle(gameActive,scoreData.category.straightSm.lock)} className={"score no-select"} onClick={() =>handleSelectCategory(categoryNames[10])}>
              {displayScore(
                gameActive,
                scoreData.category.straightSm.lock,
                scoreData.category.straightSm.value,
              )}
            </td>
          </tr>
          <tr>
            <td>Lg. Straight</td>
            <td style={scoreBoxStyle(gameActive,scoreData.category.straightLg.lock)} className={"score no-select"} onClick={() =>handleSelectCategory(categoryNames[11])}>
              {displayScore(
                gameActive,
                scoreData.category.straightLg.lock,
                scoreData.category.straightLg.value,
              )}
            </td>
          </tr>
          <tr>
            <td>Yacht</td>
            <td style={scoreBoxStyle(gameActive,scoreData.category.yacht.lock)} className={"score no-select"} onClick={() =>handleSelectCategory(categoryNames[12])}>
              {displayScore(
                gameActive,
                scoreData.category.yacht.lock,
                scoreData.category.yacht.value,
              )}
            </td>
          </tr>
          <tr>
            <td style={{backgroundColor:"#495057", color:"#E9ECEF"}}>Total Score</td>
            <td style={{backgroundColor:"#ADB5BD", color:"#E9ECEF"}} className={"score"}>
              <span style={{ fontWeight: "bold" }}>{scoreData.total.total}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
