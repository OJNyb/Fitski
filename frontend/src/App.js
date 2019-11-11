import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useUser } from "./context/userContext";
import ScrollToTop from "./utils/ScrollToTop";
import "./App.css";

import "./styles/common.css";

const loadAuthenticatedApp = () => import("./AuthenticatedApp");
const AuthenticatedApp = React.lazy(loadAuthenticatedApp);
const UnauthenticatedApp = React.lazy(() => import("./UnauthenticatedApp"));

const App = () => {
  const user = useUser();

  React.useEffect(() => {
    loadAuthenticatedApp();
  }, []);
  return (
    <React.Suspense fallback={null}>
      <Router>
        <ScrollToTop>
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </ScrollToTop>
      </Router>
    </React.Suspense>
  );
};

export default App;
