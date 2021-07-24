import React from "react";
import "./CallPage.css";
import { CardContent } from "@material-ui/core";
import Table from "../components/Table";
import NumberDetail from "../components/NumberDetail";
import { useState, useEffect } from "react";

function CallPage() {
  const [districtName, setDistrictName] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await fetch("https://data.askbhunte.com/api/v1/districts")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          const info = data.map((district) => ({
            id: district.id,
            name: district.title,
            province: district.province,
          }));

          setDistrictName(info);
        });
    };
    getData();
  }, []);

  // console.log("Name:", districtName);

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
            <Table districtName={districtName} />
          </div>
        </CardContent>
      </div>
    </div>
  );
}

export default CallPage;
