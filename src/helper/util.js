import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 800,
  },
};

export const sortData = (data) => {
  let sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

const casesType = "cases";
export const showData = (data) => {
  /*
  for (let i = 0; i < data.length; i++) {
    if (data[i].lat && data[i].long) {
      return (
        <Circle
          center={[data[i].lat, data[i].long]}
          color={casesTypeColors[casesType].hex}
          fillColor={casesTypeColors[casesType].hex}
          fillOpacity={0.4}
          radius={
            Math.sqrt(data[i][casesType]) *
            casesTypeColors[casesType].multiplier
          }
        >
          <Popup>
            <div>
              <div>{data[i].district}</div>
              <div>Cases: {data[i].cases}</div>
            </div>
          </Popup>
        </Circle>
      );
    }
  }
  */
};
