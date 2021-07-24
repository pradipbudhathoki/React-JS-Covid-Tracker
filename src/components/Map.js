import React from "react";
import "./Map.css";
import { Map as LeafletMap, TileLayer } from "react-leaflet";

import { useEffect, useState } from "react";
import Loading from "./Loading";
import MapElement from "./MapElement";

function Map(props) {
  const [districtData, setDistrictData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [casesType, setCasesType] = useState("cases");

  // console.log("Info: Props.district ", props.district);

  useEffect(() => {
    setIsLoading(true);
    const getLatitude = (id) => {
      for (let i = 0; i < props.district.length; i++) {
        if (id === props.district[i].id) {
          return props.district[i].lat;
        }
      }
    };

    const getLongitude = (id) => {
      for (let i = 0; i < props.district.length; i++) {
        if (id === props.district[i].id) {
          return props.district[i].long;
        }
      }
    };

    const getName = (id) => {
      for (let i = 0; i < props.district.length; i++) {
        if (id === props.district[i].id) {
          return props.district[i].title;
        }
      }
    };

    const getData = async () => {
      await fetch("https://data.askbhunte.com/api/v1/covid/summary")
        .then((response) => response.json())
        .then((data) => {
          // console.log("API", data);
          let districtCases = data.district.cases;
          // console.log(districtCases);
          const info = districtCases.map((district) => ({
            id: district.district,
            name: getName(district.district),
            cases: district.count,
            lat: getLatitude(district.district),
            long: getLongitude(district.district),
          }));

          setDistrictData(info);
          setIsLoading(false);
          setCasesType("cases");
        });
    };
    getData();
  }, [props.district]);

  // console.log("Cases: districtData ", districtData);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="map">
      <LeafletMap center={props.center} zoom={props.zoom}>
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />

        <MapElement data={districtData} casesType={casesType} />
      </LeafletMap>
    </div>
  );
}

export default Map;
