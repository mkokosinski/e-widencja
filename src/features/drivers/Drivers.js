import React from "react";
import { selectDrivers } from "./driversSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Drivers() {
  const drivers = useSelector(selectDrivers);
  return (
    <div>
      {drivers.map((driver) => (
        <div key={driver.id}>
          <Link to={`/drivers/${driver.id}`} props={{ ...driver }}>
            {driver.name} {driver.surname}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Drivers;
