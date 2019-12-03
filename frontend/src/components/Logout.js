import { useEffect } from "react";
import { useAuth } from "../context/authContext";

const Logout = () => {
  const { logout } = useAuth();
  useEffect(() => {
    function logoutski() {
      logout()
        .then(() => window.location.reload())
        .catch(err => console.log(err));
    }

    logoutski();
  }, [logout]);

  return null;
};

export default Logout;
