import React from "react";
import "./CallPage.css";
import { CardContent } from "@material-ui/core";
import Table from "../components/Table";
import NumberDetail from "../components/NumberDetail";

function CallPage(props) {
  return (
    <div className="main">
      <div className="main__left">
        <CardContent>
          <h3>Emergency Number</h3>

          <NumberDetail />
        </CardContent>
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
  );
}

export default CallPage;
