import React from "react";
import "./Table.css";
import { useState, useEffect } from "react";
import numeral from "numeral";
import Loading from "./Loading";

function Table(props) {
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

  // "https://portal.edcd.gov.np/rest/api/fetchCasesByDistrict?filter=casesBetween&sDate=2020-01-01&eDate=2021-07-07&disease=COVID-19"
  useEffect(() => {
    setIsLoading(true);
    const getName = (id) => {
      for (let i = 0; i < props.districtName.length; i++) {
        if (id === props.districtName[i].id) {
          return props.districtName[i].name;
        }
      }
    };

    const getData = async () => {
      fetch("https://data.askbhunte.com/api/v1/covid/summary")
        .then((response) => response.json())
        .then((data) => {
          // console.log("API data ", data);
          let districtCases = data.district.cases;
          // console.log(districtCases);

          const casesArray = [];
          for (let i = 0; i < districtCases.length; i++) {
            const districts = {
              id: districtCases[i].district,
              name: getName(districtCases[i].district),
              cases: districtCases[i].count,
            };
            casesArray.push(districts);
          }
          // console.log(casesArray);

          let sortedData = compare(casesArray);

          setTableData(sortedData);

          setIsLoading(false);
        });
    };
    getData();
  }, [props.districtName]);

  // console.log("Table", tableData);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="table">
      {tableData.map((data) => (
        <tr key={data.id}>
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
