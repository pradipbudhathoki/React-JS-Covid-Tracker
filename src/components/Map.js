import React from "react";
import "./Map.css";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import { showData } from "../helper/util";

function Map(props) {
  console.log(props.districtsInfo);
  return (
    <div className="map">
      <LeafletMap center={props.center} zoom={props.zoom}>
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
      </LeafletMap>
      {/* {showData()} */}
    </div>
  );
}

export default Map;
