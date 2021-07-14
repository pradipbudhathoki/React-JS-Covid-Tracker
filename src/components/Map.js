import React from "react";
import "./Map.css";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import { showData } from "../helper/util";
import { useEffect, useState } from "react";
import Loading from "./Loading";

function Map(props) {
  const [districtData, setDistrictData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // console.log("Info: Props.district ", props.district);

  useEffect(() => {
    setIsLoading(true);
    const getLatitude = (value) => {
      for (let i = 0; i < props.district.length; i++) {
        if (value === props.district[i].value) {
          return props.district[i].lat;
        }
      }
    };

    const getLongitude = (value) => {
      for (let i = 0; i < props.district.length; i++) {
        if (value === props.district[i].value) {
          return props.district[i].long;
        }
      }
    };

    const getData = async () => {
      await fetch(
        "https://portal.edcd.gov.np/rest/api/fetchCasesByDistrict?filter=casesBetween&sDate=2020-01-01&eDate=2021-07-07&disease=COVID-19"
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          const info = data.map((district) => ({
            province: district.Province,
            district: district.District.slice(4),
            value: district.District.slice(4).toLowerCase(),
            cases: district.Value,
            lat: getLatitude(district.District.slice(4).toLowerCase()),
            long: getLongitude(district.District.slice(4).toLowerCase()),
          }));

          setDistrictData(info);
          setIsLoading(false);
        });
    };
    getData();
  }, [props.district]);

  console.log("Cases: districtData ", districtData);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="map">
      <LeafletMap center={props.center} zoom={props.zoom}>
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        {showData(districtData)}
      </LeafletMap>
    </div>
  );
}

export default Map;
