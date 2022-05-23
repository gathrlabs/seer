import { Transition } from '@headlessui/react';
import { ArrowNarrowDownIcon } from '@heroicons/react/solid';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import { useCallback, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import AppointmentsApi from '../../../lib/api/appointments';
import DatatableComponents from "../../../components/Datatable";
import DefaultButton from "../../../components/DefaultButton";
import DropdownButton from "../../../components/DropdownButton";
import CancelAppointmentModal from '../Modal/CancelAppointmentModal';
import SendConfirmationEmailModal from '../Modal/SendConfirmationEmailModal';
import AssignFormSlideover from '../Slideover/AssignFormSlideover';

import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // O

function AppointmentsTable({ rowData }) {
  let [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showAssignFormSlideover, setShowAssignFormSlideover] = useState(false);
  const [showConfirmationEmailModal, setShowConfirmationEmailModal] = useState(false);
  const [showCancelAppointmentModal, setShowCancelAppointmentModal] = useState(false);
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
    // console.log(event);
  }, []);

  const onSelectionChanged = useCallback((event) => {
    setSelectedRows(event.api.getSelectedNodes());
  }, []);

  const optionSelected = (action: Object) => {
    if (action === "sendConfirmationEmail") {
      setShowConfirmationEmailModal(true)
    }
    if (action === "assignForm") {
      setShowAssignFormSlideover(true);
    }
     if (action === "cancelAppointment") {
      setShowCancelAppointmentModal(true);
    }
  }

  const close = (component: string) => {
    if (component === "AssignFormSlideover") {
      setShowAssignFormSlideover(false);
    }
    if (component === "SendConfirmationEmailModal") {
      setShowConfirmationEmailModal(false);
    }
    if (component === "CancelAppointmentModal") {
      setShowCancelAppointmentModal(false);
    }
  }

  const updateAppointment = async () => {
    try {
      await AppointmentsApi.update(appointment);
      toast.success('Appointment successfully updated.');
      close('AssignFormSlideover');
    } catch (err) {
      setErrors(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  // Example using Grid's API
  const buttonListener = useCallback(e => {
    gridRef.current.api.deselectAll();
  }, []);
  return (
    <div className='w-full'>
      <div className="inline-flex mb-4 justify-between items-center w-full">
        <div className="inline-flex items-center space-x-2">
          <input
            id="email-address"
            onInput={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-200 focus:z-10"
            placeholder="Search appointments"
          /> 
          <DropdownButton
            direction="left"
            disabled={selectedRows.length < 1}
            buttonRegular={false}
            optionSelected={optionSelected}
            options={[
              { 'actionName': 'assignForm', 'text': 'Assign Form' },
              { 'actionName': 'sendConfirmationEmail', 'text': 'Send Confirmation Email' },
              {'actionName': 'cancelAppointment', 'text': 'Cancel Appointment'}
          ]}>
          <DefaultButton customClasses={'bg-slate-50'} title="Filter" onPress={() => { }} disabled={selectedRows.length < 1}><ArrowNarrowDownIcon className="h-3 w-3 text-slate-500" /></DefaultButton>
        </DropdownButton>
        </div>
        <Transition
          show={selectedRows.length > 0}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          className={'inline-flex items-center space-x-2 z-10'}
        >
          <DropdownButton
            direction="Right"
            disabled={selectedRows.length < 1}
            buttonRegular={false}
            optionSelected={optionSelected}
            options={[
              { 'actionName': 'assignForm', 'text': 'Assign Form' },
              { 'actionName': 'sendConfirmationEmail', 'text': 'Send Confirmation Email' },
              {'actionName': 'cancelAppointment', 'text': 'Cancel Appointment'}
            ]}>
            <DefaultButton customClasses={'bg-slate-50'} title="Actions" onPress={() => { }} disabled={selectedRows.length < 1}><div className="border-l pl-2 text-sm text-slate-600 border-slate-300">{selectedRows.length}</div></DefaultButton>
          </DropdownButton>
        </Transition>
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
                <div style={{ height: 500 }} className='w-full bg-orange-50 bg-opacity-75 rounded-lg flex justify-center items-center border border-slate-200'><div className="bg-white shadow px-2 py-1 rounded-lg">Loading appointments</div></div>
              </div>)
          }
        </div>
      </div>
      <AssignFormSlideover selectedRows={selectedRows} show={showAssignFormSlideover} close={close} />
      <SendConfirmationEmailModal selectedRows={selectedRows} show={showConfirmationEmailModal} close={close} />
      <CancelAppointmentModal show={showCancelAppointmentModal} close={close} />
    </div>
  );
};

export default AppointmentsTable
