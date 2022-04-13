import React from "react";
import ReactDOM from "react-dom";
import { FiltersMenu } from "../components/filtersMenu";
import MaterialTable from "material-table";


const data = [
  { id: 1, first_name: "Jana", last_name: "Goundrill" },
  { id: 2, first_name: "Yehudit", last_name: "Bourcq" },
  { id: 3, first_name: "Bogey", last_name: "Darker" },
  { id: 4, first_name: "Helene", last_name: "Iashvili" },
  { id: 5, first_name: "Gearalt", last_name: "Sangster" },
  { id: 6, first_name: "Patti", last_name: "Gobat" },
  { id: 7, first_name: "Adriano", last_name: "Fowden" },
  { id: 8, first_name: "Hayward", last_name: "Casaroli" },
  { id: 9, first_name: "Thornton", last_name: "Pointer" },
  { id: 10, first_name: "Essa", last_name: "Northam" }
];

function tabletest() {
  return (
    <div className="App">
      <MaterialTable
        title="Adanced Filtering"
        icons={{ Filter: () => <FiltersMenu /> }}
        columns={[
          { title: "Name", field: "first_name" },
          { title: "Surname", field: "last_name" }
        ]}
        data={data}
        options={{
          filtering: true
        }}
      />
    </div>
  );
}

export default tabletest;
