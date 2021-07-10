import React from "react";
import InfoBox from "../components/InfoBox";
import "./MainPage.css";
import { CardContent } from "@material-ui/core";
import Table from "../components/Table";
import LineGraph from "../components/LineGraph";
import { useState } from "react";
import Map from "../components/Map";
import "leaflet/dist/leaflet.css";

function MainPage(props) {
  const [casesType, setCasesType] = useState("cases");

  // console.log(props.districtInfo);
  const typeValue = props.districtInfo.country ? "Tests" : "";
  // console.log(casesType);
  return (
    <div>
      <div className="main">
        <div className="main__left">
          <div className="main__stats">
            <InfoBox
              onClick={(e) => setCasesType("cases")}
              title="Corona Virus Cases"
              isRed
              active={casesType === "cases"}
              cases={props.districtInfo.todayCases}
              total={props.districtInfo.cases}
            />
            <InfoBox
              onClick={(e) => setCasesType("recovered")}
              title="Recovered"
              active={casesType === "recovered"}
              cases={props.districtInfo.todayRecovered}
              total={props.districtInfo.recovered}
            />
            <InfoBox
              onClick={(e) => setCasesType("deaths")}
              title="Deaths"
              isRed
              active={casesType === "deaths"}
              cases={props.districtInfo.todayDeaths}
              total={props.districtInfo.deaths}
            />
            <InfoBox
              title="Active Cases"
              isRed
              cases={props.districtInfo.active}
              total={props.districtInfo.tests}
              type={typeValue}
            />
          </div>
          <Map
            districts={props.mapDistricts}
            casesType={casesType}
            center={props.mapCenter}
            zoom={props.mapZoom}
          />
        </div>

        <div className="main__right">
          <CardContent>
            <div className="main__information">
              <h3> Cases by Districts</h3>
              <Table district={props.district} />
            </div>
          </CardContent>
        </div>
      </div>
      <div className="graph">
        <div className="graph__chart">
          <h3>NationWide Cases</h3>
          <LineGraph casesType="cases" />
        </div>
        <div className="graph__chart">
          <h3>NationWide Recovered</h3>
          <LineGraph casesType="recovered" />
        </div>
        <div className="graph__chart">
          <h3>NationWide Deaths</h3>
          <LineGraph casesType="deaths" />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
