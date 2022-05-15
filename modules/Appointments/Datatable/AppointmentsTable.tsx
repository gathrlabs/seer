import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import DatatableComponents from "../../../components/Datatable";
import DefaultButton from "../../../components/DefaultButton";
import DropdownButton from "../../../components/DropdownButton";

import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // O
import { ArrowNarrowDownIcon } from '@heroicons/react/solid';

function AppointmentsTable({ rowData }) {
  let [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const frameworkComponents = {
    dateTimeEditor: DatatableComponents.DateTimeEditor,
    dateTimeRenderer: DatatableComponents.DateTimeRenderer,
    linkRenderer: DatatableComponents.LinkRenderer,
    formsRenderer: DatatableComponents.FormsRenderer,
  };

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'member_id',
      filter: true,
      sortable: true,
      resizable: true,
      minWidth: 140,
      headerName: 'Member Id',
      headerTooltip: 'A unique identifier assigned to all members.',
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      cellRendererParams: {
        checkbox: true,
      },
      valueGetter: (params) => {
        if (params.data) {
          return params.data.consultee.member_id;
        }
        return '--';
      }
    },
    {
      field: 'consultee',
      headerName: 'Consultee',
      filter: true,
      cellRenderer: 'linkRenderer',
      valueGetter: (params) => {
        if (params.data) {
          return params.data.consultee.name
        }
        return '--';
      }
    },
    {
      field: 'starts_at',
      headerName: 'Scheduled For',
      cellRenderer: 'dateTimeRenderer',
      valueGetter: (params) => {
        if (params.data) {
          if (params.data.starts_at) {
            return params.data.starts_at
          }
          return 'Unscheduled'
        }
        return '--';
      },
      cellEditor: "dateTimeEditor",
      minWidth: 240,
      editable: true,
      cellEditorPopup: true,
    },
    {
      field: 'consultant',
      headerName: 'Assigned To',
      valueGetter: (params) => {
        if (params.data) {
          return params.data.consultant.name
        }
        return '--';
      }
    },
    {
      field: 'created_at',
      headerName: 'Created On',
      valueGetter: (params) => {
        if (params.data) {
          return params.data.created_at
        }
        return '--';
      }
    },
    {
      field: 'Forms',
      headerName: 'Forms',
      cellRenderer: 'formsRenderer',
      minWidth: 100,
      valueGetter: (params) => {
        if (params.data) {
          return params.data.surveys
        }
        return '--';
      }
    },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true
  }));

  const cellClickedListener = useCallback(event => {
    console.log(event);
  }, []);

  const cellValueChangedListener = useCallback(event => {
    console.log(event);
  }, []);
  
  const onSelectionChanged = useCallback((event) => {
    setSelectedRows(event.api.getSelectedNodes());
  }, []);

const optionSelected = (action: Object) => {
    if (action === "signOut") {
    }
  }

  // Example using Grid's API
  const buttonListener = useCallback(e => {
    gridRef.current.api.deselectAll();
  }, []);
  return (
    <div className='w-full'>
      <div className="inline-flex mb-4 justify-between items-center w-full">
        <DropdownButton buttonRegular={false} optionSelected={optionSelected} options={[{ 'actionName': 'sendConfirmationEmail', 'text': 'Send Confirmation Email' }]}>
          <DefaultButton title="Actions" onPress={() => {}} disabled={selectedRows.length < 1}><ArrowNarrowDownIcon className="h-3 w-3 text-slate-500" /></DefaultButton>
        </DropdownButton>
        <div className="text-slate-600 bg-slate-800 border-slate-600">
          Rows Selected
        </div>
      </div>
      <div>
        <div className="ag-theme-alpine w-full font-sans" style={{ height: 500 }}>
          {
            rowData.appointments.length > 0 ? <AgGridReact
              overlayLoadingTemplate={
                '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>'
              }
              overlayNoRowsTemplate={
                '<span style="padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow">This is a custom \'no rows\' overlay</span>'
              }
              ref={gridRef} // Ref for accessing Grid's API
              rowData={rowData.appointments} // Row Data for Rows
              columnDefs={columnDefs} // Column Defs for Columns
              defaultColDef={defaultColDef} // Default Column Properties
              frameworkComponents={frameworkComponents}
              singleClickEdit={true}
              stopEditingWhenCellsLoseFocus={true}
              animateRows={true} // Optional - set to 'true' to have rows animate when sorted
              rowSelection='multiple' // Options - allows click selection of rows
              onCellClicked={cellClickedListener} // Optional - registering for Grid Event
              onCellValueChanged={cellValueChangedListener} // Optional - registering for Grid Event
              onSelectionChanged={onSelectionChanged}
              suppressRowClickSelection={true}
            /> :
              (<div>
                <div style={{ height: 500 }} className='w-full bg-yellow-300 rounded-lg flex justify-center items-center'><div>Loading appointments</div></div>
              </div>)
          }
        </div>
      </div>
    </div>
  );
};

export default AppointmentsTable
