import React from "react";
import "./Dropdown.css";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import { useState, useEffect } from "react";

function Dropdown(props) {
  // variables
  const [districtName, setDistrictName] = useState("nationwide");
  const [districtInfo, setDistrictInfo] = useState({});
  const [districts, setDistricts] = useState([]);

  //   const [mapDistricts, setMapDistricts] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 28.3949,
    lng: 84.124,
  });
  const [mapZoom, setMapZoom] = useState(7);
  //   const [mapDetails, setMapDetails] = useState([]);

  // Covid Cases
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
  //   console.log(districtInfo);

  // Districts name into dropdown
  useEffect(() => {
    fetch("https://data.askbhunte.com/api/v1/districts")
      .then((response) => response.json())
      .then((data) => {
        // console.log("Dataaaa", data);

        const districts = data.map((district) => ({
          name: district.title,
          title: district.title.toUpperCase(),
          value: district.code,
          id: district.id,
          lat: district.centroid.coordinates[1],
          long: district.centroid.coordinates[0],
        }));

        setDistricts(districts);
        // setMapDistricts(data);
      });
  }, []);
  props.districtData(districts);
  //   console.log(districts);

  const onDistrictChange = async (event) => {
    const districtValue = event.target.value;
    console.log(districtValue);

    if (districtValue) {
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
          setMapZoom(10);

          //   const mapInfo = {
          //     name: data.title,
          //     cases: data.covid_summary.cases,
          //     recovered: data.covid_summary.recovered,
          //     deaths: data.covid_summary.death,
          //     active: data.covid_summary.active,
          //     lat: data.centroid.coordinates[1],
          //     long: data.centroid.coordinates[0],
          //   };
          //   setMapDetails(mapInfo);
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

  props.districtInfo(districtInfo);

  //   props.mapDistricts(mapDistricts);
  props.mapCenter(mapCenter);
  props.mapZoom(mapZoom);
  //   props.mapDetails(mapDetails);

  return (
    <div className="dropdown">
      <FormControl className="dropdown__dropdown">
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
  );
}

export default Dropdown;
