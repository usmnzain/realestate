import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from "./components/pages/login/login";
import Register from "./components/pages/register/register";
import Landing from "./components/pages/landing/landing";
import Header from "./components/layout/header";
import Dashboard from "./components/pages/dashboard/dashboard";
import ProtectedRoute from "./utils/protected-route";
import NewAdvert from "./components/pages/dashboard/pages/newAdvert";
import Appointments from "./components/pages/dashboard/pages/appointments";
import Finances from "./components/pages/dashboard/pages/finances";
import Advertisements from "./components/pages/dashboard/pages/advertisements";
import AdPage from "./components/pages/ad-page/adPage";
import Footer from "./components/layout/footer";

function App() {
  const token = localStorage.getItem("auth_token");
  return (
    <Router>
      <div>
        <Header />

        <div className="contentbody">
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route path="/ads/:id">
              <AdPage />
            </Route>
            {/* <ProtectedRoute exact to="/dashboard" component={Dashboard} /> */}
            <Route exact path="/">
              <Landing />
            </Route>
            <Route path="*">
              <div className="mt-5">
                <h1 className="text-center text-monospace display-1">404 </h1>
                <h4 className="text-center text-monospace">
                  the page you are looking for does not exists :(
                </h4>
              </div>
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
