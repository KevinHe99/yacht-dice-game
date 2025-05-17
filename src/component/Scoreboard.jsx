export default function Scoreboard({ scoreData }) {
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
            <td className={"score"}>{scoreData.upper.aces.value}</td>
          </tr>
          <tr>
            <td>Twos</td>
            <td className={"score"}>{scoreData.upper.twos.value}</td>
          </tr>
          <tr>
            <td>Threes</td>
            <td className={"score"}>{scoreData.upper.threes.value}</td>
          </tr>
          <tr>
            <td>Fours</td>
            <td className={"score"}>{scoreData.upper.fours.value}</td>
          </tr>
          <tr>
            <td>Fives</td>
            <td className={"score"}>{scoreData.upper.fives.value}</td>
          </tr>
          <tr>
            <td>Sixes</td>
            <td className={"score"}>{scoreData.upper.sixes.value}</td>
          </tr>
          <tr>
            <td>Total Score</td>
            <td className={"score"}>
              {scoreData.upper.bonus.value}
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
                {scoreData.upper.score}
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
            <td className={"score"}>{scoreData.lower.chance.value}</td>
          </tr>
          <tr>
            <td>3 of a Kind</td>
            <td className={"score"}>{scoreData.lower.oak3.value}</td>
          </tr>
          <tr>
            <td>4 of a Kind</td>
            <td className={"score"}>{scoreData.lower.oak4.value}</td>
          </tr>
          <tr>
            <td>Full House</td>
            <td className={"score"}>{scoreData.lower.fhouse.value}</td>
          </tr>
          <tr>
            <td>Sm. Straight</td>
            <td className={"score"}>{scoreData.lower.straightSM.value}</td>
          </tr>
          <tr>
            <td>Lg. Straight</td>
            <td className={"score"}>{scoreData.lower.straightLG.value}</td>
          </tr>
          <tr>
            <td>Yacht</td>
            <td className={"score"}>{scoreData.lower.yacht.value}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>Lower Score</td>
            <td className={"score"}>{scoreData.lower.score}</td>
          </tr>
          <tr>
            <td className="seperator" colSpan={2}></td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>Total Score</td>
            <td className={"score"}>{scoreData.total}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
