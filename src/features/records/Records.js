import React from "react";
import { useSelector } from "react-redux";

import ListViewItem from "../templates/ListView/ListViewItem";
import {
  ButtonAdd,
  TopPanel,
  AddItem,
  SearchInput,
  ItemsList,
} from "../templates/ListView/ListViewStyles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faUser,
  faFileAlt,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import Routing from "../layout/Routing";
import { selectRecords } from "./recordsSlice";

const buttons = [
  {
    ico: faFileAlt,
    label: "Szczegóły",
    action: "details",
  },
  {
    ico: faPlusSquare,
    label: "cośtam",
    action: "details",
  },
  {
    ico: faPlusSquare,
    label: "cośtam",
    action: "details",
  },
];

const Records = () => {
  const records = useSelector(selectRecords);

  return (
    <ItemsList>
      <TopPanel>
        <ButtonAdd>
          <AddItem to={`${Routing.RecordForm.path}`}>
            <FontAwesomeIcon icon={faPlus} />
            Nowa <span>ewidencja</span>
          </AddItem>
        </ButtonAdd>
        <SearchInput />
      </TopPanel>

      {records.map((record) => (
        <ListViewItem
          key={record.id}
          ico={faUser}
          item={record}
          path={Routing.Records.path}
          buttons={buttons}
        />
      ))}
    </ItemsList>
  );
};

export default Records;
