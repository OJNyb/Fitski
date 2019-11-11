import React from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import { useUser } from "../../context/userContext";

const Settings = () => {
  const user = useUser();

  const { defaultUnit } = user;

  console.log(user);

  console.log(navigator.geolocation.getCurrentPosition(e => console.log(e)));
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
      <div>Timezones & weight unit & delete account for now</div>
      <form>
        Weight unit:
        <select value={defaultUnit}>
          <option value="kgs">kgs</option>
          <option value="lbs">lbs</option>
        </select>
      </form>
    </div>
  );
};

// const SettingsContent = ({ title }) => {
//   return (
//     <section>
//       <h6>Date & Time</h6>
//       <form>
//         <label>Time zone</label>
//         <select>
//           <option>arse</option>
//         </select>
//         <label>Date format</label>
//         <label>Time format</label>
//       </form>
//     </section>
//   );
// };

export default Settings;
