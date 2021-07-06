import React from "react";
import "./Table.css";
import { useState, useEffect } from "react";
import { sortData } from "../helper/util";
import numeral from "numeral";
import Loading from "./Loading";

function Table(props) {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const getDistrictName = (id) => {
      for (let i = 0; i < props.district.length; i++) {
        if (id === props.district[i].id) {
          return props.district[i].name;
        }
      }
    };

    const getDistrictsData = async () => {
      fetch(`https://data.askbhunte.com/api/v1/covid/summary`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          const activeData = data.district.active;
          // console.log(activeData);
          const districts = activeData.map((district) => ({
            id: district.district,
            cases: district.count,
            name: getDistrictName(district.district),
          }));
          // console.log(districts);
          let sortedData = sortData(districts);
          setTableData(sortedData);
          setIsLoading(false);
        });
    };
    getDistrictsData();
  }, [props.district]);

  // console.log(tableData);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="table">
      {tableData.map((district) => (
        <tr>
          <td>{district.name}</td>
          <td>
            <strong>{numeral(district.cases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
