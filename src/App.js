import { Switch, Route } from "react-router-dom";

import "./App.css";
import MainPage from "./pages/MainPage";
import HospitalPage from "./pages/HospitalPage";
import MainNavigation from "./components/MainNavigation";
import CallPage from "./pages/CallPage";
import { useState } from "react";

function App() {
  const [districtData, setDistrictData] = useState([]);
  const [districtCases, setDistrictCases] = useState({});

  const [mapDistricts, setMapDistricts] = useState([]);
  const [mapCenter, setMapCenter] = useState({});
  const [mapZoom, setMapZoom] = useState();
  const [mapDetails, setMapDetails] = useState([]);
  const [districtInfoCases, setDistrictInfoCases] = useState([]);

  console.log(districtInfoCases);

  return (
    <div className="app">
      <div>
        <MainNavigation
          districtData={setDistrictData}
          districtCasesInfo={setDistrictCases}
          mapDistricts={setMapDistricts}
          mapCenter={setMapCenter}
          mapZoom={setMapZoom}
          mapInfo={setMapDetails}
        />
      </div>
      <div>
        <Switch>
          <Route path="/" exact>
            <MainPage
              districtInfoCases={setDistrictInfoCases}
              district={districtData}
              districtInfo={districtCases}
              mapDistricts={mapDistricts}
              mapCenter={mapCenter}
              mapZoom={mapZoom}
              mapDetails={mapDetails}
            />
          </Route>
          <Route path="/hospital-page">
            <HospitalPage />
          </Route>
          <Route path="/call-page">
            <CallPage
              district={districtData}
              districtInfoCases={districtInfoCases}
            />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
