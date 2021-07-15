import React from "react";
import "./Table.css";
import { useState, useEffect } from "react";
import numeral from "numeral";
import Loading from "./Loading";

function Table() {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const compare = (data) => {
    let sortedData = [...data];
    sortedData.sort((a, b) => {
      if (a.cases > b.cases) {
        return -1;
      }
      if (a.cases < b.cases) {
        return 1;
      }
      return 0;
    });
    return sortedData;
  };

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      fetch(
        "https://portal.edcd.gov.np/rest/api/fetchCasesByDistrict?filter=casesBetween&sDate=2020-01-01&eDate=2021-07-07&disease=COVID-19"
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          const districts = data.map((district) => ({
            name: district.District.slice(4),
            cases: parseInt(district.Value, 10),
          }));

          let sortedData = compare(districts);

          setTableData(sortedData);

          setIsLoading(false);
        });
    };
    getData();
  }, []);

  console.log("Table", tableData);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="table">
      {tableData.map((data) => (
        <tr>
          <td>{data.name}</td>
          <td>
            <strong>{numeral(data.cases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
