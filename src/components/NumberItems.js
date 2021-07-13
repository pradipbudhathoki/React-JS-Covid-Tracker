import React from "react";
import "./NumberDetail.css";

function NumberItems(props) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.number}</td>
    </tr>
  );
}

export default NumberItems;
