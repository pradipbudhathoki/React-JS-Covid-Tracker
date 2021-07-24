import React from "react";
import InfoBox from "../components/InfoBox";
import "./MainPage.css";
import { CardContent } from "@material-ui/core";
import LineGraph from "../components/LineGraph";
import { useState } from "react";
import Map from "../components/Map";
import "leaflet/dist/leaflet.css";

function MainPage(props) {
  const [casesType, setCasesType] = useState("cases");

  // districtCases not in use
  // const [districtCases, setDistrictCases] = useState([]);
  // console.log(districtCases);

  const typeValue = props.districtInfo.tests ? "Tests" : "";

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
              cases={props.districtInfo.todayCases}
              total={props.districtInfo.cases}
            />
            <InfoBox
              onClick={(e) => setCasesType("recovered")}
              title="Recovered"
              bgColor="#ccffcc"
              active={casesType === "recovered"}
              cases={props.districtInfo.todayRecovered}
              total={props.districtInfo.recovered}
            />
            <InfoBox
              onClick={(e) => setCasesType("deaths")}
              title="Deaths"
              isRed
              bgColor="#E48D99"
              active={casesType === "deaths"}
              cases={props.districtInfo.todayDeaths}
              total={props.districtInfo.deaths}
            />
            <InfoBox
              title="Active Cases"
              isRed
              bgColor="#F8EBFF"
              cases={props.districtInfo.active}
              total={props.districtInfo.tests}
              type={typeValue}
            />
          </div>
          <Map
            district={props.district}
            center={props.mapCenter}
            zoom={props.mapZoom}
          />
        </div>

        <div className="main__right">
          <CardContent>
            <div className="main__information">
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
