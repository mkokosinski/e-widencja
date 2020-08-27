import React from "react";
import { useParams, useHistory } from "react-router";
import { useSelector } from "react-redux";

const DriverDetails = () => {
  const { id } = useParams();
  const { goBack } = useHistory();

  const driver = useSelector((state) =>
    state.drivers.find((driver) => driver.id === id)
  );

  return (
    <div>
      <button onClick={goBack}>go back</button>
      <div>Name: {driver.name}</div>
      <div>surname: {driver.surname}</div>
      <div>label: {driver.label}</div>
    </div>
  );
};

export default DriverDetails;
