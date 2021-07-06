import React from "react";
import InfoBox from "../components/InfoBox";
import "./MainPage.css";
import { CardContent } from "@material-ui/core";
import Table from "../components/Table";

function MainPage(props) {
  // console.log(props.districtInfo);
  const typeValue = props.districtInfo.country ? "Tests" : "";

  return (
    <div className="main">
      <div className="main__left">
        <div className="main__stats">
          <InfoBox
            title="Corona Virus Cases"
            cases={props.districtInfo.todayCases}
            total={props.districtInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={props.districtInfo.todayRecovered}
            total={props.districtInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={props.districtInfo.todayDeaths}
            total={props.districtInfo.deaths}
          />
          <InfoBox
            title="Active Cases"
            cases={props.districtInfo.active}
            total={props.districtInfo.tests}
            type={typeValue}
          />
        </div>
      </div>

      <div className="main__right">
        <CardContent>
          <div className="main__information">
            <h3> Cases by Districts</h3>
            <Table district={props.district} />
            <h3>NationWide new Cases</h3>
          </div>
        </CardContent>
      </div>
    </div>
  );
}

export default MainPage;
