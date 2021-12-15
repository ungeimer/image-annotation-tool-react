import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Components
import Collections from "./components/Collections";
import Tags from "./components/Tags";
import Settings from "./components/UserSettings";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" exact element={<Login />} component={Login} />
      <Route path="/login" element={<Login />} component={Login} />
      <Route path="/register" element={<Register />} component={Register} />
      <Route path="/collections"element={
          <ProtectedRoute>
            {" "}
            <Collections />{" "}
          </ProtectedRoute>
        }
        component={Collections}
      />
      <Route path="/tags"element={
          <ProtectedRoute>
            <Tags />
          </ProtectedRoute>
        }
        component={Tags}
      />
      <Route path="/settings" element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
        component={Settings}
      />
      <Route path="/logout" element={
          <ProtectedRoute>
            <Logout />
          </ProtectedRoute>
        }
        component={Logout}
      />
    </Routes>
  </Router>
);

export default App;

