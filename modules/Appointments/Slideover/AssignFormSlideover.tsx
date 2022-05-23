import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { Fragment, useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import AppointmentsApi from '../../../lib/api/appointments'
import DefaultButton from '../../../components/DefaultButton'
import LinkButton from '../../../components/LinkButton'
import FormsApi from '../../../lib/api/forms'

export default function AssignFormSlideover({ show, close, selectedRows }: { open: boolean, close: () => void, selectedRows: any }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState({});
  const [notify, setNotify] = useState(false);

  const selectForm = (form: any) => {
    if (form) {
      setSelectedForm(form);
    }
  }

  const assignForm = async () => {
    setLoading(true);
    const ids = selectedRows.map((row) => row.data.id);
    try {
      await AppointmentsApi.assignForm(ids, selectedForm, notify);
      toast.success('Forms are successfully assigned.');
      close('AssignFormSlideover');
    } catch (err) {
      setErrors(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  const retrieveForms = async () => {
    try {
      const { data } = await FormsApi.all();
      setForms(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    retrieveForms();
  }, [])

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={close}>
        <div className="fixed inset-0" />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-5300 sm:duration-400"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300 sm:duration-400"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <form className="flex h-full flex-col divide-y divide-slate-200 bg-white shadow-xl">
                    <div className="h-0 flex-1 overflow-y-auto">
                      <div className="bg-slate-50 py-6 px-4">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-lg text-slate-800"> Assign Form to {selectedRows.length} Client{selectedRows.length > 1 ? (<span>s</span>) : null}</Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md text-slate-400 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200"
                              onClick={() => close('AssignFormSlideover')}
                            >
                              <span className="sr-only">Close panel</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm font-light text-slate-700">
                            Assign a form for client to fill out prior to their scheduled appointment. 
                          </p>
                        </div>
                      </div>
                      <div className="p-4 text-slate-700">Select Form</div>
                      <div className="flex flex-1 flex-col justify-between px-4 space-y-1 max-h-80 overflow-y-scroll py-4 border-y border-slate-200">
                        {forms.map((form, index) => (
                          <div key={form.id} onClick={() => selectForm(form)} className="p-2 rounded border border-slate-200 inline-flex justify-between items-center">
                            <div>
                              <div>{form.name}</div>
                              <LinkButton>
                                <div className="text-sm font-light">View form</div>
                              </LinkButton>
                            </div>
                            <div>
                              <input
                                id={`form-${form.id}`}
                                name={`form-${form.id}`}
                                type="checkbox"
                                className="focus:ring-slate-500 h-4 w-4 text-slate-600 border-slate-200 rounded"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="relative flex items-start px-4 mb-4 border-b border-slate-200 py-4">
                        <div className="flex items-center h-5">
                          <input
                            id="comments"
                            aria-describedby="comments-description"
                            name="comments"
                            type="checkbox"
                            defaultChecked={notify}
                            onChange={() => setNotify(!notify)}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-slate-300 rounded"
                          />
                        </div>
                        <div className="ml-3">
                          <label htmlFor="comments" className="text-slate-700">
                            Send Email
                          </label>
                          <p id="comments-description" className="text-slate-500 font-light te">
                            Send an email to the client with a link to the form to be completed.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 justify-end px-4 py-4 space-x-2">
                      <DefaultButton loading={loading} disabled={false} onPress={() => assignForm()}>
                        Assign Form
                      </DefaultButton>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
