import { Spinner } from "react-bootstrap";
import "./TableRowComp.css";

export function TableRowComp({
  ip,
  totalRunningTime,
  name,
  type,
  totalPrice,
  is_running: isRunning,
  currencyRate,
  id,
  onDelete,
  onToggle,
  isToggleServerLoading,
}) {
  return (
    <tr>
      <td>{ip}</td>
      <td>{name}</td>
      <td>{totalRunningTime}</td>
      {!isToggleServerLoading ? (
        <td
          className="clickable"
          onClick={() => {
            onToggle(id);
          }}
        >
          {isRunning ? "Turn off" : "Turn on"}
        </td>
      ) : (
        <td>
          <Spinner />
        </td>
      )}
      <td>{type}</td>
      <td>{parseFloat(totalPrice * currencyRate).toFixed(2)}</td>
      <td className="clickable" onClick={() => onDelete(id)}>
        Delete
      </td>
    </tr>
  );
}
