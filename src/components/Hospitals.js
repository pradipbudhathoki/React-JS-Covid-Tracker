import React from "react";
import HospitalItems from "./HospitalItems";
import "./Hospitals.css";
import hospital from "./../data/hospitals.json";
import { useState, useEffect } from "react";

function Hospitals() {
  const [hospitalInfo, setHospitalInfo] = useState([]);

  // console.log(hospital.data);
  const data = hospital.data;

  useEffect(() => {
    const dataArr = [];
    for (let i = 0; i < data.length; i++) {
      // console.log(data[i]);
      const info = {
        id: data[i].id,
        name: data[i].name,
        address: data[i].address,
        phone: data[i].phone,
        beds: data[i].no_of_bed_allocated,
        icuBeds: data[i].no_of_icu_bed_allocated,
        ventilators: data[i].no_of_ventilators_allocated,
        district: data[i].district,
        province: data[i].province,
      };
      dataArr.push(info);
    }
    setHospitalInfo(dataArr);
  }, [data]);

  console.log(hospitalInfo);

  return (
    <div>
      <h1>Hospital</h1>
      {hospitalInfo.map((data) => (
        <HospitalItems
          name={data.name}
          address={data.address}
          phone={data.phone}
          beds={data.beds}
          icuBeds={data.icuBeds}
          ventilators={data.ventilators}
        />
      ))}
    </div>
  );
}

export default Hospitals;
