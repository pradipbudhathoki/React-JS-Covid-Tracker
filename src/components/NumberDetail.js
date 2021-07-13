import React from "react";
import NumberItems from "./NumberItems";
import "./NumberDetail.css";

function NumberDetail() {
  const details = [
    {
      name: "Nepal Eye Bank",
      num: "4493684",
    },
    {
      name: "Tilganga Eye Hospital",
      num: "4423684",
    },
    {
      name: "Bir Hospital",
      num: "4223807",
    },
    {
      name: "Nepal Police Hospital",
      num: "4412430",
    },
    {
      name: "TU Teaching Hospital",
      num: "4412404",
    },
    {
      name: "Maternity Hospital",
      num: "4253276",
    },
    {
      name: "Teku Hospital",
      num: "4253396",
    },
    {
      name: "Patan Hospital",
      num: "5522266",
    },
    {
      name: "Bhaktapur Hospital",
      num: "6610676",
    },
    {
      name: "Mental Hospital",
      num: "5521333",
    },
    {
      name: "Kanti Children Hospital",
      num: "4427452",
    },
    {
      name: "Kathmandu Model Hospital",
      num: "4240805",
    },
    {
      name: "B&B Hospital",
      num: "5533206",
    },
    {
      name: "Medicare National Hospital",
      num: "4467067",
    },
    {
      name: "Nepal Orthopaedic Hospital",
      num: "4493725",
    },
    {
      name: "Kathmandu Medical College",
      num: "4476152",
    },
    {
      name: "Nepal Medical College",
      num: "4486008",
    },
    {
      name: "Kantipur Dental Hospital",
      num: "4371603",
    },
    {
      name: "Kantipur Hospital",
      num: "4498757",
    },
    {
      name: "Hospital and Research Centre",
      num: "4476225",
    },
    {
      name: "Norvic Hospital",
      num: "4258554",
    },
    {
      name: "Martyr Gangalal National Heart Centre",
      num: "4371374",
    },
    {
      name: "Life Care Hospital",
      num: "4227735",
    },
    {
      name: "Miteri Hospital",
      num: "4222305",
    },
    {
      name: "Capital Hospital",
      num: "4244022",
    },
    {
      name: "Shree Satya Sai Centre",
      num: "4498035",
    },
    {
      name: "Bhaktapur Redcross",
      num: "6612266",
    },
    {
      name: "National Kidney Centre",
      num: "4426016",
    },
    {
      name: "Blood Bank",
      num: "4225344",
    },
  ];
  return (
    <div className="number">
      {details.map((data) => (
        <NumberItems name={data.name} number={data.num} />
      ))}
    </div>
  );
}

export default NumberDetail;
