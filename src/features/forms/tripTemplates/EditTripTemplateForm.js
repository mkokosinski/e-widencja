import React from "react";

import TripTemplateForm from "./TripTemplateForm";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectTripTemplateById } from "../../tripTemplates/tripTemplatesSlice";

const EditTripTemplateForm = () => {
  const { id } = useParams();

  const tripTemplate = useSelector((state) =>
    selectTripTemplateById(state, id)
  );

  return (
    tripTemplate && (
      <TripTemplateForm tripTemplate={tripTemplate} isEdit={true} />
    )
  );
};

export default EditTripTemplateForm;
