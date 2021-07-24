import React from "react";
import { Circle, Popup } from "react-leaflet";

function MapElement({ data, casesType }) {
  const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      rgb: "rgb(204, 16, 52)",
      half_op: "rgba(204, 16, 52, 0.5)",
      multiplier: 250,
    },
  };

  //   district.lat ? district.lat : 28.3949,
  //    district.long ? district.long : 84.124,
  return (
    <div>
      {data.map((district) => (
        <Circle
          center={[
            district.lat ? district.lat : 0,
            district.long ? district.long : 0,
          ]}
          color={casesTypeColors[casesType].hex}
          fillColor={casesTypeColors[casesType].hex}
          fillOpacity={0.4}
          radius={
            Math.sqrt(district[casesType]) *
            casesTypeColors[casesType].multiplier
          }
        >
          <Popup>
            <div>
              <div>{district.name}</div>
              <div>Total Infection: {district.cases}</div>
            </div>
          </Popup>
        </Circle>
      ))}
    </div>
  );
}

export default MapElement;
