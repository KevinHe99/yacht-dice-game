

export default function Die({value, held}) {
  const style = {
    backgroundColor : held ? "#5BC3EB" : "#EDE6E3",
    padding: '12px 20px',
    border: '2px solid #36382E',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    margin: '4px',
  }

  return (
    <button style={style}>{value}</button>
  )
}