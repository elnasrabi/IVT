import React, { useEffect, useState, useMemo } from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

import CSVReader1 from "./CSVUploader";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: "0 auto",
    top: "25vh",
    position: "relative",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const CustomToolbar = (props) => {
  const { setDataForTable } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [CSVData, setCSVData] = useState([]);

  const fn = ([keys, ...values]) => 
  values.map(vs => Object.fromEntries(vs.map((v, i) => [keys[i], v])))

  useEffect(() => {
    let arr;
    if (CSVData.length>0 && CSVData)
    {
         arr=Array.from(fn(CSVData[0]));

         const dataArr = arr.map((data) => {
            
          if (data) {
            return {
                supplier_ref	:data.supplier_ref,
                jno	:data.jno,
                customer	:data.customer,
                cons_date	:data.cons_date,
                carrier	:data.carrier,
                invoice_no	:data.invoice_no,
                invoice_date	:data.invoice_date,
                con_note	:data.con_note,
                from	:data.from,
                colsubzone	:data.colsubzone,
                to	:data.to,
                delsubzone	:data.delsubzone,
                option_code	:data.option_code,
                work_code	:data.work_code,
                freight_charges	:data.freight_charges,
                other_charges	:data.other_charges,
                fuel_surch	:data.fuel_surch,
                total_nett	:data.total_nett,
                gst	:data.gst,
                gross	:data.gross,
                items	:data.items,
                quantity	:data.quantity,
                space	:data.space,
                lift	:data.lift,
                weight	:data.weight,
                pallet	:data.pallet,
                hours	:data.hours,
                cubic	:data.cubic,
                del_com	:data.del_com,
                entered_by	:data.entered_by,
                status	:data.status,
                cus_ref	:data.cus_ref,
                col_post	:data.col_post,
                del_post	:data.del_post,
                chg_kg	:data.chg_kg,
                unit	:data.unit,
                del_ref	:data.del_ref,
                col_loc	:data.col_loc,
                del_loc	:data.del_loc,
                
            };
          }
        });
    
    
        setDataForTable(dataArr);
    
      }
    
   

  
  }, [CSVData, setDataForTable]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title={"Add data from CSV"}>
        <IconButton>
          <AddCircleOutlineIcon onClick={handleOpen} />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <h2 id="simple-modal-title">Upload CSV Data</h2>
          <CSVReader1 setCSVData={setCSVData} />
          <br />
          <Button variant="outlined" onClick={handleClose}>
            Close modal
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CustomToolbar;
