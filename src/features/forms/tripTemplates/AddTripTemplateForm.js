import React from "react";

import TripTemplateForm from "./TripTemplateForm";

const AddTripTemplateForm = () => {
  const tripTemplate = {
    label: "",
    purpose: "",
    stops: [
      { label: "Start", place: "", mileage: "", distance: 0 },
      { label: "Cel", place: "", mileage: "", distance: null }
    ]
  };

  return <TripTemplateForm tripTemplate={tripTemplate} />;
};

export default AddTripTemplateForm;
