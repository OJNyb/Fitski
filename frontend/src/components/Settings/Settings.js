import React, { lazy, useState, Suspense } from "react";
import { useAuth } from "../../context/authContext";
import useSetLoading from "../../hooks/useSetLoading";
import { editUser } from "../../utils/userClient";
import { Link } from "react-router-dom";

import "./settings.css";
import useMobile from "../../hooks/useMobile";

const MobileSettings = lazy(() => import("./Mobile/MobileSettings"));

const Settings = () => {
  const isMobile = useMobile();
  const { state, dispatch } = useAuth();

  const { user } = state;
  const { defaultUnit, email } = user;
  const [unit, setUnit] = useState(defaultUnit);

  function handleUnitChange(e) {
    const { value } = e.target;
    setUnit(value);
    editUser(dispatch, null, { defaultUnit: value });
  }

  let view;

  if (isMobile) {
    view = <MobileSettings unit={unit} onUnitChange={handleUnitChange} />;
  } else {
    view = <WebSettings unit={unit} onUnitChange={handleUnitChange} />;
  }

  const uniqueId = "secret";
  const clientId = "ca_GbJab9cP8cKD92X9M9hjDdiCwlG0HAxz";

  return (
    <Suspense fallback={null}>
      {view}
      <a
        href={`https://connect.stripe.com/express/oauth/authorize?/client_id=${clientId}&state=${uniqueId}&stripe_user[email]=${email}`}
        className="theme-btn padding-10"
      >
        Become a seller
      </a>
    </Suspense>
  );
};

const WebSettings = ({ unit, onUnitChange }) => {
  useSetLoading(false);
  return <MobileSettings unit={unit} onUnitChange={onUnitChange} />;
};

// const SettingsForm = () => {
//   const { state, dispatch } = useAuth();
//   useSetLoading(false);
//   const { user } = state;
//   const { defaultUnit } = user;
//   const [unit, setUnit] = useState(defaultUnit);

//   function onChange(e) {
//     setUnit(e.target.value);
//   }

//   function onSubmit(e) {
//     e.preventDefault();
//     editUser(dispatch, null, { defaultUnit: unit });
//   }
//   return (
//     <>
//       <NavMid backText={"Settings"} />
//       <div className="padding-15">
//         <form className="flex-col-cen" onSubmit={onSubmit}>
//           Weight unit
//           <select value={unit} onChange={onChange}>
//             <option value="kg">kg</option>
//             <option value="lbs">lbs</option>
//           </select>
//           <button
//             type="submit"
//             disabled={unit === defaultUnit}
//             className="theme-btn-filled settings-submit-btn"
//           >
//             Apply
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

export default Settings;
