import React from "react";
import "./Map.css";
import { Map as LeafletMap, TileLayer } from "react-leaflet";

function Map(props) {
  return (
    <div className="map">
      <LeafletMap center={props.center} zoom={props.zoom}>
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
      </LeafletMap>
    </div>
  );
}

export default Map;
