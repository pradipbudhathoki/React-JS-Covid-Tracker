import React from "react";
import "./InfoBox.css";

import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox(props) {
  // console.log(props.type);
  return (
    <Card
      onClick={props.onClick}
      className="infoBox"
      style={{ backgroundColor: props.bgColor }}
    >
      <CardContent>
        <Typography color="textSecondary" gutterButtom>
          {props.title}
        </Typography>
        <h2 className="infoBox__cases">{props.cases}</h2>
        <Typography className="infoBox__total" color="textSecondary">
          {props.total} Total {props.type}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
