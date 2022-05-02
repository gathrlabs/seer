import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import DropdownButton from '../../../components/DropdownButton';

import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // O

function AppointmentsTable() {

  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: 'Member Id', filter: true },
    { field: 'Consultee', filter: true },
    { field: 'Scheduled For' },
    { field: 'Assigned To' },
    { field: 'Created On' },
    { field: 'Forms'},
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true
  }));

  // Example of consuming Grid Event
  const cellClickedListener = useCallback(event => {
    console.log('cellClicked', event);
  }, []);

  // Example load data from sever
  // useEffect(() => {
  //   fetch('https://www.ag-grid.com/example-assets/row-data.json')
  //     .then(result => result.json())
  //     .then(rowData => setRowData(rowData))
  // }, []);

  // Example using Grid's API
  const buttonListener = useCallback(e => {
    gridRef.current.api.deselectAll();
  }, []);

  return (
    <div className='w-full'>
      <div style={{  marginBottom: 10 }}>
        <DropdownButton options={[{'text': 'Attach Form', url: '/'}, {'text': 'Send Confirmation Email', url: '/'}, {'text': 'Cancel', url: '/'}]} title={'Actions'}/>
      </div>
      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div>
      <div className="ag-theme-alpine w-full" style={{ height: 500 }}>

        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API

          rowData={rowData} // Row Data for Rows

          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties

          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection='multiple' // Options - allows click selection of rows

          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
        />
      </div>
      </div>
    </div>
  );
};

export default AppointmentsTable
