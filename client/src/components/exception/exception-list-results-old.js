import { useState,useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';


export const ExceptionListResultsold = ({ exceptions, ...rest }) => {
 
  
   
//console.log('EXCCCEEEEPTTIONS',exceptions);


  const [selectedExceptionIds, setSelectedExceptionIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedExceptionIds;

    if (event.target.checked) {
      newSelectedExceptionIds = exceptions.map((exception) => exception.ErrCode);
    } else {
      newSelectedExceptionIds = [];
    }

    setSelectedExceptionIds(newSelectedExceptionIds);
  };

  const handleSelectOne = (event, ErrCode) => {
    const selectedIndex = selectedExceptionIds.indexOf(ErrCode);
    let newSelectedExceptionIds = [];

    if (selectedIndex === -1) {
      newSelectedExceptionIds = newSelectedExceptionIds.concat(selectedExceptionIds, ErrCode);
    } else if (selectedIndex === 0) {
      newSelectedExceptionIds = newSelectedExceptionIds.concat(selectedExceptionIds.slice(1));
    } else if (selectedIndex === selectedExceptionIds.length - 1) {
      newSelectedExceptionIds = newSelectedExceptionIds.concat(selectedExceptionIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedExceptionIds = newSelectedExceptionIds.concat(
        selectedExceptionIds.slice(0, selectedIndex),
        selectedExceptionIds.slice(selectedIndex + 1)
      );
    }

    setSelectedExceptionIds(newSelectedExceptionIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handleChangeRowsPerPage = (
  ) => {
    setLimit(parseInt(event.target.value));
    setPage(0);
  };
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedExceptionIds.length === exceptions.length}
                    color="primary"
                    indeterminate={
                      selectedExceptionIds.length > 0
                      && selectedExceptionIds.length < exceptions.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Exception
                </TableCell>
                <TableCell>
                  Carrier
                </TableCell>
                <TableCell>
                  Connote
                </TableCell>
                <TableCell>
                  Invoice Week
                </TableCell>
                <TableCell>
                 Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exceptions.slice(0, limit).map((exception) => (
                <TableRow
                  hover
                  key={exception.ErrCode}
                  selected={selectedExceptionIds.indexOf(exception.ErrCode) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedExceptionIds.indexOf(exception.ErrCode) !== -1}
                      onChange={(event) => handleSelectOne(event, exception.ErrCode)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                    
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {exception.ErrDesc}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {exception.ErrPriority}
                  </TableCell>
                  <TableCell>
                       {/* {format(exception.createdAt, 'dd/MM/yyyy')} */}
                    {`${exception.ErrPriority}, ${exception.ErrCode}`}
                  </TableCell>
                 
                 
                  <TableCell>
                  <Button
          color="primary"
          variant="contained"
        >
          Hold
        </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={exceptions.length}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
        labelDisplayedRows={({ page }) => {
          return `Page: ${page}`;
        }}
        backIconButtonProps={{
          color: "secondary"
        }}
        nextIconButtonProps={{ color: "secondary" }}
        showFirstButton={true}
        showLastButton={true}
        labelRowsPerPage={<span>Rows:</span>}
        sx={{
          ".MuiTablePagination-toolbar": {
            backgroundColor: "rgba(100,100,100,0.5)"
          },
          ".MuiTablePagination-selectLabel, .MuiTablePagination-input": {
            fontWeight: "bold",
            color: "blue"
          }
        }}
      />
    </Card>
  );
};

ExceptionListResultsold.propTypes = {
  exceptions: PropTypes.array.isRequired
};
