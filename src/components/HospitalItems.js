import React from "react";
import "./Hospitals.css";

function HospitalItems(props) {
  return (
    <div>
      <tr>
        <td>
          <h3>{props.name}</h3>
          <p>{props.address}</p>
          <p>{props.phone}</p>
        </td>
        <td>{props.beds}</td>
        <td>{props.icuBeds}</td>
        <td>{props.ventilators}</td>
      </tr>
    </div>
  );
}

export default HospitalItems;
