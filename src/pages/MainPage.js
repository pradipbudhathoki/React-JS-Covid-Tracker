import React from "react";
import InfoBox from "../components/InfoBox";
import "./MainPage.css";
import { CardContent } from "@material-ui/core";
import Table from "../components/Table";
import LineGraph from "../components/LineGraph";
import { useState } from "react";
import numeral from "numeral";
import { prettyPrintStat } from "../helper/util";

function MainPage(props) {
  const [casesType, setCasesType] = useState("cases");

  // console.log(props.districtInfo);
  const typeValue = props.districtInfo.country ? "Tests" : "";
  // console.log(casesType);
  return (
    <div className="main">
      <div className="main__left">
        <div className="main__stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Corona Virus Cases"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(props.districtInfo.todayCases)}
            total={numeral(props.districtInfo.cases).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={prettyPrintStat(props.districtInfo.todayRecovered)}
            total={numeral(props.districtInfo.recovered).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(props.districtInfo.todayDeaths)}
            total={numeral(props.districtInfo.deaths).format("0.0a")}
          />
          <InfoBox
            title="Active Cases"
            isRed
            cases={prettyPrintStat(props.districtInfo.active)}
            total={numeral(props.districtInfo.tests).format("0.0a")}
            type={typeValue}
          />
        </div>
      </div>

      <div className="main__right">
        <CardContent>
          <div className="main__information">
            <h3> Cases by Districts</h3>
            <Table district={props.district} />
            <h3>NationWide {casesType}</h3>
            <LineGraph casesType={casesType} />
          </div>
        </CardContent>
      </div>
    </div>
  );
}

export default MainPage;
