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
    lat: 28.3949,
    lng: 84.124,
  });
  const [mapZoom, setMapZoom] = useState(7);
  const [mapDetails, setMapDetails] = useState([]);

  useEffect(() => {
    // https://disease.sh/v3/covid-19/countries/NP?strict=true
    // https://covid19.mohp.gov.np/covid/api/confirmedcases
    fetch("https://covid19.mohp.gov.np/covid/api/confirmedcases")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.nepal);
        const info = {
          todayCases: data.nepal.today_newcase,
          todayRecovered: data.nepal.today_recovered,
          todayDeaths: data.nepal.today_death,
          active: data.nepal.extra2,
          cases: data.nepal.positive,
          recovered: data.nepal.extra1,
          deaths: data.nepal.deaths,
          tests: data.nepal.samples_tested,
        };
        // console.log(info);
        setDistrictInfo(info);
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

    if (districtValue !== "nationwide") {
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
          setMapZoom(11);

          const mapInfo = {
            name: data.title,
            cases: data.covid_summary.cases,
            recovered: data.covid_summary.recovered,
            deaths: data.covid_summary.death,
            active: data.covid_summary.active,
            lat: data.centroid.coordinates[1],
            long: data.centroid.coordinates[0],
          };
          setMapDetails(mapInfo);
        });
    } else {
      await fetch("https://covid19.mohp.gov.np/covid/api/confirmedcases")
        .then((response) => response.json())
        .then((data) => {
          const info = {
            todayCases: data.nepal.today_newcase,
            todayRecovered: data.nepal.today_recovered,
            todayDeaths: data.nepal.today_death,
            active: data.nepal.extra2,
            cases: data.nepal.positive,
            recovered: data.nepal.extra1,
            deaths: data.nepal.deaths,
            tests: data.nepal.samples_tested,
          };

          setDistrictInfo(info);
          setDistrictName(districtValue);
          setMapCenter([28.3949, 84.124]);
          setMapZoom(7);
        });
    }
  };

  props.districtCasesInfo(districtInfo);

  props.mapDistricts(mapDistricts);
  props.mapCenter(mapCenter);
  props.mapZoom(mapZoom);
  props.mapInfo(mapDetails);

  return (
    <div className="nav">
      <div className="nav__left">
        <div className="nav__header">
          <Link to="/" className="nav__title">
            <h1>COVID-19 Tracker Nepal</h1>
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
