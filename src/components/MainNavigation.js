import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./MainNavigation.css";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import CallIcon from "@material-ui/icons/Call";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";

function MainNavigation(props) {
  const [districtName, setDistrictName] = useState("nationwide");
  const [districtInfo, setDistrictInfo] = useState({});
  const [districts, setDistricts] = useState([]);

  const [mapDistricts, setMapDistricts] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 27.7059079,
    lng: 85.2754424,
  });
  const [mapZoom, setMapZoom] = useState(4);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries/NP?strict=true")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setDistrictInfo(data);
      });
  }, []);

  useEffect(() => {
    fetch("https://data.askbhunte.com/api/v1/districts")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);

        const districts = data.map((district) => ({
          name: district.title,
          value: district.code,
          id: district.id,
        }));

        setDistricts(districts);
        setMapDistricts(data);
      });
  }, []);

  props.districtData(districts);
  // console.log(districts);

  const onDistrictChange = async (event) => {
    const districtValue = event.target.value;
    console.log(districtValue);

    if (districtValue) {
      if (districtValue === "nationwide") {
        await fetch("https://disease.sh/v3/covid-19/countries/NP?strict=true")
          .then((response) => response.json())
          .then((data) => {
            setDistrictInfo(data);
            setDistrictName(districtValue);
            setMapCenter([28.3949, 84.124]);
            setMapZoom(4);
          });
      } else {
        await fetch(
          `https://data.askbhunte.com/api/v1/districts/${districtValue}`
        )
          .then((response) => response.json())
          .then((data) => {
            // console.log("District: ", data);
            const info = {
              todayCases: data.covid_summary.cases,
              todayRecovered: data.covid_summary.recovered,
              todayDeaths: data.covid_summary.death,
              active: data.covid_summary.active,
            };
            setDistrictInfo(info);
            setDistrictName(districtValue);

            // console.log(
            //   data.centroid.coordinates[1],
            //   data.centroid.coordinates[0]
            // );
            setMapCenter([
              data.centroid.coordinates[1],
              data.centroid.coordinates[0],
            ]);
            setMapZoom(5);
          });
      }
    } else {
      await fetch("https://disease.sh/v3/covid-19/countries/NP?strict=true")
        .then((response) => response.json())
        .then((data) => {
          setDistrictInfo(data);
          setDistrictName(districtValue);
          setMapCenter([28.3949, 84.124]);
          setMapZoom(4);
        });
    }
  };

  props.districtCasesInfo(districtInfo);

  props.mapDistricts(mapDistricts);
  props.mapCenter(mapCenter);
  props.mapZoom(mapZoom);

  return (
    <div className="nav">
      <div className="nav__left">
        <div className="nav__header">
          <Link to="/" className="nav__title">
            <h1>COVID-19 Tracker</h1>
          </Link>
          <FormControl className="nav__dropdown">
            <Select
              variant="outlined"
              value={districtName}
              onChange={onDistrictChange}
            >
              <MenuItem value="nationwide">Nationwide</MenuItem>
              {districts.map((district) => (
                <MenuItem key={district.id} value={district.value}>
                  {district.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="nav__icons">
        <Link to="/">
          <HomeIcon className="nav__home" />
        </Link>

        <Link to="/call-page">
          <CallIcon className="nav__call" />
        </Link>

        <Link to="/hospital-page">
          <LocalHospitalIcon className="nav__hospital" />
        </Link>
      </div>
    </div>
  );
}

export default MainNavigation;
