import React from "react";
import { useParams, useHistory } from "react-router";
import { useSelector } from "react-redux";

const RecordDetails = () => {
  const { id } = useParams();
  const { goBack } = useHistory();

  const record = useSelector((state) =>
    state.records.find((record) => record.id === id)
  );

  return (
    <div>
      <button onClick={goBack}>go back</button>
      <div>Year: {record.year}</div>
      <div>Month: {record.month}</div>
    </div>
  );
};

export default RecordDetails;
