import React from "react";
import "./Hospitals.css";

function HospitalItems(props) {
  return (
    <div>
      <div className="hospital-items">
        <tr>
          <td>
            <h3>{props.name}</h3>
            <p>{props.address}</p>
            <p>{props.phone}</p>
          </td>
          <td>
            <div className="hospital__contents">
              <div>{props.beds}</div>
              <div>{props.icuBeds}</div>
              <div>{props.ventilators}</div>
            </div>
          </td>
        </tr>
      </div>
      <hr />
    </div>
  );
}

export default HospitalItems;
