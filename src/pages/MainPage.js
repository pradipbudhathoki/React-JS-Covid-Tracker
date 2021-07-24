import React from "react";
import InfoBox from "../components/InfoBox";
import "./MainPage.css";
import { CardContent } from "@material-ui/core";
import LineGraph from "../components/LineGraph";
import { useState } from "react";
import Map from "../components/Map";
import "leaflet/dist/leaflet.css";
import Dropdown from "../components/Dropdown";

function MainPage(props) {
  const [casesType, setCasesType] = useState("cases");

  const [districtData, setDistrictData] = useState([]);
  const [districtInfo, setDistrictInfo] = useState({});

  const [mapCenter, setMapCenter] = useState({});
  const [mapZoom, setMapZoom] = useState();
  // const [mapDistricts, setMapDistricts] = useState([]);
  // const [mapDetails, setMapDetails] = useState([]);

  const typeValue = districtInfo.tests ? "Tests" : "";

  return (
    <div>
      <div className="main">
        <div className="main__left">
          <div className="main__stats">
            <InfoBox
              onClick={(e) => setCasesType("cases")}
              title="Corona Virus Cases"
              isRed
              bgColor="#AFCBFA"
              active={casesType === "cases"}
              cases={districtInfo.todayCases}
              total={districtInfo.cases}
            />
            <InfoBox
              onClick={(e) => setCasesType("recovered")}
              title="Recovered"
              bgColor="#ccffcc"
              active={casesType === "recovered"}
              cases={districtInfo.todayRecovered}
              total={districtInfo.recovered}
            />
            <InfoBox
              onClick={(e) => setCasesType("deaths")}
              title="Deaths"
              isRed
              bgColor="#E48D99"
              active={casesType === "deaths"}
              cases={districtInfo.todayDeaths}
              total={districtInfo.deaths}
            />
            <InfoBox
              title="Active Cases"
              isRed
              bgColor="#F8EBFF"
              cases={districtInfo.active}
              total={districtInfo.tests}
              type={typeValue}
            />
          </div>
          <Map district={districtData} center={mapCenter} zoom={mapZoom} />
        </div>

        <div className="main__right">
          <CardContent>
            <div className="main__information">
              <Dropdown
                districtInfo={setDistrictInfo}
                districtData={setDistrictData}
                // mapDistricts={setMapDistricts}
                mapCenter={setMapCenter}
                mapZoom={setMapZoom}
                // mapDetails={setMapDetails}
              />
              <h3>NationWide Cases</h3>
              <LineGraph casesType="cases" />
              <h3>NationWide Recovered</h3>
              <LineGraph casesType="recovered" />
              <h3>NationWide Deaths</h3>
              <LineGraph casesType="deaths" />
            </div>
          </CardContent>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
