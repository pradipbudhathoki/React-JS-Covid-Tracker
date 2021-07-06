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

  // console.log(districtCases);

  return (
    <div className="app">
      <div>
        <MainNavigation
          districtData={setDistrictData}
          districtCasesInfo={setDistrictCases}
        />
      </div>
      <div>
        <Switch>
          <Route path="/" exact>
            <MainPage district={districtData} districtInfo={districtCases} />
          </Route>
          <Route path="/hospital-page">
            <HospitalPage />
          </Route>
          <Route path="/call-page">
            <CallPage />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
