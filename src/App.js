import { Switch, Route } from "react-router-dom";

import "./App.css";
import MainPage from "./pages/MainPage";
import HospitalPage from "./pages/HospitalPage";
import MainNavigation from "./components/MainNavigation";
import CallPage from "./pages/CallPage";

function App() {
  return (
    <div className="app">
      <div>
        <MainNavigation />
      </div>
      <div>
        <Switch>
          <Route path="/" exact>
            <MainPage />
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
