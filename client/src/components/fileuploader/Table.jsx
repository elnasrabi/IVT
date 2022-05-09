import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import CustomToolbar from "./CustomToolbar";
import axios from 'axios'

const columns = [
  {
    name: "supplier_ref",
    label: "supplier_ref",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "jno",
    label: "jno",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "customer",
    label: "customer",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "cons_date",
    label: "cons_date",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "carrier",
    label: "carrier",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "invoice_no",
    label: "invoice_no",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "invoice_date",
    label: "invoice_date",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "con_note",
    label: "con_note",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "from",
    label: "from",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "colsubzone",
    label: "colsubzone",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "to",
    label: "to",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "delsubzone",
    label: "delsubzone",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "option_code",
    label: "option_code",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "work_code",
    label: "work_code",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "freight_charges",
    label: "freight_charges",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "other_charges",
    label: "other_charges",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "fuel_surch",
    label: "fuel_surch",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "total_nett",
    label: "total_nett",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "gst",
    label: "gst",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "gross",
    label: "gross",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "items",
    label: "items",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "quantity",
    label: "quantity",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "space",
    label: "space",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "lift",
    label: "lift",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "weight",
    label: "weight",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "pallet",
    label: "pallet",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "hours",
    label: "hours",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "cubic",
    label: "cubic",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "del_com",
    label: "del_com",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "entered_by",
    label: "entered_by",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "status",
    label: "status",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "cus_ref",
    label: "cus_ref",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "col_post",
    label: "col_post",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "del_post",
    label: "del_post",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "chg_kg",
    label: "chg_kg",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "unit",
    label: "unit",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "del_ref",
    label: "del_ref",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "col_loc",
    label: "col_loc",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "del_loc",
    label: "del_loc",
    options: {
      filter: false,
      sort: true
    }
  }
  
];

																				


const Table = () => {


       
  const [dataForTable, setDataForTable] = useState();

  const options = {
    filterType: "checkbox",
    customToolbar: () => {
      return <CustomToolbar setDataForTable={setDataForTable} />;
    }
  };

  return (
      <div>
         
    <MUIDataTable
      title={"Buy OR Sell Data"}
      data={dataForTable}
      columns={columns}
      options={options}
    />
    </div>
  );
};

export default Table;
