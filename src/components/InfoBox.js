import React from "react";
import "./InfoBox.css";

import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox(props) {
  return (
    <Card className="infoBox">
      <CardContent>
        <Typography>{props.title}</Typography>
        <h2 className="infoBox__cases">{props.cases}</h2>
        <Typography className="infoBox__total">
          {props.total} Total {props.type}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
