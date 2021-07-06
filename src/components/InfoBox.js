import React from "react";
import "./InfoBox.css";

import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox(props) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${props.active && "infoBox--selected"} ${
        props.isRed && "infoBox--red"
      }`}
    >
      <CardContent>
        <Typography color="textSecondary" gutterButtom>
          {props.title}
        </Typography>
        <h2
          className={`infoBox__cases ${
            !props.isRed && "infoBox__cases--green"
          }`}
        >
          {props.cases}
        </h2>
        <Typography className="infoBox__total" color="textSecondary">
          {props.total} Total {props.type}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
