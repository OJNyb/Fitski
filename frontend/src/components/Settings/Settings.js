import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Settings = () => {
  useEffect(() => {
    let isCancelled = false;
    function fetchTimezones() {
      axios
        .get(
          "http://api.timezonedb.com/v2.1/list-time-zone?key=HQGW4Z25HG4O&format=json"
        )
        .then(res => {
          if (!isCancelled) {
            console.log(res);
          }
        })
        .catch(err => console.error(err));
    }

    fetchTimezones();
    return () => {
      isCancelled = true;
    };
  }, []);
  return (
    <div className="settings-container">
      <div className="settings-menu">
        <Link to="account">Account</Link>
        <Link to="general">General</Link>
      </div>
      <div className="settings-content">
        <section>
          <h6>General</h6>
        </section>
        <section>
          <h6>Date & Time</h6>
        </section>
      </div>
    </div>
  );
};

const SettingsContent = ({ title }) => {
  return (
    <section>
      <h6>Date & Time</h6>
      <form>
        <label>Time zone</label>
        <select>
          <option>arse</option>
        </select>
        <label>Date format</label>
        <label>Time format</label>
      </form>
    </section>
  );
};

export default Settings;
