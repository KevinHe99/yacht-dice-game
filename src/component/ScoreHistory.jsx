export default function ScoreHistory({ scoreHistory }) {
  const scoreDisplay = scoreHistory?.map((item, key) => (
    <tr key={key}>
      <td
        style={
          item.best ? { width: "240px", fontWeight: "bold", backgroundColor: "#EDBF85" } : {width: "60px"}
        }
      >
        {new Date(item.timestamp).toLocaleString()}
      </td>
      <td
        style={
          item.best ? { width: "60px", fontWeight: "bold", backgroundColor: "#EDBF85" } : {width: "60px"}
        }
      >
        {item.score}
      </td>
    </tr>
  ));

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th
              style={{ backgroundColor: "#495057", color: "#E9ECEF" }}
              colSpan={2}
            >
              Score History
            </th>
          </tr>
          {scoreDisplay}
        </tbody>
      </table>
    </div>
  );
}
